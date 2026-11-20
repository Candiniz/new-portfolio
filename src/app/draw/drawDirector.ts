/*
 * Draw Director — "robôs desenhistas"
 *
 * Todo elemento marcado com `data-draw` começa invisível (visibility: hidden,
 * sem deslocar o layout) e só aparece quando um cursor-robô o "desenha":
 *
 *   data-draw="box"  (padrão) → o cursor arrasta uma seleção (marching ants),
 *                     contorna o retângulo com a caneta e "renderiza" o elemento
 *                     de cima para baixo, como num Illustrator.
 *   data-draw="type" → o cursor vira I-beam, clica no início do texto e digita.
 *   data-draw="line" → o cursor traça a linha com a caneta no eixo mais longo.
 *
 * Atributos opcionais:
 *   data-draw-skip       → subárvore que o "type" não digita (ex.: o "_" piscante).
 *   data-draw-delay="ms" → atraso mínimo antes de o robô começar.
 *
 * API para componentes (getDirector()):
 *   carry(el, from) → depois de o React reordenar uma lista, um robô "agarra" o
 *                     elemento na posição antiga e o arrasta até a nova (FLIP).
 *
 * Um único IntersectionObserver vigia os alvos; um MutationObserver pega os
 * que montam depois (cards do "ver mais", blocos que dependem de estado etc.).
 * Quando um alvo SAI totalmente da tela, ele volta ao estado inicial e é
 * redesenhado quando reaparece (subiu de volta ao hero → os robôs montam de novo).
 *
 * Nada muda o layout: o alvo ocupa o espaço final desde o início (opacity 0) e a
 * digitação revela o texto com um recorte (clip-path) linha a linha, sem tocar
 * no DOM do texto — por isso não há "saltos" enquanto os robôs trabalham.
 *
 * data-slide="left|right" (sem robô): o elemento entra deslizando pela lateral
 * (usa "left", não transform, para não quebrar background-attachment: fixed)
 * e sai quando some da tela, para entrar de novo na volta.
 * Cada alvo vira um "job"; os jobs são distribuídos para um pool de cursores
 * (até MAX_BOTS). Rolando rápido, vários robôs trabalham ao mesmo tempo.
 *
 * O estado vive em `data-draw-state` (queued | active | done) e não em classes,
 * porque o React reescreve `className` dinâmico e apagaria as nossas.
 */

type Mode = "box" | "type" | "line" | "carry";

interface Rect {
    x: number;
    y: number;
    w: number;
    h: number;
}

interface Job {
    el: HTMLElement;
    mode: Mode;
    notBefore: number;
    /** carry: de onde o elemento sai e para onde vai (coordenadas da página) */
    from?: Rect;
    to?: Rect;
    resolve?: () => void;
}

interface Pt {
    x: number;
    y: number;
}

const BOT_NAMES = ["rpa.bot", "n8n.flow", "py.worker", "llm.agent", "cron.job", "gemini", "api.call", "pad.robot"];
const BOT_COLORS = ["#aadd49", "#5eead4", "#a78bfa", "#fb7185", "#fbbf24", "#60a5fa", "#f472b6", "#34d399"];

const STATE = "data-draw-state";
const SVG_NS = "http://www.w3.org/2000/svg";

/*
 * Pressa: quando a tela anda rápido (rolagem forte ou salto pelo menu), os robôs aceleram em vez
 * de deixar a tela vazia esperando. RATE multiplica a velocidade de TUDO o que eles fazem: as
 * animações já em curso (playbackRate), as novas, as pausas (sleep) e a digitação.
 */
let RATE = 1;
const live = new Set<Animation>();
/** el.animate que respeita a pressa atual e acompanha mudanças dela até terminar */
function anim(el: Element, kf: Keyframe[] | PropertyIndexedKeyframes, opts: KeyframeAnimationOptions) {
    const a = el.animate(kf, opts);
    a.playbackRate = RATE;
    live.add(a);
    const drop = () => live.delete(a);
    a.finished.then(drop, drop);
    return a;
}
let applied = 1; // velocidade já aplicada às animações em curso
function setRate(r: number) {
    RATE = r; // vale na hora para o que começar agora (pausas, digitação, novas animações)
    if (Math.abs(r - applied) < 0.03 && r !== 1) return; // em curso: ajusta em passos, sem custo
    applied = r;
    live.forEach((a) => (a.updatePlaybackRate ? a.updatePlaybackRate(r) : (a.playbackRate = r)));
}

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms / RATE));
const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
const done = (a: Animation) => a.finished.catch(() => undefined);

/** Totalmente fora da tela, pela caixa do elemento (getBoundingClientRect ignora clip-path). */
function offscreen(el: Element) {
    const r = el.getBoundingClientRect();
    return r.bottom <= 0 || r.top >= window.innerHeight || r.right <= 0 || r.left >= window.innerWidth;
}

function pageRect(el: Element): Rect {
    const r = el.getBoundingClientRect();
    return { x: r.left + window.scrollX, y: r.top + window.scrollY, w: r.width, h: r.height };
}

/* ------------------------------------------------------------------ cursor */

