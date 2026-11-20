'use client';

import { useEffect, useRef } from "react";

/*
 * Campo de estrelas do hero em canvas 2D puro (substitui o p5, que custava
 * ~970 KB de JavaScript só para isto). Pausa fora da tela e com a aba oculta,
 * respeita "reduzir movimento" e muda a cor das estrelas com o tema.
 */
interface Star {
    x: number;
    y: number;
    z: number;
}

export default function StarsBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (!canvas || !ctx) return;

        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        let w = 0;
        let h = 0;
        let stars: Star[] = [];
        let raf = 0;
        let visible = true;
        let rgb = "255,255,255";

        const readTheme = () => {
            rgb = document.documentElement.dataset.theme === "light" ? "40,48,30" : "255,255,255";
        };

        const seed = () => {
            const n = w < 640 ? 160 : 320;
            stars = Array.from({ length: n }, () => ({
                x: (Math.random() * 2 - 1) * w,
                y: (Math.random() * 2 - 1) * h,
                z: Math.random() * w,
            }));
        };

        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            w = canvas.clientWidth;
            h = canvas.clientHeight;
            canvas.width = Math.round(w * dpr);
            canvas.height = Math.round(h * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            seed();
        };

        const frame = (move: boolean) => {
            ctx.clearRect(0, 0, w, h);
            const cx = w < 768 ? w / 2 : (w / 4) * 3;
            const cy = h / 2;
            for (const s of stars) {
                if (move) {
                    s.z -= 6;
                    if (s.z < 1) {
                        s.z = w;
                        s.x = (Math.random() * 2 - 1) * w;
                        s.y = (Math.random() * 2 - 1) * h;
                    }
                }
                const k = 1 - s.z / w; // 0 longe → 1 perto
                const sx = cx + (s.x / s.z) * w * 0.5;
                const sy = cy + (s.y / s.z) * h * 0.5;
                if (sx < -10 || sx > w + 10 || sy < -10 || sy > h + 10) continue;
                const r = 0.3 + k * 1.9;
                ctx.beginPath();
                ctx.fillStyle = `rgba(${rgb},${0.08 * k})`;
                ctx.arc(sx, sy, r * 4, 0, Math.PI * 2);
                ctx.fill();
                ctx.beginPath();
                ctx.fillStyle = `rgba(${rgb},${0.25 + 0.75 * k})`;
                ctx.arc(sx, sy, r, 0, Math.PI * 2);
                ctx.fill();
            }
        };

        const loop = () => {
            frame(true);
            raf = requestAnimationFrame(loop);
        };
        const start = () => {
            cancelAnimationFrame(raf);
            if (reduce) frame(false);
            else if (visible && !document.hidden) raf = requestAnimationFrame(loop);
        };

        readTheme();
        resize();
        start();

        const ro = new ResizeObserver(() => {
            resize();
            start();
        });
        ro.observe(canvas);
        const io = new IntersectionObserver(([e]) => {
            visible = e.isIntersecting;
            if (visible) start();
            else cancelAnimationFrame(raf);
        });
        io.observe(canvas);
        const mo = new MutationObserver(() => {
            readTheme();
            if (reduce) frame(false);
        });
        mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
        const onVis = () => start();
        document.addEventListener("visibilitychange", onVis);

        return () => {
            cancelAnimationFrame(raf);
            ro.disconnect();
            io.disconnect();
            mo.disconnect();
            document.removeEventListener("visibilitychange", onVis);
        };
    }, []);

    return <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 w-full h-full pointer-events-none z-[1] animate-fade-in" />;
}
