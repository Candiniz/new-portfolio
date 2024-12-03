/* eslint-disable @next/next/no-img-element */

import "../globals.css";
import { oswald, roboto } from "../fonts/Fonts";
import InstagramFeed from "./Instagram/InstagramFeed";
import AnimatedFeed from "./AnimatedFeed";
import fitty from "fitty";
import { useEffect, useState } from "react";
import { createGlobalStyle } from "styled-components";
import { Post } from "./Instagram/InstagramFeed"
import InstagramHeader from "./Instagram/InstaHeader";


const GlobalStyle = createGlobalStyle`
  /* Estilize scrollbars apenas dentro de containers específicos */
  .custom-scrollbar-container {
    overflow-y: auto; /* Ative o scroll personalizado */
  }

  .custom-scrollbar-container::-webkit-scrollbar {
    width: 18px;
    height: 8px;
  }

  .custom-scrollbar-container::-webkit-scrollbar-track {
    background: transparent;
  }

  .custom-scrollbar-container::-webkit-scrollbar-thumb {
    background-color: #d3d3d3;
    border-radius: 10px;
    border: 2px solid transparent;
    background-clip: content-box;
  }

  .custom-scrollbar-container::-webkit-scrollbar-thumb:hover {
    background-color: #aadd49;
  }
`;


export default function Traveller() {
  const [isFeedModalOpen, setIsFeedModalOpen] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]); // Aqui vamos armazenar os posts

  const openFeedModal = () => {
    setIsFeedModalOpen(true);
  };

  const closeFeedModal = () => {
    setIsFeedModalOpen(false);
  };

  const handlePosts = (postsFromChild: Post[]) => {
    setPosts(postsFromChild); // Armazenando os posts no pai
  };

  useEffect(() => {
    if (isFeedModalOpen) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = ""; // Reseta ao desmontar
    };
  }, [isFeedModalOpen]);

  useEffect(() => {
    fitty("#h1e");
  }, []);


  return (
    <>
      <GlobalStyle />
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

        <div
          className="h-fit bg-[#1b1b1b] flex flex-col-reverse md:flex-row p-5 gap-5"
          id="insta"
        >
          <div className="relative w-[95%] md:w-[60%] h-fit">
            <div className="custom-scrollbar-container mx-auto mt-3 overflow-y-auto h-[840px] w-full">
              <InstagramFeed
                openFeedModal={openFeedModal}
                onPosts={handlePosts}
              />
            </div>
            <button
              onClick={openFeedModal}
              className="absolute bottom-0 left-0 right-0 text-center bg-black bg-opacity-75 text-white py-2 hover:bg-opacity-90 w-full"
            >
              Ver Mais
            </button>
          </div>

          {/* Modal de feed completo */}
          {isFeedModalOpen && (
            <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center backdrop-blur-md">
              
              <div className="relative max-w-4xl w-full h-full bg-[#00000068]">
                <div className="absolute bottom-0 p-5 rounded-lg h-[90vh] overflow-y-auto custom-scrollbar-container">
                  <InstagramHeader isInModal={true} />
                  <button onClick={closeFeedModal} className="absolute top-2 right-2 text-xl text-gray-700">X</button>
                  <div className="grid grid-cols-3 gap-[0.1rem]">
                    {posts.map((post) => (
                      <div key={post.id} className="aspect-square cursor-pointer">
                        {post.media_type === "IMAGE" && (
                          <img src={post.media_url} alt={post.caption} className="w-full h-full object-cover" />
                        )}
                        {post.media_type === "VIDEO" && (
                          <img src={post.thumbnail_url || post.media_url} alt={post.caption} className="w-full h-full object-cover" />
                        )}
                        {post.media_type === "CAROUSEL_ALBUM" && "children" in post && (
                          <img src={post.children[0].media_url} alt={`Carrossel ${post.id}`} className="w-full h-full object-cover" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          )}

          <div className={`flex flex-col items-start md:w-[40%] md:h-fit mb-10 ${oswald.className}`}>
            <div id="h1e">COESÃO E HARMONIA</div>
            <div
              className={`${roboto.className} text-[0.79rem] sm:text-xs md:text-sm flex flex-row`}
            >
              <div className="mx-auto w-full md:w-[70%] xl:w-[60%] text-justify h-full">
                <div className="w-[60%] md:w-full float-left mr-3 md:mr-0 ">
                  <AnimatedFeed />
                </div>
                Ao longo das minhas viagens, percebi como é importante organizar e
                planejar um feed no Instagram para contar uma história visual coesa.
                Cada viagem me ensinou a equilibrar estética, conteúdo e narrativa.
                Hoje, aplico esses conceitos ao meu feed, criando uma experiência
                envolvente e harmônica, ao compartilhar minhas aventuras e descobertas
                pelo mundo.
                <br />
                <br />
                Além disso, utilizo minha experiência e habilidades para criar
                interfaces web, onde consigo integrar os princípios de design e
                arquitetura que aprendi ao longo dos anos. Como designer e arquiteto,
                consigo trazer um olhar único e estratégico para cada projeto, buscando
                sempre a harmonia entre forma, função e experiência.
              </div>
              <div className="hidden md:block md:w-[30%] xl:w-[40%] h-auto ml-4 bg-[#353535]"></div>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}