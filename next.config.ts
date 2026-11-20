import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // remotePatterns no lugar de "domains" (obsoleto): libera só o host necessário
    remotePatterns: [{ protocol: "https", hostname: "i.imgur.com" }],
  },
  reactStrictMode: true,
  // Sem experimental.globalNotFound: no Next 16.2.2 (Turbopack) ele deixava o servidor de
  // desenvolvimento recompilando o 404 global a cada 3 s, com a página aberta, até estourar a
  // memória. URL fora de /pt e /en cai no 404 padrão do Next; dentro delas, no [lang]/not-found.
};

export default nextConfig;
