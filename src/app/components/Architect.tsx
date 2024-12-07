import "../globals.css";
import { oswald } from "../fonts/Fonts";
import { Carousel } from "react-responsive-carousel";
import ArchitectCarousel from "./ArchitectCarousel";


// Função para rolar suavemente para o próximo vídeo
const scrollToAnchor = (e) => {
  e.preventDefault(); // Impede a alteração da URL
  const element = document.getElementById("hide-button"); // Alvo da rolagem suave
  const navbarHeight = 60; // Ajuste para a altura da sua navbar ou área fixa

  if (element) {
    window.scrollTo({
      top: element.offsetTop - navbarHeight, // Ajusta para não ser coberto pela navbar
      behavior: "smooth", // Rolagem suave
    });
  }
};

export default function Architect() {

  const projectImages = [
    {
      name: "Projeto de Casa Sobrado em São Paulo: fachada principal",
      link: "https://i.imgur.com/QErZmRb.jpeg",
      alt: "Projeto feito por mim para uma casa sobrado no bairro do morumbi na cidade de São Paulo para uma família de 5 pessoas.",
    },
    {
      name: "Projeto de Casa Sobrado em São Paulo: sala de jantar",
      link: "https://i.imgur.com/3T5oz0l.jpeg",
      alt: "Projeto feito por mim para uma casa sobrado no bairro do morumbi na cidade de São Paulo para uma família de 5 pessoas.",
    },
    {
      name: "Projeto de Casa Sobrado em São Paulo: sala de estar",
      link: "https://i.imgur.com/MqX0Srs.jpeg",
      alt: "Projeto feito por mim para uma casa sobrado no bairro do morumbi na cidade de São Paulo para uma família de 5 pessoas.",
    },
    {
      name: "Projeto de Interiores: Apartamento em Osasco: sala e cozinha",
      link: "https://i.imgur.com/82I8CLu.jpeg",
      alt: "Projeto feito por mim para um apartamento no centro da cidade de Osasco para uma família de 4 pessoas.",
    },
    {
      name: "Projeto de Interiores: Apartamento em Osasco: vista pro painel & sala de jantar",
      link: "https://i.imgur.com/bMVFkgo.jpeg",
      alt: "Projeto feito por mim para um apartamento no centro da cidade de Osasco para uma família de 4 pessoas.",
    },
    {
      name: "Projeto de Interiores: Apartamento em Osasco: varanda",
      link: "https://i.imgur.com/TXfU8zU.jpeg",
      alt: "Projeto feito por mim para um apartamento no centro da cidade de Osasco para uma família de 4 pessoas.",
    },
    {
      name: "Projeto de Interiores: Apartamento em Osasco: detalhe da marcenaria do balcão",
      link: "https://i.imgur.com/PFmpdEd.jpeg",
      alt: "Projeto feito por mim para um apartamento no centro da cidade de Osasco para uma família de 4 pessoas.",
    },
    {
      name: "Projeto de Interiores: Apartamento em Osasco: quarto do casal",
      link: "https://i.imgur.com/LilJMCU.png",
      alt: "Projeto feito por mim para um apartamento no centro da cidade de Osasco para uma família de 4 pessoas.",
    },
  ]


  return (
    <div className="w-full h-fit mt-20">
      <div className="relative w-full h-72 mb-3">
        <div className="absolute top-0 right-0 inset-0 bg-gradient-to-b from-black to-transparent z-[11] "></div>
        <div className="bg-clip-text-bar-architect w-full h-full relative z-10">
        </div>
      </div>
      <div className="inset-0  flex justify-center items-center bg-black/80">
        <div className="w-full">
          <div className="bg-clip-text-bar-architect bg-architect-h w-auto mr-3 mb-1  2xl:h-28"></div>
          <h1 className={`${oswald.className} text-transparent text-right lg:text-left font-bold pr-4 bg-clip-text-architect text-4xl md:text-6xl lg:text-7xl xl:text-[6.6vw] 2xl:text-[11rem] 2xl:px-4 ml-3`}>
            <span className="text-4xl md:text-6xl lg:text-7xl xl:text-[6.6vw] 2xl:text-[10.2rem] text-nowrap">ARQUITETO &</span><br />URBANISTA
          </h1>
          <div className="bg-clip-text-bar-architect bg-architect-h w-auto mr-3 mt-2 lg:block 2xl:block 2xl:h-10 2xl:mt-4"></div>
        </div>
        <p className={`${oswald.className} bg-clip-text-architect text-justify  2xl:text-[1.5rem] gxl:px-15 mr-3`}>
          Sou Arquiteto Urbanista formado pela Universidade Anhembi Morumbi, com pós-graduação em BIM pela PUC/RS. Minha experiência profissional inclui atuação como arquiteto, designer de interiores e em projetos de móveis planejados, o que me permitiu desenvolver uma visão integrada do processo criativo e da execução.
        </p>
      </div>
      <div className="bg-clip-text-bar-architect h-20 w-full 2xl:block mt-3 mb-4 lg:mb-0">
      </div>
      <div>
        <ArchitectCarousel />
      </div>
    </div>
  );
}
