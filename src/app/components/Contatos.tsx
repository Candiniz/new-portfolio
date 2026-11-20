'use client';

import { useRef, useState } from "react";
import { RiGithubFill, RiInstagramLine, RiLinkedinBoxFill, RiMailLine, RiWhatsappLine, RiArrowRightLine } from "react-icons/ri";
import { roboto } from "../fonts/Fonts";
import { useI18n } from "@/i18n/I18nProvider";
import CopyButton from "./CopyButton";

const EMAIL = "andersoncd123@gmail.com";
const WHATSAPP = "https://wa.me/5511952488345";

// Canais, na ordem do terminal (o "flag" vira o comando digitado)
const CONTACTS = [
    { flag: "whatsapp", value: "+55 (11) 95248-8345", href: WHATSAPP, icon: <RiWhatsappLine /> },
    { flag: "email", value: EMAIL, href: `mailto:${EMAIL}`, icon: <RiMailLine /> },
    { flag: "linkedin", value: "linkedin.com/in/candiniz", href: "https://www.linkedin.com/in/candiniz/", icon: <RiLinkedinBoxFill /> },
    { flag: "github", value: "github.com/Candiniz", href: "https://github.com/Candiniz", icon: <RiGithubFill /> },
    { flag: "instagram", value: "instagram.com/candiniz.dev", href: "https://www.instagram.com/candiniz.dev", icon: <RiInstagramLine /> },
];

// Webhook opcional (ex.: n8n). Sem ele, o formulário abre o e-mail com a mensagem pronta.
const WEBHOOK = process.env.NEXT_PUBLIC_CONTACT_WEBHOOK;

