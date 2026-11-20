'use client';

import { roboto } from "../fonts/Fonts";

/**
 * Título de seção padrão: digitado por um robô, com o "_" piscante e as três
 * faixas traçadas pela caneta. Um só componente = mesmo alinhamento em todas as seções.
 */
export default function SectionTitle({ title, intro }: { title: string; intro?: string }) {
    return (
        <div className="mb-14 lg:mb-20">
            <div className="wrap">
                <h2
                    data-draw="type"
                    className={`${roboto.className} text-[2rem] leading-tight md:text-5xl lg:text-7xl font-bold py-4 text-center lg:text-left text-fg`}
                >
                    {title}
                    <span data-draw-skip className="dd-underscore">_</span>
                </h2>
                {intro && (
                    <p data-draw="type" className="text-muted text-base md:text-lg max-w-3xl lg:max-w-none mx-auto lg:mx-0 text-center lg:text-left text-balance lg:text-wrap pb-6">
                        {intro}
                    </p>
                )}
            </div>
            <div data-draw="line" className="bg-line h-[2px] w-full" />
            <div data-draw="line" data-draw-delay="120" className="bg-muted/50 h-[4px] w-full mt-[4px]" />
            <div data-draw="line" data-draw-delay="240" className="bg-accent h-[6px] w-full mt-[4px]" />
        </div>
    );
}
