import { Experience } from "../types/Home";

export const experiencesData: Experience[] = [
        {
            image: "/opiceLogo.png",
            degree: 'Analista de Desenvolvimento',
            institution: 'Opice Blum Advogados Associados',
            year: '2025 - ATUAL',
            sections: [
                {
                    title: "Transformação Digital & Legal Tech",
                    content: "Atuação direta na modernização da infraestrutura operacional do escritório, integrando o desenvolvimento Full Stack com a orquestração de processos empresariais. O foco central do trabalho consiste em mapear gargalos históricos e traduzir rotinas jurídicas e financeiras complexas em arquiteturas de software escaláveis, seguras e auditáveis.",
                    videoPath: "",
                    list: [
                        "Desenvolvimento arquitetural híbrido, conectando o ecossistema corporativo restrito (Microsoft Power Platform, SharePoint, Legal One) a soluções customizadas em Next.js, React e Python.",
                        "Forte alinhamento com governança de dados e compliance, desenvolvendo interfaces e bancos de dados orientados à privacidade desde a concepção (Privacy by Design)."
                    ]
                },
                {
                    title: "Engenharia de Processos & Automação",
                    content: "Concepção e implementação de ecossistemas corporativos focados em eficiência em larga escala, substituindo operações manuais descentralizadas por plataformas unificadas e autônomas.",
                    videoPath: "",
                    list: [
                        "Redução estrutural do tempo despendido em lançamentos críticos de 45 horas para apenas 8 horas semanais em um período de 9 meses.",
                        "Geração de um ganho de eficiência operacional reportado entre 80% e 90% na ponta administrativa.",
                        "Processamento seguro e 100% automatizado de mais de 3.500 demandas, garantindo zero perda de informações e rastreabilidade total."
                    ]
                },
                {
                    title: "Orquestração Cognitiva & Inteligência Artificial",
                    content: "Liderança técnica na evolução das automações legadas (RPA tradicional baseada em interface) para sistemas dinâmicos operados por agentes cognitivos, integrando LLMs diretamente no fluxo de trabalho contencioso e consultivo.",
                    videoPath: "",
                    list: [
                        "Orquestração de pipelines assíncronos avançados utilizando n8n em comunicação direta com a infraestrutura do Google Cloud (Vertex AI e Gemini).",
                        "Construção de ecossistemas backend em Python e Docker para extração, limpeza (scraping) e estruturação de dados telemáticos não estruturados em segundos.",
                        "Desenvolvimento de aplicações focadas no modelo 'Human-in-the-loop', garantindo aceleração na triagem de dados sem abrir mão da revisão final humana especializada."
                    ]
                }
            ]
        }
    ];