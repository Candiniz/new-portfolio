
import "../globals.css";
import { oswald } from "../fonts/Fonts";



export default function Traveller() {


  return (
    <div className="w-full h-fit aspect-video mt-28">
      <div className="inset-0 px-6 flex lg:flex-col items-center justify-center bg-black/80 py-10 h-fit">
        <div className="w-full h-full">
          <div className="bg-clip-text-bar-traveller w-auto mr-4 mb-1 h-5 lg:hidden 2xl:block lg:mx-6 2xl:h-28"></div>
          <h1
            className={`
            ${oswald.className} 
            text-transparent text-right lg:text-center 2xl:text-left font-bold pr-4 bg-clip-text-traveller
              text-4xl md:text-6xl lg:text-7xl xl:text-[6.6vw] 2xl:text-[11rem]
              2xl:px-4 
          `}
          >
            BACKPACKER & TRAVELLER
          </h1>
          <div className="bg-clip-text-bar-traveller w-auto mr-4 mt-2 h-5 lg:hidden 2xl:block lg:mx-6 2xl:h-10 2xl:mt-4"></div>
        </div>
        <p className={`${oswald.className} bg-clip-text-traveller text-justify lg:px-20 2xl:text-[1.5rem] 2xl:px-5 lg:pt-10`}>
          Traveling is one of my greatest passions. I had the opportunity to study English in Ireland for a year and a half at ELI Language School in Drogheda, and I reached an advanced C1 level in the language. During my travels through Europe and Africa, I met incredible minds and learned a lot about architecture and technology. If you&apos;re also interested in these topics, it would be a pleasure to have you on our Instagram, where I share a bit of these experiences and discoveries!
        </p>
      </div>
    </div>
  )
}