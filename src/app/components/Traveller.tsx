
import "../globals.css";
import { oswald, roboto } from "../fonts/Fonts";
import InstagramFeed from "./Instagram/InstagramFeed";
import AnimatedFeed from "./AnimatedFeed";
import fitty from "fitty";
import { useEffect } from "react";



export default function Traveller() {

  useEffect(() => {
    // Este hook será chamado após o componente ser montado
    fitty("#h1e");
  }, []);

  return (
    <div className="w-full h-fit aspect-video mt-20">

      <div className="relative w-full h-72 lg:mb-0">
        <div className="absolute top-0 right-0 inset-0 bg-gradient-to-b from-black to-transparent z-[11] "></div>
        <div className="bg-clip-text-bar-traveller w-full h-full relative z-10">
        </div>
      </div>

      <div className="inset-0 flex lg:flex-row justify-center items-center  bg-black/80">
        <p className={`${oswald.className} bg-clip-text-traveller text-justify lg:px-20 2xl:text-[1.5rem] 2xl:px-5 ml-3`}>
          Traveling is one of my greatest passions. I had the opportunity to study English in Ireland for a year and a half at ELI Language School in Drogheda, and I reached an advanced C1 level in the language. During my travels through Europe and Africa, I met incredible minds and learned a lot about architecture and technology. If you&apos;re also interested in these topics, it would be a pleasure to have you on our Instagram, where I share a bit of these experiences and discoveries!
        </p>
        <div className="w-full">
          <div className="bg-clip-text-bar-traveller bg-traveller-h w-auto ml-3 mt-3 2xl:h-28"></div>
          <h1
            className={`
            ${oswald.className} 
            text-transparent text-left lg:text-center 2xl:text-left font-bold pl-3 bg-clip-text-traveller
              text-4xl md:text-6xl lg:text-7xl xl:text-[6.6vw] 2xl:text-[11rem] 2xl:px-4 mr-3
          `}
          >
            BACKPACKER & TRAVELLER
          </h1>
          <div className="bg-clip-text-bar-traveller bg-traveller-h w-auto ml-3 mt-2 lg:block 2xl:block 2xl:h-10 2xl:mt-4"></div>
        </div>
      </div>
      <div className="bg-clip-text-bar-traveller h-20 w-full 2xl:block mt-3 lg:mb-0">
      </div>

      <div className="w-[100%] md:w-[90vw] lg:w-[85vw] mx-auto">
        <div className="h-auto bg-[#1b1b1b] flex flex-col-reverse md:flex-row items-start justify-center p-5 gap-5" id="insta">
          <InstagramFeed />
          <div className={`flex flex-col items-start w-full ${oswald.className}`}>
            <div id="h1e" className="w-[100px]">COESÃO E HARMONIA</div>
            <div className={`${roboto.className} text-justify text-xs md:text-sm flex flex-row`}>
              <div className="mx-auto w-full sm:w-[60%] xl:w-[50%]">
                <div className="w-[60%] md:w-full float-left mr-3 md:mr-0"><AnimatedFeed /></div>
                Ao longo das minhas viagens, percebi como é importante organizar e planejar um feed no Instagram para contar uma história visual coesa. Cada viagem me ensinou a equilibrar estética, conteúdo e narrativa. Hoje, aplico esses conceitos ao meu feed, criando uma experiência envolvente e harmônica, ao compartilhar minhas aventuras e descobertas pelo mundo. Além disso, utilizo minha experiência e habilidades para criar interfaces web, onde consigo integrar os princípios de design e arquitetura que aprendi ao longo dos anos. Como designer e arquiteto, consigo trazer um olhar único e estratégico para cada projeto, buscando sempre a harmonia entre forma, função e experiência.
              </div>
              <div className="hidden sm:block w-[40%] xl:w-[50%] h-[full] ml-4 bg-[#353535]">
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}