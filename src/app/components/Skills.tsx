'use client';

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import styled from 'styled-components';

import { SiStyledcomponents } from "react-icons/si";
import { ibmPlexMono, roboto } from "../fonts/Fonts";
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaFigma, FaWordpress, FaSass, FaDatabase, FaUniversalAccess } from "react-icons/fa";
import { RiNextjsFill, RiServerLine, RiTailwindCssFill } from "react-icons/ri";
import { SiTypescript } from "react-icons/si";
import { DiPhotoshop, DiIllustrator } from "react-icons/di";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from 'framer-motion';
import { MdSpeed } from "react-icons/md";
import { AiOutlineTool } from "react-icons/ai";

export const skills = [
    {
        icon: <FaHtml5 />,
        name: "HTML5",
        description: "HTML5 é a versão mais recente da linguagem de marcação para criar conteúdo estruturado na web.",
        descriptionTwo: "Tenho experiência sólida com HTML5, criando estruturas semânticas e acessíveis para websites. Utilizo as melhores práticas, como o uso correto de tags e atributos, para garantir SEO e acessibilidade ideais.\n \nMinha experiência com a linguagem começou em 2011, com um curso profissionalizante que me apresentou para o mercado, e desde então me continuo me aprimorando"
    },
    {
        icon: <FaCss3Alt />,
        name: "CSS3",
        description: "CSS3 é a folha de estilo usada para descrever a aparência de um documento HTML, com suporte para animações e layouts responsivos.",
        descriptionTwo: "Com CSS3, sou capaz de criar designs modernos e responsivos, aplicando animações, transições e layouts flexíveis que se adaptam a diferentes dispositivos.\n \nIgualmente ao HTML, possuo vários anos de experiência e tive a oportunidade de ver a sua evolução constante."
    },
    {
        icon: <FaJs />,
        name: "JavaScript",
        description: "JavaScript é uma linguagem de programação usada para criar interatividade em sites dinâmicos.",
        descriptionTwo: "Domino JavaScript para desenvolver funcionalidades dinâmicas e interativas. Tenho experiência com manipulação de DOM, integração de APIs e resolução de problemas em aplicações web."
    },
    {
        icon: <SiTypescript />,
        name: "TypeScript",
        description: "TypeScript é um superset do JavaScript, que adiciona tipagem estática e outros recursos avançados.",
        descriptionTwo: "Utilizo TypeScript para escrever código mais robusto e escalável, aproveitando a tipagem estática para evitar erros e melhorar a manutenção de projetos complexos. Juntamente com o NextJS 15, estas são minhas principais ferramentas atualmente."
    },
    {
        icon: <RiNextjsFill />,
        name: "Next.js",
        description: "Next.js é um framework React que facilita a criação de aplicações com renderização no servidor (SSR) e geração de sites estáticos.",
        descriptionTwo: "Tenho experiência em construir aplicações modernas com Next.js, utilizando SSR e SSG para melhorar a performance e SEO, além de lidar com rotas dinâmicas e otimização de imagens. Esta é minha principal ferramente atualmente e pretendo me aprofundar cada vez mais nessa incrivel ferramenta."
    },
    {
        icon: <FaReact />,
        name: "React",
        description: "React é uma biblioteca JavaScript para construir interfaces de usuário interativas e baseadas em componentes.",
        descriptionTwo: "Possuo um ótimo conhecimento em React, sendo capaz de criar componentes reutilizáveis e gerenciar estados complexos com ferramentas como Context API e Redux, garantindo interfaces rápidas e escaláveis."
    },
    {
        icon: <DiPhotoshop />,
        name: "Photoshop",
        description: "Adobe Photoshop é um software de edição de imagens amplamente utilizado para edição de gráficos e fotos.",
        descriptionTwo: "Uso o Photoshop para edição e manipulação de imagens, criação de mockups e otimização de gráficos para projetos web, sempre buscando qualidade visual profissional. Possuo mais de 8 anos de experiência na ferramenta, tendo atuado com a mesma como Arquiteto, Designer Gráfico, Projetista e atuamente Desenvolvedor Front End"
    },
    {
        icon: <DiIllustrator />,
        name: "Illustrator",
        description: "Adobe Illustrator é um software de design gráfico vetorial usado para criar ilustrações e logotipos.",
        descriptionTwo: "Utilizo o Illustrator para desenvolver logotipos e elementos gráficos vetoriais com precisão, garantindo que sejam escaláveis sem perda de qualidade."
    },
    {
        icon: <FaFigma />,
        name: "Figma",
        description: "Figma é uma ferramenta de design colaborativo para criar interfaces de usuário, protótipos e gráficos.",
        descriptionTwo: "Com Figma, desenvolvo interfaces de usuário detalhadas e protótipos interativos, colaborando diretamente com equipes de design e desenvolvimento, sendo esta uma das principais ferramentas por mim utilizadas no brainstorm de um projeto"
    },
    {
        icon: <FaWordpress />,
        name: "WordPress",
        description: "WordPress é um sistema de gerenciamento de conteúdo (CMS) usado para criar e gerenciar sites e blogs.",
        descriptionTwo: "Tenho certa experiência em criar sites personalizados no WordPress, ajustando temas, configurando plugins e otimizando o desempenho do site."
    },
    {
        icon: <RiTailwindCssFill />,
        name: "Tailwind CSS",
        description: "Tailwind CSS é um framework de CSS utilitário que facilita a criação de designs personalizados e responsivos.",
        descriptionTwo: "Utilizo Tailwind CSS para desenvolver rapidamente layouts responsivos e modernos, aproveitando sua abordagem baseada em utilitários para designs personalizados, sendo um aliado praticamente indispensável para a versaticidade e praticidade juntamente com o NextJS."
    },
    {
        icon: <FaSass />,
        name: "Sass",
        description: "Sass é um pré-processador de CSS que adiciona funcionalidades como variáveis, funções e mixins ao CSS.",
        descriptionTwo: "Com Sass, escrevo estilos de maneira modular e eficiente, utilizando mixins, funções e variáveis para criar códigos reutilizáveis e fáceis de manter."
    },
    {
        icon: <SiStyledcomponents />,
        name: "CSS in JS",
        description: "Estilização moderna e dinâmica de componentes utilizando CSS-in-JS.",
        descriptionTwo: "Tenho experiência com CSS-in-JS, criando estilos dinâmicos e escaláveis diretamente no JavaScript para aplicações modernas. Utilizo ferramentas como Styled-Components, Emotion e Tailwind CSS para criar interfaces visuais consistentes e reutilizáveis.\n\nMinha abordagem inclui a criação de temas personalizados, suporte a modos claro e escuro, e animações suaves para melhorar a experiência do usuário. Sou adepto das melhores práticas, garantindo código limpo e manutenção simplificada em projetos de diferentes tamanhos."
    },
];

