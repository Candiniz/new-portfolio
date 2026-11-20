'use client';

import { useState } from "react";
import { RiArrowDownSLine, RiArrowUpSLine, RiPlayFill } from "react-icons/ri";
import { oswald, roboto } from "../fonts/Fonts";
import { useI18n } from "@/i18n/I18nProvider";

const VIDEOS = ["RG8hZwLe-Qo", "ZdAqeWi1V-o", "dZQvr1dZ1XU", "OlyoeHMPwn4", "fVNZ8wJJk4w", "VK1OKgkkVi0"];

/**
 * Capa do YouTube no lugar do iframe: o player (centenas de KB de JavaScript cada)
 * só carrega quando a pessoa clica em assistir.
 */
function YouTubeFacade({ id, title, playLabel }: { id: string; title: string; playLabel: string }) {
    const [play, setPlay] = useState(false);
    if (play) {
        return (
            <iframe
                src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
            />
        );
    }
    return (
        <button onClick={() => setPlay(true)} aria-label={`${playLabel}: ${title}`} className="group absolute inset-0 w-full h-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
                alt=""
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-11 rounded-xl bg-[#ff0033] text-white text-3xl flex items-center justify-center shadow-lg">
                <RiPlayFill />
            </span>
        </button>
    );
}

export default function Musician() {
    const { t } = useI18n();
    const m = t.about.musician;
    const [showAllVideos, setShowAllVideos] = useState(false);

    return (
        <div className="w-full h-fit mt-20">
            <div className="relative w-full h-72 mb-3 lg:mb-0">
                <div className="absolute inset-0 bg-gradient-to-b from-canvas to-transparent z-[11]" />
                <div data-slide="left" className="bg-clip-text-bar-musician w-full h-full relative z-10" />
            </div>
            <div className="flex justify-center items-center bg-canvas/80">
                <div className="w-full">
                    <div data-slide="right" style={{ transitionDelay: "120ms" }} className="bg-clip-text-bar-musician bg-musician-h w-auto mr-3 mb-1 lg:hidden 2xl:h-28" />
                    <h3
                        className={`${oswald.className} text-transparent text-right lg:text-left font-bold pr-4 bg-clip-text-musician text-4xl md:text-6xl lg:text-7xl xl:text-[6.6vw] 2xl:text-[11rem] 2xl:px-4 ml-3`}
                    >
                        {m.title}
                    </h3>
                    <div data-slide="left" style={{ transitionDelay: "200ms" }} className="bg-clip-text-bar-musician bg-musician-h w-auto mr-3 mt-2 lg:block 2xl:block 2xl:h-10 2xl:mt-4" />
                </div>
                <p className={`${oswald.className} bg-clip-text-musician text-justify lg:px-20 2xl:text-[1.5rem] 2xl:px-5 mr-3`}>
                    {m.p1}
                    <br />
                    {m.p2}
                </p>
            </div>
            <div data-slide="right" className="bg-clip-text-bar-musician h-20 w-full 2xl:block mt-3 mb-4 lg:mb-0" />

            <div id="music-videos" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                {VIDEOS.map((id, index) => (
                    <div className={`video-container ${index >= 2 && !showAllVideos ? "hidden sm:block" : ""}`} key={id}>
                        <YouTubeFacade id={id} title={`${m.videoLabel} ${index + 1}`} playLabel={m.play} />
                    </div>
                ))}
            </div>

            {(
                <div className={`${roboto.className} sm:hidden text-center w-full flex items-center justify-center mt-4`}>
                    <button
                        onClick={() => {
                            setShowAllVideos((v) => !v);
                            document.getElementById("music-videos")?.scrollIntoView({ behavior: "smooth", block: "start" });
                        }}
                        aria-expanded={showAllVideos}
                        className="py-2 px-4 rounded flex flex-col items-center text-fg hover:text-accent-fg transition-colors duration-300"
                    >
                        {showAllVideos ? <RiArrowUpSLine size={30} /> : <RiArrowDownSLine size={30} />}
                        <span className="text-xs mt-1">{showAllVideos ? m.hide : m.showMore}</span>
                    </button>
                </div>
            )}
        </div>
    );
}
