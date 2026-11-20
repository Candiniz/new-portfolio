import { IBM_Plex_Mono, Oswald, Roboto_Mono } from "next/font/google";

// Só as famílias realmente usadas (Caveat e Parisienne saíram: não apareciam na tela).
export const oswald = Oswald({ subsets: ["latin"], weight: ["400", "700"], display: "swap" });

export const ibmPlexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "700"], display: "swap" });

export const roboto = Roboto_Mono({ subsets: ["latin"], weight: ["400", "700"], display: "swap" });
