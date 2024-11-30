import "../globals.css";
import { oswald, roboto } from "../fonts/Fonts";
import { useState, useEffect } from "react";
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';


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

export default function Musician() {
  const [showAllVideos, setShowAllVideos] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const videos = [
    { src: "https://www.youtube.com/embed/RG8hZwLe-Qo?si=m_mse0I2PpNkFYE_", title: "Vídeo 1" },
    { src: "https://www.youtube.com/embed/ZdAqeWi1V-o?si=CKOWg-yn089sHkIB", title: "Vídeo 2" },
    { src: "https://www.youtube.com/embed/dZQvr1dZ1XU?si=9XXmJ_BZ0AbR_Qzn", title: "Vídeo 3" },
    { src: "https://www.youtube.com/embed/OlyoeHMPwn4?si=7RGIP0bjoXNizw7O", title: "Vídeo 4" },
    { src: "https://www.youtube.com/embed/fVNZ8wJJk4w?si=Lk3oaaVOhhKGYztV", title: "Vídeo 5" },
    { src: "https://www.youtube.com/embed/VK1OKgkkVi0?si=whKmhnuNjHWQjzbN", title: "Vídeo 6" },
  ];

  useEffect(() => {
    const updateIsMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    updateIsMobile();
    window.addEventListener('resize', updateIsMobile);

    return () => window.removeEventListener('resize', updateIsMobile);
  }, []);

  const visibleVideos = isMobile ? (showAllVideos ? videos : videos.slice(0, 2)) : videos;

  return (
    <div className="w-full h-fit aspect-video mt-20">
      <div className="relative w-full h-72 mb-3 lg:mb-0">
        <div className="absolute top-0 right-0 inset-0 bg-gradient-to-b from-black to-transparent z-[11] "></div>
        <div className="bg-clip-text-bar-musician w-full h-full relative z-10">
        </div>
      </div>
      <div className="inset-0 px-3 flex justify-center items-center bg-black/80">
        <div className="w-full">
          <div className="bg-clip-text-bar-musician bg-musician-h w-auto mr-3 mb-1 lg:hidden  2xl:h-28"></div>
          <h1 className={`${oswald.className} text-transparent text-right lg:text-left font-bold pr-4 bg-clip-text-musician text-4xl md:text-6xl lg:text-7xl xl:text-[6.6vw] 2xl:text-[11rem] 2xl:px-4`}>
            MUSICO & PRODUTOR MUSICAL
          </h1>
          <div className="bg-clip-text-bar-musician bg-musician-h w-auto mr-3 mt-2 lg:block 2xl:block 2xl:h-10 2xl:mt-4"></div>
        </div>
        <p className={`${oswald.className} bg-clip-text-musician text-justify lg:px-20 2xl:text-[1.5rem] 2xl:px-5`}>
          Sou um músico e cantor autodidata, tendo iniciado meus estudos aos 11 anos, e esse primeiro contato com o mundo da música me ajudou imensamente a abrir os horizontes e expandir minhas habilidades criativas, o que contribuiu para eu chegar até aqui e me tornar o profissional que sou hoje. Com mais de 30 músicas compostas e vários vídeos no meu canal do YouTube, sou grato a todos que me apoiaram e continuam me apoiando a fazer o que amo.
          <br />
          Além disso, possuo amplos conhecimentos em produção audiovisual e produção musical, o que me permite criar conteúdos completos e de alta qualidade, desde a concepção de uma ideia até sua realização final. Essa versatilidade me possibilita transmitir emoções e histórias de maneira autêntica e profissional.
        </p>
      </div>
      <div className="bg-clip-text-bar-musician h-20 w-full 2xl:block mt-3 lg:mb-0">
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {visibleVideos.map((video, index) => (
          <div id="hide-button" className="video-container" key={index}>
            <iframe
              src={video.src}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        ))}
      </div>

      {isMobile && (
  <div className={`${roboto.className} text-center w-full flex items-center justify-center mt-4`}>
    {!showAllVideos ? (
      <button
        onClick={(e) => {
          setShowAllVideos(true);
          scrollToAnchor(e); // Chama a rolagem suave quando clica em "Ver Mais"
        }}
        className="transition-all duration-300 text-white py-2 px-4 rounded flex flex-col items-center hover:text-[#aadd49]"
      >
        <RiArrowDownSLine size={30} className="hover:scale-150 transition-all duration-300" />
        <span className="text-xs mt-1">Mostrar mais</span>
      </button>
    ) : (
      <button
        onClick={(e) => {
          setShowAllVideos(false);
          scrollToAnchor(e); // Chama a rolagem suave quando clica em "Esconder"
        }}
        className="transition-all duration-300 text-white py-2 px-4 rounded flex flex-col items-center hover:text-red-500"
      >
        <RiArrowUpSLine size={30} className="hover:scale-150 transition-all " />
        <span className="text-xs mt-1">Esconder</span>
      </button>
    )}
  </div>
)}
    </div>
  );
}