export const extraSkills = [
    {
        icon: <FaDatabase />,
        name: "SQL",
        description: "Linguagem usada para gerenciar e consultar bancos de dados relacionais.",
        descriptionTwo: "Tenho conhecimento em SQL, criando e otimizando consultas complexas para extrair dados de maneira eficiente em bancos relacionais como MySQL e PostgreSQL.\n \nTenho experiência trabalhando com os banco de dados da Vercel, da Supabase e de algumas outras."
    },
    {
        icon: <RiServerLine />,
        name: "Servidores",
        description: "Noções de configuração e gerenciamento básico de servidores.",
        descriptionTwo: "Compreendo conceitos de servidores, incluindo configuração básica, manutenção e monitoramento para garantir um ambiente estável e seguro."
    },
    {
        icon: <MdSpeed />,
        name: "Performance",
        description: "Técnicas de otimização para melhorar a performance das aplicações web.",
        descriptionTwo: "Estou focando meus estudos atuais em otimizar a performance web, reduzindo tempos de carregamento e utilizando técnicas como lazy loading, minificação e caching."
    },
    {
        icon: <FaUniversalAccess />,
        name: "Acessibilidade",
        description: "Práticas para tornar interfaces acessíveis a todos.",
        descriptionTwo: "Prioritizo a acessibilidade em meus projetos sempre seguindo a metodologia 'Mobile First', garantindo que as interfaces sejam utilizáveis por pessoas com diferentes habilidades."
    },
    {
        icon: <AiOutlineTool />,
        name: "Construção de API's",
        description: "Desenvolvimento e manutenção de APIs para comunicação entre diferentes sistemas e plataformas.",
        descriptionTwo: "Tenho certa experiência no desenvolvimento e manutenção de APIs, tanto RESTful quanto GraphQL, garantindo performance, segurança e escalabilidade. Construo soluções robustas que permitem a integração de diferentes sistemas, serviços e plataformas, atendendo às necessidades específicas de cada projeto. Já trabalhei com tecnologias e frameworks como Node.js e Express para criar APIs que conectam frontends e bancos de dados de forma eficiente. "
    },
];