const ARROW_SVG = `<svg class="dd-ico dd-ico-arrow" width="22" height="22" viewBox="0 0 22 22"><path d="M1.5 1.5 L1.5 17.5 L6 13.2 L9.2 20.2 L12 19 L8.9 12.2 L15 12.2 Z" fill="var(--c)" stroke="#0b0b0b" stroke-width="1.4" stroke-linejoin="round"/></svg>`;
const PEN_SVG = `<svg class="dd-ico dd-ico-pen" width="22" height="22" viewBox="0 0 22 22"><path d="M1 1 L6.5 15 L10.5 11.8 L15 16.3 L16.3 15 L11.8 10.5 L15 6.5 Z" fill="#0b0b0b" stroke="var(--c)" stroke-width="1.4" stroke-linejoin="round"/><circle cx="7.6" cy="7.6" r="1.4" fill="var(--c)"/></svg>`;
const IBEAM_SVG = `<svg class="dd-ico dd-ico-ibeam" width="14" height="22" viewBox="0 0 14 22"><path d="M3 1.5 H11 M7 1.5 V20.5 M3 20.5 H11" stroke="#0b0b0b" stroke-width="4" stroke-linecap="round"/><path d="M3 1.5 H11 M7 1.5 V20.5 M3 20.5 H11" stroke="var(--c)" stroke-width="2" stroke-linecap="round"/></svg>`;

class Bot {
    readonly node: HTMLDivElement;
    pos: Pt;
    busy = false;
    idleTimer: ReturnType<typeof setTimeout> | null = null;
    private moveAnim: Animation | null = null;

    constructor(
        readonly id: number,
        readonly color: string,
        readonly name: string,
        layer: HTMLElement,
        start: Pt,
    ) {
        this.pos = start;
        const n = document.createElement("div");
        n.className = "dd-bot";
        n.style.setProperty("--c", color);
        n.dataset.tool = "arrow";
        n.innerHTML = `${ARROW_SVG}${PEN_SVG}${IBEAM_SVG}<span class="dd-tag">${name}</span><span class="dd-click"></span>`;
        n.style.transform = `translate3d(${start.x}px, ${start.y}px, 0)`;
        layer.appendChild(n);
        this.node = n;
    }

    /** Onde o cursor está AGORA na tela (no meio de uma animação, pos ainda é o destino). */
    current(): Pt {
        try {
            const m = new DOMMatrixReadOnly(getComputedStyle(this.node).transform);
            return { x: m.m41, y: m.m42 };
        } catch {
            return this.pos;
        }
    }

    tool(t: "arrow" | "pen" | "ibeam") {
        this.node.dataset.tool = t;
    }

    show() {
        if (this.idleTimer) clearTimeout(this.idleTimer);
        this.idleTimer = null;
        this.node.classList.add("dd-on");
    }

    hideLater(ms: number) {
        if (this.idleTimer) clearTimeout(this.idleTimer);
        this.idleTimer = setTimeout(() => this.node.classList.remove("dd-on"), ms);
    }

    /** Move com uma leve curva (como mão de gente), em coordenadas da página. */
    moveTo(to: Pt, ms: number, easing = "cubic-bezier(.45,.05,.25,1)") {
        const from = this.current();
        const dx = to.x - from.x;
        const dy = to.y - from.y;
        const bend = clamp(Math.hypot(dx, dy) * 0.12, 0, 60) * (this.id % 2 ? 1 : -1);
        const mid = { x: from.x + dx * 0.5 - (dy / (Math.hypot(dx, dy) || 1)) * bend, y: from.y + dy * 0.5 + (dx / (Math.hypot(dx, dy) || 1)) * bend };
        this.moveAnim?.cancel();
        const a = anim(this.node, 
            [
                { transform: `translate3d(${from.x}px, ${from.y}px, 0)` },
                { transform: `translate3d(${mid.x}px, ${mid.y}px, 0)`, offset: 0.5 },
                { transform: `translate3d(${to.x}px, ${to.y}px, 0)` },
            ],
            { duration: Math.max(1, ms), easing, fill: "forwards" },
        );
        this.moveAnim = a;
        this.pos = to;
        this.node.style.transform = `translate3d(${to.x}px, ${to.y}px, 0)`;
        return a;
    }

    /** Percorre uma sequência de pontos (contorno), com offsets proporcionais à distância. */
    path(points: Pt[], ms: number) {
        let total = 0;
        const segs = [0];
        for (let i = 1; i < points.length; i++) {
            total += Math.hypot(points[i].x - points[i - 1].x, points[i].y - points[i - 1].y);
            segs.push(total);
        }
        this.moveAnim?.cancel();
        const a = anim(this.node, 
            points.map((p, i) => ({ transform: `translate3d(${p.x}px, ${p.y}px, 0)`, offset: total ? segs[i] / total : i / (points.length - 1) })),
            { duration: Math.max(1, ms), easing: "linear", fill: "forwards" },
        );
        this.moveAnim = a;
        const last = points[points.length - 1];
        this.pos = last;
        this.node.style.transform = `translate3d(${last.x}px, ${last.y}px, 0)`;
        return a;
    }

