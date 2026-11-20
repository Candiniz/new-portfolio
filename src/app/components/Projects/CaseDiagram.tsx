import { RiArrowDownLine, RiArrowRightLine, RiLoopLeftLine } from "react-icons/ri";
import { roboto } from "../../fonts/Fonts";

export interface Diagram {
    columns: readonly { title: string; accent?: boolean; nodes: readonly string[] }[];
    band: { title: string; text: string };
}

/**
 * Case corporativo desenhado como diagrama, com nomes genéricos (nada de print de tela real).
 * Escuro nos dois temas, como o terminal do contato. No modal, cada bloco é desenhado pelos
 * robôs (data-draw); no card, sai uma versão em miniatura, só com a forma.
 */
export default function CaseDiagram({ data, compact = false }: { data: Diagram; compact?: boolean }) {
    if (compact) {
        return (
            <div aria-hidden="true" className="absolute inset-0 bg-[#121311] flex items-center gap-2 px-5 py-6">
                {data.columns.map((col, i) => (
                    <div key={col.title} className="contents">
                        {i > 0 && <span className="w-3 h-px bg-[#aadd49] shrink-0" />}
                        <div className="flex-1 flex flex-col gap-1.5">
                            <span className="font-mono text-[9px] uppercase tracking-widest text-[#8a8f86] truncate">{col.title}</span>
                            {col.nodes.map((n) => (
                                <span key={n} className={`h-4 border ${col.accent ? "border-[#aadd49] bg-[#aadd49]/15" : "border-white/15 bg-white/[0.04]"}`} />
                            ))}
                        </div>
                    </div>
                ))}
                <span className="absolute left-5 right-5 bottom-3 h-px border-t border-dashed border-white/20" />
            </div>
        );
    }

    return (
        <div className="bg-[#121311] text-[#eef1ea] p-5 sm:p-8 font-mono">
            <div className="flex flex-col lg:flex-row lg:items-stretch gap-2">
                {data.columns.map((col, i) => (
                    <div key={col.title} className="contents">
                        {i > 0 && (
                            <span aria-hidden="true" className="flex items-center justify-center text-[#aadd49] text-lg py-1 lg:py-0">
                                <RiArrowDownLine className="lg:hidden" />
                                <RiArrowRightLine className="hidden lg:block" />
                            </span>
                        )}
                        <div className="flex-1 min-w-0">
                            <p className={`${roboto.className} text-[11px] uppercase tracking-widest mb-2 ${col.accent ? "text-[#aadd49]" : "text-[#8a8f86]"}`}>
                                {String(i + 1).padStart(2, "0")} · {col.title}
                            </p>
                            <ul className="flex flex-col gap-1">
                                {col.nodes.map((n) => (
                                    <li
                                        key={n}
                                        data-draw="box"
                                        className={`px-3 py-2.5 text-[13px] leading-snug border ${
                                            col.accent ? "border-[#aadd49] bg-[#aadd49]/10" : "border-white/15 bg-white/[0.03]"
                                        }`}
                                    >
                                        {n}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
            <div data-draw="box" className="mt-6 pt-4 border-t border-dashed border-white/20 flex items-start gap-3">
                <RiLoopLeftLine className="shrink-0 mt-0.5 text-[#aadd49]" aria-hidden="true" />
                <p className="text-[13px] leading-relaxed">
                    <span className="text-[#aadd49] font-bold">{data.band.title}: </span>
                    <span className="text-[#c9cdc5]">{data.band.text}</span>
                </p>
            </div>
        </div>
    );
}
