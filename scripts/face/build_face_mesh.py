"""
Gera o modelo 3D do hero a partir da foto (roda UMA vez, offline, nesta máquina).

Saída: src/app/components/Portrait/face-mesh.json, com
  - face: malha de 468 vértices do rosto (MediaPipe), texturizada com a própria foto;
    vértices virados para longe da câmera usam o UV do vértice espelhado;
  - relief: relevo do CORPO INTEIRO visível (cabelo, pescoço, ombros, roupa): uma grade
    com profundidade, montada do recorte da pessoa (selfie segmenter) "inflado" a partir
    da silhueta, com a profundidade real do rosto encaixada nele;
  - pivot: ponto no pescoço em torno do qual a cabeça gira (o tronco fica parado);
  - eyes: contorno das pálpebras, íris (centro, raio e cor tirados da foto), esclera;
  - wink: o olho que pisca (o mais de frente para a câmera).

Unidade: largura da foto. Eixos: x à direita, y para cima, z para fora da tela.

Requisitos (fora do repositório):
  pip install mediapipe numpy pillow
  face_landmarker.task   → https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task
  selfie_segmenter.tflite → https://storage.googleapis.com/mediapipe-models/image_segmenter/selfie_segmenter/float16/latest/selfie_segmenter.tflite
  canonical_face_model.obj → https://github.com/google-ai-edge/mediapipe/blob/master/mediapipe/modules/face_geometry/data/canonical_face_model.obj

Uso:
  python scripts/face/build_face_mesh.py src/photos/portrait.png <face_landmarker.task> <selfie_segmenter.tflite> <canonical_face_model.obj> src/app/components/Portrait/face-mesh.json
"""

import base64
import json
import sys

import mediapipe as mp
import numpy as np
from mediapipe.tasks import python as mp_python
from mediapipe.tasks.python import vision
from PIL import Image, ImageDraw

# "right" = olho direito da PESSOA (lado esquerdo da imagem). Contorno em ordem, fechado.
EYES = {
    "right": {
        "contour": [33, 246, 161, 160, 159, 158, 157, 173, 133, 155, 154, 153, 145, 144, 163, 7],
        "upper": [246, 161, 160, 159, 158, 157, 173],
        "lower": [7, 163, 144, 145, 153, 154, 155],
        "ring": [247, 30, 29, 27, 28, 56, 190],
        "iris": [468, 469, 470, 471, 472],
    },
    "left": {
        "contour": [263, 466, 388, 387, 386, 385, 384, 398, 362, 382, 381, 380, 374, 373, 390, 249],
        "upper": [466, 388, 387, 386, 385, 384, 398],
        "lower": [249, 390, 373, 374, 380, 381, 382],
        "ring": [467, 260, 259, 257, 258, 286, 414],
        "iris": [473, 474, 475, 476, 477],
    },
}
GRID = 120  # vértices por lado do relevo do corpo
MASK = 256  # resolução da máscara (bordas suaves no shader)
BODY_DEPTH = 0.09  # quanto o corpo "infla" a partir da silhueta (unidade = largura da foto)


def b64(arr):
    return base64.b64encode(np.ascontiguousarray(arr).tobytes()).decode()


def read_obj(path):
    verts, faces = [], []
    with open(path, encoding="utf-8") as f:
        for line in f:
            parts = line.split()
            if parts and parts[0] == "v":
                verts.append([float(v) for v in parts[1:4]])
            elif parts and parts[0] == "f":
                faces.append([int(p.split("/")[0]) - 1 for p in parts[1:4]])
    return np.array(verts), np.array(faces)


def umeyama(src, dst):
    ms, md = src.mean(0), dst.mean(0)
    a, b = src - ms, dst - md
    u, sig, vt = np.linalg.svd(a.T @ b)
    dm = np.diag([1, 1, np.sign(np.linalg.det(vt.T @ u.T))])
    r = vt.T @ dm @ u.T
    s = np.trace(np.diag(sig) @ dm) / (a**2).sum()
    t = md - s * r @ ms
    err = np.sqrt((((s * (r @ src.T)).T + t - dst) ** 2).sum(1).mean())
    return r, err


