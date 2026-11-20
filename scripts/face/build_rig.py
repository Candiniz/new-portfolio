"""
Rig do modelo 3D: pescoço e cabeça como juntas separadas, com os ombros parados.

Antes, tudo o que estava acima de uma linha horizontal no pescoço girava com a cabeça, e o topo
do ombro direito (que na foto sobe até a altura da mandíbula) era arrastado junto. Aqui o peso de
cada vértice do relevo é limitado à COLUNA do pescoço, medida linha a linha na silhueta:

  - junta do pescoço: no colarinho, na altura em que o ombro encosta no pescoço;
  - junta da cabeça: no topo do pescoço, logo abaixo da mandíbula (segue o pescoço);
  - peso do pescoço: 0 no colarinho → 1 no topo, só dentro da coluna do pescoço;
  - peso da cabeça: 0 → 1 entre o queixo e a mandíbula; abaixo do topo do ombro, só na coluna.

Grava em face-mesh.json a chave "rig": {"neck": [x,y,z], "head": [x,y,z], "weights": b64}, com
2 bytes por vértice da grade do relevo (pescoço, cabeça; 0–255).

Unidade e eixos iguais aos do face-mesh.json (largura da foto; x à direita, y para cima).
Uso: python scripts/face/build_rig.py src/app/components/Portrait/face-mesh.json
"""

import base64
import json
import sys

import numpy as np

JAW = [172, 136, 397, 365]  # cantos e base da mandíbula (MediaPipe)
CHIN = 152


def smooth(a, b, x):
    t = np.clip((x - a) / (b - a), 0.0, 1.0)
    return t * t * (3 - 2 * t)


def main(mesh_path):
    d = json.load(open(mesh_path, encoding="utf-8"))
    P = np.array(d["face"]["positions"]).reshape(-1, 3)
    m = d["relief"]["maskSize"]
    mask = np.frombuffer(base64.b64decode(d["relief"]["mask"]), dtype=np.uint8).reshape(m, m) > 127
    aspect = d["image"]["height"] / d["image"]["width"]
    zj = d["pivot"][2]

    chin_y = P[CHIN, 1]
    jaw_y = P[JAW, 1].mean()

    def segs(y):
        row = int(round((0.5 - y / aspect) * (m - 1)))
        xs = np.where(mask[row])[0]
        if not len(xs):
            return []
        parts = np.split(xs, np.where(np.diff(xs) > 1)[0] + 1)
        return [(p[0] / (m - 1) - 0.5, p[-1] / (m - 1) - 0.5) for p in parts if len(p) > 1]

    # centro do pescoço logo abaixo do queixo: o segmento da silhueta que contém o queixo
    neck_x0 = P[CHIN, 0] * 0.5 + P[JAW, 0].mean() * 0.5

    def neck_seg(y):
        best = None
        for a, b in segs(y):
            if a - 0.02 <= neck_x0 <= b + 0.02 or best is None:
                best = (a, b)
        return best

    # colarinho: descendo do queixo, a 1ª linha em que o segmento do pescoço "engorda" de vez
    # (o ombro encostou nele)
    ys = np.arange(chin_y, chin_y - 0.20, -0.005)
    ref = neck_seg(chin_y - 0.02)
    collar_y = ys[-1]
    for y in ys:
        a, b = neck_seg(y)
        if b - a > (ref[1] - ref[0]) * 1.6:
            collar_y = y + 0.01
            break
    top = neck_seg(collar_y + 0.015)  # largura do pescoço logo acima do colarinho
    shoulder_top = collar_y + 0.05  # acima disso a silhueta é só cabeça

    neck = [float((top[0] + top[1]) / 2), float(collar_y - 0.005), zj]
    head = [float((top[0] + top[1]) / 2), float(chin_y + (jaw_y - chin_y) * 0.6), zj]

    g = d["relief"]["grid"]
    j, i = np.meshgrid(np.arange(g), np.arange(g))
    x = j / (g - 1) - 0.5
    y = (0.5 - i / (g - 1)) * aspect

    # coluna do pescoço (borda macia); acima do topo do ombro, tudo é cabeça
    left = smooth(top[0] - 0.08, top[0] - 0.04, x)
    right = 1 - smooth(top[1] + 0.005, top[1] + 0.035, x)
    column = left * np.maximum(right, smooth(shoulder_top - 0.01, shoulder_top + 0.01, y))

    w_neck = smooth(collar_y - 0.015, collar_y + 0.03, y) * column
    w_head = smooth(chin_y - 0.015, jaw_y + 0.005, y) * column

    weights = np.dstack([w_neck, w_head]).reshape(-1, 2)
    d["rig"] = {
        "neck": [round(v, 5) for v in neck],
        "head": [round(v, 5) for v in head],
        "weights": base64.b64encode(np.round(weights * 255).astype(np.uint8).tobytes()).decode(),
    }
    with open(mesh_path, "w", encoding="utf-8") as f:
        json.dump(d, f, separators=(",", ":"))
    print(f"queixo y={chin_y:.3f}  mandíbula y={jaw_y:.3f}  colarinho y={collar_y:.3f}  topo do ombro y={shoulder_top:.3f}")
    print(f"pescoço x=[{top[0]:+.3f},{top[1]:+.3f}]  junta pescoço {np.round(neck, 3)}  junta cabeça {np.round(head, 3)}")


if __name__ == "__main__":
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    main(sys.argv[1])
