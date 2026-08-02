'use client'

import "../globals.css";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { roboto } from "../fonts/Fonts";
import Musician from "./Musician";
import Traveller from "./Traveller";
import Architect from "./Architect";
import { useTypingEffect } from '../hooks/useTypingEffect'; // Ajuste o caminho conforme sua estrutura

export default function Trails() {
  const { displayedText, isTypingDone, containerRef } = useTypingEffect("Sobre mim");

  return (
    <>
      <div ref={containerRef} id="aboutMe" className="scroll-mt-24 mt-36">
        {/* Cabeçalho com efeito de digitação e gradiente no fundo */}
        <div
          id="trails-title-container"
          className="h-fit w-full"
        >
          <h2
            className={`${roboto.className} lg:pl-9 text-3xl z-[1] md:text-5xl font-bold lg:text-7xl py-4 text-center lg:text-left text-[#fff]`}
          >
            <span id="trails-typing-title">{displayedText}</span>
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
        <div className="bg-gray-800 h-[2px] w-full reveal" style={{ transitionDelay: "0.2s" }}></div>
        <div className="bg-gray-500 h-[4px] w-full mt-[4px] reveal" style={{ transitionDelay: "0.4s" }}></div>
        <div className="bg-[#aadd49] h-[6px] w-full mt-[4px] mb-20 reveal" style={{ transitionDelay: "0.6s" }}></div>
      </div>

      {/* Conteúdo dos componentes Traveller e Traveller */}
      <div className="">
        <Musician />
        <Traveller />
        <Architect />
      </div>
    </>
  );
}