def quat_from_matrix(m):
    w = np.sqrt(max(0.0, 1 + m[0, 0] + m[1, 1] + m[2, 2])) / 2
    x = np.copysign(np.sqrt(max(0.0, 1 + m[0, 0] - m[1, 1] - m[2, 2])) / 2, m[2, 1] - m[1, 2])
    y = np.copysign(np.sqrt(max(0.0, 1 - m[0, 0] + m[1, 1] - m[2, 2])) / 2, m[0, 2] - m[2, 0])
    z = np.copysign(np.sqrt(max(0.0, 1 - m[0, 0] - m[1, 1] + m[2, 2])) / 2, m[1, 0] - m[0, 1])
    return [float(x), float(y), float(z), float(w)]


def vertex_normals(p, faces):
    n = np.zeros_like(p)
    tri = p[faces]
    fn = np.cross(tri[:, 1] - tri[:, 0], tri[:, 2] - tri[:, 0])
    for k in range(3):
        np.add.at(n, faces[:, k], fn)
    return n / np.maximum(np.linalg.norm(n, axis=1, keepdims=True), 1e-9)


def erode_distance(mask):
    """Distância (em células) até a borda da silhueta. A moldura da foto não conta
    como borda (o corpo continua para fora do quadro)."""
    dist = np.zeros(mask.shape)
    cur = mask.copy()
    while cur.any():
        dist[cur] += 1
        nxt = cur.copy()
        nxt[1:, :] &= cur[:-1, :]
        nxt[:-1, :] &= cur[1:, :]
        nxt[:, 1:] &= cur[:, :-1]
        nxt[:, :-1] &= cur[:, 1:]
        if (nxt == cur).all():
            break
        cur = nxt
    return dist


def blur(a, weight, passes=3):
    """Média 3x3 ponderada (não puxa profundidade zero de fora da silhueta)."""
    for _ in range(passes):
        num = np.pad(a * weight, 1, mode="edge")
        den = np.pad(weight, 1, mode="edge")
        s_num = sum(num[1 + dy : num.shape[0] - 1 + dy, 1 + dx : num.shape[1] - 1 + dx] for dy in (-1, 0, 1) for dx in (-1, 0, 1))
        s_den = sum(den[1 + dy : den.shape[0] - 1 + dy, 1 + dx : den.shape[1] - 1 + dx] for dy in (-1, 0, 1) for dx in (-1, 0, 1))
        a = np.where(s_den > 0, s_num / np.maximum(s_den, 1e-9), a)
    return a


def rasterize_face_depth(pts, faces, gx, gy):
    """Profundidade do rosto em cada ponto da grade (NaN fora da malha)."""
    depth = np.full(gx.shape, np.nan)
    for tri in faces:
        a, b, c = pts[tri]
        xs = (min(a[0], b[0], c[0]), max(a[0], b[0], c[0]))
        ys = (min(a[1], b[1], c[1]), max(a[1], b[1], c[1]))
        sel = (gx >= xs[0]) & (gx <= xs[1]) & (gy >= ys[0]) & (gy <= ys[1])
        if not sel.any():
            continue
        px, py = gx[sel], gy[sel]
        den = (b[1] - c[1]) * (a[0] - c[0]) + (c[0] - b[0]) * (a[1] - c[1])
        if abs(den) < 1e-12:
            continue
        w1 = ((b[1] - c[1]) * (px - c[0]) + (c[0] - b[0]) * (py - c[1])) / den
        w2 = ((c[1] - a[1]) * (px - c[0]) + (a[0] - c[0]) * (py - c[1])) / den
        w3 = 1 - w1 - w2
        inside = (w1 >= -1e-6) & (w2 >= -1e-6) & (w3 >= -1e-6)
        z = w1 * a[2] + w2 * b[2] + w3 * c[2]
        cur = depth[sel]
        cur[inside] = np.fmax(cur[inside], z[inside])
        depth[sel] = cur
    return depth


