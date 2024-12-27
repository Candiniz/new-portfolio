
import AboutMe from "./components/Intro";
import Projects from "./components/Projects";
import Trails from "./components/Trails";
import Skills from "./components/Skills";
import "./globals.css";

import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaFigma, FaSass } from "react-icons/fa";
import { RiNextjsFill, RiTailwindCssFill } from "react-icons/ri";
import { SiTypescript, SiPrisma, SiStyledcomponents } from "react-icons/si";
import { DiPhotoshop } from "react-icons/di";
import Education from "./components/Education";
import Contatos from "./components/Contatos";

export default function Home() {

  const projects = [
    {
      slug: 'hexis',
      name: 'HEXIS!',
      projectLink: 'https://hexis.vercel.app',
      repositoryLink: 'https://github.com/Candiniz/hexis',
      linkedIn: 'https://www.linkedin.com/feed/update/urn:li:activity:7278147027002179585/',
      icons: (
        <>
          <FaReact />
          <FaJs />
          <FaCss3Alt />
          <FaFigma />
        </>
      ),
      image: {
        url: 'https://i.imgur.com/kEtAOJn.png',
        alt: "Hexis é um projeto que nasceu do desejo de me auto desafiar e explorar novos horizontes no desenvolvimento de aplicações interativas. Inspirado no jogo mobile Trigon, da IEC Games, decidi recriar sua essência por meio de uma abordagem de clonagem por observação. Esse método exigiu que eu confiasse exclusivamente na minha experiência como jogador para projetar funcionalidades e mecânicas, sem qualquer acesso ao código-fonte do jogo original. O objetivo era não apenas replicar a jogabilidade, mas também compreender e implementar os fundamentos lógicos e visuais que tornam Trigon tão cativante.\n\nO processo foi um dos mais desafiadores que já enfrentei. Desde o início, a construção do tabuleiro com SVGs revelou-se uma tarefa minuciosa e complexa, exigindo atenção aos detalhes visuais e funcionais. Definir as coordenadas de cada triângulo que compõe o tabuleiro foi outro obstáculo significativo, pois demandou cálculos geométricos precisos para garantir a interação fluida entre as peças e o tabuleiro. Além disso, criar uma dinâmica em que as peças reconhecem seus posicionamentos e interagem corretamente com o ambiente reforçou minhas habilidades em lógica de programação e manipulação de DOM no React.js.\n\nHexis não foi apenas um projeto técnico, mas também uma oportunidade de aprendizado e crescimento. Ele solidificou meu domínio em React.js e JavaScript avançado, ao mesmo tempo que me desafiou a sair da zona de conforto. O resultado final é um jogo totalmente funcional, que agora pode ser experimentado por qualquer pessoa em 'https://hexis.vercel.app'. Este projeto ocupa um lugar especial no meu portfólio, pois simboliza a combinação de determinação, criatividade e aprendizado contínuo que trago para cada desafio que enfrento.",
        date: '04/12/2024'
      }
    },
    {
      slug: 'restora',
      name: 'reStora',
      projectLink: 'https://restora-lake.vercel.app',
      repositoryLink: 'https://github.com/Candiniz/reStore',
      linkedIn: '',
      icons: (
        <>
          <RiNextjsFill />
          <FaJs />
          <SiTypescript />
          <FaSass />
          <RiTailwindCssFill />
        </>
      ),
      image: {
        url: 'https://i.imgur.com/KKA0tQm.png',
        alt: "Este projeto foi desenvolvido para explorar a criação de APIs, integração de IA, sistemas SaaS e a conexão fullstack entre frontend e backend usando o Supabase. A ideia inicial era construir um app que permitisse restaurar imagens danificadas, unindo tecnologia de ponta com uma experiência de usuário simples e eficiente. Durante o desenvolvimento, enfrentei desafios como configurar serviços de IA, lidar com problemas de tipagem no TypeScript, gerenciar permissões no Supabase e garantir um fluxo funcional e intuitivo para o usuário.\n\nO app funciona em três etapas principais: o usuário faz o upload de uma imagem, que é armazenada em um bucket do Supabase; a imagem é processada por uma API integrada ao serviço Replicate para restaurá- la usando modelos de IA; e, por fim, o resultado é exibido ao usuário, que pode fazer o download da versão restaurada.Todo o fluxo foi projetado para ser eficiente e fácil de usar.\n\nO objetivo do projeto é oferecer uma ferramenta prática para restaurar imagens enquanto demonstra habilidades em desenvolvimento fullstack e integração de tecnologias modernas.Este trabalho foi um marco no meu aprendizado, especialmente na solução de problemas e no domínio de sistemas escaláveis e avançados.",
        date: '04/12/2024'
      }
    },
    {
      slug: 'projex',
      name: 'ProjEx',
      projectLink: 'https://proj-ex.vercel.app',
      repositoryLink: 'https://github.com/Candiniz/ProjEX',
      linkedIn: '',
      icons: (
        <>
          <FaReact />
          <FaJs />
          <FaCss3Alt />
          <RiTailwindCssFill />
        </>
      ),
      image: {
        url: 'https://i.imgur.com/ekDJKin.png',
        alt: "Este projeto foi desenvolvido com o objetivo de dominar operações básicas em JavaScript, como manipulação de valores numéricos e monetários, além de administrar valores dinâmicos e a conexão entre front-end e back-end. Inicialmente, a aplicação utilizava um simples JSON server para armazenar e recuperar dados. No entanto, ao perceber as limitações dessa abordagem, decidi migrar para uma solução mais robusta, adotando o Firebase como banco de dados.\n\nCom a integração do Firebase, o projeto ganhou escalabilidade e desempenho, e, para garantir a segurança e a experiência do usuário, implementei um sistema de login completo, utilizando autenticação por email e senha. Isso permitiu um acesso mais ágil e seguro às funcionalidades da aplicação, como gerenciamento de projetos e criação de novos itens. Essas características fazem com que este projeto possa ser considerado um início de um Software as a Service (SaaS), demonstrando os fundamentos básicos de um sistema escalável e seguro.\n\nNo futuro, planejo aprimorá-lo para torná-lo um autêntico SaaS, incluindo funcionalidades como um modelo de monetização com planos de assinatura, suporte multiusuário avançado e permissões personalizadas. Além disso, pretendo implementar melhorias na interface do usuário e introduzir relatórios automáticos para proporcionar uma experiência ainda mais rica e completa aos usuários. Este projeto tem sido uma jornada desafiadora e enriquecedora, consolidando meu entendimento sobre autenticação, estruturação de dados dinâmicos e escalabilidade em sistemas modernos.",
        date: '04/12/2024'
      }
    },
    {
      slug: 'sobrinha-artesanatos',
      name: 'Sobrinha | Loja Virtual',
      projectLink: 'https://www.sobrinha.store',
      repositoryLink: 'https://github.com/Candiniz/next-commerce-1',
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
        alt: 'Este projeto foi desenvolvido em Next.js para criar uma loja virtual personalizada para a artesã Lourdes Maria Candida Sobrinha. A loja foi projetada para oferecer uma experiência de compra intuitiva e segura, utilizando tecnologias modernas.\n\n Para o sistema de autenticação, utilizei o Clerk, garantindo um fluxo de login e registro de clientes eficiente e seguro. O Prisma e o PostgreSQL foram escolhidos para gerenciar o banco de dados, oferecendo uma estrutura robusta e escalável. Além disso, a integração com o Stripe possibilitou a implementação de um sistema de pagamento confiável e seguro.\n\n A loja conta com um catálogo de produtos organizado por categorias inteligentes, facilitando a navegação e a busca pelos itens. O carrinho de compras foi desenvolvido utilizando TypeScript e JavaScript, proporcionando uma interação dinâmica e eficiente. Toda a solução foi construída com foco na performance e na experiência do usuário, desde a navegação até a finalização da compra..',
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
    {
      slug: 'iss-finder',
      name: 'ISS JS Finder',
      projectLink: 'https://candiniz.github.io/iss-finder/',
      repositoryLink: 'https://github.com/Candiniz/iss-finder',
      linkedIn: '',
      icons: (
        <>
          <FaHtml5 />
          <FaJs />
          <FaCss3Alt />
        </>
      ),
      image: {
        url: 'https://i.imgur.com/Fp4eq94.png',
        alt: "Este projeto foi criado como minha primeira aplicação usando JavaScript puro, com o objetivo de explorar a integração de APIs e como fazer chamadas assíncronas em um contexto real. Utilizei o Leaflet, uma biblioteca para mapas interativos, e a API ISS Tracker API (disponível em: 'https://api.wheretheiss.at/v1/satellites/25544') da Open Notify para rastrear a Estação Espacial Internacional (ISS) em tempo real.\n\n A funcionalidade do aplicativo é simples e interessante: ele exibe um mapa interativo que mostra a localização atual da ISS, atualizando a posição a cada 5 segundos. Enquanto o usuário observa, o mapa também exibe um rastro da movimentação da estação, permitindo ver a trajetória da ISS ao longo do tempo.\n\n Além disso, há um círculo em torno do ícone da ISS, representando a área visível da estação a partir do ponto onde ela se encontra. Esse círculo simula a distância real em que a ISS pode ser vista a olho nu ou com equipamento adequado, dependendo das condições meteorológicas. O objetivo dessa aplicação foi estudar como interagir com APIs externas usando JavaScript e como criar uma interface dinâmica sem o uso de frameworks, apenas com HTML, CSS e JS.",
        date: '10/10/1000'
      }
    },
    {
      slug: 'landing-page',
      name: 'Minha primeira Landing Page',
      projectLink: 'https://candiniz.github.io/landing_page_study_1/',
      repositoryLink: 'https://github.com/Candiniz/landing_page_study_1',
      linkedIn: '',
      icons: (
        <>
          <FaHtml5 />
          <FaCss3Alt />
        </>
      ),
      image: {
        url: 'https://i.imgur.com/ZRekg3a.png',
        alt: 'Esse projeto foi a minha primeira tentativa de fazer uma Landing Page, então achei interessante deixa-lo aqui. Ele foi feito puramente em HTML e CSS no início dos meus estudos.',
        date: '10/10/1000'
      }
    },

  ]

  return (
    <>
      {/* <TranslateButton /> */}
      <div className="mt-[100px]">
        <AboutMe />
      </div>
      <div>
        <Skills />
        <Projects projects={projects} />
        <Education />
        <Trails />
        <Contatos />
      </div>
    </>
  );
}
