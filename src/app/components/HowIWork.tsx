'use client';

import { RiFlowChart, RiRobot2Line, RiBarChartBoxLine, RiRadarLine } from "react-icons/ri";
import { roboto } from "../fonts/Fonts";
import { useI18n } from "@/i18n/I18nProvider";
import SectionTitle from "./SectionTitle";

const ICONS = [<RiFlowChart key="map" />, <RiRobot2Line key="auto" />, <RiBarChartBoxLine key="measure" />, <RiRadarLine key="monitor" />];

/** Mapear → Automatizar → Medir → Monitorar: quatro blocos colados, de borda a borda. */
export default function HowIWork() {
    const { t } = useI18n();
    return (
        <section id="how" className="pb-28">
            <SectionTitle title={t.how.title} intro={t.how.intro} />
            <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-1">
                {t.how.steps.map((step, i) => (
                    <li key={step.title} data-draw="box" className="group relative bg-surface px-6 py-8 lg:px-10 lg:py-12 overflow-hidden">
                        <span className="absolute left-0 top-0 h-1 w-full bg-accent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
                        <div className="flex items-baseline justify-between mb-8">
                            <span className={`${roboto.className} text-5xl lg:text-6xl font-bold text-accent-fg leading-none`}>0{i + 1}</span>
                            <span className="text-3xl text-muted group-hover:text-accent-fg transition-colors duration-300" aria-hidden="true">
                                {ICONS[i]}
                            </span>
                        </div>
                        <h3 className={`${roboto.className} text-2xl font-bold text-fg mb-3`}>{step.title}</h3>
                        <p className="text-sm lg:text-base text-muted leading-relaxed">{step.text}</p>
                    </li>
                ))}
            </ol>
        </section>
    );
}
