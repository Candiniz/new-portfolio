
import "../globals.css";
import { oswald } from "../fonts/Fonts";
import InstagramFeed from "./Instagram/InstagramFeed";



export default function Traveller() {


  return (
    <div className="w-full h-fit aspect-video mt-20">

      <div className="relative w-full h-72 lg:mb-0">
        <div className="absolute top-0 right-0 inset-0 bg-gradient-to-b from-black to-transparent z-[11] "></div>
        <div className="bg-clip-text-bar-traveller w-full h-full relative z-10">
        </div>
      </div>

      <div className="inset-0 flex lg:flex-row justify-center items-center  bg-black/80">
        <p className={`${oswald.className} bg-clip-text-traveller text-justify lg:px-20 2xl:text-[1.5rem] 2xl:px-5 ml-3`}>
          Traveling is one of my greatest passions. I had the opportunity to study English in Ireland for a year and a half at ELI Language School in Drogheda, and I reached an advanced C1 level in the language. During my travels through Europe and Africa, I met incredible minds and learned a lot about architecture and technology. If you&apos;re also interested in these topics, it would be a pleasure to have you on our Instagram, where I share a bit of these experiences and discoveries!
        </p>
        <div className="w-full">
          <div className="bg-clip-text-bar-traveller bg-traveller-h w-auto ml-3 mt-3 2xl:h-28"></div>
          <h1
            className={`
            ${oswald.className} 
            text-transparent text-left lg:text-center 2xl:text-left font-bold pl-3 bg-clip-text-traveller
              text-4xl md:text-6xl lg:text-7xl xl:text-[6.6vw] 2xl:text-[11rem] 2xl:px-4 mr-3
          `}
          >
            BACKPACKER & TRAVELLER
          </h1>
          <div className="bg-clip-text-bar-traveller bg-traveller-h w-auto ml-3 mt-2 lg:block 2xl:block 2xl:h-10 2xl:mt-4"></div>
        </div>
      </div>
      <div className="bg-clip-text-bar-traveller h-20 w-full 2xl:block mt-3 lg:mb-0">
      </div>
      <script src="https://static.elfsight.com/platform/platform.js" async></script>
      <div className="w-[90vw] h-fit bg-[#1b1b1b] m-auto flex p-5 items-center justify-center mt-20" id="insta">
        <InstagramFeed />


      </div>
    </div>
  )
}