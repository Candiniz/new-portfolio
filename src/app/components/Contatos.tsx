import CopyButton from "./CopyButton";
import Image from "next/image";
import contatosBG from "../../../public/contactBG.png"
import { caveat, roboto } from "../fonts/Fonts";

import { AiOutlineMail } from "react-icons/ai";
import { FaWhatsapp, FaLinkedin, FaGithubSquare, FaInstagram } from "react-icons/fa";


export const metadata = {
    title: 'Contatos | Candiniz',
    description: 'Entre em contato.',
};

export default function Contatos() {
    return (
        <>
            <div className="w-full h-[100px] bg-black mt-3">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path fill="#ffffff" fillOpacity="1" d="M0,128L48,122.7C96,117,192,107,288,90.7C384,75,480,53,576,74.7C672,96,768,160,864,186.7C960,213,1056,203,1152,176C1248,149,1344,107,1392,85.3L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
                </svg>
            </div>
            <div className="bg-black w-full">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#fff" fillOpacity="1" d="M0,192L60,202.7C120,213,240,235,360,250.7C480,267,600,277,720,277.3C840,277,960,267,1080,234.7C1200,203,1320,149,1380,122.7L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>
            </div>
            <div className="bg-white h-[200px] w-full text-black -my-3 flex items-center justify-center text-3xl">
                <p className={`${caveat.className}`}>vamos construir algo incrível juntos?</p>
            </div>
            <div className="relative h-auto w-full bg-white wave-div">
                <div className="relative inset-0 z-20 bg-black">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#ffffff" fillOpacity="1" d="M0,32L60,64C120,96,240,160,360,170.7C480,181,600,139,720,101.3C840,64,960,32,1080,26.7C1200,21,1320,43,1380,53.3L1440,64L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path></svg>
                </div>
            </div>
            <div className="w-full flex items-center justify-center md:gap-10 mb-7">
                <div>
                    <Image
                        src={contatosBG}
                        alt="Plano de fundo da tela de contatos"
                        width={300}
                        height={800}
                        className="max-w-[50vw] md:max-w-none"
                    />
                </div>
                <div className="space-y-8 md:space-y-16">
                    <h1 className={`${caveat.className} -ml-32 md:ml-0 text-6xl md:text-8xl font-bold`}>Contatos:</h1>

                    <ul className="flex md:hidden flex-col gap-7 text-[#aadd49] text-4xl items-center justify-center"  id="contact">
                        <li className="ml-2">
                            <a
                                href="https://wa.me/5511952488345" target="blank"
                                className="hover:text-white transition-all duration-150 hover:scale-110"
                            >
                                <FaWhatsapp />
                            </a>
                        </li>
                        <li className="ml-4">
                            <a
                                href="mailto:andersoncd123@gmail.com" target="blank"
                                className="hover:text-white transition-all duration-150 hover:scale-110"
                            >
                                <AiOutlineMail />
                            </a>
                        </li>
                        <li className="ml-6">
                            <a
                                href="https://www.linkedin.com/in/candiniz/" target="blank"
                                className="hover:text-white transition-all duration-150 hover:scale-110"
                            >
                                <FaLinkedin />
                            </a>
                        </li>
                        <li className="ml-8">
                            <a
                                href="https://github.com/Candiniz" target="blank"
                                className="hover:text-white transition-all duration-150 hover:scale-110"
                            >
                                <FaGithubSquare />
                            </a>
                        </li>
                        <li className="ml-10">
                            <a
                                href="" target="blank"
                                className="hover:text-white transition-all duration-150 hover:scale-110"
                            >
                                <FaInstagram />
                            </a>
                        </li>
                    </ul>

                    <ul className="hidden md:block mx-auto space-y-6 md:space-y-8 text-xs md:text-lg">
                        <li className="md:text-xl">
                            <span className={`${roboto.className} font-bold`}>Whatsapp</span>
                            <div className="flex gap-1 md:gap-3 items-center">
                                <CopyButton textToCopy='+55 (11) 95248-8345' />
                                <a className="text-xs md:text-lg text-slate-300 underline truncate" 
                                href="https://wa.me/5511952488345" target="blank">
                                    <code>+55 (11) 95248-8345</code>
                                </a>
                            </div>

                        </li>
                        <li className="md:text-xl">
                            <span className={`${roboto.className} font-bold`}>E-mail</span>
                            <div className="flex gap-1 md:gap-3 items-center">
                                <CopyButton textToCopy='andersoncd123@gmail.com' />
                                <a className="text-xs md:text-lg text-slate-300 underline truncate" href="mailto:andersoncd123@gmail.com" target="blank">
                                    <code>andersoncd123@gmail.com</code>
                                </a>
                            </div>

                        </li>
                        <li>
                            <span className={`${roboto.className} font-bold`}>LinkedIn</span>
                            <div className="flex gap-1 md:gap-3 items-center">
                                <CopyButton textToCopy='https://www.linkedin.com/in/candiniz/' />
                                <a className="text-xs md:text-lg text-slate-300 underline truncate" 
                                href="https://www.linkedin.com/in/candiniz/" target="blank">
                                    <code>https://www.linkedin.com/in/candiniz</code>
                                </a>
                            </div>
                        </li>
                        <li>
                            <span className={`${roboto.className} font-bold`}>GitHub</span>
                            <div className="flex gap-1 md:gap-3 items-center">
                                <CopyButton textToCopy='https://github.com/Candiniz' />
                                <a className="text-xs md:text-lg text-slate-300 underline truncate" 
                                href="https://github.com/Candiniz">
                                    <code>https://github.com/Candiniz</code>
                                </a>
                            </div>
                        </li>
                        <li>
                            <span className={`${roboto.className} font-bold`}>Instagram</span>
                            <div className="flex gap-1 md:gap-3 items-center">
                                <CopyButton textToCopy='www.instagram.com/candiniz.dev' />
                                <a className="text-xs md:text-lg text-slate-300 underline truncate" 
                                href="" target="blank">
                                    <code>https://www.instagram.com/candiniz.dev</code>
                                </a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="w-full flex items-start justify-center mb-20 border-l-2 border-[#aadd49] pl-5">
                <ul className="block md:hidden mx-auto space-y-6 md:space-y-8">
                    <li className="md:text-xl">
                        <span className={`${roboto.className} font-bold`}>Whatsapp</span>
                        <div className="flex gap-1 md:gap-3 items-center">
                            <CopyButton textToCopy='+55 (11) 95248-8345' />
                            <a className="text-xs md:text-lg text-slate-300 underline truncate" 
                            href="https://wa.me/5511952488345" target="blank">
                                <code>+55 (11) 95248-8345</code>
                            </a>
                        </div>

                    </li>
                    <li className="md:text-xl">
                        <span className={`${roboto.className} font-bold`}>E-mail</span>
                        <div className="flex gap-1 md:gap-3 items-center">
                            <CopyButton textToCopy='andersoncd123@gmail.com' />
                            <a className="text-xs md:text-lg text-slate-300 underline truncate" href="mailto:andersoncd123@gmail.com" target="blank">
                                <code>andersoncd123@gmail.com</code>
                            </a>
                        </div>

                    </li>
                    <li>
                        <span className={`${roboto.className} font-bold`}>LinkedIn</span>
                        <div className="flex gap-1 md:gap-3 items-center">
                            <CopyButton textToCopy='https://www.linkedin.com/in/candiniz/' />
                            <a className="text-xs md:text-lg text-slate-300 underline truncate" 
                            href="https://www.linkedin.com/in/candiniz/" target="blank">
                                <code>https://www.linkedin.com/in/candiniz</code>
                            </a>
                        </div>
                    </li>
                    <li>
                        <span className={`${roboto.className} font-bold`}>GitHub</span>
                        <div className="flex gap-1 md:gap-3 items-center">
                            <CopyButton textToCopy='https://github.com/Candiniz' />
                            <a className="text-xs md:text-lg text-slate-300 underline truncate" 
                            href="https://github.com/Candiniz" target="blank">
                                <code>https://github.com/Candiniz</code>
                            </a>
                        </div>
                    </li>
                    <li>
                        <span className={`${roboto.className} font-bold`}>Instagram</span>
                        <div className="flex gap-1 md:gap-3 items-center">
                            <CopyButton textToCopy='www.instagram.com/candiniz.dev' />
                            <a className="text-xs md:text-lg text-slate-300 underline truncate" 
                            href="" target="blank">
                                <code>https://www.instagram.com/candiniz.dev</code>
                            </a>
                        </div>
                    </li>
                </ul>
            </div>
        </>
    )
}