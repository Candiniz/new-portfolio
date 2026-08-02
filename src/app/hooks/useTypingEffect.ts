import { useState, useEffect, useRef } from 'react';

export function useTypingEffect(fullText: string, speed: number = 100) {
    // Estados controlados pelo React (substitui a alteração direta no textContent)
    const [displayedText, setDisplayedText] = useState("");
    const [isTypingDone, setIsTypingDone] = useState(false);
    
    // Referência para substituir o "document.getElementById"
    const containerRef = useRef<HTMLDivElement | null>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // Reseta e começa a digitar
                        setDisplayedText("");
                        setIsTypingDone(false);
                        let index = 0;
                        
                        if (intervalRef.current) clearInterval(intervalRef.current);

                        intervalRef.current = setInterval(() => {
                            setDisplayedText(fullText.slice(0, index + 1));
                            index++;
                            
                            if (index === fullText.length) {
                                if (intervalRef.current) clearInterval(intervalRef.current);
                                setIsTypingDone(true);
                            }
                        }, speed);

                    } else {
                        // Se saiu da tela, limpa tudo e para o intervalo
                        if (intervalRef.current) clearInterval(intervalRef.current);
                        setDisplayedText("");
                        setIsTypingDone(false);
                    }
                });
            },
            { threshold: 0.5 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            observer.disconnect();
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [fullText, speed]);

    // Retorna o que o componente precisa para renderizar
    return { displayedText, isTypingDone, containerRef };
}