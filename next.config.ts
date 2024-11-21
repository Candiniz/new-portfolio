import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["i.imgur.com"], // Adicione o domínio que você precisa
  },
  reactStrictMode: false, // Desativa o Strict Mode
};


export default nextConfig;
