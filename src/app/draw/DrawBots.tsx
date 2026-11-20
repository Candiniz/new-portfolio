'use client';

import { useEffect } from "react";
import { startDrawing } from "./drawDirector";

/** Liga os robôs desenhistas para todos os elementos com `data-draw` da página. */
export default function DrawBots() {
    useEffect(() => startDrawing(), []);
    return null;
}