// Função para simular o efeito de digitação
const typingEffect = (text: string, callback: () => void) => {
    let index = 0;
    const interval = setInterval(() => {
        const element = document.getElementById("typing-title");
        if (element) {
            element.textContent = text.slice(0, index + 1);
            index++;
        }
        if (index === text.length) {
            clearInterval(interval);
            callback();
        }
    }, 100);
};

interface DotProps {
    selected: boolean;
}

const DotsWrapper = styled.div`
  position: absolute;
  bottom: 20px; /* Ajuste a posição */
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 1;
`;

const Dot = styled.div<DotProps>`
  width: 16px;
  height: 16px;
  margin: 0 5px;  /* Distância entre os pontos */
  border-radius: 50%;
  background-color: ${(props) => (props.selected ? '#4CAF50' : '#ccc')}; /* Cor verde quando selecionado */
  transition: background-color 0.3s ease, transform 0.3s ease;
  cursor: pointer;

  /* Torna os pontos maiores quando não estão selecionados */
  &:hover {
    transform: scale(1.3);
  }

  /* Estilo para o ponto selecionado */
  ${(props) =>
        props.selected &&
        `
    transform: scale(1.5); /* Aumenta o tamanho do ponto selecionado */
    background-color: #4CAF50; /* Cor verde */
  `}
`;

const AnimatedTrapezoidalDiv = styled(motion.div)`
    width: 600px;
    height: 100vh;
    left: 0;
    background-color: black;
    position: fixed;
    bottom: 0;
    clip-path: polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%);
    z-index: 40;

  @media (max-width: 1024px) {
    clip-path: polygon(0% 20%, 100% 0%, 100% 100%, 0% 100%);
    width: 100%;
    height: 40vh;
  }
`;

const AnimatedTrapezoidalDiv2 = styled(motion.div)`
    width: 600px;
    height: 100vh;
    left: 0;
    margin-bottom: 0px;
    margin-left: 20px;
    background-color: #aadd49;
    position: fixed;
    bottom: 0;
    clip-path: polygon(25% 0%, 85% 0%, 100% 100%, 0% 100%);
    z-index: 39;


  @media (max-width: 1024px) {
    clip-path: polygon(0% 25%, 100% 0%, 100% 100%, 0% 100%);
    width: 100%;
    height: 40vh;
    margin-bottom: 20px;
    margin-left: 0px;
  }
`;


