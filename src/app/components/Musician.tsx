
import "../globals.css";
import { oswald, roboto } from "../fonts/Fonts";
import { useState, useEffect } from "react";



export default function Musician() {

  const [showAllVideos, setShowAllVideos] = useState(false);
  const [isMobile, setIsMobile] = useState(false); // Para determinar se é mobile (menor que 'sm')

  // Lista dos vídeos
  const videos = [
    {
      src: "https://www.youtube.com/embed/RG8hZwLe-Qo?si=m_mse0I2PpNkFYE_",
      title: "Vídeo 1"
    },
    {
      src: "https://www.youtube.com/embed/ZdAqeWi1V-o?si=CKOWg-yn089sHkIB",
      title: "Vídeo 2"
    },
    {
      src: "https://www.youtube.com/embed/dZQvr1dZ1XU?si=9XXmJ_BZ0AbR_Qzn",
      title: "Vídeo 3"
    },
    {
      src: "https://www.youtube.com/embed/OlyoeHMPwn4?si=7RGIP0bjoXNizw7O",
      title: "Vídeo 4"
    },
    {
      src: "https://www.youtube.com/embed/fVNZ8wJJk4w?si=Lk3oaaVOhhKGYztV",
      title: "Vídeo 5"
    },
    {
      src: "https://www.youtube.com/embed/VK1OKgkkVi0?si=whKmhnuNjHWQjzbN",
      title: "Vídeo 6"
    }
  ];

  // Use effect para ajustar a visualização dos vídeos conforme a largura da tela
  useEffect(() => {
    const updateIsMobile = () => {
      setIsMobile(window.innerWidth < 640); // Tamanho 'sm' é 640px ou mais
    };

    // Chama a função inicialmente e em todas as mudanças de tamanho
    updateIsMobile();
    window.addEventListener('resize', updateIsMobile);

    // Limpeza ao desmontar o componente
    return () => window.removeEventListener('resize', updateIsMobile);
  }, []);

  // Condição para exibir os vídeos: se for mobile, controla o estado do "mostrar mais"
  const visibleVideos = isMobile ? (showAllVideos ? videos : videos.slice(0, 2)) : videos;


  return (
    <div className="w-full h-fit aspect-video my-36 scroll-mt-20" id="aboutMe">
      <div>
        <h2
          className={`${roboto.className} lg:pl-9 text-4xl z-[1] md:text-5xl font-bold lg:text-7xl py-4 text-center lg:text-left text-[#fff] flex items-center justify-center lg:justify-start`}
        >Sobre mim:</h2>
        <div className="bg-[#aadd49] h-[4px] w-full"></div>
      </div>
      <div className="inset-0 px-6 flex lg:flex-col items-center justify-center bg-black/80 py-10 h-fit">
        <h1
          className={`
            ${oswald.className} 
            text-transparent text-right xl:text-left font-bold pr-4 bg-clip-text
            text-4xl md:text-6xl lg:text-7xl xl:text-[6.6vw] 2xl:text-[11rem]
            2xl:px-4
          `}
        >
          MUSICO & PRODUTOR MUSICAL
        </h1>
        <p className={`${oswald.className} pt-5 bg-clip-text text-justify lg:px-20 2xl:text-[1.5rem] 2xl:px-5`}>
          Sou um músico e cantor autodidata, tendo iniciado meus estudos aos 11 anos, e esse primeiro contato com o mundo da música me ajudou imensamente a abrir os horizontes e expandir minhas habilidades criativas, o que contribuiu para eu chegar até aqui e me tornar o profissional que sou hoje. Com mais de 30 músicas compostas e vários vídeos no meu canal do YouTube, sou grato a todos que me apoiaram e continuam me apoiando a fazer o que amo.
          <br />
          Além disso, possuo amplos conhecimentos em produção audiovisual e produção musical, o que me permite criar conteúdos completos e de alta qualidade, desde a concepção de uma ideia até sua realização final. Essa versatilidade me possibilita transmitir emoções e histórias de maneira autêntica e profissional.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {/* Renderiza os vídeos visíveis */}
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

      {/* Botão "Ver Mais" ou "Esconder" */}
      {isMobile && (
        <div className="text-center mt-4">
          {!showAllVideos ? (
            <button
              onClick={() => setShowAllVideos(true)}
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Ver Mais
            </button>
          ) : (
            <a href="#hide-button" className="block sm:hidden">
              <button
                onClick={() => setShowAllVideos(false)}
                className="bg-red-500 text-white py-2 px-4 rounded"
              >
                Esconder
              </button>
            </a>
          )}
        </div>
      )}
    </div>
  )
}