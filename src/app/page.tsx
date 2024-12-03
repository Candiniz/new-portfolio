
import AboutMe from "./components/Intro";
import Projects from "./components/Projects";
import Trails from "./components/AboutMe";
import Skills from "./components/Skills";
import "./globals.css";

import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaFigma, FaSass } from "react-icons/fa";
import { RiNextjsFill, RiTailwindCssFill } from "react-icons/ri";
import { SiTypescript, SiPrisma, SiStyledcomponents } from "react-icons/si";
import { DiPhotoshop } from "react-icons/di";

export default function Home() {

  const projects = [
    {
      slug: 'projex',
      name: 'ProjEx',
      projectLink: 'https://proj-ex.vercel.app',
      repositoryLink: '',
      linkedIn: '',
      icons: (
        <>
          <FaReact />
          <FaJs />
          <FaCss3Alt />
          <FaFigma />
        </>
      ),
      image: {
        url: 'https://i.imgur.com/ekDJKin.png',
        alt: 'Uma aplicação React desenvolvida para estudo de logicas Javascript para planejamento monetário de projetos diversos. Contém um sistema de controle de orçamentos, onde o usuário pode inserir serviços e controlar o custo de cada etapa do projeto. O sistema se atenta ao orçamento total não permitindo o usuário planejar um custo total de serviços maior do que o orçamento total do projeto.',
        date: '10/10/1000'
      }
    },
    {
      slug: 'sobrinha-artesanatos',
      name: 'Sobrinha | Loja Virtual',
      projectLink: '',
      repositoryLink: '',
      linkedIn: '',
      icons: (
        <>
          <SiTypescript />
          <FaJs />
          <RiNextjsFill />
          <RiTailwindCssFill />
          <SiPrisma />
        </>
      ),
      image: {
        url: 'https://i.imgur.com/41LaBQh.jpeg',
        alt: 'Projeto feito em Next.js para uma loja virtual da artesã Lourdes Maria Candida Sobrinha.',
        date: '10/10/1000'
      }
    },
    {
      slug: 'new-portfolio',
      name: 'Novo Portfólio | Candiniz',
      projectLink: '',
      repositoryLink: '',
      linkedIn: '',
      icons: (
        <>
          <SiTypescript />
          <FaJs />
          <RiNextjsFill />
          <RiTailwindCssFill />
          <FaFigma />
          <SiStyledcomponents />
          <DiPhotoshop />
        </>
      ),
      image: {
        url: 'https://i.imgur.com/jv21AnZ.png',
        alt: 'Meu novo portfólio onde utilizei a maioria das minhas recem adquiridas habilidades, incluindo NextJs, StyledComponents, Typescript, Construção de APIs mais complexas e bibliotecas como Framer Motion e React-P5.',
        date: '10/10/1000'
      }
    },
    {
      slug: 'old-portfolio',
      name: 'Portfólio Antigo | Candiniz',
      projectLink: 'https://candiniz.github.io/myportifolio/',
      repositoryLink: 'https://github.com/Candiniz/myportifolio',
      linkedIn: '',
      icons: (
        <>
          <FaHtml5 />
          <FaJs />
          <FaCss3Alt />
          <FaFigma />
        </>
      ),
      image: {
        url: 'https://i.imgur.com/08IldNi.png',
        alt: 'Meu portfólio feito com intúito de aperfeiçoar técnicas de HTML, CSS e Javascript sem auxilio de frameworks.',
        date: '10/10/1000'
      }
    },
    {
      slug: 'finance-control',
      name: 'Finance Control',
      projectLink: 'https://candiniz.github.io/Finance-Control/',
      repositoryLink: 'https://github.com/Candiniz/Finance-Control',
      linkedIn: '',
      icons: (
        <>
          <FaReact />
          <FaJs />
          <FaCss3Alt />
        </>
      ),
      image: {
        url: 'https://i.imgur.com/Q9dAMhL.png',
        alt: 'Sistema desenvolvido em React para praticar lógicas básicas de Javascript.',
        date: '10/10/1000'
      }
    },
    {
      slug: 'mario-js',
      name: 'Mario JS',
      projectLink: 'https://candiniz.github.io/mario-js/',
      repositoryLink: 'https://github.com/Candiniz/mario-js',
      linkedIn: '',
      icons: (
        <>
          <FaHtml5 />
          <FaJs />
          <FaCss3Alt />
        </>
      ),
      image: {
        url: 'https://i.imgur.com/ZDoC8Du.png',
        alt: 'Uma aplicação simples desenvolvida em Javascript para estudar conceitos da linguagem.',
        date: '10/10/1000'
      }
    },

  ]

  return (
    <>
      <div className="mt-[100px]">
        <AboutMe />
      </div>
      <div>
        <Skills />
        <Projects projects={projects} />
        <Trails />
      </div>
    </>
  );
}
