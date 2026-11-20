/*
 * Modelo 3D do hero (three.js), carregado sob demanda pelo PortraitFace.
 *
 * Estilo WIREFRAME (como um escaneamento 3D): linhas claras sobre fundo escuro, sem
 * nenhuma cor da foto. Dados em face-mesh.json (scripts/face/build_face_mesh.py):
 *   - corpo inteiro visível: relevo (recorte da pessoa + profundidade "inflada" da
 *     silhueta, com a do rosto encaixada) desenhado com linhas verticais e curvas de
 *     nível da profundidade, que contornam os volumes;
 *   - rosto: malha fina de 468 pontos desenhada pelas arestas (pálpebras → piscadela);
 *   - olhos: íris em anel dentro do contorno das pálpebras, para o olhar mudar.
 *
 * Câmera ortográfica nas coordenadas da imagem: em repouso o modelo cai EXATAMENTE em
 * cima da foto (o hover revela o wireframe no mesmo lugar). A cabeça gira pouco em torno
 * do pescoço (o tronco fica parado, por pesos no shader); quem vem até a câmera são os
 * olhos. Pisca um olho só.
 */
import {
    BufferAttribute, BufferGeometry, Color, DataTexture, DoubleSide, Euler, Group, LinearFilter, Matrix3, Matrix4, Mesh,
    MeshBasicMaterial, OrthographicCamera, PlaneGeometry, Quaternion, RedFormat, Scene, ShaderMaterial, Texture, TextureLoader,
    Vector2, Vector3, WebGLRenderer,
} from "three";

type Side = "left" | "right";

interface EyeData {
    contour: number[];
    upper: number[];
    lower: number[];
    ring: number[];
    iris: { center: number[]; radius: number; target: number[] };
}

export interface FaceMeshData {
    image: { width: number; height: number };
    face: { positions: number[]; uvs: number[]; indices: number[]; zOffset: number };
    frontal: number[];
    pivot: number[];
    relief: { grid: number; dmin: number; dmax: number; depth: string; keep: string; maskSize: number; mask: string };
    eyes: Record<Side, EyeData>;
    wink: Side;
    /** juntas do pescoço e da cabeça + peso de cada vértice do relevo (scripts/face/build_rig.py) */
    rig: { neck: number[]; head: number[]; weights: string };
}

export interface FaceEngine {
    setHover(active: boolean): void;
    setPointer(nx: number, ny: number): void;
    /** Olha para a câmera e dá uma piscadela; resolve quando volta à pose da foto. */
    play(): Promise<void>;
    dispose(): void;
}

// Cores do wireframe (o fundo é o mesmo do palco no PortraitFace)
export const WIRE_BG = "#1b1c1a";
// malha um pouco acinzentada; olhos, boca e o brilho da piscadela em branco, para se destacarem
const LINE = new Color("#d3d6cf");
const FEATURE = new Color("#ffffff");

// contorno dos lábios (pontos da malha do rosto), por fora e por dentro
const LIPS = [
    [61, 146, 91, 181, 84, 17, 314, 405, 321, 375, 291, 409, 270, 269, 267, 0, 37, 39, 40, 185],
    [78, 95, 88, 178, 87, 14, 317, 402, 318, 324, 308, 415, 310, 311, 312, 13, 82, 81, 80, 191],
];
const FILL = new Color(WIRE_BG);

const fromB64 = (s: string) => {
    const bin = atob(s);
    const out = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
    return out;
};
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const clamp01 = (t: number) => Math.max(0, Math.min(1, t));

/* ---------------------------------------------------------------- shaders */

