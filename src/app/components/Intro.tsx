import Image from "next/image";
import fotoPerfil from "../../photos/portrait.png"
import Link from "next/link";
import { ibmPlexMono } from "../fonts/Fonts";

export default function AboutMe() {
    return (
        <main className={`${ibmPlexMono.className} xl:w-120 flex flex-wrap-reverse justify-center items-center gap-10 md:gap-20 pt-3 pb-36 text-lg xl:flex-nowrap xl:justify-between`}>
            <div className="text-white xl:text-left md:text-center flex flex-col items-center xl:items-start gap-4">
                <h1 className="text-5xl md:text-[6vw] xl:text-[4vw]">Prazer, sou  <span className="font-bold text-[#aadd49]">Anderson!</span></h1>
                <div className="mb-12">
                    <h2>Sou um desenvolvedor frontend apaixonado por criar interfaces </h2>
                </div>

                <div className="flex flex-col lg:flex-row xl:flex-col 2xl:flex-row items-center justify-center gap-x-3 gap-y-3">
                    <Link href='/contatos' className="text-center w-[270px] h-15 p-1 bg-[#aadd49] text-[#21232b] text-lg transition-all hover:bg-opacity-60 px-10">Vamos conversar!</Link>
                    <Link href='/contatos' className="text-center w-[270px] h-15 p-1 bg-[#aadd49] text-[#21232b] text-lg transition-all hover:bg-opacity-60 px-10">Baixe meu CV!</Link>
                </div>

                <ul className="flex flex-wrap justify-center xl:grid xl:grid-cols-2 xl:w-fit gap-3 text-xl mt-20">
                    <li className="bg-[#2f74c0] text-[#ffffff] w-fit p-2 rounded-md">typescript</li>
                    <li className="bg-[#6bddfa] text-[#000000] w-fit p-2 rounded-md">react</li>
                    <li className="bg-[#efd81d] text-[#000000] w-fit p-2 rounded-md">javascript</li>
                    <li className="bg-[#000000] text-[#ffffff] w-fit p-2 rounded-md">next.js</li>
                    <li className="bg-[#c762de] text-[#ffffff] w-fit p-2 rounded-md">UX/UI</li>
                </ul>
            </div>
            <div className="">
                <div className="relative m-auto xl:w-[500px] sm:w-3/5 md:w-[350px] ">
                    <Image alt="Foto de Perfil" src={fotoPerfil} className="rounded-full" />
                    <p className=" p-4 w-fit text-base leading-tight bg-[#787d96] rounded-xl text-white absolute -bottom-[0.75rem]">
                        <span className="text-4xl ">2+</span>
                        <br /> anos de experiência</p>
                </div>
            </div>
        </main>
    )
}