    press(down: boolean) {
        this.node.classList.toggle("dd-down", down);
        if (down) {
            const ring = this.node.querySelector(".dd-click") as HTMLElement;
            anim(ring, 
                [
                    { transform: "translate(-50%,-50%) scale(.2)", opacity: 0.9 },
                    { transform: "translate(-50%,-50%) scale(1.6)", opacity: 0 },
                ],
                { duration: 420, easing: "ease-out" },
            );
        }
    }

    destroy() {
        if (this.idleTimer) clearTimeout(this.idleTimer);
        this.moveAnim?.cancel();
        this.node.remove();
    }
}

/* ---------------------------------------------------------------- director */

export class DrawDirector {
    private layer: HTMLDivElement;
    private io: IntersectionObserver;
    private mo: MutationObserver;
    private bots: Bot[] = [];
    private queue: Job[] = [];
    private visible = new Set<HTMLElement>();
    private onscreen = new Set<HTMLElement>();
    private waitingOnParent = new Map<HTMLElement, HTMLElement[]>();
    private slides = new Set<HTMLElement>();
    private slideRaf = 0;
    private disposed = false;
    private lastStart = 0;
    // pressa: velocidade média do deslocamento da tela (px/s)
    private lastY = 0;
    private lastT = 0;
    private vel = 0;
    private velAt = 0;
    private rateAt = 0;
    private surgeAt = 0; // último salto (menu, link): máximo até terminar o que está na tela
    private rushTimer: ReturnType<typeof setTimeout> | null = null;
    private pumpTimer: ReturnType<typeof setTimeout> | null = null;
    private readonly maxBots: number;
    /** Primeira tela: robôs mais rápidos, para o topo não ficar vazio esperando. */
    private readonly bootUntil = performance.now() + 2500;

    constructor() {
        this.maxBots = window.innerWidth < 640 ? 3 : window.innerWidth < 1024 ? 5 : 8;

        this.layer = document.createElement("div");
        this.layer.className = "dd-layer";
        this.layer.setAttribute("aria-hidden", "true");
        document.body.appendChild(this.layer);

        this.io = new IntersectionObserver((entries) => this.onIntersect(entries), {
            threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
        });

        // Faixas deslizantes: checagem só VERTICAL na rolagem. (IntersectionObserver não
        // serve: a faixa começa deslocada para fora da tela e o overflow-x: clip da seção
        // zera a interseção, mesmo com rootMargin alargado.)
        window.addEventListener("scroll", this.onScroll, { passive: true });
        window.addEventListener("resize", this.onScroll);

        this.mo = new MutationObserver((muts) => {
            for (const m of muts) {
                m.addedNodes.forEach((n) => {
                    if (n instanceof HTMLElement) this.scan(n);
                });
            }
        });
        this.mo.observe(document.body, { childList: true, subtree: true });
        this.scan(document.body);
    }

    /** Sem animação: revela tudo e não esconde mais nada (reduced motion). */
    static revealAll() {
        document.querySelectorAll<HTMLElement>("[data-draw]").forEach((el) => el.setAttribute(STATE, "done"));
    }

    private onScroll = () => {
        this.measureRush();
        if (!this.slideRaf) {
            this.slideRaf = requestAnimationFrame(() => {
                this.slideRaf = 0;
                this.checkSlides();
            });
        }
    };

    /**
     * Velocidade ideal dos robôs a partir de quanto a tela está se deslocando.
     *  - A velocidade é a MÉDIA do deslocamento nos últimos ~250 ms (não o pico de um evento):
     *    um toque na roda do mouse não acelera nada.
     *  - Até 600 px/s (ritmo de leitura) os robôs ficam na velocidade normal; daí sobe em linha
     *    reta até 4x em 3.000 px/s. Um salto instantâneo (menu, link) conta como o máximo.
     *  - Rede de segurança: se acumular mais de duas "rodadas" de robôs esperando, acelera na
     *    proporção da fila (até 3x).
     *  - Salto (a tela anda mais de 3/4 da altura de uma vez, ou a média passa de 3.000 px/s):
     *    6x até os robôs terminarem o que está na tela (no máximo 3 s).
     *  - Acelera na hora e desacelera aos poucos (~350 ms), sem tranco.
     */
    private measureRush() {
        const now = performance.now();
        const y = window.scrollY;
        const prevT = this.lastT;
        const dy = Math.abs(y - this.lastY);
        this.lastY = y;
        this.lastT = now;
        if (prevT && dy > 0) {
            const dt = Math.min(Math.max(now - prevT, 1), 50); // evento único depois de muito tempo = salto
            const v = (dy / dt) * 1000;
            this.vel += (v - this.vel) * (1 - Math.exp(-dt / 250));
            this.velAt = now;
            if (dy > window.innerHeight * 0.75 || this.vel >= 3000) this.surgeAt = now;
            else if (now - this.surgeAt > 400) this.surgeAt = 0; // voltou a rolar devagar: acabou o salto
        }
        this.updateRate();
    }

