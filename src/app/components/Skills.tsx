'use client';

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import styled from 'styled-components';

import { SiNodedotjs, SiStyledcomponents } from "react-icons/si";
import { ibmPlexMono, roboto } from "../fonts/Fonts";
import { FaJs, FaReact, FaFigma, FaAws, FaSass, FaNodeJs, FaCcStripe, FaMicrosoft, FaGoogle } from "react-icons/fa";
import { RiNextjsFill, RiTailwindCssFill, RiSupabaseLine } from "react-icons/ri";
import { BiLogoMongodb } from "react-icons/bi";
import { SiTypescript, SiPrisma, SiFirebase } from "react-icons/si";
import { DiPhotoshop, DiIllustrator, DiPostgresql } from "react-icons/di";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from 'framer-motion';
import { FaMeta } from "react-icons/fa6";
import { FaPython } from "react-icons/fa";
import { SiGooglecloud } from "react-icons/si";
import { SiN8N } from "react-icons/si";

import PPLogo from "./PPLogo"



export const skills = (closeModal: () => void) => [
    {
        icons: [<SiTypescript />, <RiNextjsFill />],
        name: "TypeScript & Next.js 15",
        description: "Desenvolvimento Full Stack moderno com tipagem estática e renderização de alta performance.",
        descriptionTwo: "Minha stack principal para construção de aplicações robustas. Utilizo TypeScript para garantir segurança de tipos e manutenibilidade, explorando os recursos mais recentes do Next.js 15 (App Router, Server Actions) para entregar performance máxima e SEO otimizado."
    },
    {
        icons: [<RiTailwindCssFill />, <FaSass />, <SiStyledcomponents />],
        name: "Modern Styling (Tailwind & Ecosystem)",
        description: "Criação de interfaces responsivas e sistemas de design eficientes utilizando utilitários e CSS moderno.",
        descriptionTwo: "Especialista em Tailwind CSS para prototipagem rápida e layouts escaláveis. Possuo sólida experiência com Styled-Components, Sass e bibliotecas de animação (Framer Motion), focando sempre em acessibilidade, temas dinâmicos e experiência do usuário (UX)."
    },
    {
        icons: [<FaReact />, <FaJs />],
        name: "React Ecosystem",
        description: "Criação de interfaces modulares e gerenciamento de estados complexos.",
        descriptionTwo: "Domínio de hooks avançados, Context API e gerenciamento de estado global. Foco em arquitetura de componentes reutilizáveis e otimização de renderização para aplicações single-page de grande escala."
    },
    {
        icons: [<DiPhotoshop />, <DiIllustrator />, <FaFigma />],
        name: "Design & Creative Vision",
        description: "Mais de 8 anos de experiência em design visual, manipulação de imagens e criação de identidades.",
        descriptionTwo: "Background sólido como Arquiteto e Designer Gráfico utilizando Photoshop e Illustrator. Essa base me permite transitar entre o design e o código com facilidade, criando interfaces que são tecnicamente precisas e visualmente profissionais."
    },
    {
        icons: [<PPLogo />, <FaMicrosoft />],
        name: "Microsoft Power Platform",
        description: "Automação de processos empresariais e desenvolvimento Low-Code de alto impacto.",
        descriptionTwo: "Desenvolvimento de soluções no ecossistema Microsoft (Power Apps, Power Automate) integradas a SharePoint, SQL e APIs externas. Foco em transformar fluxos manuais em processos digitais eficientes e inteligentes."
    },
    {
        icons: <FaPython />,
        name: "Python & Automation",
        description: "Scripts de automação, manipulação de dados e integração com inteligência artificial.",
        descriptionTwo: "Conhecimentos em Python voltados para a criação de ferramentas auxiliares, web scraping e integração de modelos de IA, complementando a stack de desenvolvimento com versatilidade."
    },
    {
        icons: [<SiPrisma />, <DiPostgresql />, <RiSupabaseLine />],
        name: "Bancos de Dados Relacionais",
        description: "Gerenciamento de dados estruturados utilizando PostgreSQL com foco em integridade, performance e modelagem relacional.",
        descriptionTwo: "Experiência no design de esquemas e manipulação de dados complexos. Utilizo o Prisma ORM para garantir consultas tipadas e seguras, além de integrar essas soluções com Supabase para backends rápidos e escaláveis"
    },
    {
        icons: [<SiNodedotjs />, <SiFirebase />],
        name: "Back-end & Infraestrutura",
        description: "Desenvolvimento de servidores robustos e integração com serviços de nuvem para armazenamento e processamento.",
        descriptionTwo: "Construção de APIs RESTful e GraphQL com Node.js/Express, utilizando AWS (S3) para persistência de arquivos e Firebase para funcionalidades em tempo real e autenticação rápida."
    },
    {
        icons: [<SiGooglecloud />, <FaGoogle />],
        name: "Google Cloud Platform",
        description: "Plataforma de infraestrutura em nuvem que oferece computação, armazenamento e inteligência de dados com a segurança e escala do Google",
        descriptionTwo: "Gerencio recursos em nuvem focados em escalabilidade e disponibilidade. Tenho experiência prática na configuração de buckets para armazenamento, deploy de aplicações e integração de serviços gerenciados para otimizar o ciclo de vida do software."
    },
    {
        icons: <FaCcStripe />,
        name: "Stripe",
        description: "Stripe é uma plataforma líder para gerenciamento de pagamentos online.",
        descriptionTwo: "Tenho experiência no uso do Stripe para integrar pagamentos seguros e eficientes, implementando desde transações simples até soluções de assinatura e webhook para automação financeira."
    },
    {
        icons: <SiN8N />,
        name: "IA, Agentes, Orquestração (n8n)",
        description: "Desenvolvimento de sistemas autônomos e fluxos inteligentes que utilizam LLMs (Large Language Models) para executar tarefas complexas e processamento de dados.",
        descriptionTwo: "Especialista na criação de Agentes de IA orquestrados via n8n, conectando modelos de linguagem a ferramentas externas, bancos de dados e APIs. Desenvolvo automações de 'malha fechada' (Human-in-the-loop), onde a IA raciocina sobre os dados, toma decisões e executa ações em larga escala, otimizando processos que antes exigiam intervenção manual constante."
    },
    {
        icons: <FaMeta />,
        name: "Construção de Apps Meta",
        description: "Desenvolvimento de aplicativos interativos e otimizados para a plataforma Meta.",
        descriptionTwo: (
            <>

                Tenho experiência no desenvolvimento de aplicativos para o ecossistema Meta, incluindo integração com APIs do Facebook, Instagram e WhatsApp. Desenvolvo aplicações interativas, otimizadas e seguras, aproveitando ferramentas como o GraphQL e o Meta SDK.<br /><br />
                Possuo um componente simples demonstrativo feito com base em dados coletados pelo meu app meta linkado com meu instagram pessoal{" "}
                <a className="text-yellow-400 font-bold hover:text-yellow-200"
                    href="#insta"
                    onClick={(e) => {
                        e.preventDefault();
                        const targetElement = document.getElementById('insta');
                        if (targetElement) {
                            targetElement.scrollIntoView({ behavior: 'smooth' });
                        }
                        closeModal();
                    }}
                >
                    aqui
                </a>

            </>
        )
    },
];



