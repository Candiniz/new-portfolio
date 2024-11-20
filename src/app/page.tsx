
import AboutMe from "./components/Intro";
import Projects from "./components/Projects";
import Trails from "./components/AboutMe";


export default function Home() {

  const projects = [
    {
      slug: 'sobrinha-artesanatos',
      name: 'Sobrinha | Loja Virtual' ,
      image: {
        url: 'https://i.imgur.com/KIarXCX.jpeg',
        alt: 'Projeto feito em Next.js para uma loja virtual da artesã Lourdes Maria Candida Sobrinha.'
      }
    },
    {
      slug: 'old-portfolio',
      name: 'Portfólio Antigo',
      image: {
        url: 'https://i.imgur.com/LwMGezH.jpeg',
        alt: 'Meu portfólio feito com intúito de aperfeiçoar técnicas de HTML, CSS e Javascript sem auxilio de frameworks.'
      }
    },
    {
      slug: 'finance-control',
      name: 'Finance Control',
      image: {
        url: 'https://i.imgur.com/WYyLc59.jpeg',
        alt: 'Sistema desenvolvido em React para praticar lógicas básicas de Javascript.'
      }
    },
    {
      slug: 'robofriends',
      name: 'Robofriends',
      image: {
        url: 'https://i.imgur.com/N0ZuhMs.jpeg',
        alt: 'Sistema desenvolvido em React para praticar lógicas básicas de Javascript, principalmente métodos FETCH e GET.'
      }
    },
    {
      slug: 'mario-js',
      name: 'Mario JS',
      image: {
        url: 'https://i.imgur.com/KyfXVas.jpeg',
        alt: 'Uma aplicação simples desenvolvida em Javascript para estudar conceitos da linguagem.'
      }
    }
  ]

  return (
    <>
      <div className="py-12 px-6 md:px-60">
        <AboutMe />
      </div>
      <div>
        <Projects projects={projects} />
        <Trails />
      </div>
    </>
  );
}