    /** sem rolagem, a média cai sozinha (só o tempo parado conta) */
    private decayVel(now: number) {
        const since = now - Math.max(this.velAt, this.lastT);
        if (since > 40) {
            this.vel *= Math.exp(-since / 400);
            this.velAt = now;
        }
    }

    private updateRate() {
        if (this.rushTimer) {
            clearTimeout(this.rushTimer);
            this.rushTimer = null;
        }
        const now = performance.now();
        this.decayVel(now);
        const byScroll = clamp(1 + (this.vel - 600) / 800, 1, 4);
        const byQueue = clamp(this.queue.length / (2 * this.maxBots), 1, 3);
        const sinceSurge = now - this.surgeAt;
        const surge = this.surgeAt > 0 && (sinceSurge < 400 || (sinceSurge < 3000 && this.queue.length > 0));
        const target = surge ? 6 : Math.max(byScroll, byQueue);
        const dt = this.rateAt ? now - this.rateAt : 0;
        this.rateAt = now;
        const next = target >= RATE ? target : RATE + (target - RATE) * (1 - Math.exp(-dt / 350));
        setRate(next < 1.02 ? 1 : next);
        const busy = surge || RATE > 1 || this.vel > 5 || this.queue.length > 2 * this.maxBots;
        if (busy && !this.disposed) this.rushTimer = setTimeout(() => this.updateRate(), 100);
    }

    /** Entra quando cruza a faixa central da tela; sai (para reentrar) quando some por completo. */
    private checkSlides() {
        const vh = window.innerHeight;
        this.slides.forEach((el) => {
            if (!el.isConnected) return void this.slides.delete(el);
            const r = el.getBoundingClientRect();
            if (!r.height) return;
            if (r.top < vh * 0.92 && r.bottom > vh * 0.08) el.setAttribute("data-slide-in", "");
            else if (r.bottom <= 0 || r.top >= vh) el.removeAttribute("data-slide-in");
        });
    }

    private scan(root: HTMLElement) {
        if (root.matches?.("[data-slide]")) this.slides.add(root);
        root.querySelectorAll<HTMLElement>("[data-slide]").forEach((el) => this.slides.add(el));
        this.onScroll();
        const list: HTMLElement[] = root.matches?.("[data-draw]") ? [root] : [];
        root.querySelectorAll<HTMLElement>("[data-draw]").forEach((el) => list.push(el));
        for (const el of list) {
            if (el.getAttribute(STATE)) continue;
            el.setAttribute(STATE, "idle");
            this.io.observe(el);
        }
    }

    private onIntersect(entries: IntersectionObserverEntry[]) {
        for (const e of entries) {
            const el = e.target as HTMLElement;
            // "visível o bastante": 10% do elemento OU 20% da altura da tela (elementos altos)
            const enough = e.isIntersecting && (e.intersectionRatio >= 0.1 || e.intersectionRect.height >= window.innerHeight * 0.2);
            if (e.isIntersecting) this.onscreen.add(el);
            else if (offscreen(el)) {
                // Saiu de fato (pela caixa real, que ignora o clip-path do desenho em curso).
                // Confiar só no observador causava loop: com o elemento metade fora, o recorte
                // da animação esconde a parte visível e o observador diz "saiu" no meio do desenho.
                this.onscreen.delete(el);
                if (el.getAttribute(STATE) === "done") el.setAttribute(STATE, "idle");
            }
            if (enough) {
                this.visible.add(el);
                if (el.getAttribute(STATE) === "idle") this.enqueue(el);
            } else {
                this.visible.delete(el);
                // saiu da tela antes de ser desenhado: volta a esperar (será desenhado quando reaparecer)
                const i = this.queue.findIndex((j) => j.el === el);
                if (i >= 0) {
                    this.queue.splice(i, 1);
                    el.setAttribute(STATE, "idle");
                }
            }
        }
        this.pump();
        if (this.queue.length > 2 * this.maxBots) this.updateRate();
    }

    private enqueue(el: HTMLElement) {
        // espera o "pai" desenhável terminar (ex.: texto dentro de um card)
        const parent = el.parentElement?.closest<HTMLElement>("[data-draw]");
        if (parent && parent.getAttribute(STATE) !== "done") {
            const arr = this.waitingOnParent.get(parent) ?? [];
            if (!arr.includes(el)) arr.push(el);
            this.waitingOnParent.set(parent, arr);
            el.setAttribute(STATE, "waiting");
            return;
        }
        const raw = (el.dataset.draw || "box").toLowerCase();
        const mode: Mode = raw === "type" || raw === "line" ? raw : "box";
        const delay = Number(el.dataset.drawDelay || 0);
        el.setAttribute(STATE, "queued");
        this.queue.push({ el, mode, notBefore: performance.now() + delay });
    }

    /** O alvo sumiu (saiu da tela, foi desmontado ou o diretor foi descartado)? */
    private gone(el: HTMLElement) {
        return this.disposed || !el.isConnected || offscreen(el);
    }