// Função para simular o efeito de digitação
const typingEffect = (text: string, elementId: string, callback: () => void) => {
    let index = 0;
    const element = document.getElementById(elementId);
    const interval = setInterval(() => {
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
    const [isTypingTitleDone, setIsTypingTitleDone] = useState(false);
    const [isTypingTextDone, setIsTypingTextDone] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState<{
        icons: JSX.Element | JSX.Element[],
        name: string,
        description: string,
        descriptionTwo: string | JSX.Element;
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
                    const element = document.getElementById("skills-typing-title");

                    if (entry.isIntersecting) {
                        if (element) element.textContent = ""; // Garante que o texto esteja vazio antes de reiniciar
                        setIsTypingTitleDone(false); // Reinicia o estado para reiniciar o efeito
                        typingEffect("Habilidades", "skills-typing-title", () => setIsTypingTitleDone(true));
                    } else {
                        if (element) element.textContent = ""; // Remove o texto quando sai da viewport
                        setIsTypingTitleDone(false); // Garante que o cursor _ também desapareça
                    }
                });
            },
            { threshold: 0.5 }
        );

        const target = document.getElementById("title-container");
        if (target) observer.observe(target);

        return () => observer.disconnect();
    }, []);

    // Efeito de digitação para o parágrafo
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const element = document.getElementById("skills-typing-text");

                    if (entry.isIntersecting) {
                        if (element) element.textContent = ""; // Garante que o texto esteja vazio antes de reiniciar
                        setIsTypingTextDone(false); // Reinicia o estado para reiniciar o efeito
                        typingEffect("Um pouco do que sei e do que estou aprendendo \\(^_^)\/", "skills-typing-text", () => setIsTypingTextDone(true));
                    } else {
                        if (element) element.textContent = ""; // Remove o texto quando sai da viewport
                        setIsTypingTextDone(false); // Garante que o cursor _ também desapareça
                    }
                });
            },
            { threshold: 0.5 }
        );

        const target = document.getElementById("skills-text-container");
        if (target) observer.observe(target);

        return () => observer.disconnect();
    }, []);


    const openModal = (skill: {
        icons: JSX.Element | JSX.Element[];
        name: string;
        description: string;
        descriptionTwo: string | JSX.Element;
    }) => {
        setModalData(skill);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const SkillIcon = ({ icons }) => {
        const [index, setIndex] = useState(0);
        const [fade, setFade] = useState(true);

        useEffect(() => {
            if (!Array.isArray(icons) || icons.length <= 1) return;

            // Geramos um atraso aleatório entre 0 e 2000ms
            const randomDelay = Math.floor(Math.random() * 2000);
            let interval: NodeJS.Timeout;

            // Criamos um timeout inicial para "desencontrar" os timers
            const timeout = setTimeout(() => {

                // Só depois do delay inicial começamos o intervalo fixo
                interval = setInterval(() => {
                    setFade(false);

                    setTimeout(() => {
                        setIndex((prev) => (prev + 1) % icons.length);
                        setFade(true);
                    }, 600);

                }, 3000); // Aumentei um pouco para 2.5s para ficar mais calmo

            }, randomDelay);

            return () => {
                clearTimeout(timeout);
                if (interval) clearInterval(interval);
            };
        }, [icons]);

        return (
            <div className="relative flex items-center justify-center [perspective:1000px]">
                <AnimatePresence mode="popLayout">
                    <motion.div
                        key={index} // A key muda, então o Framer sabe que um sai e outro entra
                        initial={{ rotateY: -90, opacity: 0, scale: 0.8 }}
                        animate={{ rotateY: 0, opacity: 1, scale: 1 }}
                        exit={{ rotateY: 90, opacity: 0, scale: 0.8 }}
                        transition={{
                            duration: 0.6,
                            ease: "easeInOut"
                        }}
                        className="w-full h-full flex items-center justify-center"
                        style={{ backfaceVisibility: "hidden" }}
                    >
                        {icons[index]}
                    </motion.div>
                </AnimatePresence>
            </div>
        );
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

    const skillsArray = skills(closeModal);

    return (
        <>
            {/* Cabeçalho com efeito de digitação */}
            <div className="w-full scroll-mt-24" id="skills">
                <div
                    id="title-container"
                    className="bg-gradient-to-t from-[#303446] to-[#30344600] h-fit w-full"
                >
                    <h2
                        className={`${roboto.className} lg:pl-9 text-3xl lg:ml-20 z-[1] md:text-5xl font-bold lg:text-7xl py-4 text-center lg:text-left text-[#fff] flex items-center justify-center lg:justify-start`}
                    >
                        <span id="skills-typing-title"></span>
                        <span
                            className={`text-[#aadd49] ${isTypingTitleDone ? "visible" : "invisible"
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
            <div className="relative overflow-hidden flex flex-col lg:flex-row">
                <div
                    className={`${roboto.className} z-10 relative m-auto text-[10px] mt-10 lg:mt-0 lg:text-sm lg:block lg:absolute xl:right-[70px] lg:right-[40px] top-[50%] xl:w-[40%] lg:w-[30%]`}
                    id="skills-text-container"
                >
                    <p id="skills-typing-text" className="transition-opacity duration-500">
                        Um pouco do que sei e do que estou aprendendo \(^_^)/</p>
                </div>
                <div
                    className="absolute blur-sm inset-0 bg-cover md:bg-center bg-fixed bg-no-repeat z-[0] h-full w-full"
                    style={{
                        backgroundImage: "url('/me-in-park.jpg')",
                        backgroundPosition: "70% center",
                    }}
                >
                </div>

                {/* <CustomArrow>
                    <Carousel
                        preventMovementUntilSwipeScrollTolerance={true}
                        swipeScrollTolerance={20}
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
                                    <Dot
                                        selected={isSelected}  // O segundo ponto vai refletir a seleção também
                                        onClick={clickHandler}
                                    />
                                </DotsWrapper>
                            );
                        }}
                        infiniteLoop={true}
                    >
                    </Carousel>
                </CustomArrow> */}

                <div
                    className={`${ibmPlexMono.className}  space-y-16 flex flex-col items-center lg:items-start text-center`}
                >
                    <div
                        className="grid grid-cols-3 md:grid-cols-4 lg:pl-20 lg:grid-cols-4  gap-8 my-20 w-fit lg:ml-10 lg:ml-28"
                    >
                        {skillsArray.map((skill, index) => (
                            <div
                                key={index}
                                className="bg-gradient-to-t from-[#9497a555] to-[#3034461c] rounded-t-2xl skill flex flex-col items-center justify-center relative group opacity-0 transform -translate-x-24 transition-all duration-500 w-20 h-20 md:w-28 md:h-28"
                                onClick={() => openModal(skill)}
                            >
                                <div className="relative group">
                                    <div className="w-full h-full flex items-center justify-center border-transparent transition-all duration-300 overflow-hidden">
                                        <div className="text-5xl md:text-6xl text-[#fff] group-hover:text-[#aadd49] group-hover:opacity-30 transition-all duration-300">
                                            {Array.isArray(skill.icons) ? (
                                                <SkillIcon icons={skill.icons} />
                                            ) : (
                                                skill.icons
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute bottom-0 w-full h-[2px] bg-[#aadd49] z-30 group-hover:shadow-[0_0_15px_2px_#aadd49] transition-shadow duration-300"></div>
                                <div className="absolute inset-0 flex items-center rounded-t-2xl justify-center bg-[#63667169] bg-opacity-80 text-[#fff] opacity-0 group-hover:opacity-100 transition-opacity duration-300 select-none text-sm md:text-base">
                                    {skill.name}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
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
                            transition={{ duration: 0.1 }} // Transição suave
                        >
                            <motion.div
                                className="bg-black text-white p-6 mb-96 lg:mb-60 md:mr-10 lg:mr-20 xl:mr-36 rounded-lg w-80"
                                onClick={(e) => e.stopPropagation()}
                                initial={{ scale: 0.9 }} // Inicializa o modal pequeno
                                animate={{ scale: 1 }} // Expande para o tamanho normal
                                exit={{ scale: 0.9 }} // Encolhe ao fechar
                                transition={{
                                    duration: 0.1,
                                    ease: "easeInOut",
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 10
                                }}
                                style={{
                                    borderLeft: "4px solid #aadd49",
                                    borderBottom: "4px solid #aadd49",
                                }}
                            >
                                <h3 className="text-2xl font-bold flex items-center gap-5">
                                    <span className="text-[#aadd49]">
                                        {Array.isArray(modalData.icons) ? (
                                            <SkillIcon icons={modalData.icons} />
                                        ) : (
                                            modalData.icons
                                        )}
                                    </span>
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
                                className="flex items-center justify-center px-10 sm:px-16 md:px-24 lg:px-36 pt-10 text-justify"
                                onClick={(e) => e.stopPropagation()}
                                initial={{ opacity: 0, x: isLargeScreen ? -100 : 0, y: isLargeScreen ? 0 : 100 }}
                                animate={{ opacity: 1, x: 0, y: 0 }}
                                exit={{ opacity: 0, x: isLargeScreen ? 100 : 0, y: isLargeScreen ? 0 : 100 }}
                                transition={{
                                    duration: 0.1,
                                    ease: "easeInOut",
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 10
                                }}
                            >
                                <div>
                                    <p className="text-[#aadd49] text-[10px] lg:text-sm lg:border-t-2 lg:border-b-2 border-[#aadd49] py-3">
                                        {typeof modalData.descriptionTwo === "string" ? (
                                            modalData.descriptionTwo.split("\n").map((line, index) => (
                                                <span key={index}>
                                                    {line}
                                                    <br />
                                                </span>
                                            ))
                                        ) : (
                                            modalData.descriptionTwo // Renderiza diretamente se for JSX
                                        )}
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
                                    duration: 0.2,
                                    ease: "easeInOut",
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 10
                                }}
                            />
                        </motion.div>

                    </>
                )}
            </AnimatePresence>
        </>
    );
}
