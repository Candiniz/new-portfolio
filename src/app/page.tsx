'use client'

import { personalProjects, corporateProjects } from './consts/projectsArrays';
import AboutMe from "./components/Intro";
import Projects from "./components/Projects";
import Trails from "./components/Trails";
import Skills from "./components/Skills";
import "./globals.css";
import Education from "./components/Education";
import Contatos from "./components/Contatos";
import Experience from "./components/Experience";
import { useEffect } from "react";

export default function Home() {

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          } else {
            entry.target.classList.remove('is-visible');
          }
        });
      },
      { threshold: 0.05, rootMargin: '100px 0px 100px 0px' }
    );

    // Buscamos GLOBALMENTE todos os elementos com a classe .reveal
    const elements = document.querySelectorAll('.reveal, .reveal_up');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []); // O array vazio garante que isso rode apenas uma vez ao montar a página

  return (
    <main>
      {/* <TranslateButton /> */}
      <div className="">
        <AboutMe />
      </div>
      <div className="">
        <Skills />
        <Projects personalProjects={personalProjects} corporateProjects={corporateProjects} />
        <Experience />
        <Education />
        <Trails />
        <Contatos />
      </div>
    </main>
  );
}
