import DrawBots from "../draw/DrawBots";
import Intro from "../components/Intro";
import HowIWork from "../components/HowIWork";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Experience from "../components/Experience";
import Education from "../components/Education";
import Trails from "../components/Trails";
import Contatos from "../components/Contatos";

export default function Home() {
    return (
        <main>
            {/* Robôs que "desenham" cada elemento com data-draw (src/app/draw) */}
            <DrawBots />
            <Intro />
            <HowIWork />
            <Skills />
            <Projects />
            <Experience />
            <Education />
            <Trails />
            <Contatos />
        </main>
    );
}
