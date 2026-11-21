import { FaMicrosoft } from "react-icons/fa";
import {
    SiClaude, SiCss, SiDocker, SiFastapi, SiFigma, SiFirebase, SiFramer, SiGooglecloud, SiGooglegemini, SiHtml5, SiJavascript,
    SiLua, SiMetabase, SiN8N, SiNextdotjs, SiNodedotjs, SiPostgresql, SiPrisma, SiPython, SiReact, SiSass, SiTailwindcss,
    SiThreedotjs, SiTypescript,
} from "react-icons/si";
import type { Project } from "../types/Home";

/*
 * Dados dos projetos que NÃO mudam com o idioma (links, mídia, ícones, categorias).
 * Nome, descrição e textos do case ficam em src/i18n/dictionaries/*.ts, pelo slug.
 */
export const projects: Project[] = [
    // ---------------------------------------------------------------- corporativos
    // PG: cases contados por diagrama redesenhado (nenhum print de sistema real)
    {
        slug: "pg-rpa-ia",
        kind: "corporate",
        tags: ["automation", "ai"],
        nda: true,
        diagram: true,
        media: "",
        icons: (
            <>
                <FaMicrosoft />
                <SiClaude />
                <SiGooglegemini />
                <SiPython />
            </>
        ),
    },
    {
        slug: "pg-prisma",
        kind: "corporate",
        tags: ["ai", "automation", "web"],
        nda: true,
        diagram: true,
        media: "",
        icons: (
            <>
                <SiClaude />
                <SiThreedotjs />
                <SiTypescript />
                <SiFirebase />
            </>
        ),
    },
    {
        slug: "digitalizafinanceiro",
        kind: "corporate",
        tags: ["automation"],
        nda: true,
        media: "/experience/DigitalizaFinanceiro.png",
        icons: (
            <>
                <FaMicrosoft />
                <SiTypescript />
                <SiTailwindcss />
            </>
        ),
    },
    {
        slug: "ipscraper",
        kind: "corporate",
        tags: ["automation", "web"],
        nda: true,
        media: "/experience/OpiceIP.png",
        icons: (
            <>
                <SiNextdotjs />
                <SiTypescript />
                <SiPython />
                <SiDocker />
            </>
        ),
    },
    {
        slug: "opice-clause",
        kind: "corporate",
        tags: ["ai", "automation"],
        // o vídeo não está em public/experience: o card mostra a prévia substituta
        media: "/experience/OpiceClause.mp4",
        icons: (
            <>
                <SiN8N />
                <SiGooglecloud />
                <SiPython />
                <FaMicrosoft />
            </>
        ),
    },
    {
        slug: "rpa-python-architecture",
        kind: "corporate",
        tags: ["automation"],
        nda: true,
        media: "/experience/opiceRPA.jpg",
        icons: (
            <>
                <SiMetabase />
                <SiPostgresql />
                <SiPython />
                <SiDocker />
                <SiNodedotjs />
            </>
        ),
    },
    {
        slug: "opicedesk",
        kind: "corporate",
        tags: ["web"],
        nda: true,
        media: "/experience/OpiceDesk.jpg",
        icons: (
            <>
                <SiNextdotjs />
                <SiTypescript />
                <SiTailwindcss />
                <SiFigma />
                <SiFirebase />
            </>
        ),
    },
    {
        slug: "chatopice",
        kind: "corporate",
        tags: ["ai", "web"],
        nda: true,
        media: "/experience/ChatOpice.png",
        icons: (
            <>
                <SiReact />
                <SiTypescript />
                <SiGooglecloud />
                <SiPython />
                <SiFirebase />
            </>
        ),
    },
    {
        slug: "portal-carreiras",
        kind: "corporate",
        tags: ["web", "automation"],
        media: "/experience/Carreiras.png",
        icons: (
            <>
                <SiReact />
                <SiTailwindcss />
                <SiFigma />
                <FaMicrosoft />
            </>
        ),
    },
    {
        slug: "portal-dps-fenalaw",
        kind: "corporate",
        tags: ["web"],
        media: "/experience/DPSFenalaw.png",
        icons: (
            <>
                <SiReact />
                <SiTailwindcss />
                <SiFigma />
            </>
        ),
    },

    // ------------------------------------------------------------------- pessoais
    {
        slug: "aurestella-pyxis",
        kind: "personal",
        tags: ["ai", "automation"],
        repositoryLink: "https://github.com/Candiniz/AurestellaPixis",
        // imagem no próprio projeto (public/projects), não no imgur
        media: "/projects/aurestella-pyxis.jpg",
        icons: (
            <>
                <SiPython />
                <SiFastapi />
                <SiGooglegemini />
                <SiPostgresql />
                <SiDocker />
                <SiLua />
            </>
        ),
    },
    {
        slug: "new-portfolio",
        kind: "personal",
        tags: ["web"],
        media: "https://i.imgur.com/jv21AnZ.png",
        icons: (
            <>
                <SiNextdotjs />
                <SiTypescript />
                <SiTailwindcss />
                <SiFramer />
                <SiFigma />
            </>
        ),
    },
    {
        slug: "restora",
        kind: "personal",
        tags: ["ai", "web"],
        projectLink: "https://restora-lake.vercel.app",
        repositoryLink: "https://github.com/Candiniz/reStore",
        media: "https://i.imgur.com/KKA0tQm.png",
        icons: (
            <>
                <SiNextdotjs />
                <SiTypescript />
                <SiSass />
                <SiTailwindcss />
            </>
        ),
    },
    {
        slug: "disordle",
        kind: "personal",
        tags: ["web"],
        projectLink: "https://disordle.vercel.app",
        repositoryLink: "https://github.com/Candiniz/disordle",
        linkedIn: "https://www.linkedin.com/feed/update/urn:li:activity:7312852213691826177/",
        media: "https://i.imgur.com/VEkHZWi.png",
        icons: (
            <>
                <SiReact />
                <SiJavascript />
                <SiCss />
                <SiFigma />
            </>
        ),
    },
    {
        slug: "hexis",
        kind: "personal",
        tags: ["web"],
        projectLink: "https://hexis.vercel.app",
        repositoryLink: "https://github.com/Candiniz/hexis",
        linkedIn: "https://www.linkedin.com/feed/update/urn:li:activity:7278147027002179585/",
        media: "https://i.imgur.com/kEtAOJn.png",
        icons: (
            <>
                <SiReact />
                <SiJavascript />
                <SiCss />
                <SiFigma />
            </>
        ),
    },
    {
        slug: "sobrinha-artesanatos",
        kind: "personal",
        tags: ["web"],
        projectLink: "https://www.sobrinha.store",
        repositoryLink: "https://github.com/Candiniz/next-commerce-1",
        media: "https://i.imgur.com/41LaBQh.jpeg",
        icons: (
            <>
                <SiTypescript />
                <SiNextdotjs />
                <SiTailwindcss />
                <SiPrisma />
            </>
        ),
    },
    {
        slug: "projex",
        kind: "personal",
        tags: ["web"],
        projectLink: "https://proj-ex.vercel.app",
        repositoryLink: "https://github.com/Candiniz/ProjEX",
        media: "https://i.imgur.com/ekDJKin.png",
        icons: (
            <>
                <SiReact />
                <SiJavascript />
                <SiCss />
                <SiTailwindcss />
            </>
        ),
    },
    {
        slug: "old-portfolio",
        kind: "personal",
        tags: ["web"],
        projectLink: "https://candiniz.github.io/myportifolio/",
        repositoryLink: "https://github.com/Candiniz/myportifolio",
        media: "https://i.imgur.com/08IldNi.png",
        icons: (
            <>
                <SiHtml5 />
                <SiJavascript />
                <SiCss />
                <SiFigma />
            </>
        ),
    },
    {
        slug: "finance-control",
        kind: "personal",
        tags: ["web"],
        projectLink: "https://candiniz.github.io/Finance-Control/",
        repositoryLink: "https://github.com/Candiniz/Finance-Control",
        media: "https://i.imgur.com/Q9dAMhL.png",
        icons: (
            <>
                <SiReact />
                <SiJavascript />
                <SiCss />
            </>
        ),
    },
    {
        slug: "mario-js",
        kind: "personal",
        tags: ["web"],
        projectLink: "https://candiniz.github.io/mario-js/",
        repositoryLink: "https://github.com/Candiniz/mario-js",
        media: "https://i.imgur.com/ZDoC8Du.png",
        icons: (
            <>
                <SiHtml5 />
                <SiJavascript />
                <SiCss />
            </>
        ),
    },
    {
        slug: "iss-finder",
        kind: "personal",
        tags: ["web"],
        projectLink: "https://candiniz.github.io/iss-finder/",
        repositoryLink: "https://github.com/Candiniz/iss-finder",
        media: "https://i.imgur.com/Fp4eq94.png",
        icons: (
            <>
                <SiHtml5 />
                <SiJavascript />
                <SiCss />
            </>
        ),
    },
    {
        slug: "landing-page",
        kind: "personal",
        tags: ["web"],
        projectLink: "https://candiniz.github.io/landing_page_study_1/",
        repositoryLink: "https://github.com/Candiniz/landing_page_study_1",
        media: "https://i.imgur.com/ZRekg3a.png",
        icons: (
            <>
                <SiHtml5 />
                <SiCss />
            </>
        ),
    },
];
