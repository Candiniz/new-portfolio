import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// Função para gerar cores pasteis aleatórias
const generatePastelColor = () => {
    const r = Math.floor(Math.random() * 128 + 127); // Gera uma cor mais clara
    const g = Math.floor(Math.random() * 128 + 127);
    const b = Math.floor(Math.random() * 128 + 127);
    return `rgb(${r}, ${g}, ${b})`;
};

const FeedPlanningAnimation = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [squareHeight, setSquareHeight] = useState(0);
    const [colors, setColors] = useState<string[]>(Array(9).fill(generatePastelColor())); // Inicia com 9 cores aleatórias diferentes

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

        // Intervalo para trocar as cores a cada 3 segundos
        const intervalId = setInterval(() => {
            // Atualiza as cores de cada quadrado individualmente
            setColors(colors.map(() => generatePastelColor()));
        }, 3000);

        return () => {
            window.removeEventListener("resize", updateSquareHeight); // Cleanup
            clearInterval(intervalId); // Limpar o intervalo ao desmontar o componente
        };
    }, [colors]);

    return (
        <motion.div
            className="w-full max-w-full bg-[#ffffff] p-1 gap-1 flex flex-col lg:mr-2 mb-2"
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
                    {Array(3).fill(null).map((_, index) => (
                        <motion.div
                            key={index}
                            className="flex-1 aspect-square"
                            style={{ backgroundColor: colors[index] }} // Aplica cor diferente para cada quadrado
                        />
                    ))}
                </motion.div>
                <motion.div
                    className="w-full"
                    ref={containerRef}
                    style={{ height: squareHeight, backgroundColor: colors[3] }} // Aplica cor para o retângulo
                />

                {/* Repetindo o padrão */}
                <motion.div className="w-full flex justify-between gap-1">
                    {Array(3).fill(null).map((_, index) => (
                        <motion.div
                            key={index + 3}
                            className="flex-1 aspect-square"
                            style={{ backgroundColor: colors[index + 3] }} // Aplica cor diferente para cada quadrado
                        />
                    ))}
                </motion.div>
                <motion.div
                    className="w-full"
                    style={{ height: squareHeight, backgroundColor: colors[6] }} // Aplica cor para o retângulo
                />

                {/* Repetindo o padrão novamente */}
                <motion.div className="w-full flex justify-between gap-1">
                    {Array(3).fill(null).map((_, index) => (
                        <motion.div
                            key={index + 6}
                            className="flex-1 aspect-square"
                            style={{ backgroundColor: colors[index + 6] }} // Aplica cor diferente para cada quadrado
                        />
                    ))}
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default FeedPlanningAnimation;
