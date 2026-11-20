import type { ReactNode } from "react";

export type ProjectTag = "automation" | "ai" | "web";

/** Dados de um projeto que não dependem de idioma (os textos ficam nos dicionários, pelo slug). */
export interface Project {
    slug: string;
    kind: "corporate" | "personal";
    tags: ProjectTag[];
    media: string;
    nda?: boolean;
    /** Case mostrado como diagrama redesenhado (os blocos vêm do dicionário), sem imagem. */
    diagram?: boolean;
    projectLink?: string;
    repositoryLink?: string;
    linkedIn?: string;
    icons: ReactNode;
}
