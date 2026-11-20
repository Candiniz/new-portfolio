'use client';

import { useI18n } from "@/i18n/I18nProvider";
import SectionTitle from "./SectionTitle";
import Musician from "./Musician";
import Traveller from "./Traveller";
import Architect from "./Architect";

/** "Sobre mim": músico, viajante e arquiteto — a criatividade fora do código. */
export default function Trails() {
    const { t } = useI18n();
    return (
        <section id="about" className="pb-10 overflow-x-clip">
            <SectionTitle title={t.about.title} />
            <Musician />
            <Traveller />
            <Architect />
        </section>
    );
}
