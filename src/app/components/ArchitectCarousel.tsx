'use client';

import React, { useEffect, useRef } from 'react';
import EmblaCarousel, { EmblaCarouselType } from 'embla-carousel';
import Image from 'next/image';

const projectImages = [
    {
        name: "Projeto de Casa Sobrado em São Paulo: fachada principal",
        link: "https://i.imgur.com/QErZmRb.jpeg",
        alt: "Projeto feito por mim para uma casa sobrado no bairro do morumbi na cidade de São Paulo para uma família de 5 pessoas.",
    },
    {
        name: "Projeto de Casa Sobrado em São Paulo: sala de jantar",
        link: "https://i.imgur.com/3T5oz0l.jpeg",
        alt: "Projeto feito por mim para uma casa sobrado no bairro do morumbi na cidade de São Paulo para uma família de 5 pessoas.",
    },
    {
        name: "Projeto de Casa Sobrado em São Paulo: sala de estar",
        link: "https://i.imgur.com/MqX0Srs.jpeg",
        alt: "Projeto feito por mim para uma casa sobrado no bairro do morumbi na cidade de São Paulo para uma família de 5 pessoas.",
    },
    {
        name: "Projeto de Interiores: Apartamento em Osasco: sala e cozinha",
        link: "https://i.imgur.com/82I8CLu.jpeg",
        alt: "Projeto feito por mim para um apartamento no centro da cidade de Osasco para uma família de 4 pessoas.",
    },
    {
        name: "Projeto de Interiores: Apartamento em Osasco: vista pro painel & sala de jantar",
        link: "https://i.imgur.com/bMVFkgo.jpeg",
        alt: "Projeto feito por mim para um apartamento no centro da cidade de Osasco para uma família de 4 pessoas.",
    },
    {
        name: "Projeto de Interiores: Apartamento em Osasco: varanda",
        link: "https://i.imgur.com/TXfU8zU.jpeg",
        alt: "Projeto feito por mim para um apartamento no centro da cidade de Osasco para uma família de 4 pessoas.",
    },
    {
        name: "Projeto de Interiores: Apartamento em Osasco: detalhe da marcenaria do balcão",
        link: "https://i.imgur.com/PFmpdEd.jpeg",
        alt: "Projeto feito por mim para um apartamento no centro da cidade de Osasco para uma família de 4 pessoas.",
    },
    {
        name: "Projeto de Interiores: Apartamento em Osasco: quarto do casal",
        link: "https://i.imgur.com/LilJMCU.png",
        alt: "Projeto feito por mim para um apartamento no centro da cidade de Osasco para uma família de 4 pessoas.",
    },
];

const InfiniteCarousel = () => {
    const emblaRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!emblaRef.current) return;
        
        const emblaInstance = EmblaCarousel(emblaRef.current, {
          loop: true,
          align: "start",
          dragFree: true, // Permite arrastar manualmente sem alinhamento automático
        });
    
        const speed = 2500; // Velocidade do scroll (quanto maior, mais lento)
        let scrollInterval: ReturnType<typeof setTimeout>;
    
        const startScroll = () => {
          const scrollNext = () => {
            emblaInstance.scrollNext();
            scrollInterval = setTimeout(() => {
              requestAnimationFrame(scrollNext);
            }, speed);
          };
          scrollNext();
        };
    
        startScroll();
    
        return () => {
          clearTimeout(scrollInterval); // Limpar o intervalo quando o componente for desmontado
          emblaInstance.destroy();
        };
      }, []);

    return (
        <div className="relative w-full overflow-hidden h-fit bg-black mt-3">
            <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container flex">
                    {projectImages.concat(projectImages).map((image, index) => (
                        <div
                            key={index}
                            className="embla__slide flex-shrink-0 w-auto px-0" // Remove o espaçamento entre as imagens
                        >
                            <img
                                src={image.link}
                                alt={image.alt}
                                className="w-full h-[300px] object-contain" // Ajusta o tamanho da imagem
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default InfiniteCarousel;
