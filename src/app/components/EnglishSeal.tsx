import { roboto } from "../fonts/Fonts";

interface Props {
    ring: string; // texto que gira em volta do selo
    level: string; // "C1"
    label: string; // "ADVANCED"
    title: string;
    text: string;
    alt: string;
}

/**
 * Selo de inglês C1, desenhado no estilo do site (não é cópia da arte do curso).
 * O anel de texto gira devagar; quem prefere menos movimento vê o selo parado.
 */
export default function EnglishSeal({ ring, level, label, title, text, alt }: Props) {
    return (
        <figure className="flex flex-col sm:flex-row lg:flex-col items-center gap-6 lg:gap-4 lg:w-64">
            <div data-draw="box" role="img" aria-label={alt} className="relative shrink-0 w-44 h-44 sm:w-48 sm:h-48">
                <svg viewBox="0 0 200 200" aria-hidden="true" className="absolute inset-0 w-full h-full text-fg animate-[spin_40s_linear_infinite] motion-reduce:animate-none">
                    <defs>
                        <path id="seal-ring" d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0" />
                    </defs>
                    <text className={roboto.className} fontSize="11" fontWeight="700" fill="currentColor" letterSpacing="2">
                        <textPath href="#seal-ring" textLength="500" lengthAdjust="spacing">
                            {ring}
                        </textPath>
                    </text>
                </svg>
                <span aria-hidden="true" className="absolute inset-[13%] rounded-full border border-dashed border-line" />
                <span
                    aria-hidden="true"
                    className="absolute inset-[21%] rounded-full bg-accent text-ink flex flex-col items-center justify-center shadow-glow"
                >
                    <span className={`${roboto.className} text-5xl font-bold leading-none`}>{level}</span>
                    <span className={`${roboto.className} text-[10px] font-bold tracking-[0.2em] mt-1`}>{label}</span>
                </span>
            </div>
            <figcaption className="text-center sm:text-left lg:text-center max-w-xs">
                <p data-draw="type" className={`${roboto.className} font-bold text-fg`}>
                    {title}
                </p>
                <p data-draw="type" className="text-sm text-muted leading-relaxed mt-1">
                    {text}
                </p>
            </figcaption>
        </figure>
    );
}
