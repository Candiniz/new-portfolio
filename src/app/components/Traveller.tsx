'use client';

import Image from "next/image";
import { oswald, roboto } from "../fonts/Fonts";
import { useI18n } from "@/i18n/I18nProvider";
import EnglishSeal from "./EnglishSeal";

// Países do intercâmbio, na ordem em que aparecem na linha (a Irlanda é a base)
const FLAGS = [
    ["br", "/br.png"],
    ["ie", "/ir.png"],
    ["en", "/en.png"],
    ["sc", "/sc.png"],
    ["ma", "/mc.png"],
    ["fr", "/fr.png"],
    ["it", "/it.png"],
] as const;
const BASE = "ie";

/**
 * Backpacker & Traveller: o texto e o título com as barras que deslizam (como antes) e, embaixo,
 * uma faixa de ponta a ponta com a linha fina dos países do intercâmbio e o selo de inglês C1.
 * (O feed do Instagram saiu: a viagem fica contada aqui, sem depender da API do Meta.)
 */
export const Traveller: React.FC = () => {
    const { t } = useI18n();
    const tr = t.about.traveller;

    return (
        <div className="w-full h-fit mt-20">
            <div className="relative w-full h-72 lg:mb-0">
                <div className="absolute inset-0 bg-gradient-to-b from-canvas to-transparent z-[11]" />
                <div data-slide="left" className="bg-clip-text-bar-traveller w-full h-full relative z-10" />
            </div>

            <div className="flex lg:flex-row justify-center items-center bg-canvas/80">
                <p className={`${oswald.className} bg-clip-text-traveller text-justify lg:px-20 2xl:text-[1.5rem] xl:px-5 ml-3`}>
                    {tr.text}
                </p>
                <div className="w-full">
                    <div data-slide="right" style={{ transitionDelay: "120ms" }} className="bg-clip-text-bar-traveller bg-traveller-h w-auto ml-3 mt-3 2xl:h-28" />
                    <h3
                        className={`${oswald.className} text-transparent text-left lg:text-center 2xl:text-left font-bold pl-3 bg-clip-text-traveller text-4xl md:text-6xl lg:text-7xl xl:text-[6.6vw] 2xl:text-[11rem] 2xl:px-4 mr-3`}
                    >
                        {tr.title}
                    </h3>
                    <div data-slide="left" style={{ transitionDelay: "200ms" }} className="bg-clip-text-bar-traveller bg-traveller-h w-auto ml-3 mt-2 lg:block 2xl:block 2xl:h-10 2xl:mt-4" />
                </div>
            </div>
            <div data-slide="right" className="bg-clip-text-bar-traveller h-20 w-full 2xl:block mt-3 lg:mb-0" />

            {/* faixa do intercâmbio: linha do tempo dos países + selo C1 */}
            <div className="bg-surface mt-1 px-6 sm:px-10 lg:px-16 xl:px-24 py-12 grid lg:grid-cols-[1fr_auto] gap-12 items-center">
                <div className="min-w-0">
                    <p className={`${roboto.className} text-sm font-bold tracking-widest uppercase text-accent-fg`}>_{tr.timelineTitle}</p>
                    <p className="text-muted text-sm mt-2 max-w-xl">{tr.timelineText}</p>

                    <ol className="relative mt-10 flex justify-between">
                        {/* a rota: fina, atrás das bandeiras, desenhada pelos robôs */}
                        <span data-draw="line" aria-hidden="true" className="absolute left-[4%] right-[4%] top-6 h-px bg-line" />
                        {FLAGS.map(([key, src]) => {
                            const base = key === BASE;
                            return (
                                <li key={key} data-draw="box" className="relative flex-1 min-w-0 flex flex-col items-center text-center">
                                    <span className="h-12 flex items-center">
                                        <span
                                            className={`block overflow-hidden rounded-full bg-canvas transition-transform duration-300 hover:scale-125 ${
                                                base ? "w-12 h-12 ring-2 ring-accent ring-offset-2 ring-offset-surface" : "w-7 h-7 sm:w-8 sm:h-8 ring-2 ring-surface"
                                            }`}
                                        >
                                            <Image src={src} alt={tr.flags[key]} width={48} height={48} className="w-full h-full object-cover" />
                                        </span>
                                    </span>
                                    <span className={`${roboto.className} mt-2 text-[10px] sm:text-xs font-bold text-fg truncate max-w-full`}>{tr.countryNames[key]}</span>
                                    {base && <span className="mt-0.5 text-[10px] sm:text-xs text-accent-fg leading-tight">{tr.base}</span>}
                                </li>
                            );
                        })}
                    </ol>
                </div>

                <EnglishSeal
                    ring={tr.seal.ring}
                    level={tr.seal.level}
                    label={tr.seal.label}
                    title={tr.seal.title}
                    text={tr.seal.text}
                    alt={tr.seal.alt}
                />
            </div>
        </div>
    );
};

export default Traveller;
