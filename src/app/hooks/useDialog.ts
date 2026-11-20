import { useEffect, useRef, type RefObject } from "react";

// Contador global: com dois modais abertos (feed + post), a rolagem só volta quando os dois fecham.
let scrollLocks = 0;

/**
 * Comportamento comum dos modais: trava a rolagem da página, fecha com Esc,
 * põe o foco no elemento indicado e devolve o foco a quem abriu ao fechar.
 */
export function useDialog(open: boolean, onClose: () => void, initialFocus?: RefObject<HTMLElement | null>) {
    const close = useRef(onClose);
    useEffect(() => {
        close.current = onClose;
    });

    useEffect(() => {
        if (!open) return;
        const opener = document.activeElement as HTMLElement | null;
        if (scrollLocks++ === 0) document.documentElement.style.overflow = "hidden";
        initialFocus?.current?.focus();
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") close.current();
        };
        window.addEventListener("keydown", onKey);
        return () => {
            window.removeEventListener("keydown", onKey);
            if (--scrollLocks === 0) document.documentElement.style.overflow = "";
            opener?.focus?.();
        };
    }, [open, initialFocus]);
}
