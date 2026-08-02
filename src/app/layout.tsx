import type { Metadata } from "next";
import "./globals.css";
import Hydrate from "./components/Hydrate";
import Header from "./components/Header/Navbar";
import { Suspense } from "react";

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
      <body className="overflow-x-hidden">
        <Hydrate>
          {/* Cabeçalho do site */}
          <Header />
          {/* Suspense para lidar com carregamento assíncrono */}
          <Suspense fallback={<div>Carregando...</div>}>
            {children}
          </Suspense>
        </Hydrate>
      </body>
    </html>
  );
}
