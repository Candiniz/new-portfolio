/*
 * Textos do site em português (fonte da verdade do formato).
 * O en.ts tem de ter EXATAMENTE as mesmas chaves: o TypeScript acusa o que faltar.
 * Itens marcados "CONFIRMAR" foram escritos a partir de informação indireta.
 */
const pt = {
    meta: {
        title: "Anderson Diniz | Desenvolvedor de Automação & IA",
        description:
            "Desenvolvedor de Automação & IA: RPA, Power Automate, n8n, Python, agentes com LLM (Vertex AI, Gemini, Claude Code) e interfaces em Next.js. Processos manuais viram rotinas autônomas e auditáveis.",
        keywords: ["automação", "RPA", "inteligência artificial", "Power Automate", "n8n", "Python", "Vertex AI", "Claude Code", "Next.js", "Legal Ops"],
    },

    nav: {
        how: "Como eu trabalho",
        skills: "Habilidades",
        projects: "Projetos",
        experience: "Experiência",
        education: "Formação",
        about: "Sobre mim",
        contact: "Contato",
        home: "Início",
        openMenu: "Abrir menu",
        closeMenu: "Fechar menu",
        language: "Idioma",
        switchLanguage: "Switch to English",
        themeToLight: "Ativar modo claro",
        themeToDark: "Ativar modo escuro",
    },

    hero: {
        greeting: "Prazer, sou",
        name: "Anderson",
        headline: "Automação & IA para operações que não podem parar.",
        subtitle:
            "Construo robôs (RPA), agentes de IA e integrações que tiram o trabalho repetitivo das equipes — com rastreabilidade, monitoramento e revisão humana onde ela importa.",
        ctaTalk: "Vamos conversar",
        ctaCv: "Baixar CV",
        ctaClose: "Fechar",
        cvPt: "Currículo em português",
        cvEn: "Currículo em inglês",
        photoAlt: "Foto de Anderson Diniz",
        badgeValue: "2+",
        badgeLabel: "anos de experiência",
        faceHint: "3D · clique",
        faceAction: "Ver meu rosto em 3D: ele se vira para a tela e pisca",
        techsLabel: "Ferramentas do dia a dia",
        statsLabel: "Resultados em produção",
        stats: [
            { value: "45h → 8h", label: "por semana em lançamentos financeiros" },
            { value: "3.500+", label: "demandas processadas sem perda de dados" },
            { value: "80–90%", label: "de ganho de eficiência operacional" },
        ],
    },

    how: {
        title: "Como eu trabalho",
        intro: "O mesmo método em qualquer processo, do primeiro café com a área ao robô rodando sozinho.",
        steps: [
            {
                title: "Mapear",
                text: "Converso com quem executa o processo, desenho o fluxo atual e encontro onde o tempo se perde. É o olhar de projeto que trouxe da arquitetura.",
            },
            {
                title: "Automatizar",
                text: "Robôs, integrações por API e IA onde ela agrega valor — cada etapa com tratamento de erro, retentativa e registro.",
            },
            {
                title: "Medir",
                text: "Toda execução gera relatório e log. Sem número, ninguém sabe se melhorou: nem eu, nem a equipe.",
            },
            {
                title: "Monitorar",
                text: "Rodadas agendadas, alertas quando algo foge do esperado e revisão humana nos pontos sensíveis.",
            },
        ],
    },

    skills: {
        title: "Minhas Habilidades",
        intro: "Quatro frentes que se encaixam: entender o processo, automatizar, aplicar IA e entregar a interface que deixa tudo visível.",
        tabsLabel: "Áreas de atuação",
        deliverLabel: "O que entrego",
        toolsLabel: "Ferramentas",
        stackTitle: "Stack completa",
        toolNames: { process: "Mapeamento de processos", infoArch: "Arquitetura da informação" },
        groups: {
            automation: "Automação & integração",
            ai: "Inteligência artificial",
            web: "Web & produto",
            data: "Dados & cloud",
            design: "Concepção & design",
        },
        pillars: [
            {
                id: "automation",
                title: "Automação & RPA",
                impact: "Processos manuais viram rotinas autônomas, auditáveis e monitoradas.",
                bullets: [
                    "Robôs em Power Automate (Desktop e Cloud) e Python que operam portais, sistemas legados e caixas de e-mail.",
                    "Integrações por API REST, Microsoft Graph e SharePoint, com retentativa, deduplicação e trilha de auditoria.",
                    "Na prática: lançamentos financeiros de 45h para 8h por semana e 3.500+ demandas sem perda de dados.",
                ],
            },
            {
                id: "ai",
                title: "IA aplicada & agentes",
                impact: "LLMs trabalhando dentro do processo, com humano no circuito onde a decisão importa.",
                bullets: [
                    "Extração e classificação de documentos com Gemini e Vertex AI, devolvendo dados estruturados ao fluxo.",
                    "Agentes e pipelines assíncronos em n8n conectados ao Google Cloud (human-in-the-loop).",
                    "Claude Code como par de engenharia: diagnóstico de falhas, refatoração e documentação em uma fração do tempo.",
                ],
            },
            {
                id: "web",
                title: "Produto & interfaces",
                impact: "Painéis e portais que tornam a automação visível para quem usa.",
                bullets: [
                    "Aplicações em Next.js, React e TypeScript, com Tailwind e foco em performance e acessibilidade.",
                    "Design system e protótipos no Figma antes do código, para validar a ideia cedo.",
                    "Deploy e operação com Docker, Google Cloud, Oracle Cloud e VPS próprias.",
                ],
            },
            {
                id: "concept",
                title: "Concepção & processos",
                impact: "Antes da primeira linha de código, entendo o negócio e desenho a solução.",
                bullets: [
                    "Levantamento de requisitos e tradução de regras de negócio complexas em fluxos claros.",
                    "Formação em Arquitetura e pós em BIM: pensamento de projeto, Lean e melhoria contínua.",
                    "Arquitetura da informação e prototipação de alta fidelidade para alinhar todo mundo.",
                ],
            },
        ],
    },

    projects: {
        title: "Portfólio & Cases",
        intro: "Casos reais em empresas (com NDA respeitado) e projetos pessoais onde testo ideias novas.",
        corporate: "Soluções corporativas",
        personal: "Projetos pessoais & open source",
        filtersLabel: "Filtrar projetos",
        filters: { all: "Todos", automation: "Automação", ai: "IA", web: "Web" },
        viewCase: "Ver case",
        showMore: "Mostrar mais projetos",
        showLess: "Mostrar menos",
        empty: "Nenhum projeto nesta categoria.",
        nda: "NDA Compliant",
        ndaText:
            "Para preservar a segurança da informação e os acordos de confidencialidade (NDA), a identidade visual e os dados sensíveis desta interface foram higienizados e recriados com IA generativa (Gemini). A arquitetura, a usabilidade (UX) e o design de interface (UI) seguem fiéis ao sistema original.",
        open: "Acessar projeto",
        repo: "Repositório",
        linkedin: "Post no LinkedIn",
        close: "Fechar",
        problem: "Problema",
        solution: "Solução",
        result: "Resultado",
        highlights: "Destaques técnicos",
        mediaUnavailable: "Prévia indisponível",
        ndaDiagram:
            "Diagrama redesenhado com nomes genéricos para respeitar a confidencialidade: nenhum cliente, sistema interno, tela real ou dado de processo aparece aqui.",
        items: {
            "pg-rpa-ia": {
                name: "Operação de robôs com IA",
                role: "Desenvolvedor de Automação & IA",
                status: "Ecossistema interno corporativo",
                badge: "40+ robôs em produção",
                alt: "Diagrama do ecossistema: entradas, robôs, decisão e saídas, mantido com engenharia assistida por IA.",
                problem:
                    "Dezenas de robôs em Power Automate Desktop capturavam casos em portais, e-mails e planilhas e cadastravam no sistema jurídico. Cada um era mantido à mão, sem versão nem padrão, e falha silenciosa só aparecia quando alguém reclamava.",
                solution:
                    "Tratei a operação como software: todos os fluxos versionados num repositório, com padrões escritos, um validador que pega erro antes de o código chegar ao designer e os logs de execução lidos para achar a causa de cada falha. O Claude Code entrou como par de engenharia para diagnosticar, consertar e documentar. Cada robô grava todo caso num controle, inclusive os com erro (que viram fila de revisão humana), usa IA só onde há documento para ler e avisa a equipe com um card único no Teams.",
                result:
                    "Mais de 40 automações sustentadas com o mesmo método, falhas silenciosas transformadas em alertas e cada conserto documentado junto do código, para o erro não voltar.",
                highlights: [
                    "Repositório único com padrões, validador e documentação por automação",
                    "Toda gravação confere o destino antes de escrever",
                    "Caso com erro nunca some: vira fila de revisão humana",
                    "Card único no Teams com totais, erros e link para os relatórios",
                ],
                diagram: {
                    columns: [
                        { title: "Entradas", nodes: ["Portais de clientes", "Caixas de e-mail", "Planilhas das áreas"] },
                        { title: "Robôs", accent: true, nodes: ["40+ fluxos no Power Automate Desktop", "Agendados pela nuvem"] },
                        { title: "Decisão", nodes: ["Deduplicação contra o controle", "IA lê os documentos", "Erro → revisão humana"] },
                        { title: "Saídas", nodes: ["Sistema jurídico (API)", "Card no Teams", "Relatórios no SharePoint"] },
                    ],
                    band: {
                        title: "Engenharia assistida por IA",
                        text: "Repositório versionado · validador do código · logs de execução · documentação viva, com o Claude Code como par de engenharia.",
                    },
                },
            },
            "pg-prisma": {
                name: "PG Prisma",
                role: "Idealizador & desenvolvedor",
                status: "Plataforma interna corporativa",
                badge: "Robôs e agentes de IA num só lugar",
                alt: "Diagrama do PG Prisma: a pessoa, o assistente com habilidades por área, o broker com permissões e as fontes de dados.",
                problem:
                    "As automações rodavam, mas fora do time técnico ninguém via o que estava acontecendo nem quanto tempo elas devolviam. E as áreas queriam usar IA no dia a dia sem expor documentos nem entregar credenciais a uma ferramenta.",
                solution:
                    "Uma plataforma com duas frentes. Um painel ao vivo, em que cada robô é um nó de um planeta interativo, com execuções, filas e falhas em tempo real, e uma constelação mostra as horas de trabalho que cada área recebeu de volta. E um broker de ferramentas (MCP) para agentes de IA por área: a pessoa entra com a própria conta corporativa, o broker libera só as ferramentas do papel dela, age em nome dela e registra cada chamada sem guardar conteúdo.",
                result:
                    "Áreas não técnicas consultando documentos, execuções e indicadores numa conversa, com a mesma permissão que já tinham, e a gestão enxergando o retorno das automações em horas.",
                highlights: [
                    "Painel 3D ao vivo dos robôs, a partir dos registros de execução",
                    "Tempo devolvido calculado execução a execução, não estimado",
                    "Agentes acessam dados como a própria pessoa, sem segredo guardado",
                    "Auditoria de cada chamada, sem conteúdo nem token",
                ],
                diagram: {
                    columns: [
                        { title: "Pessoa", nodes: ["Jurídico", "Financeiro e compras", "TI e marketing"] },
                        { title: "Assistente", accent: true, nodes: ["Claude com habilidades por área", "Rascunho sempre revisado por alguém"] },
                        { title: "Broker MCP", nodes: ["Login corporativo da pessoa", "Ferramentas liberadas por papel", "Auditoria sem conteúdo"] },
                        { title: "Fontes", nodes: ["Documentos que a pessoa já acessa", "Execuções dos robôs", "Indicadores de BI"] },
                    ],
                    band: {
                        title: "Painel ao vivo",
                        text: "Planeta das execuções em tempo real e constelação das horas devolvidas a cada área.",
                    },
                },
            },
            digitalizafinanceiro: {
                name: "Gerenciador Financeiro",
                role: "Autor & desenvolvedor principal",
                status: "Sistema interno corporativo",
                badge: "Case de sucesso institucional",
                alt: "Fluxo de automação financeira no ecossistema Microsoft.",
                problem:
                    "Despesas chegavam por e-mail e arquivos de texto para triagem e digitação manual: horas semanais de trabalho repetitivo, sujeito a erro humano e perda de documentos.",
                solution:
                    "Ecossistema em Power Apps e Power Automate que captura e-mails padronizados, envia aprovações direto no Microsoft Teams e lança os dados de forma 100% automatizada no ERP jurídico, com base própria para governança e relatórios consolidados.",
                result:
                    "De 45 para 8 horas semanais em 9 meses, ganho de eficiência administrativa entre 80% e 90% e mais de 3.500 lançamentos processados sem perda de informação.",
                highlights: [
                    "Integração entre Power Apps, Power Automate, Teams e sistemas legados",
                    "Aprovações reduzidas a poucos minutos",
                    "Rastreabilidade contábil de ponta a ponta",
                ],
            },
            ipscraper: {
                name: "Axon Datafind | IPScraper",
                role: "Autor & desenvolvedor principal",
                status: "Sistema interno corporativo",
                badge: "De horas para segundos",
                alt: "Painel do IPScraper extraindo dados telemáticos.",
                problem:
                    "Analistas do contencioso massificado liam à mão relatórios e PDFs enviados por operadoras de telecomunicações para extrair dados telemáticos.",
                solution:
                    "Backend em Python para leitura massiva e estruturação de documentos não estruturados, com interface em React e TypeScript para acompanhar as execuções e gerar planilhas limpas.",
                result: "Análises que levavam horas passaram a sair em segundos, com precisão e padronização.",
                highlights: [
                    "Parsing de documentos não estruturados em Python",
                    "Execução isolada em containers Docker",
                    "Painel de acompanhamento em Next.js",
                ],
            },
            "opice-clause": {
                name: "Clause AI | Agente LGPD",
                role: "Autor & desenvolvedor principal",
                status: "Sistema interno corporativo",
                badge: "Orquestração de IA cognitiva",
                alt: "Agente de IA analisando e classificando cláusulas contratuais.",
                problem:
                    "A revisão inicial de minutas de privacidade e proteção de dados consumia tempo de especialistas e variava de um revisor para outro.",
                solution:
                    "Agente que usa LLMs (Vertex AI / Gemini) orquestrados em n8n para ler a minuta, classificar as cláusulas por parâmetros definidos e apontar riscos, com revisão humana final (human-in-the-loop).",
                result: "Revisão inicial mais rápida e mais consistente na identificação de cláusulas abusivas ou não conformes.",
                highlights: [
                    "Fluxos assíncronos em n8n integrados ao Google Cloud",
                    "Malha fechada: a IA faz a varredura, o humano decide",
                    "Critérios de análise padronizados",
                ],
            },
            "rpa-python-architecture": {
                name: "Arquitetura RPA em Python",
                role: "Desenvolvedor colaborador (backend & infra)",
                status: "Infraestrutura de automação",
                badge: "Menos custo de cloud",
                alt: "Diagrama e logs da orquestração RPA em Python e Docker.",
                problem:
                    "Automações legadas em Power Automate Desktop dependiam de ambiente gráfico interativo, máquinas virtuais dedicadas e licenças.",
                solution:
                    "Migração para scripts Python em containers Docker isolados, com uma arquitetura de agendadores (schedulers) e workers de execução.",
                result:
                    "Fim dos custos recorrentes com licenças e VMs dedicadas, e automações mais resilientes, com tratamento de exceções, retentativas e logs detalhados.",
                highlights: [
                    "Refatoração de rotinas críticas",
                    "Execuções unattended confiáveis",
                    "Observabilidade com logs e painéis (Metabase + PostgreSQL)",
                ],
            },
            opicedesk: {
                name: "WorkspacePro | Helpdesk",
                role: "Autor & desenvolvedor principal",
                status: "Sistema interno corporativo",
                badge: "Gestão eficiente de SLA",
                alt: "Interface do sistema de helpdesk WorkspacePro.",
                problem: "Chamados de TI e backoffice chegavam por canais dispersos, sem fila nem visibilidade de prazos.",
                solution:
                    "Aplicação web desenhada no Figma e construída em React e TypeScript, centralizando abertura, triagem, prioridade e SLA dos chamados.",
                result: "Histórico centralizado, gargalos visíveis e menor tempo médio de resposta (MTTR) às solicitações internas.",
                highlights: ["Estudo de UX/UI no Figma antes do código", "Filas de prioridade e prazos de SLA", "Firebase como backend"],
            },
            chatopice: {
                name: "Corporate AI Chat",
                role: "Desenvolvedor colaborador (UI & integração)",
                status: "Ferramenta de IA generativa",
                badge: "Pesquisa inteligente",
                alt: "Interface conversacional corporativa de pesquisa.",
                problem: "Consultar normas, teses internas e a base de conhecimento exigia pesquisa manual demorada.",
                solution:
                    "Plataforma interna de IA generativa. Atuei nos componentes de interface, na refatoração do frontend e na integração com as APIs do modelo de linguagem.",
                result: "Pesquisa preliminar muito mais rápida em auditorias e consultorias internas.",
                highlights: [
                    "Componentes reutilizáveis em React e TypeScript",
                    "Layout pensado para leitura e conversa",
                    "Integração com pipelines de LLM",
                ],
            },
            "portal-carreiras": {
                name: "Portal de Carreiras",
                role: "Autor & desenvolvedor principal",
                status: "Aplicação web institucional",
                badge: "Employer branding",
                alt: "Portal de Carreiras institucional.",
                problem: "O RH precisava divulgar vagas e receber currículos com agilidade, sem triar caixas de e-mail à mão.",
                solution:
                    "Portal em Next.js e Tailwind com SEO otimizado, design system no Figma e orquestração em Power Automate que coleta, padroniza e roteia as candidaturas para caixas compartilhadas.",
                result: "Jornada do candidato mais fluida, triagem mais ágil para o RH e dados de candidatos tratados com segurança.",
                highlights: [
                    "Next.js (App Router) estático e otimizado",
                    "Roteamento automático de currículos",
                    "Design system próprio no Figma",
                ],
            },
            "portal-dps-fenalaw": {
                name: "Portal Institucional de Eventos",
                role: "Autor & desenvolvedor principal",
                status: "Aplicação web de marketing",
                badge: "Apresentado em evento nacional",
                alt: "Página de alta performance para evento corporativo.",
                problem:
                    "O marketing precisava de uma vitrine interativa de cases para a Fenalaw, o maior evento de tecnologia e negócios do setor jurídico na América Latina.",
                solution:
                    "Página de alta performance em Next.js e Tailwind, com animações de scroll pensadas para prender a atenção no estande e boa navegação no celular.",
                result: "Apresentação dos cases da empresa com bom engajamento durante o evento.",
                highlights: ["Desenvolvimento acelerado em Next.js", "Animações de scroll fluidas", "Pensado para tablets e celulares"],
            },
            disordle: {
                name: "Disordle",
                alt: "Interface do jogo de palavras Disordle com tentativas em blocos coloridos.",
                description:
                    "Disordle nasceu da minha paixão por jogos de lógica com palavras e do desejo de criar algo próprio nesse universo. Inspirado em jogos como Wordle e Termo, construí minha própria versão — com mecânicas familiares e funcionalidades que elevam a experiência do jogador.\n\nComo em outros projetos autorais, usei a clonagem por observação: me baseio só na minha vivência como jogador, sem consultar o código-fonte dos jogos originais. Isso me obriga a decifrar e recriar cada lógica a partir das regras, da interação e da dinâmica visual.\n\nO Disordle permite partidas ilimitadas, escolher o número de letras e ver o significado da palavra final — um diferencial que estimula o raciocínio e o vocabulário.\n\nO maior desafio técnico foi montar um banco de palavras confiável. Para garantir variedade e precisão:\n- Integração com a API do Dicionário Aberto para validação lexical;\n- Web scraping com Node.js no Dicio para ampliar o vocabulário;\n- Filtros próprios para restringir o jogo a verbos e substantivos comuns, garantindo jogabilidade justa.\n\nToda a verificação das tentativas foi construída do zero em React, com feedback visual claro, responsivo e intuitivo. O projeto está em produção e segue evoluindo: os próximos passos são autenticação, rankings e conquistas.",
            },
            hexis: {
                name: "HEXIS!",
                alt: "Gameplay do HEXIS! com o tabuleiro hexagonal e peças geométricas.",
                description:
                    "Hexis nasceu da vontade de me desafiar no desenvolvimento de aplicações interativas. Inspirado no jogo mobile Trigon, da IEC Games, recriei sua essência por clonagem por observação, confiando só na minha experiência como jogador, sem acesso ao código-fonte original. O objetivo era replicar a jogabilidade e entender os fundamentos lógicos e visuais que tornam o jogo tão cativante.\n\nFoi um dos processos mais desafiadores que já enfrentei. Construir o tabuleiro com SVG exigiu atenção minuciosa, e definir as coordenadas de cada triângulo pediu cálculos geométricos precisos para a interação entre peças e tabuleiro ser fluida. Fazer as peças reconhecerem suas posições reforçou minha lógica de programação e a manipulação de DOM no React.\n\nO resultado é um jogo totalmente funcional, disponível em hexis.vercel.app — um projeto que simboliza a determinação, a criatividade e o aprendizado contínuo que levo para cada desafio.",
            },
            restora: {
                name: "reStora",
                alt: "Aplicação reStora restaurando imagens com IA.",
                description:
                    "Projeto criado para explorar APIs, integração de IA, sistemas SaaS e a conexão full-stack entre frontend e backend com Supabase. A ideia: um app para restaurar imagens danificadas, unindo tecnologia de ponta a uma experiência simples.\n\nO fluxo tem três etapas: o usuário envia a imagem, que vai para um bucket do Supabase; a imagem é processada por uma API integrada ao Replicate, que a restaura com modelos de IA; e o resultado é exibido para download.\n\nNo caminho, enfrentei a configuração dos serviços de IA, a tipagem em TypeScript e as permissões do Supabase — um marco no meu aprendizado de sistemas escaláveis.",
            },
            projex: {
                name: "ProjEx",
                alt: "Dashboard do ProjEx com valores dinâmicos e gestão de projetos.",
                description:
                    "Projeto para dominar operações em JavaScript — valores numéricos e monetários, dados dinâmicos e a conexão entre front-end e back-end. Começou com um JSON server e, ao esbarrar nas limitações, migrou para o Firebase.\n\nCom o Firebase vieram escala, desempenho e um sistema completo de login por e-mail e senha, o que faz do ProjEx o embrião de um SaaS.\n\nPróximos passos: planos de assinatura, suporte multiusuário com permissões, melhorias de interface e relatórios automáticos.",
            },
            "sobrinha-artesanatos": {
                name: "Sobrinha | Loja Virtual",
                alt: "Página inicial do e-commerce Sobrinha Artesanatos.",
                description:
                    "Loja virtual em Next.js feita para a artesã Lourdes Maria Candida Sobrinha, com experiência de compra simples e segura.\n\nAutenticação com Clerk, banco PostgreSQL via Prisma e pagamentos com Stripe. O catálogo é organizado por categorias e o carrinho foi construído em TypeScript, sempre com foco em performance e experiência do usuário, da navegação ao checkout.",
            },
            "aurestella-pyxis": {
                name: "Aurestella Pyxis | Agente de IA",
                badge: "Agente de IA · RAG",
                alt: "Capa do Aurestella Pyxis: o painel do agente dentro de uma base de Minecraft.",
                description:
                    "Um agente de IA que mora dentro do Minecraft (modpack ATM10). O jogador conversa com o Pyxis pelo chat, e ele entende a intenção: aciona a base de verdade, acendendo luzes e abrindo portas por redstone, ou responde dúvidas consultando a wiki do jogo.\n\nPor trás, um computador do ComputerCraft em Lua, com um rosto animado enquanto pensa, chama uma API em FastAPI que roda em Docker numa VPS, com Nginx e HTTPS na frente. Um roteador com Gemini classifica o pedido em JSON Schema; as dúvidas seguem para um RAG híbrido, com busca vetorial no PostgreSQL (pgvector) e fuzzy matching nas árvores de receitas, antes de o modelo sintetizar a resposta.\n\nCada chamada registra tokens e latência em segundo plano, exibidos em monitores dentro do jogo. É o mesmo desenho de um agente corporativo (roteamento, recuperação de contexto e telemetria), num laboratório divertido.",
            },
            "new-portfolio": {
                name: "Este Portfólio | Candiniz",
                alt: "Interface do portfólio atual de Anderson Diniz.",
                description:
                    "O site que você está vendo. Construído em Next.js 16 com TypeScript, Tailwind e Framer Motion, com páginas pré-renderizadas por idioma (português e inglês), tema claro e escuro e um sistema próprio de animação: pequenos cursores-robô que selecionam, contornam e “renderizam” cada elemento na tela, como num software de ilustração — e digitam os textos.\n\nO objetivo é mostrar, além do código, o cuidado com performance, acessibilidade e a experiência de quem navega.",
            },
            "old-portfolio": {
                name: "Portfólio Antigo | Candiniz",
                alt: "Versão antiga do portfólio em HTML, CSS e JavaScript puros.",
                description:
                    "Meu primeiro portfólio, feito para aprimorar HTML, CSS e JavaScript sem frameworks. Desenvolvido enquanto eu morava na Irlanda, foi um dos projetos mais complexos da época: manipulação de DOM, animações, interatividade, layouts e design responsivo.",
            },
            "finance-control": {
                name: "Finance Control",
                alt: "Painel de controle financeiro com despesas e receitas em euros.",
                description:
                    "Meu primeiro projeto em React. O sistema registra custos e ganhos e calcula automaticamente despesas, receitas e saldo final. Os valores estão em euros porque foi feito em 2023, enquanto eu estudava inglês na Irlanda — uma ótima forma de praticar estados e manipulação de dados.",
            },
            "mario-js": {
                name: "Mario JS",
                alt: "Jogo Mario JS com o personagem saltando obstáculos.",
                description:
                    "Jogo feito em JavaScript puro, inspirado no jogo do dinossauro do Chrome: o Mario corre e pula canos, com um contador de tempo de sobrevivência. Se colidir, o jogo mostra a pontuação e permite recomeçar.\n\nO desafio foi dominar manipulação do DOM, eventos e lógica de jogo sem nenhuma biblioteca externa.",
            },
            "iss-finder": {
                name: "ISS JS Finder",
                alt: "Mapa interativo com a posição da Estação Espacial Internacional.",
                description:
                    "Minha primeira aplicação em JavaScript puro integrando APIs. Com o Leaflet e a API wheretheiss.at, o mapa mostra a posição da Estação Espacial Internacional em tempo real, atualizada a cada 5 segundos, com o rastro da trajetória.\n\nUm círculo em volta do ícone representa a área de onde a ISS pode ser vista. O objetivo foi estudar chamadas assíncronas e interfaces dinâmicas sem frameworks.",
            },
            "landing-page": {
                name: "Minha primeira Landing Page",
                alt: "Primeira landing page desenvolvida em HTML e CSS.",
                description: "Minha primeira landing page, feita em HTML e CSS puros no início dos estudos. Achei que valia deixar aqui como ponto de partida.",
            },
        },
    },

    experience: {
        title: "Experiência Profissional",
        intro: "Arraste ou use as setas para navegar. Clique na empresa para ver os detalhes.",
        details: "Ver detalhes",
        hideDetails: "Fechar detalhes",
        goTo: "Ir para",
        prev: "Experiência anterior",
        next: "Próxima experiência",
        current: "Atual",
        cases: "Cases",
        items: [
            {
                id: "opice",
                company: "Opice Blum Advogados",
                role: "Analista de Desenvolvimento",
                period: "2025 – 2026", // CONFIRMAR o mês de saída
                summary: "Transformação digital e legal tech: rotinas jurídicas e financeiras viraram software escalável, seguro e auditável.",
                balloons: [
                    {
                        title: "Transformação digital",
                        text: "Modernização da operação do escritório, unindo desenvolvimento full-stack e orquestração de processos para transformar rotinas complexas em arquiteturas escaláveis e auditáveis.",
                        list: [
                            "Arquitetura híbrida: Power Platform, SharePoint e Legal One conectados a soluções em Next.js, React e Python.",
                            "Privacy by Design: interfaces e bancos de dados pensados para governança e compliance.",
                        ],
                    },
                    {
                        title: "Processos & automação",
                        text: "Plataformas unificadas e autônomas no lugar de operações manuais descentralizadas.",
                        list: [
                            "Lançamentos críticos de 45 para 8 horas semanais em 9 meses.",
                            "Ganho de eficiência operacional de 80% a 90% na ponta administrativa.",
                            "Mais de 3.500 demandas processadas sem perda de informação.",
                        ],
                    },
                    {
                        title: "IA cognitiva",
                        text: "Liderança técnica na evolução do RPA de interface para sistemas operados por agentes, com LLMs no fluxo contencioso e consultivo.",
                        list: [
                            "Pipelines assíncronos em n8n com Google Cloud (Vertex AI e Gemini).",
                            "Backends em Python e Docker para extrair e estruturar dados em segundos.",
                            "Aplicações human-in-the-loop: a IA acelera, o especialista decide.",
                        ],
                    },
                ],
            },
            {
                id: "pg",
                company: "PG Advogados",
                cases: [
                    { slug: "pg-rpa-ia", label: "Operação de robôs com IA" },
                    { slug: "pg-prisma", label: "PG Prisma" },
                ],
                role: "Desenvolvedor de Automação & IA", // CONFIRMAR cargo
                period: "2026 – atual", // CONFIRMAR mês de entrada
                summary:
                    "Automação e IA no Legal Ops: robôs que capturam casos nos portais dos clientes, cadastram no sistema jurídico por API e mantêm as equipes informadas.",
                balloons: [
                    {
                        title: "Legal Ops em escala",
                        text: "Sustentação e evolução de mais de 40 automações em produção (Power Automate Desktop e Cloud) que operam portais, e-mails e sistemas jurídicos todos os dias.",
                        list: [
                            "Captura de casos novos com deduplicação por arquivo de controle.",
                            "Cadastro por API REST com trilha de auditoria.",
                            "Card de status no Microsoft Teams ao fim de cada rodada.",
                        ],
                    },
                    {
                        title: "Dados & integrações",
                        text: "Sistemas que não conversam passam a conversar: APIs REST, Microsoft Graph, SharePoint, Power BI e lakehouses no Microsoft Fabric.",
                        list: [
                            "Consultas DAX e SQL para deduplicar e conferir dados.",
                            "Scripts Python de apoio aos fluxos.",
                            "Relatório e log gerados a cada execução.",
                        ],
                    },
                    {
                        title: "IA aplicada",
                        text: "Gemini para ler documentos e extrair dados estruturados, e Claude Code como par de engenharia para diagnosticar, refatorar e documentar.",
                        list: [
                            "Extração de dados de PDFs e e-mails com LLM.",
                            "Revisão humana nos pontos sensíveis.",
                            "Documentação viva junto do código.",
                        ],
                    },
                    {
                        title: "Confiabilidade",
                        text: "Falha em produção se resolve pela causa, com evidência — não pelo sintoma.",
                        list: [
                            "Execuções agendadas e monitoradas.",
                            "Alertas de falha no Teams.",
                            "Lições registradas para o erro não voltar.",
                        ],
                    },
                ],
            },
        ],
    },

    education: {
        title: "Formação Acadêmica",
        academic: "Formação acadêmica",
        courses: "Cursos livres",
        details: "Ver detalhes",
        hide: "Ocultar",
        coursesSummary: "4 cursos de desenvolvimento web · 2023",
        items: [
            {
                id: "fatec",
                degree: "Análise e Desenvolvimento de Sistemas",
                institution: "Fatec São Paulo",
                period: "2025 – 2028",
                description:
                    "Graduação no período noturno. Com experiência prévia como desenvolvedor freelancer, busco aqui aprofundar a engenharia de software e formalizar minha transição de carreira para a tecnologia, unindo teoria e prática.",
            },
            {
                id: "pucrs",
                degree: "Pós-graduação em BIM",
                institution: "PUC-RS",
                period: "2023 – 2024",
                description:
                    "Aprofundei Building Information Modeling e estudei o sistema Lean — eliminação de desperdícios e melhoria contínua. Uso essa base de gestão de processos todos os dias para desenhar automações mais eficientes.",
            },
            {
                id: "uam",
                degree: "Arquitetura e Urbanismo",
                institution: "Universidade Anhembi Morumbi",
                period: "2016 – 2020",
                description:
                    "Design urbano, planejamento e construção, com AutoCAD e Revit. Foi ali que percebi como automação e dados otimizam a criação e a gestão de projetos — o olhar que hoje aplico ao software.",
            },
        ],
        courseList: [
            {
                id: "html-css",
                title: "Build Responsive Real-World Websites with HTML and CSS",
                author: "Jonas Schmedtmann",
                description: "Sites responsivos do zero com HTML e CSS, de estrutura e tipografia a layouts avançados para computador, tablet e celular.",
            },
            {
                id: "ztm",
                title: "Complete Web Developer",
                author: "Zero to Mastery Academy",
                description: "Da página simples à aplicação full-stack: HTML, CSS, JavaScript, Node.js, React e boas práticas de mercado.",
            },
            {
                id: "js",
                title: "The Complete JavaScript Course — From Zero to Expert!",
                author: "Jonas Schmedtmann",
                description: "Imersão em JavaScript moderno: programação assíncrona, DOM e aplicações completas, com desafios práticos.",
            },
            {
                id: "node",
                title: "All about NodeJS",
                author: "Ground Up & More",
                description: "Node.js para servidores de alta performance e aplicações em tempo real, com JavaScript do front ao back.",
            },
        ],
    },

    about: {
        title: "Sobre mim",
        musician: {
            title: "MÚSICO & PRODUTOR MUSICAL",
            p1: "Sou músico e cantor autodidata. Comecei a estudar aos 11 anos, e esse primeiro contato com a música abriu meus horizontes e expandiu minha criatividade — o que me ajudou a chegar até aqui e a ser o profissional que sou hoje. Com mais de 30 músicas compostas e vários vídeos no meu canal do YouTube, sou grato a todos que me apoiaram e continuam apoiando o que eu amo fazer.",
            p2: "Também tenho bons conhecimentos em produção audiovisual e musical, o que me permite criar conteúdos completos e de qualidade, da ideia à realização final, transmitindo emoções e histórias de maneira autêntica e profissional.",
            showMore: "Mostrar mais",
            hide: "Esconder",
            play: "Assistir ao vídeo",
            videoLabel: "Vídeo",
        },
        traveller: {
            title: "BACKPACKER & TRAVELLER",
            text: "Viajar é uma das minhas maiores paixões. Estudei inglês por um ano e meio na ELI Language School, em Drogheda, na Irlanda, e cheguei ao nível avançado C1. Nas viagens pela Europa e pela África conheci mentes incríveis e aprendi muito sobre arquitetura e tecnologia.",
            timelineTitle: "Países que visitei no meu intercâmbio",
            timelineText: "Um ano e meio morando na Irlanda e, a partir de lá, viagens pela Europa e pelo norte da África.",
            base: "base · 1,5 ano",
            countryNames: {
                br: "Brasil",
                ie: "Irlanda",
                en: "Inglaterra",
                sc: "Escócia",
                ma: "Marrocos",
                fr: "França",
                it: "Itália",
            },
            flags: {
                br: "Bandeira do Brasil",
                ie: "Bandeira da Irlanda",
                en: "Bandeira da Inglaterra",
                sc: "Bandeira da Escócia",
                ma: "Bandeira de Marrocos",
                fr: "Bandeira da França",
                it: "Bandeira da Itália",
            },
            seal: {
                level: "C1",
                label: "ADVANCED",
                ring: "ADVANCED ENGLISH · C1 · CAE PREPARATION · IRELAND · ",
                title: "Inglês avançado (C1)",
                text: "Um ano e meio de imersão na Irlanda e o curso preparatório C1 Advanced (CAE) concluído na ELI Language School.",
                alt: "Selo de inglês avançado, nível C1",
            },
        },
        architect: {
            title1: "ARQUITETO &",
            title2: "URBANISTA",
            text: "Sou arquiteto e urbanista formado pela Universidade Anhembi Morumbi, com pós-graduação em BIM pela PUC-RS. Atuei como arquiteto, designer de interiores e em projetos de móveis planejados, o que me deu uma visão integrada do processo criativo e da execução.",
            close: "Fechar",
            images: [
                { name: "Casa sobrado em São Paulo: fachada principal", alt: "Projeto meu para uma casa sobrado no Morumbi, em São Paulo, para uma família de 5 pessoas." },
                { name: "Casa sobrado em São Paulo: sala de jantar", alt: "Projeto meu para uma casa sobrado no Morumbi, em São Paulo, para uma família de 5 pessoas." },
                { name: "Casa sobrado em São Paulo: sala de estar", alt: "Projeto meu para uma casa sobrado no Morumbi, em São Paulo, para uma família de 5 pessoas." },
                { name: "Apartamento em Osasco: sala e cozinha", alt: "Projeto de interiores meu para um apartamento no centro de Osasco, para uma família de 4 pessoas." },
                { name: "Apartamento em Osasco: painel e sala de jantar", alt: "Projeto de interiores meu para um apartamento no centro de Osasco, para uma família de 4 pessoas." },
                { name: "Apartamento em Osasco: varanda", alt: "Projeto de interiores meu para um apartamento no centro de Osasco, para uma família de 4 pessoas." },
                { name: "Apartamento em Osasco: marcenaria do balcão", alt: "Projeto de interiores meu para um apartamento no centro de Osasco, para uma família de 4 pessoas." },
                { name: "Apartamento em Osasco: quarto do casal", alt: "Projeto de interiores meu para um apartamento no centro de Osasco, para uma família de 4 pessoas." },
            ],
        },
    },

    contact: {
        eyebrow: "contato",
        title: "Vamos automatizar?",
        cta: "Tem um processo manual consumindo horas da sua equipe? Me conta qual é.",
        subtitle: "Respondo rápido por WhatsApp e e-mail.",
        available: "Disponível para novos projetos",
        location: "São Paulo · remoto",
        whatsapp: "Chamar no WhatsApp",
        email: "Mandar e-mail",
        formTitle: "Ou descreva o processo",
        formProcess: "Qual tarefa mais toma tempo da sua equipe?",
        formProcessPlaceholder: "Ex.: todo dia baixamos relatórios de 3 portais e juntamos tudo à mão numa planilha…",
        formContact: "Seu e-mail ou WhatsApp",
        formSend: "Enviar",
        formSendMail: "Abrir no meu e-mail",
        formSending: "Enviando…",
        formSent: "Recebido! Respondo em breve.",
        formError: "Não consegui enviar daqui. Abri seu e-mail com a mensagem pronta.",
        mailSubject: "Automação: um processo para conversar",
        terminalTitle: "contato.sh",
        terminalHint: "clique para abrir · ícone para copiar",
        copy: "Copiar",
        copied: "Copiado!",
    },

    notFound: {
        title: "Ops, não encontramos esta página.",
        text: "Use o botão abaixo para voltar ao início.",
        back: "Voltar ao início",
    },
};

export default pt;
