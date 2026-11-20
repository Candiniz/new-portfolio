'use client';

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import fotoPerfil from "../../../photos/portrait.png";
import faceDetail from "./face-detail.png";
import type { FaceEngine, FaceMeshData } from "./faceEngine";

interface Props {
    alt: string;
    badgeValue: string;
    badgeLabel: string;
    hint: string;
    actionLabel: string;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * Dissolve "tecnológico": a foto vira uma grade de blocos que somem de cima para
 * baixo (com ruído), e os blocos na frente da onda acendem em verde.
 * out=true some; out=false reaparece.
 */
function dissolve(canvas: HTMLCanvasElement, img: HTMLImageElement, out: boolean, ms: number) {
    const ctx = canvas.getContext("2d");
    if (!ctx) return Promise.resolve();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const W = (canvas.width = Math.round(canvas.clientWidth * dpr));
    const H = (canvas.height = Math.round(canvas.clientHeight * dpr));
    const cell = Math.max(6, Math.round(W / 34));
    const cols = Math.ceil(W / cell);
    const rows = Math.ceil(H / cell);
    const th = Float32Array.from({ length: cols * rows }, (_, i) => 0.6 * (Math.floor(i / cols) / rows) + 0.4 * Math.random());
    // Com srcset, naturalWidth é a largura "corrigida pela densidade" (ex.: 439) e o bitmap
    // tem outra (ex.: 750): recortar direto da <img> pegava só um canto da foto, ampliado.
    // A foto inteira vai uma vez para um canvas do tamanho final e os blocos saem dele.
    const src = document.createElement("canvas");
    src.width = W;
    src.height = H;
    src.getContext("2d")?.drawImage(img, 0, 0, W, H);
    const start = performance.now();
    return new Promise<void>((resolve) => {
        const frame = () => {
            const p = Math.min(1, (performance.now() - start) / ms) * 1.1 - 0.05;
            ctx.clearRect(0, 0, W, H);
            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    const t = th[r * cols + c];
                    const visible = out ? t > p : t < p;
                    const x = c * cell;
                    const y = r * cell;
                    if (visible) ctx.drawImage(src, x, y, cell, cell, x, y, cell, cell);
                    const d = Math.abs(t - p);
                    if (d < 0.05) {
                        ctx.fillStyle = `rgba(170,221,73,${(1 - d / 0.05) * 0.85})`;
                        ctx.fillRect(x, y, cell - 1, cell - 1);
                    }
                }
            }
            if (p < 1.05) requestAnimationFrame(frame);
            else resolve();
        };
        frame(); // 1º quadro já desenhado: sem um quadro vazio quando o canvas aparece
    });
}

/**
 * Foto do hero com o rosto 3D por trás:
 *  - hover: um "buraco" segue o mouse e mostra a malha 3D em raio-x;
 *  - clique: a foto se dissolve, o rosto vira para a tela, pisca e volta;
 *  - ao abrir a página, a mesma animação roda uma vez sozinha, logo depois de os robôs
 *    terminarem de desenhar a foto (só se ela estiver na tela e sem "reduzir movimento").
 */
