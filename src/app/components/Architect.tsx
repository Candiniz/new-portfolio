'use client';

import { oswald } from "../fonts/Fonts";
import { useI18n } from "@/i18n/I18nProvider";
import ArchitectCarousel from "./ArchitectCarousel";

export default function Architect() {
    const { t } = useI18n();
    const a = t.about.architect;
    return (
        <div className="w-full h-fit mt-20">
            <div className="relative w-full h-72 mb-3">
                <div className="absolute inset-0 bg-gradient-to-b from-canvas to-transparent z-[11]" />
                <div data-slide="right" className="bg-clip-text-bar-architect w-full h-full relative z-10" />
            </div>
            <div className="flex justify-center items-center bg-canvas/80">
                <div className="w-full">
                    <div data-slide="left" style={{ transitionDelay: "120ms" }} className="bg-clip-text-bar-architect bg-architect-h w-auto mr-3 mb-1 2xl:h-28" />
                    <h3
                        className={`${oswald.className} text-transparent text-right lg:text-left font-bold pr-4 bg-clip-text-architect text-4xl md:text-6xl lg:text-7xl xl:text-[6.6vw] 2xl:text-[11rem] 2xl:px-4 ml-3`}
                    >
                        <span className="text-4xl md:text-6xl lg:text-7xl xl:text-[6.6vw] 2xl:text-[10.2rem] text-nowrap">{a.title1}</span>
                        <br />
                        {a.title2}
                    </h3>
                    <div data-slide="right" style={{ transitionDelay: "200ms" }} className="bg-clip-text-bar-architect bg-architect-h w-auto mr-3 mt-2 lg:block 2xl:block 2xl:h-10 2xl:mt-4" />
                </div>
                <p className={`${oswald.className} bg-clip-text-architect text-justify 2xl:text-[1.5rem] mr-3`}>
                    {a.text}
                </p>
            </div>
            <div data-slide="left" className="bg-clip-text-bar-architect h-20 w-full 2xl:block mt-3 mb-4 lg:mb-0" />
            <ArchitectCarousel />
        </div>
    );
}