const COMMON = /* glsl */ `
uniform vec3 uLine;
uniform vec3 uFill;
uniform vec3 uU;     // eixos da grade (direita e cima do rosto)
uniform vec3 uV;
uniform vec3 uD;     // direção para onde o rosto aponta: de lá vem a "projeção" da grade
uniform float uGain; // exagero da profundidade, para as curvas lerem bem
uniform vec2 uZ;     // faixa de profundidade (perto = mais acesa e mais grossa)
float near(vec3 P) {
    return clamp((P.z - uZ.x) / (uZ.y - uZ.x), 0.0, 1.0);
}
// Linha acesa onde a superfície encara o projetor e apagada onde foge dele; o que está longe
// da câmera escurece (volume sem sombreamento)
vec3 ink(vec3 n, vec3 P, float k) {
    float l = clamp(dot(normalize(n), uD), 0.0, 1.0);
    float b = (0.18 + 0.82 * l) * (0.4 + 0.6 * near(P));
    return mix(uFill, uLine * b, k);
}
float lineAt(float v, float w) {
    float d = abs(fract(v - 0.5) - 0.5) / fwidth(v);
    return 1.0 - smoothstep(w - 0.5, w + 0.5, d);
}
// Grade quadriculada num plano na frente do rosto, projetada ao longo de uD sobre a pele e a
// roupa: cada linha é o corte da superfície por um plano (P·uU = k ou P·uV = k).
float grid(vec3 P) {
    vec3 Q = vec3(P.xy, P.z * uGain);
    float w = 0.3 + 0.25 * near(P); // meia-largura em pixels: fina como o contorno do olho
    return max(lineAt(dot(Q, uU) * 64.0, w), lineAt(dot(Q, uV) * 64.0, w));
}`;

// Duas juntas: o pescoço gira na base (colarinho) e a cabeça gira no topo do pescoço, por cima
// do giro do pescoço. aW = (peso do pescoço, peso da cabeça); ombros e roupa têm peso zero.
const BODY_VERT = /* glsl */ `
attribute vec2 aW;
uniform mat3 uNeckRot;
uniform mat3 uHeadRot;
uniform vec3 uNeckJ;
uniform vec3 uHeadJ;
varying vec2 vUv;
varying vec3 vN;
varying vec3 vP;
void main() {
    vec3 pn = uNeckJ + uNeckRot * (position - uNeckJ);
    vec3 hj = uNeckJ + uNeckRot * (uHeadJ - uNeckJ);
    vec3 ph = hj + uNeckRot * (uHeadRot * (position - uHeadJ));
    vec3 p = mix(mix(position, pn, aW.x), ph, aW.y);
    vUv = uv;
    vP = position;
    vN = normal;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
}`;

const BODY_FRAG = /* glsl */ `
uniform sampler2D uMask;
uniform sampler2D uDetail; // relevo tirado da foto, 0,5 = plano: R dobras (entorta), G gola/lapela (luz)
uniform vec2 uTexel;
uniform float uDetailAmp;  // quanto o relevo fino entorta as linhas
uniform float uBump;       // quanto ele inclina a normal (acende/apaga as linhas)
varying vec2 vUv;
varying vec3 vN;
varying vec3 vP;
${COMMON}
float bumpAt(vec2 uv) {
    vec2 c = texture2D(uDetail, uv).rg * 2.0 - 1.0;
    return c.r * 0.7 + c.g;
}
void main() {
    float m = texture2D(uMask, vec2(vUv.x, 1.0 - vUv.y)).r;
    if (m < 0.5) discard;
    float h = texture2D(uDetail, vUv).r * 2.0 - 1.0;
    float hx = bumpAt(vUv + vec2(uTexel.x, 0.0)) - bumpAt(vUv - vec2(uTexel.x, 0.0));
    float hy = bumpAt(vUv + vec2(0.0, uTexel.y)) - bumpAt(vUv - vec2(0.0, uTexel.y));
    vec3 n = normalize(normalize(vN) + vec3(-hx, -hy, 0.0) * uBump);
    vec3 P = vP + vec3(0.0, 0.0, h * uDetailAmp);
    float k = grid(P);
    // contorno da silhueta: uma linha fina, como as da grade
    k = max(k, 1.0 - smoothstep(0.5, 1.5, abs(m - 0.56) / fwidth(m)));
    gl_FragColor = vec4(ink(n, P, k), 1.0);
    #include <colorspace_fragment>
}`;

