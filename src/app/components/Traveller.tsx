/* eslint-disable @next/next/no-img-element */

import "../globals.css";
import { oswald, roboto } from "../fonts/Fonts";
import InstagramFeed from "./Instagram/InstagramFeed";
import AnimatedFeed from "./AnimatedFeed";
import fitty from "fitty";
import { useEffect, useState } from "react";
import { createGlobalStyle } from "styled-components";
import InstagramHeader, { ProfileData } from "./Instagram/InstaHeader";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { CarouselPost, Post } from '../types/Home';

import { AiOutlineClose } from 'react-icons/ai';
import { FaRegQuestionCircle } from "react-icons/fa";

import styles from './Traveller.module.css'
import BaloonTooltip from "./BaloonTooltip";


const GlobalStyle = createGlobalStyle`
  /* Estilize scrollbars apenas dentro de containers específicos */
  .custom-scrollbar-container {
    overflow-y: auto; /* Ativa o scroll personalizado */
  }

  /* Aplica o estilo do scrollbar somente em telas médias ou maiores */
  @media (min-width: 768px) {
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
  }
`;






export const Traveller: React.FC = () => {
  const [isFeedModalOpen, setIsFeedModalOpen] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  const [isPostModalOpen, setIsPostModalOpen] = useState<boolean>(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  useEffect(() => {
    if (isFeedModalOpen || isPostModalOpen) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = ""; // Reseta ao desmontar
    };
  }, [isFeedModalOpen, isPostModalOpen]);

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  // Função para abrir e fechar o modal de post específico
  const openPostModal = (post: Post) => {
    setSelectedPost(post);
    setIsPostModalOpen(true);
  };
  const closePostModal = () => {
    setSelectedPost(null);
    setIsPostModalOpen(false);
  };


  // Use o efeito para carregar os dados do perfil e posts apenas uma vez
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/instagram/profile");
        if (!res.ok) throw new Error("Erro ao carregar os dados do perfil.");
        const data = await res.json();
        setProfileData(data);
      } catch (err) {
        console.error("Erro ao carregar perfil:", err);
      }
    };

    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/instagram");
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(
            `Erro ao carregar os posts do Instagram. Status: ${res.status}, Mensagem: ${errorData.message}`
          );
        }
        const data = await res.json();
        setPosts(data); // Carregue os posts
      } catch (err) {
        console.error("Erro ao carregar posts:", err);
      }
    };

    fetchProfile();
    fetchPosts();
  }, []); // Chama uma vez ao carregar a página

  useEffect(() => { fitty("#h1e") }, []);


  const openFeedModal = () => { setIsFeedModalOpen(true); };
  const closeFeedModal = () => { setIsFeedModalOpen(false); };

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
          <p className={`${oswald.className} bg-clip-text-traveller text-justify lg:px-20 2xl:text-[1.5rem] xl:px-5 ml-3`}>
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
          className="h-fit bg-[#fff] flex flex-col-reverse md:flex-row p-5 gap-5"
          id="insta"
        >
          <div className="relative w-[95%] md:w-[60%] h-fit m-auto">
            <motion.div
              className="absolute top-0 left-4 w-10 h-10 rounded-full bg-[#aadd49] flex items-center justify-center text-3xl z-30"
              animate={{
                scale: [1, 1.05, 1],  // Pulsando de 1 para 1.1 e voltando para 1
              }}
              transition={{
                duration: 1,          // Duração do ciclo
                repeat: Infinity,     // Repetir infinitamente
                repeatType: "loop",   // Loop contínuo
                ease: "easeInOut",    // Efeito de easing
              }}
            >
              <FaRegQuestionCircle />
              <BaloonTooltip />
            </motion.div>
            <div className={styles.custom_scroll_container}>
              <div>
                <InstagramHeader isInModal={false} profileData={profileData} /> {/* Passe os dados carregados */}
                <InstagramFeed openPostModal={openPostModal} posts={posts} />
              </div>
              <div className="h-full w-[0.1rem] ml-[2px] bg-[#ffffff]"></div>
            </div>
            <button
              onClick={openFeedModal}
              className="absolute bottom-0 left-0 right-0 text-center bg-black bg-opacity-75 text-white py-2 hover:bg-opacity-90 w-full md:w-[calc(100%-20px)]"
            >
              Ver Mais
            </button>


          </div>

          {/* Modal de feed completo */}
          <AnimatePresence>
            {isFeedModalOpen && (

              <motion.div
                onClick={closeFeedModal}
                className="fixed inset-0 z-40 flex items-center justify-center backdrop-blur-md"
                initial={{ opacity: 0 }}  // Começa com opacidade 0 (invisível)
                animate={{ opacity: 1 }}  // Finaliza com opacidade 1 (visível)
                exit={{ opacity: 0 }}  // Sai com opacidade 0 (invisível)
                transition={{ duration: 0.3 }}  // Duração do fade-in/fade-out
              >
                <button
                  onClick={closeFeedModal}
                  className="fixed top-2 right-2 text-white text-4xl hover:text-red-500 hover:scale-110 transition-all z-50"
                >
                  <AiOutlineClose />
                </button>
                <motion.div
                  className="relative max-w-4xl w-full h-full bg-[#2d2d2d] rounded-t-2xl"
                  initial={{ y: "100%" }}  // Começa fora da tela (abaixo)
                  animate={{ y: 0 }}  // Move para a posição original
                  exit={{ y: "100%" }}  // Sai para fora da tela (abaixo)
                  transition={{ duration: 0.5 }}  // Duração da animação de movimento
                >
                  <div onClick={stopPropagation} className="absolute bottom-0 px-5 rounded-lg h-[90vh] overflow-hidden">
                    <div className={styles.custom_scroll_modal} >
                      <InstagramHeader isInModal={true} profileData={profileData} />
                      <InstagramFeed openPostModal={openPostModal} posts={posts} />
                    </div>
                  </div>
                </motion.div>
              </motion.div>

            )}
          </AnimatePresence>

          {/* Modal para post específico */}
          <AnimatePresence>
            {isPostModalOpen && selectedPost && (
              <motion.div
                className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-end justify-center"
                onClick={closePostModal}
                initial={{ opacity: 0 }}  // Inicia com opacidade 0
                animate={{ opacity: 1 }}   // Anima até opacidade 1
                exit={{ opacity: 0 }}      // Quando sair, anima para opacidade 0
                transition={{ duration: 0.3 }} // Transição suave de 0.3 segundos
              >
                <motion.div
                  onClick={stopPropagation}
                  className={styles.postsModal}
                  initial={{ y: "100%" }}  // Inicia com escala menor
                  animate={{ y: 0 }}    // Anima até a escala normal
                  exit={{ y: "100%" }}     // Quando sair, escala para baixo
                  transition={{ duration: 0.3 }} // Transição suave de 0.3 segundos]
                >
                  <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex gap-2 items-center justify-center w-full">
                    <div className="bg-[#5c5c5c] rounded-full w-[200px] h-[20px] z-50"></div>
                    <div className="bg-[#5c5c5c] rounded-full w-[20px] h-[20px] z-50"></div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Impede que o clique no botão propague
                      closePostModal();
                    }}
                    className="absolute top-2 right-2 text-xl text-white"
                  >
                    <AiOutlineClose />
                  </button>
                  <div className="flex flex-col items-center">
                    {selectedPost.media_type === "IMAGE" && (
                      <img
                        src={selectedPost.media_url}
                        alt={selectedPost.caption}
                        className="w-full max-h-[80vh] object-contain rounded-lg"
                      />
                    )}
                    {selectedPost.media_type === "VIDEO" && (
                      <video
                        controls
                        className="w-full max-h-[80vh] object-contain rounded-lg"
                        src={selectedPost.media_url}
                        preload="metadata"
                      />
                    )}
                    {selectedPost.media_type === "CAROUSEL_ALBUM" &&
                      (selectedPost as CarouselPost).children.length > 0 && (
                        <div className="w-full h-full">
                          {(selectedPost as CarouselPost).children.map((child, index) => (
                            <img
                              key={index}
                              src={child.media_url}
                              alt={`Carrossel ${selectedPost.id} - ${index + 1}`}
                              className="w-full max-h-[80vh] object-contain rounded-lg mb-5"
                            />
                          ))}
                        </div>
                      )}
                    <div className="mt-4 max-h-[300px] overflow-y-auto p-2">
                      <p className="text-lg font-semibold">{selectedPost.caption}</p>
                      <div className="text-sm text-gray-400 mt-2 pb-5 w-full border-b-[1px]">
                        {selectedPost.caption.match(/#\w+/g)?.map((tag, idx) => (
                          <span key={idx} className="mb-20"> {tag} </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-500 text-xs mt-20 mb-3">Componente projado por Anderson Diniz (2024)</p>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className={`flex flex-col items-start md:w-[40%] md:h-fit mb-10 text-[#222] ${oswald.className}`}>
            <div id="h1e">COESÃO E HARMONIA</div>
            <div
              className={`${roboto.className} text-[0.79rem] sm:text-xs md:text-sm flex flex-row`}
            >
              <div className="mx-auto w-[80%] md:w-[70%] xl:w-[60%] text-justify h-full flex flex-col">
                <div className="w-full mr-3 md:mr-0 ">
                  <AnimatedFeed />
                </div>
                <p className="px-2 md:px-0 text-[#222]">
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
                </p>
              </div>
              <div className="w-[20%] md:w-[30%] xl:w-[40%] h-auto ml-4 bg-[#ffffff] flex items-center justify-center shadow-inner-deep overflow-hidden">
                <div className="relative w-2 bg-black h-[90%] flex flex-col justify-between items-center shadow-custom-circle">
                  {/* Brasil */}
                  <div className="z-10 w-10 h-10 rounded-full bg-black border-4 border-black flex items-center justify-center transform transition-transform hover:scale-[2] shadow-custom-circle hover:shadow-custom-hover">
                    <Image src="/br.png" alt="Bandeira do Brasil" className="rounded-full w-full h-full" width={40} height={40} />
                  </div>
                  {/* Irlanda */}
                  <div className="z-10 w-10 h-10 rounded-full bg-black border-4 border-black flex items-center justify-center transform transition-transform hover:scale-[2] shadow-custom-circle hover:shadow-custom-hover">
                    <Image src="/ir.png" alt="Bandeira da Irlanda" className="rounded-full w-full h-full" width={40} height={40} />
                  </div>
                  {/* Inglaterra */}
                  <div className="z-10 w-10 h-10 rounded-full bg-black border-4 border-black flex items-center justify-center transform transition-transform hover:scale-[2] shadow-custom-circle hover:shadow-custom-hover">
                    <Image src="/en.png" alt="Bandeira da Inglaterra" className="rounded-full w-full h-full" width={40} height={40} />
                  </div>
                  {/* Escócia */}
                  <div className="z-10 w-10 h-10 rounded-full bg-black border-4 border-black flex items-center justify-center transform transition-transform hover:scale-[2] shadow-custom-circle hover:shadow-custom-hover">
                    <Image src="/sc.png" alt="Bandeira da Escócia" className="rounded-full w-full h-full" width={40} height={40} />
                  </div>
                  {/* Marrocos */}
                  <div className="z-10 w-10 h-10 rounded-full bg-black border-4 border-black flex items-center justify-center transform transition-transform hover:scale-[2] shadow-custom-circle hover:shadow-custom-hover">
                    <Image src="/mc.png" alt="Bandeira de Marrocos" className="rounded-full w-full h-full" width={40} height={40} />
                  </div>
                  {/* França */}
                  <div className="z-10 w-10 h-10 rounded-full bg-black border-4 border-black flex items-center justify-center transform transition-transform hover:scale-[2] shadow-custom-circle hover:shadow-custom-hover">
                    <Image src="/fr.png" alt="Bandeira da França" className="rounded-full w-full h-full" width={40} height={40} />
                  </div>
                  {/* Itália */}
                  <div className="z-10 w-10 h-10 rounded-full bg-black border-4 border-black flex items-center justify-center transform transition-transform hover:scale-[2] shadow-custom-circle hover:shadow-custom-hover">
                    <Image src="/it.png" alt="Bandeira da Itália" className="rounded-full w-full h-full" width={40} height={40} />
                  </div>


                  <div className={`${oswald.className} absolute top-[100px] inset-0 rotate-12`}>
                    <motion.div
                      className="flex space-x-8 text-6xl font-bold text-gray-500 opacity-10 text-nowrap "
                      style={{
                        transform: "rotate(20deg)",
                      }}
                      animate={{ x: ["0vw", "-100vw"] }}
                      transition={{
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 30,
                        ease: "linear",
                      }}
                    >
                      <span>PAÍSES QUE VISITEI NO MEU INTERCÂMBIO •</span>
                      <span>PAÍSES QUE VISITEI NO MEU INTERCÂMBIO •</span>
                      <span>PAÍSES QUE VISITEI NO MEU INTERCÂMBIO •</span>

                    </motion.div>
                  </div>
                  <div className={`${oswald.className} absolute top-[160px] inset-0 rotate-12`}>
                    <motion.div
                      className="flex space-x-8 text-6xl font-bold text-gray-500 opacity-10 text-nowrap "
                      style={{
                        transform: "rotate(20deg)",
                      }}
                      animate={{ x: ["0vw", "-100vw"] }}
                      transition={{
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 25,
                        ease: "linear",
                      }}
                    >
                      <span>PAÍSES QUE VISITEI NO MEU INTERCÂMBIO •</span>
                      <span>PAÍSES QUE VISITEI NO MEU INTERCÂMBIO •</span>
                      <span>PAÍSES QUE VISITEI NO MEU INTERCÂMBIO •</span>

                    </motion.div>
                  </div>
                  <div className={`${oswald.className} absolute top-[220px] inset-0 rotate-12`}>
                    <motion.div
                      className="flex space-x-8 text-6xl font-bold text-gray-500 opacity-10 text-nowrap "
                      style={{
                        transform: "rotate(20deg)",
                      }}
                      animate={{ x: ["0vw", "-100vw"] }}
                      transition={{
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 20,
                        ease: "linear",
                      }}
                    >
                      <span>PAÍSES QUE VISITEI NO MEU INTERCÂMBIO •</span>
                      <span>PAÍSES QUE VISITEI NO MEU INTERCÂMBIO •</span>
                      <span>PAÍSES QUE VISITEI NO MEU INTERCÂMBIO •</span>

                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative h-auto w-full bg-white wave-div">
          <div className="relative inset-0 z-20">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" style={{ display: "block" }}>
              <path fill="#000000" fillOpacity="1" d="M0,160L48,181.3C96,203,192,245,288,240C384,235,480,181,576,176C672,171,768,213,864,234.7C960,256,1056,256,1152,250.7C1248,245,1344,235,1392,229.3L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
          </div>
          <div className="absolute inset-0 z-10">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" style={{ display: "block" }}>
              <path fill="#d6d6d6" fillOpacity="1" d="M0,288L80,288C160,288,320,288,480,250.7C640,213,800,139,960,117.3C1120,96,1280,128,1360,144L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
            </svg>
          </div>
          <div className="w-full absolute left-0 -bottom-2 h-5 bg-blackz-30"></div>
        </div>




      </div >
    </>
  )
}

export default Traveller;