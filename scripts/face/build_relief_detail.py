"""
Mapa de relevo fino da roupa e do cabelo (dobras do terno, gola, lapela), tirado da própria foto.

O relevo do face-mesh.json vem da silhueta "inflada": dá o volume do corpo, mas é liso. Os
detalhes (dobra, costura, borda da gola) aparecem na foto como pequenas variações de luz. Aqui
eles viram uma altura: o shader do modelo usa esse mapa para entortar as linhas da grade e para
acender ou apagar cada linha (sem deixar a malha mais pesada).

Como:
  1. luminância da foto, com o contraste local realçado (CLAHE), porque o terno é quase preto,
     e sem o grão que o realce traz (denoise que preserva borda);
  2. passa-banda em duas escalas: fina (gola, lapela, costuras) e larga (dobras da manga). A fina
     começa acima do xadrez da camisa, para o tecido não virar ruído;
  3. cada escala é normalizada pelo desvio local, para o terno escuro e a camisa clara pesarem igual;
  4. fora da pessoa (máscara do face-mesh.json) a altura é neutra.

Saída: PNG 512 × 512 com dois canais, 128 = zero (claro = saliente, escuro = vinco):
  R = escala larga (dobras), suavizada: é o que ENTORTA as linhas da grade;
  G = escala fina (gola, lapela, costuras): só ACENDE/APAGA as linhas (entortar com ela
      deixava as linhas serrilhadas).

Requisitos (fora do repositório): pip install opencv-python numpy pillow
Uso:
  python scripts/face/build_relief_detail.py src/photos/portrait.png src/app/components/Portrait/face-mesh.json src/app/components/Portrait/face-detail.png
"""

import base64
import json
import sys

import cv2
import numpy as np
from PIL import Image

OUT = 512


def band(img, s_small, s_large):
    a = cv2.GaussianBlur(img, (0, 0), s_small)
    b = cv2.GaussianBlur(img, (0, 0), s_large)
    d = a - b
    # normaliza pelo desvio local: o detalhe do terno escuro pesa igual ao da camisa clara
    # (com piso: em área lisa, dividir por quase zero só amplificaria o grão da foto)
    std = np.sqrt(cv2.GaussianBlur(d * d, (0, 0), s_large * 1.5)) + 0.015
    return d / std


def main(photo_path, mesh_path, out_path):
    rgb = np.asarray(Image.open(photo_path).convert("RGB")).astype(np.float32) / 255.0
    lum = (0.2126 * rgb[..., 0] + 0.7152 * rgb[..., 1] + 0.0722 * rgb[..., 2]).astype(np.float32)
    size = lum.shape[0]

    clahe = cv2.createCLAHE(clipLimit=3.0, tileGridSize=(8, 8))
    eq8 = clahe.apply((lum * 255).astype(np.uint8))
    # tira o grão (o CLAHE o realça no terno escuro) sem borrar as bordas da gola e da lapela
    eq8 = cv2.fastNlMeansDenoising(eq8, None, h=14, templateWindowSize=7, searchWindowSize=21)
    eq = eq8.astype(np.float32) / 255.0

    fine = band(eq, 3.0, 10.0)  # gola, lapela, costuras
    broad = cv2.GaussianBlur(band(eq, 7.0, 34.0), (0, 0), 3.0)  # dobras da manga e do peito

    data = json.load(open(mesh_path, encoding="utf-8"))
    m = data["relief"]["maskSize"]
    mask = np.frombuffer(base64.b64decode(data["relief"]["mask"]), dtype=np.uint8).reshape(m, m).astype(np.float32) / 255.0
    mask = cv2.resize(mask, (size, size), interpolation=cv2.INTER_LINEAR)
    # encolhe um pouco a máscara: na borda da silhueta a luz do fundo viraria um degrau falso
    mask = cv2.erode(mask, np.ones((9, 9), np.uint8))
    mask = cv2.GaussianBlur(mask, (0, 0), 4)

    def canal(x):
        x = np.clip(x / 2.5, -1.0, 1.0) * mask
        x = cv2.resize(x, (OUT, OUT), interpolation=cv2.INTER_AREA)
        return np.clip(np.round(128 + x * 127), 0, 255).astype(np.uint8), x

    r, hr = canal(broad)
    g, hg = canal(fine)
    img = np.dstack([r, g, np.full_like(r, 128)])
    Image.fromarray(img, mode="RGB").save(out_path, optimize=True)
    print(f"gravado {out_path} ({OUT}x{OUT}): desvio larga {hr.std():.3f}, fina {hg.std():.3f}")


if __name__ == "__main__":
    if len(sys.argv) != 4:
        sys.exit(__doc__)
    main(*sys.argv[1:])