const FACE_VERT = /* glsl */ `
uniform vec3 uPivot;
varying vec3 vN;
varying vec3 vP;
void main() {
    vP = position + uPivot; // posição na imagem, antes de a cabeça girar (a grade gruda na pele)
    vN = normal;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;

const FACE_FRAG = /* glsl */ `
uniform float uLift;
varying vec3 vN;
varying vec3 vP;
${COMMON}
void main() {
    vec3 P = vP - vec3(0.0, 0.0, uLift);
    float k = grid(P);
    gl_FragColor = vec4(ink(vN, P, k), 1.0);
    #include <colorspace_fragment>
}`;

const EYE_VERT = /* glsl */ `
attribute float aEdge;
varying vec2 vXY;
varying float vEdge;
void main() {
    vXY = position.xy;
    vEdge = aEdge;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;

// Olho em linha: contorno das pálpebras (fecha na piscadela), íris em anel e pupila cheia
const EYE_FRAG = /* glsl */ `
uniform vec2 uIris;
uniform float uR;
uniform float uSquash; // olho de longe: a íris vira elipse, achatada na horizontal pela perspectiva
uniform float uOpacity;
uniform vec3 uLine;
uniform vec3 uFill;
varying vec2 vXY;
varying float vEdge;
void main() {
    vec2 dd = vXY - uIris;
    dd.x /= uSquash;
    float d = length(dd);
    float w = fwidth(d);
    float ring = 1.0 - smoothstep(w * 0.8, w * 2.0, abs(d - uR * 0.9));
    float pupil = 1.0 - smoothstep(uR * 0.4 - w, uR * 0.4 + w, d);
    float lid = smoothstep(1.0 - fwidth(vEdge) * 2.0, 1.0, vEdge);
    vec3 col = mix(uFill, uLine, max(max(ring, pupil), lid));
    gl_FragColor = vec4(col, uOpacity);
    #include <colorspace_fragment>
}`;

/* ----------------------------------------------------------------- engine */

export function createFaceEngine(canvas: HTMLCanvasElement, data: FaceMeshData, detailUrl?: string): FaceEngine {
    const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "low-power" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    const aspect = data.image.height / data.image.width;
    const camera = new OrthographicCamera(-0.5, 0.5, 0.5 * aspect, -0.5 * aspect, -10, 10);
    const scene = new Scene();
    const neckJ = new Vector3(data.rig.neck[0], data.rig.neck[1], data.rig.neck[2]);
    const headJ = new Vector3(data.rig.head[0], data.rig.head[1], data.rig.head[2]);
    const pivot = headJ; // origem local do rosto, dos olhos e da boca: a junta da cabeça
    // Para onde o rosto aponta (o inverso da rotação que o deixaria de frente): de lá vem a grade
    const facing = new Quaternion(data.frontal[0], data.frontal[1], data.frontal[2], data.frontal[3]).invert();
    const colors = {
        uLine: { value: LINE },
        uFill: { value: FILL },
        uU: { value: new Vector3(1, 0, 0).applyQuaternion(facing) },
        uV: { value: new Vector3(0, 1, 0).applyQuaternion(facing) },
        uD: { value: new Vector3(0, 0, 1).applyQuaternion(facing) },
        uGain: { value: 2.0 },
        uZ: { value: new Vector2(data.relief.dmin, data.relief.dmax) },
    };

    const root = new Group(); // inclinação leve com o mouse
    scene.add(root);
    const neck = new Group(); // gira na base do pescoço
    neck.position.copy(neckJ);
    root.add(neck);
    const head = new Group(); // gira no topo do pescoço, por cima do giro dele
    head.position.copy(headJ).sub(neckJ);
    neck.add(head);

    /* ---------- corpo: relevo em grade fina */
    const { grid, dmin, dmax } = data.relief;
    const depthBytes = fromB64(data.relief.depth);
    const depth = new Uint16Array(depthBytes.buffer, depthBytes.byteOffset, depthBytes.byteLength / 2);
    const keep = fromB64(data.relief.keep);
    const nV = grid * grid;
    const bPos = new Float32Array(nV * 3);
    const bUv = new Float32Array(nV * 2);
    const rigW = fromB64(data.rig.weights);
    const bW = new Float32Array(nV * 2);
    for (let i = 0; i < grid; i++) {
        for (let j = 0; j < grid; j++) {
            const k = i * grid + j;
            const u = j / (grid - 1);
            const y = (0.5 - i / (grid - 1)) * aspect;
            bPos[k * 3] = u - 0.5;
            bPos[k * 3 + 1] = y;
            bPos[k * 3 + 2] = dmin + (depth[k] / 65535) * (dmax - dmin);
            bUv[k * 2] = u;
            bUv[k * 2 + 1] = 1 - i / (grid - 1);
            bW[k * 2] = rigW[k * 2] / 255; // pescoço
            bW[k * 2 + 1] = rigW[k * 2 + 1] / 255; // cabeça
        }
    }
    const bIdx: number[] = [];
    for (let i = 0; i < grid - 1; i++) {
        for (let j = 0; j < grid - 1; j++) {
            const a = i * grid + j;
            const b = a + 1;
            const c = a + grid;
            const d = c + 1;
            if (keep[a] && keep[b] && keep[c] && keep[d]) bIdx.push(a, c, b, b, c, d);
        }
    }
    const bodyGeo = new BufferGeometry();
    bodyGeo.setAttribute("position", new BufferAttribute(bPos, 3));
    bodyGeo.setAttribute("uv", new BufferAttribute(bUv, 2));
    bodyGeo.setAttribute("aW", new BufferAttribute(bW, 2));
    bodyGeo.setIndex(bIdx);
    bodyGeo.computeVertexNormals();
    const maskTex = new DataTexture(fromB64(data.relief.mask), data.relief.maskSize, data.relief.maskSize, RedFormat);
    maskTex.magFilter = LinearFilter;
    maskTex.minFilter = LinearFilter;
    maskTex.needsUpdate = true;
    const flatDetail = new DataTexture(new Uint8Array([128, 128, 128, 255]), 1, 1); // plano, até o mapa chegar
    flatDetail.needsUpdate = true;
    let detailTex: Texture | null = null;
    const neckRot = new Matrix3();
    const headRot = new Matrix3();
    const bodyMat = new ShaderMaterial({
        vertexShader: BODY_VERT,
        fragmentShader: BODY_FRAG,
        uniforms: {
            ...colors,
            uMask: { value: maskTex },
            uNeckRot: { value: neckRot },
            uHeadRot: { value: headRot },
            uNeckJ: { value: neckJ },
            uHeadJ: { value: headJ },
            uDetail: { value: flatDetail as Texture },
            uTexel: { value: new Vector2(1 / 512, 1 / 512) },
            uDetailAmp: { value: 0.016 },
            uBump: { value: 3.0 },
        },
    });
    root.add(new Mesh(bodyGeo, bodyMat));
    if (detailUrl) {
        new TextureLoader().load(detailUrl, (tex) => {
            if (disposed) return tex.dispose();
            tex.magFilter = LinearFilter;
            tex.minFilter = LinearFilter;
            tex.generateMipmaps = false;
            detailTex = tex;
            bodyMat.uniforms.uDetail.value = tex;
            bodyMat.uniforms.uTexel.value.set(1 / tex.image.width, 1 / tex.image.height);
            render();
        });
    }

    /* ---------- rosto: malha fina pelas arestas */
    const fp = data.face.positions;
    const zLift = data.face.zOffset + 0.003; // logo à frente do relevo
    const faceBase = new Float32Array(fp.length);
    for (let i = 0; i < fp.length; i += 3) {
        faceBase[i] = fp[i] - pivot.x;
        faceBase[i + 1] = fp[i + 1] - pivot.y;
        faceBase[i + 2] = fp[i + 2] + zLift - pivot.z;
    }
    const cur = faceBase.slice();
    const faceGeo = new BufferGeometry();
    faceGeo.setAttribute("position", new BufferAttribute(cur, 3));
    faceGeo.setIndex(data.face.indices);
    faceGeo.computeVertexNormals();
    const faceMat = new ShaderMaterial({
        vertexShader: FACE_VERT,
        fragmentShader: FACE_FRAG,
        uniforms: { ...colors, uPivot: { value: pivot }, uLift: { value: 0.003 } },
    });
    head.add(new Mesh(faceGeo, faceMat));

    /* ---------- olhos + pálpebras */
    interface EyeRig {
        geo: BufferGeometry;
        mat: ShaderMaterial;
        rest: Vector2;
        target: Vector2;
        lid: Array<{ i: number; dx: number; dy: number; dz: number }>;
        contour: number[];
    }
    const eyes = {} as Record<Side, EyeRig>;
    const toLocal = (v: number[]) => new Vector2(v[0] - pivot.x, v[1] - pivot.y);
    // Tamanho aparente de cada olho: o de longe sai mais estreito pela perspectiva. A íris dele vira
    // elipse na mesma proporção, e o movimento do olhar é o do olho de perto, na escala do de longe
    // (sem isso o olho de longe andava quase o dobro, em proporção ao tamanho dele).
    const span = (idx: number[]) => {
        const xs = idx.map((i) => cur[i * 3]);
        const ys = idx.map((i) => cur[i * 3 + 1]);
        return { w: Math.max(...xs) - Math.min(...xs), h: Math.max(...ys) - Math.min(...ys) };
    };
    const sizes = { left: span(data.eyes.left.contour), right: span(data.eyes.right.contour) };
    const nearSide: Side = sizes.left.w >= sizes.right.w ? "left" : "right";
    const near = sizes[nearSide];
    const nearShift = toLocal(data.eyes[nearSide].iris.target).sub(toLocal(data.eyes[nearSide].iris.center));
    for (const side of ["left", "right"] as Side[]) {
        const e = data.eyes[side];
        const sz = sizes[side];
        const squash = Math.min(1, Math.max(0.35, sz.w / near.w));
        const rest = toLocal(e.iris.center);
        const target =
            side === nearSide ? toLocal(e.iris.target) : rest.clone().add(new Vector2(nearShift.x * (sz.w / near.w), nearShift.y * (sz.h / near.h)));
        const lid: EyeRig["lid"] = [];
        e.upper.forEach((u, j) => {
            const d = e.lower[j];
            const v = [cur[d * 3] - cur[u * 3], cur[d * 3 + 1] - cur[u * 3 + 1], cur[d * 3 + 2] - cur[u * 3 + 2]];
            lid.push({ i: u, dx: v[0] * 0.96, dy: v[1] * 0.96, dz: v[2] * 0.96 });
            if (e.ring[j] !== undefined) lid.push({ i: e.ring[j], dx: v[0] * 0.35, dy: v[1] * 0.35, dz: v[2] * 0.35 });
        });

        const n = e.contour.length;
        const geo = new BufferGeometry();
        geo.setAttribute("position", new BufferAttribute(new Float32Array((n + 1) * 3), 3));
        geo.setAttribute("aEdge", new BufferAttribute(Float32Array.from({ length: n + 1 }, (_, j) => (j ? 1 : 0)), 1));
        const idx: number[] = [];
        for (let j = 1; j <= n; j++) idx.push(0, j, (j % n) + 1);
        geo.setIndex(idx);
        const mat = new ShaderMaterial({
            vertexShader: EYE_VERT,
            fragmentShader: EYE_FRAG,
            transparent: true,
            depthWrite: false,
            depthTest: false, // o olho de longe ficava escondido atrás da própria malha, perto do nariz
            side: DoubleSide, // o contorno do olho direito gira ao contrário (espelhado): sem isso, sumia
            uniforms: {
                uIris: { value: rest.clone() },
                uR: { value: e.iris.radius },
                uSquash: { value: squash },
                uOpacity: { value: 0 },
                uLine: { value: FEATURE },
                uFill: { value: FILL },
            },
        });
        const mesh = new Mesh(geo, mat);
        mesh.renderOrder = 2;
        head.add(mesh);
        eyes[side] = { geo, mat, rest, target, lid, contour: e.contour };
    }

    /** Fecha cada pálpebra de 0 (aberta) a 1 (fechada) e atualiza rosto + olhos. */
    const setLids = (amount: Record<Side, number>) => {
        cur.set(faceBase);
        for (const side of ["left", "right"] as Side[]) {
            for (const l of eyes[side].lid) {
                cur[l.i * 3] += l.dx * amount[side];
                cur[l.i * 3 + 1] += l.dy * amount[side];
                cur[l.i * 3 + 2] += l.dz * amount[side];
            }
        }
        for (const side of ["left", "right"] as Side[]) {
            const rig = eyes[side];
            const arr = rig.geo.attributes.position.array as Float32Array;
            let cx = 0;
            let cy = 0;
            let cz = 0;
            rig.contour.forEach((i, j) => {
                arr[(j + 1) * 3] = cur[i * 3];
                arr[(j + 1) * 3 + 1] = cur[i * 3 + 1];
                arr[(j + 1) * 3 + 2] = cur[i * 3 + 2] + 0.0015;
                cx += cur[i * 3];
                cy += cur[i * 3 + 1];
                cz += cur[i * 3 + 2];
            });
            const n = rig.contour.length;
            arr[0] = cx / n;
            arr[1] = cy / n;
            arr[2] = cz / n + 0.0015;
            rig.geo.attributes.position.needsUpdate = true;
        }
        faceGeo.attributes.position.needsUpdate = true;
    };
    setLids({ left: 0, right: 0 });

    /* ---------- boca: contorno dos lábios em fita fina e branca */
    const featureMat = new MeshBasicMaterial({ color: FEATURE, side: DoubleSide, polygonOffset: true, polygonOffsetFactor: -3, polygonOffsetUnits: -3 });
    const lipGeos: BufferGeometry[] = [];
    for (const loop of LIPS) {
        const half = 0.0008; // meia-largura da fita (unidades da imagem)
        const pos: number[] = [];
        const idx: number[] = [];
        const n = loop.length;
        loop.forEach((i, j) => {
            const a = loop[(j - 1 + n) % n];
            const b = loop[(j + 1) % n];
            let nx = -(cur[b * 3 + 1] - cur[a * 3 + 1]);
            let ny = cur[b * 3] - cur[a * 3];
            const len = Math.hypot(nx, ny) || 1;
            nx /= len;
            ny /= len;
            const x = cur[i * 3];
            const y = cur[i * 3 + 1];
            const z = cur[i * 3 + 2] + 0.002;
            pos.push(x + nx * half, y + ny * half, z, x - nx * half, y - ny * half, z);
            const k = j * 2;
            const k2 = ((j + 1) % n) * 2;
            idx.push(k, k + 1, k2, k + 1, k2 + 1, k2);
        });
        const g = new BufferGeometry();
        g.setAttribute("position", new BufferAttribute(new Float32Array(pos), 3));
        g.setIndex(idx);
        lipGeos.push(g);
        const m = new Mesh(g, featureMat);
        m.renderOrder = 2;
        head.add(m);
    }

    /* ---------- brilho discreto no canto do olho que pisca */
    const sparkleMat = new ShaderMaterial({
        transparent: true,
        depthTest: false,
        depthWrite: false,
        uniforms: { uOpacity: { value: 0 }, uColor: { value: FEATURE } },
        vertexShader: /* glsl */ `
varying vec2 vP;
void main() {
    vP = position.xy * 2.0;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`,
        fragmentShader: /* glsl */ `
uniform float uOpacity;
uniform vec3 uColor;
varying vec2 vP;
void main() {
    float r = length(vP);
    float fade = 1.0 - smoothstep(0.15, 1.0, r);
    float rays = max(1.0 - smoothstep(0.0, 0.05, abs(vP.x)), 1.0 - smoothstep(0.0, 0.05, abs(vP.y))) * fade;
    float core = exp(-r * r * 30.0);
    float a = clamp(rays * 0.85 + core, 0.0, 1.0) * uOpacity;
    gl_FragColor = vec4(uColor, a);
    #include <colorspace_fragment>
}`,
    });
    const sparkleGeo = new PlaneGeometry(1, 1);
    const sparkle = new Mesh(sparkleGeo, sparkleMat);
    sparkle.renderOrder = 3;
    {
        const c = data.eyes[data.wink].contour;
        let cx = 0;
        let cy = 0;
        c.forEach((i) => {
            cx += cur[i * 3] / c.length;
            cy += cur[i * 3 + 1] / c.length;
        });
        const ox = cur[c[0] * 3]; // canto de fora do olho
        const oy = cur[c[0] * 3 + 1];
        const eyeW = Math.hypot(ox - cur[c[8] * 3], oy - cur[c[8] * 3 + 1]);
        const dx = (ox - cx) / (Math.hypot(ox - cx, oy - cy) || 1);
        sparkle.position.set(ox + dx * eyeW * 0.35, oy + eyeW * 0.3, cur[c[0] * 3 + 2] + 0.01);
        sparkle.userData.size = eyeW * 2.2;
        sparkle.scale.setScalar(0.0001);
    }
    head.add(sparkle);
    const setSparkle = (t: number) => {
        const s = clamp01((t - 0.2) / 0.6);
        const amp = Math.sin(Math.PI * s);
        sparkleMat.uniforms.uOpacity.value = 0.8 * amp;
        sparkle.scale.setScalar(Math.max(0.0001, sparkle.userData.size * (0.6 + 0.4 * s)));
        sparkle.rotation.z = s * 0.6;
    };

    /* ---------- pose */
    const frontal = new Quaternion(data.frontal[0], data.frontal[1], data.frontal[2], data.frontal[3]);
    const yaw = new Euler().setFromQuaternion(frontal, "YXZ").y;
    // o olhar vai até a câmera; o corpo mal se mexe: um pouco na direção dela, levemente erguido.
    // O giro é dividido: o pescoço faz 45% (e puxa), a cabeça os outros 55% (e chega depois).
    const LOOK = { pitch: -0.035, yaw: yaw * 0.2 };
    const identity = new Quaternion();
    const qNeck = new Quaternion();
    const qHead = new Quaternion();
    const eul = new Euler(0, 0, 0, "YXZ");
    const parallax = new Quaternion();
    const target = new Euler();
    const m4 = new Matrix4();

    const setRig = (qn: Quaternion, qh: Quaternion) => {
        neck.quaternion.copy(qn);
        head.quaternion.copy(qh);
        neckRot.setFromMatrix4(m4.makeRotationFromQuaternion(qn));
        headRot.setFromMatrix4(m4.makeRotationFromQuaternion(qh));
    };
    const setGaze = (g: number, opacity: number) => {
        for (const side of ["left", "right"] as Side[]) {
            const rig = eyes[side];
            (rig.mat.uniforms.uIris.value as Vector2).lerpVectors(rig.rest, rig.target, g);
            rig.mat.uniforms.uOpacity.value = opacity;
        }
    };

    let hover = false;
    let playing = false;
    let raf = 0;
    let disposed = false;
    const pointer = { x: 0, y: 0 };

    const resize = () => {
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        if (w && h) renderer.setSize(w, h, false);
    };
    function render() {
        if (!disposed) renderer.render(scene, camera);
    }
    resize();
    render();
    const ro = new ResizeObserver(() => {
        resize();
        render();
    });
    ro.observe(canvas);

    const loop = () => {
        raf = 0;
        target.set((-pointer.y * Math.PI) / 70, (pointer.x * Math.PI) / 55, 0);
        parallax.setFromEuler(target);
        root.quaternion.slerp(hover && !playing ? parallax : identity, 0.1);
        render();
        if (hover || playing || root.quaternion.angleTo(identity) > 0.001) raf = requestAnimationFrame(loop);
    };
    const kick = () => {
        if (!raf && !disposed) raf = requestAnimationFrame(loop);
    };

    const tween = (ms: number, step: (t: number) => void) =>
        new Promise<void>((resolve) => {
            const start = performance.now();
            const tick = () => {
                if (disposed) return resolve();
                const t = clamp01((performance.now() - start) / ms);
                step(t);
                if (t < 1) requestAnimationFrame(tick);
                else resolve();
            };
            requestAnimationFrame(tick);
        });

    const wink = data.wink;
    const other: Side = wink === "left" ? "right" : "left";
    /** neckAmt/headAmt: fração do giro de cada junta (a cabeça pode passar de 1: leve sobra) */
    const pose = (gaze: number, winkAmt: number, neckAmt: number, headAmt: number, extra = { neckNod: 0, nod: 0, roll: 0 }) => {
        setGaze(gaze, 1);
        setLids({ [wink]: winkAmt, [other]: winkAmt * 0.16 } as Record<Side, number>);
        qNeck.setFromEuler(eul.set(LOOK.pitch * 0.3 * neckAmt + extra.neckNod, LOOK.yaw * 0.45 * neckAmt, 0));
        qHead.setFromEuler(eul.set(LOOK.pitch * 0.7 * headAmt + extra.nod, LOOK.yaw * 0.55 * headAmt, extra.roll));
        setRig(qNeck, qHead);
    };
    // sai rápido e passa um pouco do alvo antes de assentar (cabeça "chegando" depois do pescoço)
    const backOut = (t: number) => 1 + 2.2 * Math.pow(t - 1, 3) + 1.2 * Math.pow(t - 1, 2);
    pose(0, 0, 0, 0);
    render();

    const engine: FaceEngine = {
        setHover(active) {
            hover = active;
            kick();
        },
        setPointer(nx, ny) {
            pointer.x = nx;
            pointer.y = ny;
            if (hover) kick();
        },
        async play() {
            if (playing) return;
            playing = true;
            kick();
            const rest = { neckNod: 0, nod: 0, roll: 0 };
            // 1) o pescoço puxa o movimento (com um leve arco para a frente) e a cabeça vem logo
            //    atrás, passando um pouco do ponto; os olhos descem até a câmera
            await tween(1000, (t) => {
                const n = clamp01(t / 0.8);
                pose(ease(clamp01((t - 0.1) / 0.9)), 0, ease(n), backOut(clamp01((t - 0.15) / 0.85)), {
                    neckNod: 0.02 * Math.sin(Math.PI * n),
                    nod: 0,
                    roll: 0,
                });
            });
            await tween(250, () => undefined);
            // 2) piscadela: SÓ a cabeça se mexe (inclina e acena de leve); pescoço e ombros parados
            await tween(620, (t) => {
                const close = t < 0.3 ? ease(t / 0.3) : t < 0.55 ? 1 : 1 - ease((t - 0.55) / 0.45);
                const s = Math.sin(t * Math.PI);
                pose(1, close, 1, 1, { neckNod: 0, nod: 0.012 * s, roll: -0.03 * s });
                setSparkle(t);
            });
            setSparkle(0);
            await tween(700, () => undefined);
            // 3) volta: a cabeça desfaz primeiro e o pescoço acompanha com atraso
            await tween(1000, (t) =>
                pose(1 - ease(clamp01(t / 0.85)), 0, 1 - ease(clamp01((t - 0.2) / 0.8)), 1 - ease(clamp01(t / 0.8)), rest),
            );
            pose(0, 0, 0, 0);
            playing = false;
            kick();
        },
        dispose() {
            disposed = true;
            cancelAnimationFrame(raf);
            ro.disconnect();
            bodyGeo.dispose();
            faceGeo.dispose();
            bodyMat.dispose();
            faceMat.dispose();
            maskTex.dispose();
            flatDetail.dispose();
            detailTex?.dispose();
            lipGeos.forEach((g) => g.dispose());
            featureMat.dispose();
            sparkleGeo.dispose();
            sparkleMat.dispose();
            for (const side of ["left", "right"] as Side[]) {
                eyes[side].geo.dispose();
                eyes[side].mat.dispose();
            }
            renderer.dispose();
        },
    };

    // depuração em desenvolvimento: congelar uma pose e tirar retrato em alta resolução
    if (process.env.NODE_ENV !== "production") {
        (window as unknown as { __face?: unknown }).__face = {
            pose(gaze: number, winkAmt: number, headAmt: number, sparkleT = 0, neckAmt = headAmt, roll = 0) {
                pose(gaze, winkAmt, neckAmt, headAmt, { neckNod: 0, nod: 0, roll });
                setSparkle(sparkleT);
                render();
            },
            shot() {
                renderer.setPixelRatio(1);
                renderer.setSize(1024, 1024, false);
                render();
                const url = canvas.toDataURL("image/png");
                renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
                resize();
                render();
                return url;
            },
        };
    }
    return engine;
}