    private finish(el: HTMLElement) {
        // terminou fora da tela: já volta ao início, para ser redesenhado quando reaparecer
        if (offscreen(el)) {
            this.onscreen.delete(el);
            el.setAttribute(STATE, "idle");
            this.pump();
            return;
        }
        this.onscreen.add(el);
        el.setAttribute(STATE, "done");
        const kids = this.waitingOnParent.get(el);
        if (kids) {
            this.waitingOnParent.delete(el);
            for (const k of kids) {
                if (!k.isConnected) continue;
                k.setAttribute(STATE, "idle");
                if (this.visible.has(k)) this.enqueue(k);
            }
        }
        this.pump();
    }

    /** Distribui jobs para robôs livres; cria robôs novos até o teto. */
    private pump() {
        if (this.disposed) return;
        if (this.pumpTimer) {
            clearTimeout(this.pumpTimer);
            this.pumpTimer = null;
        }
        // ordem de leitura: de cima para baixo, da esquerda para a direita
        this.queue.sort((a, b) => {
            const ra = a.el.getBoundingClientRect();
            const rb = b.el.getBoundingClientRect();
            return Math.abs(ra.top - rb.top) > 8 ? ra.top - rb.top : ra.left - rb.left;
        });

        const now = performance.now();
        while (this.queue.length) {
            const job = this.queue[0];
            if (!job.el.isConnected) {
                this.queue.shift();
                continue;
            }
            const wait = Math.max(job.notBefore - now, this.lastStart + 90 / RATE - now);
            if (wait > 0) {
                this.pumpTimer = setTimeout(() => this.pump(), wait);
                return;
            }
            const bot = this.pickBot(job.el);
            if (!bot) return; // todos ocupados; o próximo finish() chama pump()
            this.queue.shift();
            this.lastStart = now;
            this.run(bot, job);
        }
    }

    private pickBot(el: HTMLElement): Bot | null {
        const r = pageRect(el);
        const target = { x: r.x, y: r.y };
        let best: Bot | null = null;
        let bestD = Infinity;
        for (const b of this.bots) {
            if (b.busy) continue;
            const d = Math.hypot(b.pos.x - target.x, b.pos.y - target.y);
            if (d < bestD) {
                bestD = d;
                best = b;
            }
        }
        // robô livre muito longe? se ainda cabe, nasce um novo perto da tarefa
        const far = bestD > window.innerHeight * 1.1;
        if ((!best || far) && this.bots.length < this.maxBots) {
            const fromRight = r.x + r.w / 2 > window.innerWidth / 2;
            const start = {
                x: window.scrollX + (fromRight ? window.innerWidth + 40 : -40),
                y: clamp(r.y + r.h * 0.6, window.scrollY + 40, window.scrollY + window.innerHeight - 40),
            };
            const i = this.bots.length;
            const bot = new Bot(i, BOT_COLORS[i % BOT_COLORS.length], BOT_NAMES[i % BOT_NAMES.length], this.layer, start);
            this.bots.push(bot);
            return bot;
        }
        return best;
    }

    /** Mais trabalho na fila → robôs mais rápidos. */
    /** velocidade atual dos robôs (1 = normal); só leitura, para depuração */
    get rate() {
        return RATE;
    }

    /** duração base: só a abertura da página é um pouco mais ágil; o resto é a pressa (RATE) */
    private speed() {
        return performance.now() < this.bootUntil ? 0.6 : 1;
    }

    private async run(bot: Bot, job: Job) {
        bot.busy = true;
        bot.show();
        if (job.mode !== "carry") job.el.setAttribute(STATE, "queued");
        try {
            if (job.mode === "type") await this.drawType(bot, job.el);
            else if (job.mode === "line") await this.drawLine(bot, job.el);
            else if (job.mode === "carry") await this.drawCarry(bot, job);
            else await this.drawBox(bot, job.el);
        } catch {
            // qualquer imprevisto: o conteúdo nunca pode ficar escondido
        }
        if (job.mode === "carry") {
            job.el.style.transform = "";
            job.resolve?.();
        }
        if (this.disposed) return;
        if (job.mode !== "carry" && job.el.isConnected) this.finish(job.el);
        bot.busy = false;
        {
            // "solta o mouse" e sai de cena devagar se não houver mais trabalho
            bot.tool("arrow");
            bot.moveTo({ x: bot.pos.x + 26, y: bot.pos.y + 34 }, 380, "ease-out");
            bot.hideLater(1600);
            this.pump();
        }
    }

    /* --------------------------------------------------------- carry */

    /**
     * Chame logo depois de o React reordenar (useLayoutEffect), passando a posição
     * ANTIGA do elemento. Ele volta visualmente para lá e espera um robô levá-lo.
     */
    carry(el: HTMLElement, from: Rect): Promise<void> {
        return new Promise((resolve) => {
            const to = pageRect(el);
            const dx = from.x - to.x;
            const dy = from.y - to.y;
            if (this.disposed || el.getAttribute(STATE) !== "done" || Math.hypot(dx, dy) < 2) return resolve();
            el.style.transform = `translate(${dx}px, ${dy}px)`;
            this.queue.push({ el, mode: "carry", notBefore: performance.now(), from, to, resolve });
            this.pump();
        });
    }

