#!/usr/bin/env node
/**
 * Traz as imagens que hoje moram no imgur para dentro do projeto (public/) e troca os endereços
 * no código. Motivo: o imgur é bloqueado em algumas redes (o antivírus da PG, por exemplo) e
 * recusa servidores de datacenter; com a imagem no próprio site, ela sempre carrega.
 *
 * Uso (na raiz do repositório):
 *   node scripts/trazer-imagens-imgur.mjs                 baixa do imgur (rode numa rede que alcance o imgur)
 *   node scripts/trazer-imagens-imgur.mjs --de <pasta>    copia de uma pasta onde você salvou as imagens à
 *                                                         mão; o nome do arquivo tem de ser o código do
 *                                                         imgur (ex.: jv21AnZ.png, QErZmRb.jpeg)
 *   node scripts/trazer-imagens-imgur.mjs --simular       só mostra o que faria, sem gravar nada
 *   node scripts/trazer-imagens-imgur.mjs --raiz <pasta>  trabalha em outra cópia do repositório (teste)
 *
 * Pode rodar quantas vezes quiser: a imagem que já está em public/ não é baixada de novo, e o
 * endereço só é trocado no código quando o arquivo local existe e é uma imagem de verdade.
 * Depois de rodar:  npm run build  →  git add public src  →  git commit
 */