function ProcessForm() {
    const { t, locale } = useI18n();
    const formRef = useRef<HTMLFormElement>(null);
    const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        if (data.get("site")) return; // armadilha para robôs de spam
        const processo = String(data.get("process") ?? "").trim();
        const contato = String(data.get("contact") ?? "").trim();
        const openMail = () => {
            const body = `${processo}\n\n— ${contato}`;
            window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(t.contact.mailSubject)}&body=${encodeURIComponent(body)}`;
        };
        if (!WEBHOOK) return openMail();
        setState("sending");
        try {
            const res = await fetch(WEBHOOK, {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ process: processo, contact: contato, lang: locale, page: window.location.href }),
            });
            if (!res.ok) throw new Error(String(res.status));
            setState("sent");
            formRef.current?.reset();
        } catch {
            setState("error");
            openMail();
        }
    };

    const field = "w-full bg-ink/10 text-ink placeholder:text-ink/55 border-b-2 border-ink px-3 py-2.5 outline-none focus:bg-ink/15 transition-colors";

    return (
        <form ref={formRef} onSubmit={onSubmit} data-draw="box" className="mt-10 max-w-xl">
            <p className={`${roboto.className} font-bold text-lg`}>{t.contact.formTitle}</p>
            <label className="block mt-3">
                <span className="sr-only">{t.contact.formProcess}</span>
                <textarea
                    name="process"
                    required
                    minLength={10}
                    rows={3}
                    placeholder={t.contact.formProcessPlaceholder}
                    aria-label={t.contact.formProcess}
                    className={`${field} resize-none`}
                />
            </label>
            <div className="flex flex-col sm:flex-row gap-1 mt-1">
                <label className="flex-1">
                    <span className="sr-only">{t.contact.formContact}</span>
                    <input name="contact" required placeholder={t.contact.formContact} className={field} />
                </label>
                <input name="site" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
                <button
                    type="submit"
                    disabled={state === "sending"}
                    className={`${roboto.className} group shrink-0 flex items-center justify-center gap-2 bg-ink text-accent font-bold px-6 py-3 hover:bg-ink/85 disabled:opacity-60 transition-colors`}
                >
                    {state === "sending" ? t.contact.formSending : WEBHOOK ? t.contact.formSend : t.contact.formSendMail}
                    <RiArrowRightLine className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </button>
            </div>
            <p role="status" className="text-sm mt-2 min-h-5 font-medium">
                {state === "sent" ? t.contact.formSent : state === "error" ? t.contact.formError : ""}
            </p>
        </form>
    );
}

/**
 * Contato em faixa de ponta a ponta, com corte diagonal no topo:
 * à esquerda o bloco verde (chamada, botões diretos e o formulário curto);
 * à direita um terminal, em que os robôs "digitam" cada canal como um comando.
 */
export default function Contatos() {
    const { t } = useI18n();
    const year = new Date().getFullYear();

    return (
        <section id="contact" className="pt-16">
            <div className="grid lg:grid-cols-[1.15fr_1fr] [clip-path:polygon(0_2.5rem,100%_0,100%_100%,0_100%)] lg:[clip-path:polygon(0_6rem,100%_0,100%_100%,0_100%)]">
                {/* bloco verde */}
                <div className="bg-accent text-ink px-6 sm:px-10 lg:px-16 xl:px-24 pt-20 lg:pt-36 pb-12 flex flex-col">
                    <p className={`${roboto.className} text-sm font-bold tracking-widest uppercase`}>_{t.contact.eyebrow}</p>
                    <h2 data-draw="type" className={`${roboto.className} text-5xl sm:text-6xl xl:text-7xl font-bold leading-[1.05] mt-3`}>
                        {t.contact.title}
                    </h2>
                    <p data-draw="type" className="text-lg lg:text-2xl font-medium leading-snug mt-5 max-w-xl">
                        {t.contact.cta}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-1 mt-8">
                        <a
                            data-draw="box"
                            href={WHATSAPP}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`${roboto.className} flex items-center justify-center gap-2 bg-ink text-accent font-bold px-6 py-3.5 hover:bg-ink/85 transition-colors`}
                        >
                            <RiWhatsappLine className="text-xl" aria-hidden="true" />
                            {t.contact.whatsapp}
                        </a>
                        <a
                            data-draw="box"
                            href={`mailto:${EMAIL}?subject=${encodeURIComponent(t.contact.mailSubject)}`}
                            className={`${roboto.className} flex items-center justify-center gap-2 border-2 border-ink font-bold px-6 py-3 hover:bg-ink hover:text-accent transition-colors`}
                        >
                            <RiMailLine className="text-xl" aria-hidden="true" />
                            {t.contact.email}
                        </a>
                    </div>

                    <ProcessForm />

                    <p className="mt-auto pt-10 flex items-center gap-2.5 text-sm font-medium">
                        <span className="relative flex w-2.5 h-2.5" aria-hidden="true">
                            <span className="absolute inset-0 bg-ink animate-ping opacity-60" />
                            <span className="relative w-2.5 h-2.5 bg-ink" />
                        </span>
                        {t.contact.available} · {t.contact.location}
                    </p>
                </div>

                {/* terminal: escuro nos dois temas */}
                <div className="bg-[#121311] text-[#eef1ea] px-6 sm:px-10 lg:px-14 pt-12 lg:pt-36 pb-12 font-mono flex flex-col">
                    <div className="flex items-center gap-2 border-b border-white/10 pb-3 text-xs text-[#8a8f86]">
                        <span className="w-2.5 h-2.5 bg-[#ff5f56]" aria-hidden="true" />
                        <span className="w-2.5 h-2.5 bg-[#ffbd2e]" aria-hidden="true" />
                        <span className="w-2.5 h-2.5 bg-[#aadd49]" aria-hidden="true" />
                        <span className="ml-2">{t.contact.terminalTitle}</span>
                        <span className="ml-auto hidden sm:inline">{t.contact.terminalHint}</span>
                    </div>
                    <p className="text-sm text-[#8a8f86] mt-5">{t.contact.subtitle}</p>
                    <ul className="mt-6 space-y-5">
                        {CONTACTS.map((c) => (
                            <li key={c.flag} data-draw="type">
                                <p className="text-sm text-[#8a8f86]">
                                    <span className="text-[#aadd49]">$</span> {t.contact.eyebrow} --{c.flag}
                                </p>
                                <div className="flex items-center gap-3 mt-1">
                                    <span className="text-xl text-[#aadd49]" aria-hidden="true">
                                        {c.icon}
                                    </span>
                                    <a
                                        href={c.href}
                                        target={c.href.startsWith("http") ? "_blank" : undefined}
                                        rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                        className="flex-1 min-w-0 truncate text-base lg:text-lg hover:text-[#aadd49] underline-offset-4 hover:underline"
                                    >
                                        {c.value}
                                    </a>
                                    <CopyButton textToCopy={c.value} className="text-[#aadd49] hover:bg-white/10" />
                                </div>
                            </li>
                        ))}
                    </ul>
                    <p className="mt-6 text-[#aadd49]" aria-hidden="true">
                        $ <span className="inline-block w-2.5 h-5 align-middle bg-[#aadd49] animate-blink" />
                    </p>
                </div>
            </div>

            <footer suppressHydrationWarning className={`${roboto.className} border-t border-line py-6 text-center text-xs text-muted`}>
                © {year} Anderson Diniz · Candiniz
            </footer>
        </section>
    );
}
