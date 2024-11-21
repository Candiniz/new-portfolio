
import AboutMe from "./components/Intro";
import Projects from "./components/Projects";
import Trails from "./components/AboutMe";
import Skills from "./components/Skills";


export default function Home() {

  const projects = [
    {
      slug: 'sobrinha-artesanatos',
      name: 'Sobrinha | Loja Virtual' ,
      image: {
        url: 'https://i.imgur.com/41LaBQh.jpeg',
        alt: 'Projeto feito em Next.js para uma loja virtual da artesã Lourdes Maria Candida Sobrinha.',
       date: '10/10/1000'
      }
    },
    {
      slug: 'old-portfolio',
      name: 'Portfólio Antigo',
      image: {
        url: 'https://i.imgur.com/08IldNi.png',
        alt: 'Meu portfólio feito com intúito de aperfeiçoar técnicas de HTML, CSS e Javascript sem auxilio de frameworks.',
       date: '10/10/1000'
      }
    },
    {
      slug: 'finance-control',
      name: 'Finance Control',
      image: {
        url: 'https://i.imgur.com/0bGqdSx.png',
        alt: 'Sistema desenvolvido em React para praticar lógicas básicas de Javascript.',
       date: '10/10/1000'
      }
    },
    {
      slug: 'robofriends',
      name: 'Robofriends',
      image: {
        url: 'https://i.imgur.com/TCSyRbd.png',
        alt: 'Sistema desenvolvido em React para praticar lógicas básicas de Javascript, principalmente métodos FETCH e GET.',
       date: '10/10/1000'
      }
    },
    {
      slug: 'mario-js',
      name: 'Mario JS',
      image: {
        url: 'https://i.imgur.com/ZDoC8Du.png',
        alt: 'Uma aplicação simples desenvolvida em Javascript para estudar conceitos da linguagem.',
       date: '10/10/1000'
      }
    }
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