def main(img_path, landmarker_path, segmenter_path, obj_path, out_path):
    img = Image.open(img_path).convert("RGB")
    w, h = img.size
    rgb = np.asarray(img)
    mp_img = mp.Image(image_format=mp.ImageFormat.SRGB, data=rgb)

    # ------------------------------------------------------------- rosto
    lm_opts = vision.FaceLandmarkerOptions(base_options=mp_python.BaseOptions(model_asset_path=landmarker_path), num_faces=1)
    res = vision.FaceLandmarker.create_from_options(lm_opts).detect(mp_img)
    if not res.face_landmarks:
        sys.exit("Nenhum rosto encontrado na foto.")
    lm = np.array([[p.x, p.y, p.z] for p in res.face_landmarks[0]])  # 478 (com íris)
    allp = np.stack([lm[:, 0] - 0.5, (0.5 - lm[:, 1]) * h / w, -lm[:, 2]], axis=1)
    pts = allp[:468]
    uv = np.stack([lm[:468, 0], 1 - lm[:468, 1]], axis=1)

    canon, faces = read_obj(obj_path)
    best = None
    for flip in (1, -1):
        r, err = umeyama(canon * np.array([flip, 1, 1]), pts)
        if best is None or err < best[2]:
            best = (flip, r, err)
    flip, rot, err = best
    print(f"rosto: alinhamento com a malha canônica, erro médio {err:.4f}")
    if flip == -1:
        faces = faces[:, [0, 2, 1]]
    n = vertex_normals(pts, faces)
    if n[:, 2].mean() < 0:
        faces = faces[:, [0, 2, 1]]
        n = -n
    mirror = np.array([int(np.argmin(np.linalg.norm(canon - canon[i] * np.array([-1, 1, 1]), axis=1))) for i in range(len(canon))])
    for i in range(468):
        j = mirror[i]
        if j != i and n[i, 2] < 0.3 and n[j, 2] > n[i, 2] + 0.35:
            uv[i] = uv[j]

    # ------------------------------------------------------- corpo (relevo)
    seg_opts = vision.ImageSegmenterOptions(base_options=mp_python.BaseOptions(model_asset_path=segmenter_path), output_confidence_masks=True)
    seg = vision.ImageSegmenter.create_from_options(seg_opts).segment(mp_img)
    conf = np.squeeze(seg.confidence_masks[-1].numpy_view()).astype(np.float32)  # pessoa
    conf_img = Image.fromarray((np.clip(conf, 0, 1) * 255).astype(np.uint8)).resize((w, h), Image.BILINEAR)
    mask_hi = np.asarray(conf_img.resize((MASK, MASK), Image.BILINEAR))
    grid_mask = np.asarray(conf_img.resize((GRID, GRID), Image.BILINEAR)) > 127
    print(f"recorte: {grid_mask.mean() * 100:.0f}% da foto é a pessoa")

    dist = erode_distance(grid_mask)
    body = BODY_DEPTH * np.sqrt(dist / max(dist.max(), 1))

    gy_img, gx_img = np.mgrid[0:GRID, 0:GRID] / (GRID - 1)
    gx = gx_img - 0.5
    gy = (0.5 - gy_img) * h / w
    face_d = rasterize_face_depth(pts, faces, gx, gy)
    in_face = ~np.isnan(face_d) & grid_mask
    # encaixa o rosto no relevo: mesma profundidade na borda do rosto
    edge = in_face & ~(np.roll(in_face, 1, 0) & np.roll(in_face, -1, 0) & np.roll(in_face, 1, 1) & np.roll(in_face, -1, 1))
    offset = float(np.median(body[edge] - face_d[edge])) if edge.any() else 0.0
    depth = np.where(in_face, face_d + offset, body)
    depth = blur(depth, grid_mask.astype(float), passes=3)
    depth = np.where(grid_mask, depth, 0)
    print(f"relevo: profundidade {depth.min():.3f}..{depth.max():.3f}, rosto deslocado {offset:+.3f}")

    keep = grid_mask.copy()
    keep[1:, :] |= grid_mask[:-1, :]
    keep[:-1, :] |= grid_mask[1:, :]
    keep[:, 1:] |= grid_mask[:, :-1]
    keep[:, :-1] |= grid_mask[:, 1:]

    dmin, dmax = float(depth.min()), float(depth.max())
    q = np.round((depth - dmin) / max(dmax - dmin, 1e-9) * 65535).astype("<u2")

    # --------------------------------------------- pescoço (giro da cabeça)
    chin, forehead = pts[152], pts[10]
    face_h = forehead[1] - chin[1]
    face_w = abs(pts[454][0] - pts[234][0])
    pivot = [float(chin[0]), float(chin[1] - 0.35 * face_h), float(pts[:, 2].mean() + offset - 0.5 * face_w)]

    # ------------------------------------------------------------- olhos
    eyes = {}
    for side, e in EYES.items():
        c = allp[e["iris"][0]]
        r = float(np.mean([np.linalg.norm(allp[k, :2] - c[:2]) for k in e["iris"][1:]]))
        contour_px = [(lm[k, 0] * w, lm[k, 1] * h) for k in e["contour"]]
        poly = Image.new("L", (w, h), 0)
        ImageDraw.Draw(poly).polygon(contour_px, fill=255)
        pm = np.asarray(poly) > 0
        yy, xx = np.mgrid[0:h, 0:w]
        cpx, cpy, rpx = lm[e["iris"][0], 0] * w, lm[e["iris"][0], 1] * h, r * w
        dd = np.hypot(xx - cpx, yy - cpy)
        iris_px = rgb[(dd < rpx * 0.6) & pm]
        sclera_px = rgb[(dd > rpx * 1.15) & pm]
        iris_col = (iris_px.mean(0) / 255).tolist() if len(iris_px) else [0.22, 0.14, 0.09]
        sclera_col = (np.percentile(sclera_px, 70, axis=0) / 255).tolist() if len(sclera_px) > 8 else [0.82, 0.78, 0.74]
        cont = allp[e["contour"]]
        width_px = abs(contour_px[0][0] - contour_px[8][0])
        eye_h = float(np.mean([allp[u, 1] - allp[d, 1] for u, d in zip(e["upper"], e["lower"])]))
        center = cont[:, :2].mean(0)
        # olhar para a câmera: íris centralizada e um pouco para baixo (cabeça erguida, olhar descendo)
        target = [float(center[0]), float(center[1] - 0.18 * eye_h)]
        eyes[side] = {
            **{k: e[k] for k in ("contour", "upper", "lower", "ring")},
            "iris": {"center": [float(c[0]), float(c[1]), float(c[2])], "radius": r, "target": target},
            "irisColor": [round(v, 4) for v in iris_col],
            "scleraColor": [round(v, 4) for v in sclera_col],
            "widthPx": round(width_px, 1),
        }
        print(f"olho {side}: íris r={r:.4f}, largura {width_px:.0f}px, cor íris {np.round(np.array(iris_col) * 255).astype(int).tolist()}")
    wink = max(eyes, key=lambda k: eyes[k]["widthPx"])
    print(f"pisca o olho: {wink}")

    out = {
        "image": {"width": w, "height": h},
        "face": {
            "positions": [round(float(v), 5) for v in pts.flatten()],
            "uvs": [round(float(v), 5) for v in uv.flatten()],
            "indices": [int(v) for v in faces.flatten()],
            "zOffset": round(offset, 5),
        },
        "frontal": [round(v, 5) for v in quat_from_matrix(rot.T)],
        "pivot": [round(v, 5) for v in pivot],
        "relief": {
            "grid": GRID,
            "dmin": dmin,
            "dmax": dmax,
            "depth": b64(q),
            "keep": b64(keep.astype(np.uint8)),
            "maskSize": MASK,
            "mask": b64(mask_hi.astype(np.uint8)),
        },
        "eyes": eyes,
        "wink": wink,
    }
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(out, f, separators=(",", ":"))
    print(f"gravado {out_path}")


if __name__ == "__main__":
    if len(sys.argv) != 6:
        sys.exit(__doc__)
    main(*sys.argv[1:])