    private async drawCarry(bot: Bot, job: Job) {
        const { el, from, to } = job;
        if (!from || !to) return;
        const t = this.speed();
        const grab = (r: Rect) => ({ x: r.x + Math.min(16, r.w / 2), y: r.y + r.h / 2 });
        const a = grab(from);
        const b = grab(to);

        bot.tool("arrow");
        const dist = Math.hypot(bot.pos.x - a.x, bot.pos.y - a.y);
        await done(bot.moveTo(a, clamp(dist * 0.8, 200, 600) * t));
        if (!el.isConnected || this.disposed) return;

        bot.press(true);
        const sel = document.createElement("div");
        sel.className = "dd-marquee dd-bbox";
        sel.style.setProperty("--c", bot.color);
        Object.assign(sel.style, { left: `${from.x}px`, top: `${from.y}px`, width: `${from.w}px`, height: `${from.h}px` });
        for (const h of ["nw", "ne", "se", "sw"]) {
            const s = document.createElement("i");
            s.className = `dd-h dd-h-${h}`;
            sel.appendChild(s);
        }
        this.layer.appendChild(sel);
        await sleep(90 * t);

        const ms = clamp(Math.hypot(to.x - from.x, to.y - from.y) * 1.1, 380, 900) * t;
        const ease = "cubic-bezier(.45,.05,.25,1)";
        const prevZ = el.style.zIndex;
        const prevPos = el.style.position;
        el.style.position = prevPos || "relative";
        el.style.zIndex = "5";
        const move = anim(el, 
            [{ transform: `translate(${from.x - to.x}px, ${from.y - to.y}px)` }, { transform: "translate(0px, 0px)" }],
            { duration: ms, easing: ease, fill: "forwards" },
        );
        anim(sel, [{ transform: "translate(0,0)" }, { transform: `translate(${to.x - from.x}px, ${to.y - from.y}px)` }], {
            duration: ms,
            easing: ease,
            fill: "forwards",
        });
        bot.moveTo(b, ms, ease);
        await done(move);
        el.style.transform = "";
        move.cancel();
        el.style.zIndex = prevZ;
        el.style.position = prevPos;
        bot.press(false);
        const fade = anim(sel, [{ opacity: 1 }, { opacity: 0 }], { duration: 220, fill: "forwards" });
        done(fade).then(() => sel.remove());
    }

    /* ----------------------------------------------------------- box */

    private async drawBox(bot: Bot, el: HTMLElement) {
        const t = this.speed();
        const r = pageRect(el);
        if (r.w < 2 || r.h < 2) return;

        // 1) vai até o canto superior esquerdo
        bot.tool("arrow");
        const dist = Math.hypot(bot.pos.x - r.x, bot.pos.y - r.y);
        await done(bot.moveTo({ x: r.x, y: r.y }, clamp(dist * 0.9, 220, 650) * t));
        if (this.gone(el)) return;

        // 2) arrasta a seleção (marching ants) com a medida W × H
        bot.press(true);
        const sel = document.createElement("div");
        sel.className = "dd-marquee";
        sel.style.setProperty("--c", bot.color);
        sel.style.left = `${r.x}px`;
        sel.style.top = `${r.y}px`;
        const size = document.createElement("span");
        size.className = "dd-size";
        sel.appendChild(size);
        this.layer.appendChild(sel);

        const dragMs = clamp(Math.hypot(r.w, r.h) * 0.9, 320, 700) * t;
        const grow = anim(sel, [{ width: "0px", height: "0px" }, { width: `${r.w}px`, height: `${r.h}px` }], {
            duration: dragMs,
            easing: "cubic-bezier(.3,.1,.3,1)",
            fill: "forwards",
        });
        bot.moveTo({ x: r.x + r.w, y: r.y + r.h }, dragMs, "cubic-bezier(.3,.1,.3,1)");
        let raf = 0;
        const tick = () => {
            const p = Number(grow.effect?.getComputedTiming().progress ?? 1);
            size.textContent = `${Math.round(r.w * p)} × ${Math.round(r.h * p)}`;
            raf = requestAnimationFrame(tick);
        };
        tick();
        await done(grow);
        cancelAnimationFrame(raf);
        size.textContent = `${Math.round(r.w)} × ${Math.round(r.h)}`;
        bot.press(false);

        // 3) caixa delimitadora com alças + contorno traçado pela caneta
        sel.classList.add("dd-bbox");
        for (const h of ["nw", "n", "ne", "e", "se", "s", "sw", "w"]) {
            const s = document.createElement("i");
            s.className = `dd-h dd-h-${h}`;
            sel.appendChild(s);
        }
        const svg = document.createElementNS(SVG_NS, "svg");
        svg.setAttribute("class", "dd-outline");
        svg.setAttribute("width", String(r.w));
        svg.setAttribute("height", String(r.h));
        const rect = document.createElementNS(SVG_NS, "rect");
        rect.setAttribute("x", "1");
        rect.setAttribute("y", "1");
        rect.setAttribute("width", String(Math.max(0, r.w - 2)));
        rect.setAttribute("height", String(Math.max(0, r.h - 2)));
        rect.setAttribute("pathLength", "1");
        svg.appendChild(rect);
        sel.appendChild(svg);

        bot.tool("pen");
        const traceMs = clamp((r.w + r.h) * 0.55, 380, 820) * t;
        anim(rect, [{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }], { duration: traceMs, easing: "linear", fill: "forwards" });
        await done(
            bot.path(
                [
                    { x: r.x, y: r.y },
                    { x: r.x + r.w, y: r.y },
                    { x: r.x + r.w, y: r.y + r.h },
                    { x: r.x, y: r.y + r.h },
                    { x: r.x, y: r.y },
                ],
                traceMs,
            ),
        );
        if (this.gone(el)) {
            sel.remove();
            return;
        }

        // 4) "renderiza": o conteúdo aparece de cima para baixo com uma linha de varredura
        const fillMs = clamp(r.h * 1.1, 320, 640) * t;
        el.setAttribute(STATE, "active");
        const reveal = anim(el, [{ clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)" }], {
            duration: fillMs,
            easing: "cubic-bezier(.4,0,.2,1)",
            fill: "both",
        });
        const scan = document.createElement("div");
        scan.className = "dd-scan";
        sel.appendChild(scan);
        anim(scan, [{ transform: "translateY(0)" }, { transform: `translateY(${r.h}px)` }], {
            duration: fillMs,
            easing: "cubic-bezier(.4,0,.2,1)",
            fill: "forwards",
        });
        bot.tool("arrow");
        bot.moveTo({ x: r.x + r.w * 0.5, y: r.y + r.h + 10 }, fillMs, "cubic-bezier(.4,0,.2,1)");
        await done(reveal);
        el.setAttribute(STATE, "done");
        reveal.cancel();

        const fade = anim(sel, [{ opacity: 1 }, { opacity: 0 }], { duration: 260 * t, easing: "ease-out", fill: "forwards" });
        done(fade).then(() => sel.remove());
    }

