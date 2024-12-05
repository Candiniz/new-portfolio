import type { Metadata } from "next";
import "./globals.css";
import Hydrate from "./components/Hydrate";
import Header from "./components/Header";
import { createRoot } from "react-dom/client"; 
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: "Portfolio | Candiniz",
  description: "Portfolio profissional - Candiniz",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* Inicializando o Concurrent Mode usando createRoot */}
        <Hydrate>
          <Header />
          <Suspense fallback={<div>Carregando...</div>}>
            {/* Envolvendo children com Suspense */}
            {children}
          </Suspense>
        </Hydrate>
      </body>
    </html>
  );
}