export default function PortraitFace({ alt, badgeValue, badgeLabel, hint, actionLabel }: Props) {
    const boxRef = useRef<HTMLDivElement>(null);
    const wrapRef = useRef<HTMLDivElement>(null);
    const glRef = useRef<HTMLCanvasElement>(null);
    const fxRef = useRef<HTMLCanvasElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);
    const engine = useRef<FaceEngine | null>(null);
    const loading = useRef<Promise<void> | null>(null);
    const [ready, setReady] = useState(false);
    const [hover, setHover] = useState(false);
    const [playing, setPlaying] = useState(false);
    const hoverRef = useRef(false);
    const playRef = useRef<() => void>(() => undefined);

    const ensureEngine = useCallback(() => {
        if (loading.current) return loading.current;
        loading.current = (async () => {
            try {
                const [{ createFaceEngine }, mesh] = await Promise.all([import("./faceEngine"), import("./face-mesh.json")]);
                if (!glRef.current) return;
                engine.current = createFaceEngine(glRef.current, mesh.default as unknown as FaceMeshData, faceDetail.src);
                setReady(true);
            } catch {
                // sem WebGL: a foto continua normal
            }
        })();
        return loading.current;
    }, []);

    // Pré-carrega em segundo plano em telas com mouse, depois que a página assentou
    useEffect(() => {
        if (!window.matchMedia("(hover: hover)").matches) return;
        const id = setTimeout(() => ensureEngine(), 4000);
        return () => clearTimeout(id);
    }, [ensureEngine]);

    useEffect(() => () => engine.current?.dispose(), []);

    const onMove = (e: React.PointerEvent) => {
        const el = wrapRef.current;
        if (!el || e.pointerType === "touch") return;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
        engine.current?.setPointer(((e.clientX - r.left) / r.width) * 2 - 1, ((e.clientY - r.top) / r.height) * 2 - 1);
    };

    const onEnter = (e: React.PointerEvent) => {
        if (e.pointerType === "touch") return;
        ensureEngine();
        hoverRef.current = true;
        setHover(true);
        engine.current?.setHover(true);
    };

    const onLeave = () => {
        hoverRef.current = false;
        setHover(false);
        if (!playing) engine.current?.setHover(false);
    };

    const play = async () => {
        if (playing || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        await ensureEngine();
        const eng = engine.current;
        const img = imgRef.current;
        const fx = fxRef.current;
        if (!eng || !img || !fx) return;
        setPlaying(true);
        eng.setHover(true);
        const turning = (async () => {
            await sleep(350);
            await eng.play();
        })();
        await dissolve(fx, img, true, 750);
        await turning;
        await dissolve(fx, img, false, 650);
        setPlaying(false);
        if (!hoverRef.current) eng.setHover(false);
    };

    useEffect(() => {
        playRef.current = play;
    });

    // Animação de abertura: uma vez, quando o robô termina de desenhar a foto
    useEffect(() => {
        const box = boxRef.current;
        if (!box || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
        if (saveData) return;
        let timer: ReturnType<typeof setTimeout> | undefined;
        let done = false;
        const tryStart = () => {
            if (done || box.getAttribute("data-draw-state") !== "done") return;
            done = true;
            mo.disconnect();
            ensureEngine(); // baixa o 3D enquanto a foto assenta
            timer = setTimeout(() => {
                const r = box.getBoundingClientRect();
                const onScreen = r.bottom > 0 && r.top < window.innerHeight;
                if (onScreen && !document.hidden) playRef.current();
            }, 700);
        };
        const mo = new MutationObserver(tryStart);
        mo.observe(box, { attributes: true, attributeFilter: ["data-draw-state"] });
        tryStart();
        return () => {
            mo.disconnect();
            clearTimeout(timer);
        };
    }, [ensureEngine]);

    // Buraco do hover: só com o 3D pronto (antes disso mostraria o fundo vazio)
    const hole = ready && hover && !playing ? "88px" : "1px"; // 0px vira gradiente degenerado e some com a foto

    return (
        // celular: o círculo vai quase de borda a borda (12 px de cada lado da tela).
        // desktop: parte de 440 px e cresce com o espaço livre ao lado do texto, até 620 px ou
        // 64% da altura da tela. É "container" para o selo medir o tamanho pela foto (cqw).
        <div
            ref={boxRef}
            data-draw="box"
            className="relative [container-type:inline-size] w-[calc(100vw-1.5rem)] max-w-[420px] sm:w-3/5 sm:max-w-[320px] xl:w-auto xl:flex-[1_0_440px] xl:max-w-[min(620px,64vh)] shrink-0"
        >
            <div
                ref={wrapRef}
                role="button"
                tabIndex={0}
                aria-label={actionLabel}
                onPointerEnter={onEnter}
                onPointerMove={onMove}
                onPointerLeave={onLeave}
                onFocus={() => ensureEngine()}
                onClick={play}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), play())}
                style={{ ["--hole" as string]: hole }}
                className="face-wrap group relative aspect-square rounded-full overflow-hidden cursor-pointer focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
                {/* palco do 3D: fundo escuro liso, como o de um escaneamento */}
                <div
                    aria-hidden="true"
                    className="absolute inset-0"
                    style={{ background: "radial-gradient(circle at 50% 42%, #262824, #1b1c1a 60%, #121311)" }}
                />
                <canvas ref={glRef} aria-hidden="true" className="absolute inset-0 w-full h-full" />

                <Image
                    ref={imgRef}
                    alt={alt}
                    src={fotoPerfil}
                    priority
                    sizes="(min-width: 1280px) 620px, (min-width: 640px) 320px, 94vw"
                    // sem transição: a foto volta no mesmo quadro em que o canvas do efeito some
                    // (com fade, o 3D aparecia por um instante entre os dois)
                    className={`face-photo relative w-full h-full object-cover ${playing ? "opacity-0" : "opacity-100"}`}
                />
                <canvas
                    ref={fxRef}
                    aria-hidden="true"
                    className={`absolute inset-0 w-full h-full pointer-events-none ${playing ? "opacity-100" : "opacity-0"}`}
                />

                <span
                    aria-hidden="true"
                    className={`absolute top-[34%] right-[6%] bg-black/70 backdrop-blur text-[#aadd49] text-[11px] font-bold px-2.5 py-1 border border-[#aadd49]/40 transition-opacity duration-300 ${
                        playing ? "opacity-0" : "opacity-100 group-hover:opacity-0"
                    }`}
                >
                    {hint}
                </span>
            </div>

            {/* celular: etiqueta numa linha, pendurada embaixo do círculo (só encosta na borda, no terno);
                do tablet em diante: o cartão no canto, como antes */}
            {/* sem digitação: aparece inteiro, crescendo da barra verde para a direita, quando o robô
                termina a foto (.badge-grow em globals.css) */}
            <p
                className="badge-grow relative z-[2] w-fit mx-auto -mt-6 flex items-baseline gap-2.5 px-4 py-2.5 text-sm leading-tight bg-[#787d96] text-white pointer-events-none border-l-4 border-accent sm:absolute sm:-bottom-3 sm:left-0 sm:mt-0 sm:mx-0 sm:block sm:p-4 sm:text-base xl:p-[clamp(1rem,4cqw,1.6rem)] xl:text-[clamp(1rem,3.4cqw,1.35rem)] xl:border-l-[clamp(4px,1cqw,6px)]"
            >
                <span className="text-3xl sm:text-4xl xl:text-[clamp(2.25rem,9cqw,3.6rem)]">{badgeValue}</span>
                <br className="hidden sm:block" />
                {badgeLabel}
            </p>
        </div>
    );
}
