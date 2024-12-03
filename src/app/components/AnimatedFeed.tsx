import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const FeedPlanningAnimation = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [squareHeight, setSquareHeight] = useState(0);


    useEffect(() => {
        const updateSquareHeight = () => {
            if (containerRef.current) {
                const width = containerRef.current.offsetWidth; // Largura do container
                const numberOfSquares = 3; // Quantidade de quadrados na linha
                const gap = 8; // Gap entre os quadrados em pixels (ajuste conforme o seu layout)
                const height = (width - (numberOfSquares - 1) * gap) / numberOfSquares; // Cálculo da altura
                setSquareHeight(height);
            }
        };

        updateSquareHeight();
        window.addEventListener("resize", updateSquareHeight); // Recalcula ao redimensionar

        return () => window.removeEventListener("resize", updateSquareHeight); // Cleanup
    }, []);



    return (
        <motion.div
            className="w-full max-w-full bg-[#000] p-1 gap-1 flex flex-col lg:mr-2 mb-2"
            style={{
                position: "relative",
                aspectRatio: "1", // O aspecto pode ser ajustado conforme necessário
                overflow: "hidden",
            }}
        >
            {/* Animação de Scroll */}
            <motion.div
                className="w-full flex flex-col gap-1"
                animate={{
                    y: ["0px", `-${squareHeight * 2 + 8 * 1.4}px`],
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "linear",
                }}
            >
                {/* Padrão: 3 quadrados + 1 retângulo */}
                <motion.div className="w-full flex justify-between gap-1">
                    <motion.div
                       className="flex-1 aspect-square"
                       animate={{
                           backgroundColor: ["#ffffff", "#ffffff", "#ffffff"],
                       }}
                       transition={{
                           duration: 6,
                           times: [0, 0.5, 1],
                           repeat: Infinity,
                           repeatType: "loop",
                           ease: "linear",
                       }}
                    />
                    <motion.div
                        className="flex-1 aspect-square"
                        initial={{ backgroundColor: "#ffffff" }}
                        animate={{
                            backgroundColor: "#ffffff",
                        }}
                        exit={{ backgroundColor: "#ffffff" }}
                        transition={{
                            duration: 6,
                            times: [0, 0.5, 1],
                            repeat: Infinity,
                            repeatType: "loop",
                            ease: "linear",
                        }}
                    />
                    <motion.div
                        className="flex-1 aspect-square"
                        initial={{ backgroundColor: "#ffffff" }}
                        animate={{
                            backgroundColor: "#ffffff",
                        }}
                        exit={{ backgroundColor: "#ffffff" }}
                        transition={{
                            duration: 6,
                            times: [0, 0.5, 1],
                            repeat: Infinity,
                            repeatType: "loop",
                            ease: "linear",
                        }}
                    />
                </motion.div>
                <motion.div
                    className="w-full"
                    ref={containerRef}
                    style={{ height: squareHeight }}
                    initial={{ backgroundColor: "#ffffff" }}
                    animate={{
                        backgroundColor: "#ffffff",
                    }}
                    exit={{ backgroundColor: "#ffffff" }}
                    transition={{
                        duration: 6,
                        times: [0, 0.5, 1],
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "linear",
                    }}
                />

                {/* Repetindo o padrão */}
                <motion.div className="w-full flex justify-between gap-1">
                    <motion.div
                        className="flex-1 aspect-square"
                        initial={{ backgroundColor: "#ffffff" }}
                        animate={{
                            backgroundColor: "#ffffff",
                        }}
                        exit={{ backgroundColor: "#ffffff" }}
                        transition={{
                            duration: 6,
                            times: [0, 0.5, 1],
                            repeat: Infinity,
                            repeatType: "loop",
                            ease: "linear",
                        }}
                    />
                    <motion.div
                        className="flex-1 aspect-square"
                        initial={{ backgroundColor: "#ffffff" }}
                        animate={{
                            backgroundColor: "#ffffff",
                        }}
                        exit={{ backgroundColor: "#ffffff" }}
                        transition={{
                            duration: 6,
                            times: [0, 0.5, 1],
                            repeat: Infinity,
                            repeatType: "loop",
                            ease: "linear",
                        }}
                    />
                    <motion.div
                        className="flex-1 aspect-square"
                        initial={{ backgroundColor: "#ffffff" }}
                        animate={{
                            backgroundColor: "#ffffff",
                        }}
                        exit={{ backgroundColor: "#ffffff" }}
                        transition={{
                            duration: 6,
                            times: [0, 0.5, 1],
                            repeat: Infinity,
                            repeatType: "loop",
                            ease: "linear",
                        }}
                    />
                </motion.div>
                <motion.div
                    className="w-full"
                    style={{ height: squareHeight }}
                    ref={containerRef}
                    initial={{ backgroundColor: "#ffffff" }}
                    animate={{
                        backgroundColor: "#ffffff",
                    }}
                    exit={{ backgroundColor: "#ffffff" }}
                    transition={{
                        duration: 6,
                        times: [0, 0.5, 1],
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "linear",
                    }}
                />

                {/* Repetindo o padrão novamente */}
                <motion.div className="w-full flex justify-between gap-1">
                    <motion.div
                        className="flex-1 aspect-square"
                        initial={{ backgroundColor: "#ffffff" }}
                        animate={{
                            backgroundColor: "#ffffff",
                        }}
                        exit={{ backgroundColor: "#ffffff" }}
                        transition={{
                            duration: 6,
                            times: [0, 0.5, 1],
                            repeat: Infinity,
                            repeatType: "loop",
                            ease: "linear",
                        }}
                    />
                    <motion.div
                        className="flex-1 aspect-square"
                        initial={{ backgroundColor: "#ffffff" }}
                        animate={{
                            backgroundColor: "#ffffff",
                        }}
                        exit={{ backgroundColor: "#ffffff" }}
                        transition={{
                            duration: 6,
                            times: [0, 0.5, 1],
                            repeat: Infinity,
                            repeatType: "loop",
                            ease: "linear",
                        }}
                    />
                    <motion.div
                        className="flex-1 aspect-square"
                        initial={{ backgroundColor: "#ffffff" }}
                        animate={{
                            backgroundColor: "#ffffff",
                        }}
                        exit={{ backgroundColor: "#ffffff" }}
                        transition={{
                            duration: 6,
                            times: [0, 0.5, 1],
                            repeat: Infinity,
                            repeatType: "loop",
                            ease: "linear",
                        }}
                    />
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default FeedPlanningAnimation;