    /* ---------------------------------------------------------- line */

    private async drawLine(bot: Bot, el: HTMLElement) {
        const t = this.speed();
        const r = pageRect(el);
        if (r.w < 1 && r.h < 1) return;
        const vertical = r.h > r.w;
        const a = vertical ? { x: r.x + r.w / 2, y: r.y } : { x: r.x, y: r.y + r.h / 2 };
        const b = vertical ? { x: r.x + r.w / 2, y: r.y + r.h } : { x: r.x + r.w, y: r.y + r.h / 2 };

        bot.tool("pen");
        const dist = Math.hypot(bot.pos.x - a.x, bot.pos.y - a.y);
        await done(bot.moveTo(a, clamp(dist * 0.8, 200, 600) * t));
        if (this.gone(el)) return;

        bot.press(true);
        const len = vertical ? r.h : r.w;
        const ms = clamp(len * 0.45, 260, 900) * t;
        el.setAttribute(STATE, "active");
        const reveal = anim(el, 
            [{ clipPath: vertical ? "inset(0 0 100% 0)" : "inset(0 100% 0 0)" }, { clipPath: "inset(0 0 0 0)" }],
            { duration: ms, easing: "cubic-bezier(.5,0,.3,1)", fill: "both" },
        );
        bot.moveTo(b, ms, "cubic-bezier(.5,0,.3,1)");
        await done(reveal);
        bot.press(false);
        el.setAttribute(STATE, "done");
        reveal.cancel();
    }

    /* ---------------------------------------------------------- type */

