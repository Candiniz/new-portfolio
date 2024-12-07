'use client';

import React, { useEffect, useRef, useState } from 'react';
import EmblaCarousel from 'embla-carousel';
import Image from 'next/image';
import { motion } from 'framer-motion';

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
        link: "https://i.imgur.com/pDikUlP.jpeg",
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

interface ProjectImage {
    name: string;
    link: string;
    alt: string;
}



const InfiniteCarousel = () => {
    const emblaRef = useRef<HTMLDivElement | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<ProjectImage | null>(null);


    const stopPropagation = (e) => {
        e.stopPropagation();
    };

    const handleImageClick = (image: ProjectImage) => {
        setSelectedImage(image);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedImage(null);
    };

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
                            className="embla__slide group flex-shrink-0 px-0 relative"
                        >
                            <div
                                className="max-w-[100vw] h-fit relative cursor-pointer"
                                onClick={() => handleImageClick(image)}
                            >
                                <Image
                                    src={image.link}
                                    alt={image.alt}
                                    layout="responsive"
                                    width={500}
                                    height={300}
                                    className="object-cover max-w-full max-h-[300px] transition-all duration-300 group-hover:opacity-75"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* Modal */}
            {modalOpen && (
                <motion.div
                    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                    onClick={(e) => {
                        e.preventDefault();
                        handleCloseModal();
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {selectedImage && (
                        <motion.div
                            className="bg-white p-8 w-fit rounded-lg overflow-hidden"
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 50 }}
                            transition={{ duration: 0.3 }}
                            onClick={stopPropagation}
                        >
                            <div className="flex flex-col items-center text-center md:px-5">
                                <Image
                                    src={selectedImage.link}
                                    alt={selectedImage.alt}
                                    width={1200}
                                    height={720}
                                    className="object-contain w-full mb-4 max-h-[70vh]"
                                />
                                <h2 className="text-md text-gray-800 font-semibold mb-2">{selectedImage.name}</h2>
                                <p className="text-gray-600 text-sm">{selectedImage.alt}</p>
                                <button
                                    onClick={handleCloseModal}
                                    className="mt-4 px-4 py-2 bg-[#aadd49] text-white rounded-full hover:bg-[#729531] transition-all duration-200"
                                >
                                    Fechar
                                </button>
                            </div>
                        </motion.div>
                    )}
                </motion.div>
            )}
        </div>
    );
};

export default InfiniteCarousel;