import { mkdir, readdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";

const args = process.argv.slice(2);
const flag = (name) => args.includes(name);
const opt = (name) => {
    const i = args.indexOf(name);
    return i >= 0 ? args[i + 1] : undefined;
};
const ROOT = path.resolve(opt("--raiz") ?? process.cwd());
const FROM = opt("--de") ? path.resolve(opt("--de")) : null;
const DRY = flag("--simular");

const PROJECTS = "src/app/consts/projects.tsx";
const ARCH = "src/app/components/ArchitectCarousel.tsx";

// imgur → arquivo local (sem extensão: ela sai do tipo real da imagem)
const IMAGES = [
    ["https://i.imgur.com/jv21AnZ.png", "projects/new-portfolio", PROJECTS],
    ["https://i.imgur.com/KKA0tQm.png", "projects/restora", PROJECTS],
    ["https://i.imgur.com/VEkHZWi.png", "projects/disordle", PROJECTS],
    ["https://i.imgur.com/kEtAOJn.png", "projects/hexis", PROJECTS],
    ["https://i.imgur.com/41LaBQh.jpeg", "projects/sobrinha-artesanatos", PROJECTS],
    ["https://i.imgur.com/ekDJKin.png", "projects/projex", PROJECTS],
    ["https://i.imgur.com/08IldNi.png", "projects/old-portfolio", PROJECTS],
    ["https://i.imgur.com/Q9dAMhL.png", "projects/finance-control", PROJECTS],
    ["https://i.imgur.com/ZDoC8Du.png", "projects/mario-js", PROJECTS],
    ["https://i.imgur.com/Fp4eq94.png", "projects/iss-finder", PROJECTS],
    ["https://i.imgur.com/ZRekg3a.png", "projects/landing-page", PROJECTS],
    ["https://i.imgur.com/QErZmRb.jpeg", "architecture/01-sobrado-fachada", ARCH],
    ["https://i.imgur.com/3T5oz0l.jpeg", "architecture/02-sobrado-sala-de-jantar", ARCH],
    ["https://i.imgur.com/pDikUlP.jpeg", "architecture/03-sobrado-sala-de-estar", ARCH],
    ["https://i.imgur.com/82I8CLu.jpeg", "architecture/04-osasco-sala-e-cozinha", ARCH],
    ["https://i.imgur.com/bMVFkgo.jpeg", "architecture/05-osasco-painel-e-jantar", ARCH],
    ["https://i.imgur.com/TXfU8zU.jpeg", "architecture/06-osasco-varanda", ARCH],
    ["https://i.imgur.com/PFmpdEd.jpeg", "architecture/07-osasco-marcenaria", ARCH],
    ["https://i.imgur.com/LilJMCU.png", "architecture/08-osasco-quarto-do-casal", ARCH],
];

/** Tipo real pelos primeiros bytes (não confia na extensão nem no Content-Type). */
function kind(buf) {
    if (buf.length > 8 && buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) return "png";
    if (buf.length > 3 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return "jpg";
    if (buf.length > 12 && buf.toString("ascii", 0, 4) === "RIFF" && buf.toString("ascii", 8, 12) === "WEBP") return "webp";
    if (buf.length > 6 && buf.toString("ascii", 0, 3) === "GIF") return "gif";
    return null;
}
const MIN_BYTES = 2048; // página de erro e "imagem removida" do imgur são minúsculas

async function exists(p) {
    try {
        return (await stat(p)).size;
    } catch {
        return 0;
    }
}

/** Arquivo local que já existe para esse destino, com qualquer extensão de imagem. */
async function existing(dest) {
    for (const ext of ["png", "jpg", "webp", "gif"]) {
        const p = path.join(ROOT, "public", `${dest}.${ext}`);
        if ((await exists(p)) >= MIN_BYTES) return `${dest}.${ext}`;
    }
    return null;
}

async function fetchImage(url) {
    const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0 (portfolio image sync)" }, redirect: "follow" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    // o imgur responde 200 com uma imagem genérica de "removida" quando o arquivo não existe mais
    if (res.url.includes("removed")) throw new Error("o imgur diz que a imagem foi removida");
    return buf;
}

async function fromFolder(url) {
    const id = path.basename(new URL(url).pathname).replace(/\.[^.]+$/, "");
    const files = await readdir(FROM);
    const name = files.find((f) => f.replace(/\.[^.]+$/, "") === id);
    if (!name) throw new Error(`não achei ${id}.* em ${FROM}`);
    return { buf: await readFile(path.join(FROM, name)), src: path.join(FROM, name) };
}

const done = []; // [url, caminho público]
const failed = [];
console.log(`raiz: ${ROOT}${DRY ? "  (simulação: nada é gravado)" : ""}${FROM ? `\norigem: ${FROM}` : "\norigem: imgur"}\n`);

for (const [url, dest] of IMAGES) {
    const have = await existing(dest);
    if (have) {
        done.push([url, `/${have}`]);
        console.log(`  já existe   ${have}`);
        continue;
    }
    try {
        let buf;
        if (FROM) buf = (await fromFolder(url)).buf;
        else buf = await fetchImage(url);
        const ext = kind(buf);
        if (!ext) throw new Error("o arquivo não é PNG, JPEG, WebP nem GIF (página de erro?)");
        if (buf.length < MIN_BYTES) throw new Error(`pequeno demais (${buf.length} bytes)`);
        const rel = `${dest}.${ext}`;
        const out = path.join(ROOT, "public", rel);
        if (!DRY) {
            await mkdir(path.dirname(out), { recursive: true });
            await writeFile(out, buf);
        }
        done.push([url, `/${rel}`]);
        console.log(`  ${DRY ? "baixaria  " : "gravado   "} ${rel}  (${Math.round(buf.length / 1024)} KB)`);
    } catch (e) {
        failed.push([url, e.message]);
        console.log(`  FALHOU      ${url}  →  ${e.message}`);
    }
}

// troca no código só o que tem arquivo local de verdade
const byFile = new Map();
for (const [url, local] of done) {
    const file = IMAGES.find(([u]) => u === url)[2];
    if (!byFile.has(file)) byFile.set(file, []);
    byFile.get(file).push([url, local]);
}
let replaced = 0;
for (const [file, pairs] of byFile) {
    const p = path.join(ROOT, file);
    let src = await readFile(p, "utf8");
    let n = 0;
    for (const [url, local] of pairs) {
        if (src.includes(`"${url}"`)) {
            src = src.split(`"${url}"`).join(`"${local}"`);
            n++;
        }
    }
    if (n && !DRY) await writeFile(p, src);
    replaced += n;
    if (n) console.log(`\n  ${file}: ${n} endereço(s) ${DRY ? "seriam trocados" : "trocados"}`);
}

console.log(`\nresumo: ${done.length} de ${IMAGES.length} imagens no projeto, ${replaced} endereço(s) trocado(s), ${failed.length} falha(s)`);
if (failed.length) {
    console.log("as que falharam continuam apontando para o imgur; rode de novo em outra rede ou use --de <pasta>");
    process.exitCode = 1;
} else if (!DRY) {
    console.log("pronto: rode `npm run build` e faça o commit de public/ e src/");
}