export default function Skills() {
    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 1024);
    const [isTypingDone, setIsTypingDone] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState<{
        icon: JSX.Element,
        name: string,
        description: string,
        descriptionTwo: string
    } | null>(null);



    useEffect(() => {
        const handleResize = () => {
            setIsLargeScreen(window.innerWidth > 1024);
        };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    // Efeito de digitação
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const element = document.getElementById("typing-title");

                    if (entry.isIntersecting) {
                        if (element) element.textContent = ""; // Garante que o texto esteja vazio antes de reiniciar
                        setIsTypingDone(false); // Reinicia o estado para reiniciar o efeito
                        typingEffect("Habilidades", () => setIsTypingDone(true));
                    } else {
                        if (element) element.textContent = ""; // Remove o texto quando sai da viewport
                        setIsTypingDone(false); // Garante que o cursor _ também desapareça
                    }
                });
            },
            { threshold: 0.5 }
        );

        const target = document.getElementById("title-container");
        if (target) observer.observe(target);

        return () => observer.disconnect();
    }, []);

    const openModal = (skill: {
        icon: JSX.Element;
        name: string;
        description: string;
        descriptionTwo: string;
    }) => {
        setModalData(skill);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        const handleScroll = () => {
            const skillsDiv = document.querySelectorAll('.skill');
            const windowHeight = window.innerHeight;
            const scrollY = window.scrollY;

            skillsDiv.forEach((skillDiv) => {
                const skillElement = skillDiv as HTMLElement;
                const skillTop = skillElement.getBoundingClientRect().top + scrollY;
                const skillHeight = skillElement.offsetHeight;

                if (scrollY + windowHeight > skillTop && scrollY < skillTop + skillHeight) {
                    skillElement.classList.add('visible');
                } else {
                    skillElement.classList.remove('visible');
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            {/* Cabeçalho com efeito de digitação */}
            <div className="w-full scroll-mt-24" id="skills">
                <div
                    id="title-container"
                    className="bg-gradient-to-t from-[#303446] to-[#30344600] h-fit w-full"
                >
                    <h2
                        className={`${roboto.className} lg:pl-9 text-4xl z-[1] md:text-5xl font-bold lg:text-7xl py-4 text-center lg:text-left text-[#fff] flex items-center justify-center lg:justify-start`}
                    >
                        <span id="typing-title"></span>
                        <span
                            className={`text-[#aadd49] ${isTypingDone ? "visible" : "invisible"
                                }`}
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

            {/* Conteúdo com ícones e habilidades */}
            <div className="relative overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover md:bg-center bg-fixed bg-no-repeat z-[0] h-full w-full "
                    style={{
                        backgroundImage: "url('/me-in-park.jpg')",
                        backgroundPosition: "70% center",
                    }}
                ></div>
                <Carousel
                    preventMovementUntilSwipeScrollTolerance={true}
                    swipeScrollTolerance={200}
                    dynamicHeight={true}
                    showThumbs={false}
                    showStatus={false}
                    showArrows={true}
                    swipeable={true}
                    emulateTouch={true}
                    renderIndicator={(clickHandler, isSelected, index) => {
                        return (
                            <DotsWrapper key={index}>
                                <Dot
                                    selected={!isSelected}  // Passando a prop 'selected' para aplicar o estilo correto
                                    onClick={clickHandler}
                                />
                                {/* Adicionando um segundo ponto ao lado */}
                                <Dot
                                    selected={isSelected}  // O segundo ponto vai refletir a seleção também
                                    onClick={clickHandler}
                                />
                            </DotsWrapper>
                        );
                    }}
                    infiniteLoop={true}
                >
                    <div
                        className={`${ibmPlexMono.className}  space-y-16 flex flex-col items-center md:items-start text-center`}
                    >
                        <div
                            className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-4  gap-8 my-20 w-fit md:ml-10 lg:ml-28"
                        >
                            {skills.map((skill, index) => (
                                <div
                                    key={index}
                                    className="bg-gradient-to-t from-[#9497a555] to-[#3034461c] rounded-t-2xl skill flex flex-col items-center justify-center relative group opacity-0 transform -translate-x-24 transition-all duration-500 w-20 h-20 md:w-28 md:h-28"
                                    onClick={() => openModal(skill)}
                                >
                                    <div className="relative group">
                                        <div className="w-full h-full flex items-center justify-center border-transparent transition-all duration-300 overflow-hidden">
                                            <div className="text-5xl md:text-6xl text-[#fff] group-hover:text-[#aadd49] group-hover:opacity-30 transition-all duration-300">
                                                {skill.icon}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="absolute bottom-0 w-full h-[2px] bg-[#aadd49] z-30 group-hover:shadow-[0_0_15px_2px_#aadd49] transition-shadow duration-300"></div>
                                    <div className="absolute inset-0 flex items-center rounded-t-2xl justify-center bg-[#63667169] bg-opacity-80 text-[#fff] opacity-0 group-hover:opacity-100 transition-opacity duration-300 select-none">
                                        {skill.name}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div
                        className={`${ibmPlexMono.className}  space-y-16 flex flex-col items-center md:items-start text-center`}
                    >
                        <div
                            className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-4  gap-8 my-20 w-fit md:ml-10 lg:ml-28"
                        >
                            {extraSkills.map((extraSkill, index) => (
                                <div
                                    key={index}
                                    className="bg-gradient-to-t from-[#9497a555] to-[#3034461c] rounded-t-2xl skill flex flex-col items-center justify-center relative group opacity-0 transform -translate-x-24 transition-all duration-500 w-20 h-20 md:w-28 md:h-28"
                                    onClick={() => openModal(extraSkill)}
                                >
                                    <div className="relative group">
                                        <div className="w-full h-full flex items-center justify-center border-transparent transition-all duration-300 overflow-hidden">
                                            <div className="text-5xl md:text-6xl text-[#fff] group-hover:text-[#aadd49] group-hover:opacity-30 transition-all duration-300">
                                                {extraSkill.icon}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="absolute bottom-0 w-full h-[2px] bg-[#aadd49] z-30 group-hover:shadow-[0_0_15px_2px_#aadd49] transition-shadow duration-300"></div>
                                    <div className="absolute inset-0 flex items-center rounded-t-2xl justify-center bg-[#63667169] bg-opacity-80 text-[#fff] opacity-0 group-hover:opacity-100 transition-opacity duration-300 select-none">
                                        {extraSkill.name}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Carousel>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && modalData && (
                    <>
                        <motion.div
                            className={`${roboto.className} fixed inset-0 bg-black bg-opacity-50 flex justify-center md:justify-end items-center z-50 backdrop-blur-sm`}
                            onClick={closeModal}
                            initial={{ opacity: 0 }} // Inicia invisível
                            animate={{ opacity: 1 }} // Fica visível
                            exit={{ opacity: 0 }} // Sai de forma suave
                            transition={{ duration: 0.3 }} // Transição suave
                        >
                            <motion.div
                                className="bg-black text-white p-6 mb-96 md:mr-10 lg:mr-20 xl:mr-36 rounded-lg w-80"
                                onClick={(e) => e.stopPropagation()}
                                initial={{ scale: 0.9 }} // Inicializa o modal pequeno
                                animate={{ scale: 1 }} // Expande para o tamanho normal
                                exit={{ scale: 0.9 }} // Encolhe ao fechar
                                transition={{ duration: 0.3 }} // Transição suave
                                style={{
                                    borderLeft: "4px solid #aadd49",
                                    borderBottom: "4px solid #aadd49",
                                }}
                            >
                                <h3 className="text-2xl font-bold flex items-center gap-5">
                                    <span className="text-[#aadd49]">{modalData.icon}</span>
                                    {modalData.name}
                                </h3>
                                <p className="mt-2 text-sm ">{modalData.description}</p>
                                <button
                                    className="mt-4 bg-[#aadd49] text-black px-4 py-2 rounded cursor-pointer hover:bg-[#d9fa9a] transition-all duration-300"
                                    onClick={closeModal}
                                >
                                    Fechar
                                </button>
                            </motion.div>
                            <AnimatedTrapezoidalDiv
                                className="flex items-center justify-center px-16 sm:px-24 md:px-28 lg:px-36 pt-10 text-justify"
                                onClick={(e) => e.stopPropagation()}
                                initial={{ opacity: 0, x: isLargeScreen ? -100 : 0, y: isLargeScreen ? 0 : 100 }}
                                animate={{ opacity: 1, x: 0, y: 0 }}
                                exit={{ opacity: 0, x: isLargeScreen ? 100 : 0, y: isLargeScreen ? 0 : 100 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div>
                                    <p className="text-[#aadd49] text-[10px] lg:text-sm border-t-2 border-b-2 border-[#aadd49] py-3">
                                        {modalData.descriptionTwo.split("\n").map((line, index) => (
                                            <span key={index}>{line}<br /></span> // Renderiza cada linha com <br />
                                        ))}
                                    </p>
                                </div>
                            </AnimatedTrapezoidalDiv>
                            <AnimatedTrapezoidalDiv2
                                className="scale-125"
                                initial={{
                                    opacity: 0,
                                    color: 'black',
                                    x: isLargeScreen ? -100 : 0,
                                    y: isLargeScreen ? 0 : 100
                                }}
                                animate={{
                                    opacity: 1,
                                    color: '#aadd49',
                                    x: 0,
                                    y: 0,
                                }}
                                exit={{ opacity: 0, color: 'black', x: isLargeScreen ? 100 : 0, y: isLargeScreen ? 0 : 100 }}
                                transition={{
                                    duration: 0.5,
                                    ease: "easeInOut",
                                    type: "spring",
                                    stiffness: 100,
                                    damping: 20
                                }}
                            />
                        </motion.div>

                    </>
                )}
            </AnimatePresence>
        </>
    );
}
