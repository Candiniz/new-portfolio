'use client'

import "../globals.css";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { oswald, roboto } from "../fonts/Fonts";
import Musician from "./Musician";
import Traveller from "./Traveller";
import { useEffect, useState } from "react";

// Função de efeito de digitação
const typingEffect = (text: string, callback: () => void) => {
    let index = 0;
    const element = document.getElementById("trails-typing-title");
    if (element) element.classList.remove("visible"); // Garante invisibilidade inicial

    const interval = setInterval(() => {
        if (element) {
            element.textContent = text.slice(0, index + 1);
            index++;
            if (index === text.length) {
                clearInterval(interval);
                if (element) element.classList.add("visible"); // Torna visível após digitar
                callback();
            }
        }
    }, 100);
};

export default function Trails() {
  const [isTypingDone, setIsTypingDone] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const element = document.getElementById("trails-typing-title");

          if (entry.isIntersecting) {
            if (element) element.textContent = ""; // Limpa texto ao entrar na viewport
            setIsTypingDone(false); // Reinicia o estado
            typingEffect("Sobre Mim:", () => setIsTypingDone(true));
          } else {
            if (element) element.textContent = ""; // Garante que o texto desapareça ao sair
            setIsTypingDone(false); // Desativa o estado
          }
        });
      },
      { threshold: 0.5 } // Aciona quando 50% do título está visível
    );

    const target = document.getElementById("trails-title-container");
    if (target) observer.observe(target);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div id="aboutMe" className="scroll-mt-24 mt-36">
        {/* Cabeçalho com efeito de digitação e gradiente no fundo */}
        <div
          id="trails-title-container"
          className="h-fit w-full"
        >
          <h2
            className={`${roboto.className} lg:pl-9 text-3xl z-[1] md:text-5xl font-bold lg:text-7xl py-4 text-center lg:text-left text-[#fff]`}
          >
            <span id="trails-typing-title"></span>
            <span
              className={`text-[#aadd49] ${isTypingDone ? "visible" : "invisible"}`}
              style={{
                marginLeft: "5px",
                animation: "blink 1s steps(1, end) infinite",
              }}
            >
              _
            </span>
          </h2>
        </div>
        <div className="bg-[#676767] h-[2px] w-full"></div>
      </div>

      {/* Conteúdo dos componentes Traveller e Traveller */}
      <div className="">
        <Musician />
        <Traveller />
      </div>
    </>
  );
}