    /** Caixa de cada caractere visível, relativa ao elemento (para o recorte e o cursor). */
    private measureText(root: HTMLElement) {
        const base = root.getBoundingClientRect();
        const marks: Array<{ left: number; right: number; top: number; bottom: number; ch: string }> = [];
        const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
            acceptNode(node) {
                const p = node.parentElement;
                if (!p || p.closest("[data-draw-skip]")) return NodeFilter.FILTER_REJECT;
                if (p.closest("[data-draw]") !== root) return NodeFilter.FILTER_REJECT; // alvo aninhado tem o próprio robô
                return NodeFilter.FILTER_ACCEPT;
            },
        });
        const range = document.createRange();
        for (let node = walker.nextNode(); node; node = walker.nextNode()) {
            const text = node.nodeValue ?? "";
            for (let i = 0; i < text.length; i++) {
                if (/\s/.test(text[i])) continue;
                range.setStart(node, i);
                range.setEnd(node, i + 1);
                const rects = range.getClientRects();
                const r = rects[rects.length - 1];
                if (!r || !r.width) continue;
                marks.push({ left: r.left - base.left, right: r.right - base.left, top: r.top - base.top, bottom: r.bottom - base.top, ch: text[i] });
            }
        }
        return marks;
    }

    private async drawType(bot: Bot, el: HTMLElement) {
        const t = this.speed();
        const marks = this.measureText(el);
        if (!marks.length) return;
        const base = pageRect(el);
        const first = marks[0];

        // vai até o início do texto, vira I-beam e clica
        const click = { x: base.x + first.left + 1, y: base.y + (first.top + first.bottom) / 2 };
        bot.tool("arrow");
        const dist = Math.hypot(bot.pos.x - click.x, bot.pos.y - click.y);
        const ms = clamp(dist * 0.85, 220, 620) * t;
        const iTimer = setTimeout(() => bot.tool("ibeam"), ms * 0.7);
        await done(bot.moveTo(click, ms));
        clearTimeout(iTimer);
        if (this.gone(el)) return;
        bot.tool("ibeam");
        bot.press(true);
        await sleep(110 * t);
        bot.press(false);
        if (this.gone(el)) return;

        // Recorte em "escada": linhas de cima inteiras + linha atual até o caractere.
        // O texto fica no lugar final o tempo todo: nenhuma letra muda de posição.
        const clipTo = (i: number) => {
            if (i < 0) return "inset(0 100% 100% 0)";
            const m = marks[i];
            return `polygon(-50% -50%, 150% -50%, 150% ${m.top}px, ${m.right}px ${m.top}px, ${m.right}px ${m.bottom + 2}px, -50% ${m.bottom + 2}px)`;
        };
        const prevClip = el.style.clipPath;
        el.style.clipPath = clipTo(-1);
        el.setAttribute(STATE, "active");

        const caret = document.createElement("span");
        caret.className = "dd-caret";
        caret.style.setProperty("--c", bot.color);
        this.layer.appendChild(caret);
        const placeCaret = (i: number) => {
            const m = i < 0 ? { right: first.left, top: first.top, bottom: first.bottom } : marks[i];
            caret.style.left = `${base.x + m.right}px`;
            caret.style.top = `${base.y + m.top}px`;
            caret.style.height = `${m.bottom - m.top}px`;
        };
        placeCaret(-1);

        // a mão sai de cima do texto enquanto "digita"
        bot.moveTo({ x: click.x + 10, y: click.y + Math.max(18, (first.bottom - first.top) * 0.9) }, 260, "ease-out");

        const n = marks.length;
        const per = n < 30 ? 62 : n < 90 ? 30 : Math.max(4, 1500 / n);
        const schedule: number[] = [];
        let acc = 0;
        for (let i = 0; i < n; i++) {
            acc += per * t * (0.6 + Math.random() * 0.8) * (/[.,!?:;]/.test(marks[i].ch) ? 2.2 : 1);
            schedule.push(acc);
        }

        try {
            await new Promise<void>((resolve) => {
                let last = performance.now();
                let now = 0; // tempo "dos robôs": anda mais rápido quando há pressa
                let i = 0;
                const step = () => {
                    if (this.gone(el)) return resolve();
                    const real = performance.now();
                    now += (real - last) * RATE;
                    last = real;
                    let moved = false;
                    while (i < n && schedule[i] <= now) {
                        i++;
                        moved = true;
                    }
                    if (moved) {
                        el.style.clipPath = clipTo(i - 1);
                        placeCaret(i - 1);
                    }
                    if (i >= n) return resolve();
                    requestAnimationFrame(step);
                };
                requestAnimationFrame(step);
            });
            if (!this.gone(el)) {
                caret.classList.add("dd-caret-idle");
                await sleep(520 * t);
            }
        } finally {
            caret.remove();
            el.style.clipPath = prevClip;
        }
    }

    dispose() {
        this.disposed = true;
        for (const job of this.queue) {
            if (job.mode === "carry") {
                job.el.style.transform = "";
                job.resolve?.();
            }
        }
        this.queue = [];
        if (this.pumpTimer) clearTimeout(this.pumpTimer);
        if (this.rushTimer) clearTimeout(this.rushTimer);
        RATE = 1;
        applied = 1;
        this.io.disconnect();
        window.removeEventListener("scroll", this.onScroll);
        window.removeEventListener("resize", this.onScroll);
        cancelAnimationFrame(this.slideRaf);
        this.mo.disconnect();
        this.bots.forEach((b) => b.destroy());
        this.bots = [];
        this.layer.remove();
        // nada pode ficar escondido no meio do caminho
        document.querySelectorAll<HTMLElement>("[data-draw]").forEach((el) => {
            const s = el.getAttribute(STATE);
            if (s && s !== "done") el.removeAttribute(STATE);
        });
    }
}

let current: DrawDirector | null = null;

/** O diretor ativo (null com "reduzir movimento" ou antes de montar). */
export const getDirector = () => current;

export function startDrawing(): () => void {
    if (typeof window === "undefined") return () => undefined;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window) || !("animate" in HTMLElement.prototype)) {
        document.documentElement.classList.add("dd-off");
        DrawDirector.revealAll();
        document.querySelectorAll("[data-slide]").forEach((el) => el.setAttribute("data-slide-in", ""));
        return () => undefined;
    }
    const d = new DrawDirector();
    current = d;
    // inspeção no console em desenvolvimento: window.__drawDirector
    if (process.env.NODE_ENV !== "production") (window as unknown as { __drawDirector?: DrawDirector }).__drawDirector = d;
    return () => {
        d.dispose();
        if (current === d) current = null;
    };
}
