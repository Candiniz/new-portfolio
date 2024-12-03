import type { Metadata } from "next";
import "./globals.css";
import Hydrate from "./components/Hydrate";
import Header from "./components/Header";


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
        <Hydrate>
          <Header />
          
          {children}
        </Hydrate>
      </body>
    </html>
  );
}
