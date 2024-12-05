
import AboutMe from "./components/Intro";
import Projects from "./components/Projects";
import Trails from "./components/AboutMe";
import Skills from "./components/Skills";
import "./globals.css";

import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaFigma } from "react-icons/fa";
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
        alt: "Este projeto foi desenvolvido com o objetivo de dominar operações básicas em JavaScript, como manipulação de valores numéricos e monetários, além de administrar valores dinâmicos e a conexão entre front-end e back-end. Inicialmente, a aplicação utilizava um simples JSON server para armazenar e recuperar dados. No entanto, ao perceber as limitações dessa abordagem, decidi migrar para uma solução mais robusta, adotando o Firebase como banco de dados.\n\nCom a integração do Firebase, o projeto ganhou escalabilidade e desempenho, e, para garantir a segurança e a experiência do usuário, implementei um sistema de login completo, utilizando autenticação por email e senha. Isso permitiu um acesso mais ágil e seguro às funcionalidades da aplicação, como gerenciamento de projetos e criação de novos itens.\n\n Esse projeto me proporcionou um entendimento profundo sobre manipulação de dados, integração de tecnologias e o gerenciamento de operações financeiras e de valores em um sistema de back-end escalável, além de consolidar meu conhecimento sobre autenticação de usuários e estruturação de dados dinâmicos em tempo real.",
        date: '04/12/2024'
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
        alt: 'Este projeto foi desenvolvido em Next.js para criar uma loja virtual personalizada para minha mãe, Lourdes Maria Candida Sobrinha, que é artesã. A loja foi projetada para oferecer uma experiência de compra intuitiva e segura, utilizando tecnologias modernas.\n\n Para o sistema de autenticação, utilizei o Clerk, garantindo um fluxo de login e registro de clientes eficiente e seguro. O Prisma e o PostgreSQL foram escolhidos para gerenciar o banco de dados, oferecendo uma estrutura robusta e escalável. Além disso, a integração com o Stripe possibilitou a implementação de um sistema de pagamento confiável e seguro.\n\n A loja conta com um catálogo de produtos organizado por categorias inteligentes, facilitando a navegação e a busca pelos itens. O carrinho de compras foi desenvolvido utilizando TypeScript e JavaScript, proporcionando uma interação dinâmica e eficiente. Toda a solução foi construída com foco na performance e na experiência do usuário, desde a navegação até a finalização da compra..',
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
        alt: 'Este é o meu portfólio recém-criado, no qual apliquei diversas habilidades que adquiri recentemente, como Next.js, Styled Components, e TypeScript. O projeto envolve a construção de APIs mais complexas e a integração de bibliotecas poderosas, como Framer Motion para animações, Typpy para manipulação de tipos, Material UI para uma interface de usuário moderna e responsiva, e React-P5 para criar experiências interativas com gráficos e animações.\n\n O objetivo deste portfólio é refletir não apenas minhas habilidades técnicas, mas também minha capacidade de criar interfaces dinâmicas e de fácil navegação, com foco na performance e na experiência do usuário.',
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
        alt: 'Este foi o meu primeiro portfólio criado com o objetivo de aprimorar minhas habilidades em HTML, CSS e JavaScript sem o uso de frameworks. Desenvolvido enquanto estava na Irlanda, esse projeto foi um dos mais complexos que realizei na época, onde integrei essas tecnologias de forma mais avançada. Foi uma oportunidade para explorar conceitos mais profundos de JavaScript, como manipulação de DOM, animações e interatividade, além de consolidar meu entendimento sobre estruturação de layouts e design responsivo.',
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
        alt: 'Desenvolvido em React, este foi o meu primeiro projeto utilizando o framework. O sistema permite adicionar custos e ganhos, realizando automaticamente os cálculos do total de despesas, receitas e o saldo final após as transações. Criado como uma forma de praticar lógicas básicas de JavaScript, este projeto foi programado com valores em euros, pois foi desenvolvido durante o período em que estava estudando inglês na Irlanda, em 2023. Foi uma excelente oportunidade para consolidar meu aprendizado no React, ao mesmo tempo em que trabalhava com estados e manipulação de dados de forma interativa.',
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
        alt: 'Desenvolvido completamente em JavaScript, este projeto foi uma das minhas primeiras experiências mais desafiadoras ao trabalhar diretamente com a linguagem, sem o uso de frameworks. O jogo é uma versão simples do Super Mario, onde o personagem corre e pula canos no cenário, inspirado no famoso jogo do dinossauro do Google Chrome.\n\n A aplicação conta com um contador de tempo, que registra quanto tempo o jogador conseguiu sobreviver. Se o Mario colide com um cano, o jogo termina e exibe a pontuação final, permitindo que o jogador reinicie e tente novamente.\n\n A verdadeira dificuldade desse projeto foi que ele exigiu um domínio mais profundo de conceitos fundamentais de JavaScript, como manipulação do DOM, controle de eventos e lógica de jogo, tudo isso sem o auxílio de bibliotecas externas. Foi uma excelente oportunidade de prática e aprendizado, especialmente por ser um dos primeiros projetos a me desafiar a ir além das funcionalidades mais básicas da linguagem.',
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
