import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaFigma, FaSass, FaMicrosoft, FaPython, FaDocker } from "react-icons/fa";
import { RiNextjsFill, RiTailwindCssFill } from "react-icons/ri";
import { SiTypescript, SiPrisma, SiStyledcomponents, SiN8N, SiGooglecloud, SiNodedotjs, SiMetabase, SiPostgresql  } from "react-icons/si";
import { DiPhotoshop } from "react-icons/di";
import { IoLogoFirebase } from "react-icons/io5";


export const personalProjects = [
    {
        slug: 'disordle',
        name: 'Disordle',
        projectLink: 'https://disordle.vercel.app',
        repositoryLink: 'https://github.com/Candiniz/disordle',
        linkedIn: 'https://www.linkedin.com/feed/update/urn:li:activity:7312852213691826177/',
        icons: (
            <>
                <FaReact />
                < FaJs />
                <FaCss3Alt />
                < FaFigma />
            </>
        ),
        description: "Disordle nasceu da minha paixão por jogos de lógica com palavras e do desejo de criar algo próprio dentro desse universo. Inspirado em jogos como Wordle e Termo, decidi construir minha própria versão — com mecânicas familiares, mas também com funcionalidades únicas que elevam a experiência do jogador.\n\n Assim como em outros projetos autorais, optei pela abordagem de clonagem por observação, um método onde me baseio exclusivamente na minha vivência como jogador, sem consultar o código-fonte dos jogos originais. Isso me força a decifrar e recriar cada lógica por trás da experiência, utilizando apenas a percepção das regras, da interação e da dinâmica visual.\n\n O Disordle permite partidas ilimitadas, personalização do número de letras e exibição do significado da palavra final — um diferencial que estimula não apenas o raciocínio, mas também o vocabulário dos jogadores.\n\n Durante o desenvolvimento, um dos maiores desafios técnicos foi a construção de um banco de palavras confiável. Para garantir variedade e precisão, implementei múltiplas estratégias:\n - Integração com a API do Dicionário Aberto para validação lexical;\n - Web Scraping com Node.js no Dicio para expandir o vocabulário;\n - Filtros personalizados para restringir o jogo a verbos e substantivos comuns, garantindo coerência e jogabilidade justa.\n\n Toda a lógica de verificação das tentativas foi construída do zero em React.js, cuidando para que o feedback visual das letras fosse claro, responsivo e intuitivo. A arquitetura do jogo prioriza performance, clareza e facilidade de expansão — atributos fundamentais para futuros incrementos.\n\n Atualmente, o projeto já está disponível em produção, mas continua em evolução. Meu próximo objetivo é adicionar sistema de autenticação, rankings e conquistas, criando uma camada competitiva e social para os jogadores mais engajados.\n\n O código-fonte está disponível no GitHub e o jogo pode ser jogado online por qualquer navegador moderno. O Disordle representa minha constante busca por unir aprendizado técnico, criatividade e diversão em projetos que desafiem tanto o usuário quanto o desenvolvedor por trás da tela.",
        image: {
            url: 'https://i.imgur.com/VEkHZWi.png',
            alt: "Interface do jogo de palavras Disordle exibindo tentativas em blocos coloridos.",
            date: '04/12/2024'
        }
    },
    {
        slug: 'hexis',
        name: 'HEXIS!',
        projectLink: 'https://hexis.vercel.app',
        repositoryLink: 'https://github.com/Candiniz/hexis',
        linkedIn: 'https://www.linkedin.com/feed/update/urn:li:activity:7278147027002179585/',
        icons: (
            <>
                <FaReact />
                < FaJs />
                <FaCss3Alt />
                < FaFigma />
            </>
        ),
        description: "Hexis é um projeto que nasceu do desejo de me auto desafiar e explorar novos horizontes no desenvolvimento de aplicações interativas. Inspirado no jogo mobile Trigon, da IEC Games, decidi recriar sua essência por meio de uma abordagem de clonagem por observação. Esse método exigiu que eu confiasse exclusivamente na minha experiência como jogador para projetar funcionalidades e mecânicas, sem qualquer acesso ao código-fonte do jogo original. O objetivo era não apenas replicar a jogabilidade, mas também compreender e implementar os fundamentos lógicos e visuais que tornam Trigon tão cativante.\n\nO processo foi um dos mais desafiadores que já enfrentei. Desde o início, a construção do tabuleiro com SVGs revelou-se uma tarefa minuciosa e complexa, exigindo atenção aos detalhes visuais e funcionais. Definir as coordenadas de cada triângulo que compõe o tabuleiro foi outro obstáculo significativo, pois demandou cálculos geométricos precisos para garantir a interação fluida entre as peças e o tabuleiro. Além disso, criar uma dinâmica em que as peças reconhecem seus posicionamentos e interagem corretamente com o ambiente reforçou minhas habilidades em lógica de programação e manipulação de DOM no React.js.\n\nHexis não foi apenas um projeto técnico, mas também uma oportunidade de aprendizado e crescimento. Ele solidificou meu domínio em React.js e JavaScript avançado, ao mesmo tempo que me desafiou a sair da zona de conforto. O resultado final é um jogo totalmente funcional, que agora pode ser experimentado por qualquer pessoa em 'https://hexis.vercel.app'. Este projeto ocupa um lugar especial no meu portfólio, pois simboliza a combinação de determinação, criatividade e aprendizado contínuo que trago para cada desafio que enfrento.",
        image: {
            url: 'https://i.imgur.com/kEtAOJn.png',
            alt: "Gameplay do jogo HEXIS! mostrando o tabuleiro hexagonal com peças geométricas.",
            date: '04/12/2024'
        }
    },
    {
        slug: 'restora',
        name: 'reStora',
        projectLink: 'https://restora-lake.vercel.app',
        repositoryLink: 'https://github.com/Candiniz/reStore',
        linkedIn: '',
        icons: (
            <>
                <RiNextjsFill />
                < FaJs />
                <SiTypescript />
                < FaSass />
                <RiTailwindCssFill />
            </>
        ),
        description: "Este projeto foi desenvolvido para explorar a criação de APIs, integração de IA, sistemas SaaS e a conexão fullstack entre frontend e backend usando o Supabase. A ideia inicial era construir um app que permitisse restaurar imagens danificadas, unindo tecnologia de ponta com uma experiência de usuário simples e eficiente. Durante o desenvolvimento, enfrentei desafios como configurar serviços de IA, lidar com problemas de tipagem no TypeScript, gerenciar permissões no Supabase e garantir um fluxo funcional e intuitivo para o usuário.\n\nO app funciona em três etapas principais: o usuário faz o upload de uma imagem, que é armazenada em um bucket do Supabase; a imagem é processada por uma API integrada ao serviço Replicate para restaurá-la usando modelos de IA; e, por fim, o resultado é exibido ao usuário, que pode fazer o download da versão restaurada. Todo o fluxo foi projetado para ser eficiente e fácil de usar.\n\nO objetivo do projeto é oferecer uma ferramenta prática para restaurar imagens enquanto demonstra habilidades em desenvolvimento fullstack e integração de tecnologias modernas. Este trabalho foi um marco no meu aprendizado, especialmente na solução de problemas e no domínio de sistemas escaláveis e avançados.",
        image: {
            url: 'https://i.imgur.com/KKA0tQm.png',
            alt: "Interface da aplicação reStora exibindo o upload e a restauração de imagens com IA.",
            date: '04/12/2024'
        }
    },
    {
        slug: 'projex',
        name: 'ProjEx',
        projectLink: 'https://proj-ex.vercel.app',
        repositoryLink: 'https://github.com/Candiniz/ProjEX',
        linkedIn: '',
        icons: (
            <>
                <FaReact />
                < FaJs />
                <FaCss3Alt />
                < RiTailwindCssFill />
            </>
        ),
        description: "Este projeto foi desenvolvido com o objetivo de dominar operações básicas em JavaScript, como manipulação de valores numéricos e monetários, além de administrar valores dinâmicos e a conexão entre front-end e back-end. Inicialmente, a aplicação utilizava um simples JSON server para armazenar e recuperar dados. No entanto, ao perceber as limitações dessa abordagem, decidi migrar para uma solução mais robusta, adotando o Firebase como banco de dados.\n\nCom a integração do Firebase, o projeto ganhou escalabilidade e desempenho, e, para garantir a segurança e a experiência do usuário, implementei um sistema de login completo, utilizando autenticação por email e senha. Isso permitiu um acesso mais ágil e seguro às funcionalidades da aplicação, como gerenciamento de projetos e criação de novos itens. Essas características fazem com que este projeto possa ser considerado um início de um Software as a Service (SaaS), demonstrando os fundamentos básicos de um sistema escalável e seguro.\n\nNo futuro, planejo aprimorá-lo para torná-lo um autêntico SaaS, incluindo funcionalidades como um modelo de monetização com planos de assinatura, suporte multiusuário avançado e permissões personalizadas. Além disso, pretendo implementar melhorias na interface do usuário e introduzir relatórios automáticos para proporcionar uma experiência ainda mais rica e completa aos usuários. Este projeto tem sido uma jornada desafiadora e enriquecedora, consolidando meu entendimento sobre autenticação, estruturação de dados dinâmicos e escalabilidade em sistemas modernos.",
        image: {
            url: 'https://i.imgur.com/ekDJKin.png',
            alt: "Dashboard principal do sistema ProjEx mostrando valores dinâmicos e gerenciamento de projetos.",
            date: '04/12/2024'
        }
    },
    {
        slug: 'sobrinha-artesanatos',
        name: 'Sobrinha | Loja Virtual',
        projectLink: 'https://www.sobrinha.store',
        repositoryLink: 'https://github.com/Candiniz/next-commerce-1',
        linkedIn: '',
        icons: (
            <>
                <SiTypescript />
                < FaJs />
                <RiNextjsFill />
                < RiTailwindCssFill />
                <SiPrisma />
            </>
        ),
        description: "Este projeto foi desenvolvido em Next.js para criar uma loja virtual personalizada para a artesã Lourdes Maria Candida Sobrinha. A loja foi projetada para oferecer uma experiência de compra intuitiva e segura, utilizando tecnologias modernas.\n\n Para o sistema de autenticação, utilizei o Clerk, garantindo um fluxo de login e registro de clientes eficiente e seguro. O Prisma e o PostgreSQL foram escolhidos para gerenciar o banco de dados, oferecendo uma estrutura robusta e escalável. Além disso, a integração com o Stripe possibilitou a implementação de um sistema de pagamento confiável e seguro.\n\n A loja conta com um catálogo de produtos organizado por categorias inteligentes, facilitando a navegação e a busca pelos itens. O carrinho de compras foi desenvolvido utilizando TypeScript e JavaScript, proporcionando uma interação dinâmica e eficiente. Toda a solução foi construída com foco na performance e na experiência do usuário, desde a navegação até a finalização da compra.",
        image: {
            url: 'https://i.imgur.com/41LaBQh.jpeg',
            alt: "Página inicial do e-commerce Sobrinha Artesanatos com foco na exibição de produtos.",
            date: '10/10/1000'
        }
    },
    {
        slug: 'new-portfolio',
        name: 'Novo Portfólio | Candiniz',
        projectLink: '',
        repositoryLink: '',
        linkedIn: '',
        icons: (
            <>
                <SiTypescript />
                < FaJs />
                <RiNextjsFill />
                < RiTailwindCssFill />
                <FaFigma />
                < SiStyledcomponents />
                <DiPhotoshop />
            </>
        ),
        description: "Este é o meu portfólio recém-criado, no qual apliquei diversas habilidades que adquiri recentemente, como Next.js, Styled Components, e TypeScript. O projeto envolve a construção de APIs mais complexas e a integração de bibliotecas poderosas, como Framer Motion para animações, Typpy para manipulação de tipos, Material UI para uma interface de usuário moderna e responsiva, e React-P5 para criar experiências interativas com gráficos e animações.\n\n O objetivo deste portfólio é refletir não apenas minhas habilidades técnicas, mas também minha capacidade de criar interfaces dinâmicas e de fácil navegação, com foco na performance e na experiência do usuário.",
        image: {
            url: 'https://i.imgur.com/jv21AnZ.png',
            alt: "Interface moderna do novo portfólio de Anderson Candiniz.",
            date: '10/10/1000'
        }
    },
    {
        slug: 'old-portfolio',
        name: 'Portfólio Antigo | Candiniz',
        projectLink: 'https://candiniz.github.io/myportifolio/',
        repositoryLink: 'https://github.com/Candiniz/myportifolio',
        linkedIn: '',
        icons: (
            <>
                <FaHtml5 />
                < FaJs />
                <FaCss3Alt />
                < FaFigma />
            </>
        ),
        description: "Este foi o meu primeiro portfólio criado com o objetivo de aprimorar minhas habilidades em HTML, CSS e JavaScript sem o uso de frameworks. Desenvolvido enquanto estava na Irlanda, esse projeto foi um dos mais complexos que realizei na época, onde integrei essas tecnologias de forma mais avançada. Foi uma oportunidade para explorar conceitos mais profundos de JavaScript, como manipulação de DOM, animações e interatividade, além de consolidar meu entendimento sobre estruturação de layouts e design responsivo.",
        image: {
            url: 'https://i.imgur.com/08IldNi.png',
            alt: "Versão antiga do portfólio de Anderson Candiniz desenvolvido com HTML, CSS e JS puros.",
            date: '10/10/1000'
        }
    },
    {
        slug: 'finance-control',
        name: 'Finance Control',
        projectLink: 'https://candiniz.github.io/Finance-Control/',
        repositoryLink: 'https://github.com/Candiniz/Finance-Control',
        linkedIn: '',
        icons: (
            <>
                <FaReact />
                < FaJs />
                <FaCss3Alt />
            </>
        ),
        description: "Desenvolvido em React, este foi o meu primeiro projeto utilizando o framework. O sistema permite adicionar custos e ganhos, realizando automaticamente os cálculos do total de despesas, receitas e o saldo final após as transações. Criado como uma forma de praticar lógicas básicas de JavaScript, este projeto foi programado com valores em euros, pois foi desenvolvido durante o período em que estava estudando inglês na Irlanda, em 2023. Foi uma excelente oportunidade para consolidar meu aprendizado no React, ao mesmo tempo em que trabalhava com estados e manipulação de dados de forma interativa.",
        image: {
            url: 'https://i.imgur.com/Q9dAMhL.png',
            alt: "Painel de controle financeiro exibindo despesas e receitas em Euros.",
            date: '10/10/1000'
        }
    },
    {
        slug: 'mario-js',
        name: 'Mario JS',
        projectLink: 'https://candiniz.github.io/mario-js/',
        repositoryLink: 'https://github.com/Candiniz/mario-js',
        linkedIn: '',
        icons: (
            <>
                <FaHtml5 />
                < FaJs />
                <FaCss3Alt />
            </>
        ),
        description: "Desenvolvido completamente em JavaScript, este projeto foi uma das minhas primeiras experiências mais desafiadoras ao trabalhar diretamente com a linguagem, sem o uso de frameworks. O jogo é uma versão simples do Super Mario, onde o personagem corre e pula canos no cenário, inspirado no famoso jogo do dinossauro do Google Chrome.\n\n A aplicação conta com um contador de tempo, que registra quanto tempo o jogador conseguiu sobreviver. Se o Mario colide com um cano, o jogo termina e exibe a pontuação final, permitindo que o jogador reinicie e tente novamente.\n\n A verdadeira dificuldade desse projeto foi que ele exigiu um domínio mais profundo de conceitos fundamentais de JavaScript, como manipulação do DOM, controle de eventos e lógica de jogo, tudo isso sem o auxílio de bibliotecas externas. Foi uma excelente oportunidade de prática e aprendizado, especialmente por ser um dos primeiros projetos a me desafiar a ir além das funcionalidades mais básicas da linguagem.",
        image: {
            url: 'https://i.imgur.com/ZDoC8Du.png',
            alt: "Visualização do jogo Mario JS com o personagem saltando obstáculos.",
            date: '10/10/1000'
        }
    },
    {
        slug: 'iss-finder',
        name: 'ISS JS Finder',
        projectLink: 'https://candiniz.github.io/iss-finder/',
        repositoryLink: 'https://github.com/Candiniz/iss-finder',
        linkedIn: '',
        icons: (
            <>
                <FaHtml5 />
                < FaJs />
                <FaCss3Alt />
            </>
        ),
        description: "Este projeto foi criado como minha primeira aplicação usando JavaScript puro, com o objetivo de explorar a integração de APIs e como fazer chamadas assíncronas em um contexto real. Utilizei o Leaflet, uma biblioteca para mapas interativos, e a API ISS Tracker API (disponível em: 'https://api.wheretheiss.at/v1/satellites/25544') da Open Notify para rastrear a Estação Espacial Internacional (ISS) em tempo real.\n\n A funcionalidade do aplicativo é simples e interessante: ele exibe um mapa interativo que mostra a localização atual da ISS, atualizando a posição a cada 5 segundos. Enquanto o usuário observa, o mapa também exibe um rastro da movimentação da estação, permitindo ver a trajetória da ISS ao longo do tempo.\n\n Além disso, há um círculo em torno do ícone da ISS, representando a área visível da estação a partir do ponto onde ela se encontra. Esse círculo simula a distância real em que a ISS pode ser vista a olho nu ou com equipamento adequado, dependendo das condições meteorológicas. O objetivo dessa aplicação foi estudar como interagir com APIs externas usando JavaScript e como criar uma interface dinâmica sem o uso de frameworks, apenas com HTML, CSS e JS.",
        image: {
            url: 'https://i.imgur.com/Fp4eq94.png',
            alt: "Mapa interativo exibindo a localização em tempo real da Estação Espacial Internacional (ISS).",
            date: '10/10/1000'
        }
    },
    {
        slug: 'landing-page',
        name: 'Minha primeira Landing Page',
        projectLink: 'https://candiniz.github.io/landing_page_study_1/',
        repositoryLink: 'https://github.com/Candiniz/landing_page_study_1',
        linkedIn: '',
        icons: (
            <>
                <FaHtml5 />
                < FaCss3Alt />
            </>
        ),
        description: "Esse projeto foi a minha primeira tentativa de fazer uma Landing Page, então achei interessante deixá-lo aqui. Ele foi feito puramente em HTML e CSS no início dos meus estudos.",
        image: {
            url: 'https://i.imgur.com/ZRekg3a.png',
            alt: "Visual estático da primeira landing page desenvolvida em HTML e CSS.",
            date: '10/10/1000'
        }
    },
];

export const corporateProjects = [
    {
        slug: 'digitalizafinanceiro',
        name: 'Gerenciador Financeiro',
        role: 'Autor & Desenvolvedor Principal',
        status: 'Sistema Interno Corporativo',
        impactBadge: 'Caso de Sucesso Institucional',
        icons: (
            <>
                <FaMicrosoft />
                <SiTypescript />
                <RiTailwindCssFill />
            </>
        ),
        description: "O Gerenciador Financeiro é um ecossistema inteligente corporativo desenvolvido para resolver o gargalo operacional de processos manuais lentos na triagem e digitação de e-mails, que consumiam horas semanais de tarefas repetitivas e apresentavam vulnerabilidade a falhas humanas e perda de documentos.\n\nApresentado internamente como Case de Sucesso, o projeto modernizou o fluxo de lançamentos de despesas diversas, substituindo o vaivém de e-mails e arquivos de texto por aprovações ágeis diretamente via Microsoft Teams. O sistema captura e-mails padronizados e realiza a imputação de dados 100% automatizada no ERP jurídico corporativo, gerando relatórios consolidados e garantindo governança através de uma base de dados exclusiva.\n\n Destaques Técnicos & Impacto:\n- Integração arquitetural robusta entre Power Apps, Power Automate, Microsoft Teams e sistemas legados;\n- Tempo faturável devolvido à operação: aprovações reduzidas a poucos minutos, com ganho de eficiência administrativa reportado entre 80% e 90% na execução de lançamentos;\n- Automação estrutural com impacto direto em produtividade, reduzindo o tempo despendido de 45 horas semanais para apenas 8 horas semanais em um período de consolidação de 9 meses;\n- Processamento seguro de mais de 3.500 lançamentos acumulados de forma autônoma, eliminando perdas de informação e viabilizando rastreabilidade contábil impecável.",
        image: {
            url: '/experience/DigitalizaFinanceiro.png',
            alt: "Demonstração visual do fluxo de automação financeira no ecossistema Microsoft.",
            date: '2025'
        }
    },
    {
        slug: 'ipscraper',
        name: 'Axon Datafind | IPScraper',
        role: 'Autor & Desenvolvedor Principal',
        status: 'Sistema Interno Corporativo',
        impactBadge: 'Redução de Horas para Segundos',
        icons: (
            <>
                <RiNextjsFill />
                <SiTypescript />
                <FaPython />
                <FaDocker />
            </>
        ),
        description: "O Axon Datafind é um ecossistema de extração, depuração e planilhamento automatizado de dados telemáticos projetado para dar suporte a departamentos de Contencioso Massificado.\n\nA solução substituiu o processo manual de leitura de relatórios e PDFs fornecidos por operadoras de telecomunicações por um fluxo automatizado e altamente performático.\n\n Destaques Técnicos & Impacto:\n- Backend construído em Python para parsing massivo de documentos e estruturação de dados não estruturados;\n- Interface reativa em React e TypeScript para acompanhamento de execuções e geração de relatórios limpos para os analistas;\n- Processos operacionais que exigiam horas de análise manual passam a ser executados em poucos segundos com precisão absoluta.",
        image: {
            url: '/experience/OpiceIP.png',
            alt: "Visualização do painel operacional do IPScraper extraindo dados telemáticos.",
            date: '2025'
        }
    },
    {
        slug: 'opice-clause',
        name: 'Clause AI | Agente LGPD',
        role: 'Autor & Desenvolvedor Principal',
        status: 'Sistema Interno Corporativo',
        impactBadge: 'Orquestração de IA Cognitiva',
        icons: (
            <>
                <SiN8N />
                <SiGooglecloud />
                <FaPython />
                <FaMicrosoft />
            </>
        ),
        description: "O Clause AI é um sistema autônomo de análise contratual focado em proteção de dados e conformidade regulatória. O projeto utiliza modelos de linguagem (LLMs) para interpretar minutas contratuais complexas e apontar riscos jurídicos em tempo recorde.\n\nA arquitetura foi desenhada no modelo de 'malha fechada' (Human-in-the-loop), onde a IA faz a varredura inicial, classifica as cláusulas conforme parâmetros pré-estabelecidos e entrega a minuta pré-analisada para a revisão humana final.\n\n Destaques Técnicos & Impacto:\n- Orquestração de fluxos assíncronos via n8n integrados ao Google Cloud (Vertex AI/Gemini);\n- Redução significativa do tempo de revisão inicial de contratos de privacidade;\n- Aumento da padronização e consistência na identificação de cláusulas abusivas ou não conformes.",
        image: {
            url: '/experience/OpiceClause.mp4',
            alt: "Interface do agente de IA analisando e classificando cláusulas contratuais.",
            date: '2025'
        }
    },
    {
        slug: 'rpa-python-architecture',
        name: 'Arquitetura RPA Python',
        role: 'Desenvolvedor Colaborador (Backend & Infra)',
        status: 'Infraestrutura de Automação',
        impactBadge: 'Otimização de Custos de Cloud',
        icons: (
            <>
                <SiMetabase />
                <SiPostgresql />
                <FaPython />
                <FaDocker />
                <SiNodedotjs />
            </>
        ),
        description: "Refatoração e migração da infraestrutura de automações legadas da instituição, substituindo fluxos visuais dependentes do Power Automate Desktop por scripts customizados em Python executados em containers Docker isolados.\n\nO projeto implementou uma arquitetura robusta dividida entre agendadores (Schedulers) e workers de execução. Essa abordagem eliminou a dependência de ambientes gráficos interativos e aprimorou a precisão de rotinas *unattended*, garantindo, por exemplo, que flags booleanas condicionais sejam definidas e interpretadas corretamente de forma direta no schema JSON subjacente.\n\n Destaques Técnicos & Impacto:\n- Atuação no refactoring de rotinas críticas e conteinerização de ambientes de execução;\n- Eliminação de custos recorrentes com licenças e instâncias de Máquinas Virtuais (VMs) dedicadas;\n- Aumento dramático na resiliência das automações, permitindo tratamento avançado de exceções, retentativas e logs detalhados.",
        image: {
            url: '/experience/opiceRPA.jpg',
            alt: "Diagrama e logs de execução da arquitetura de orquestração RPA baseada em Python e Docker.",
            date: '2026'
        }
    },
    {
        slug: 'opicedesk',
        name: 'WorkspacePro | Helpdesk',
        role: 'Autor & Desenvolvedor Principal',
        status: 'Sistema Interno Corporativo',
        impactBadge: 'Gestão Eficiente de SLA',
        icons: (
            <>
                <RiNextjsFill />
                <SiTypescript />
                <RiTailwindCssFill />
                <FaFigma />
                <IoLogoFirebase />
            </>
        ),
        description: "O WorkspacePro é uma aplicação Web desenvolvida para otimizar o fluxo de atendimento, triagem e roteamento de chamados operacionais do time de TI e Backoffice.\n\nProjetado do zero após um estudo detalhado de UX/UI no Figma, o sistema oferece uma interface centralizada onde colaboradores podem abrir requisições e a equipe técnica pode gerenciar filas de prioridade e prazos de SLA.\n\n Destaques Técnicos & Impacto:\n- Frontend moderno em React com TypeScript, focado em responsividade e usabilidade intuitiva;\n- Centralização do histórico de requisições, melhorando a visibilidade de gargalos operacionais internos;\n- Redução do tempo médio de resposta (MTTR) a solicitações internas da companhia.",
        image: {
            url: '/experience/OpiceDesk.jpg',
            alt: "Interface de usuário moderna e responsiva do sistema de helpdesk WorkspacePro.",
            date: '2025'
        }
    },
    {
        slug: 'chatopice',
        name: 'Corporate AI Chat',
        role: 'Desenvolvedor Colaborador (UI & Integração)',
        status: 'Ferramenta de IA Generativa',
        impactBadge: 'Pesquisa Inteligente de Dados',
        icons: (
            <>
                <FaReact />
                <SiTypescript />
                <SiGooglecloud />
                <FaPython />
                <IoLogoFirebase />
            </>
        ),
        description: "O Corporate AI Chat é uma plataforma interna de inteligência artificial generativa criada para apoiar a operação corporativa na consulta rápida de normas, teses internas e base de conhecimento da instituição.\n\nComo colaborador no projeto, atuei na construção de componentes de interface, refatoração de fluxos no frontend e auxílio na integração com os pipelines de comunicação das APIs do modelo de linguagem.\n\n Destaques Técnicos & Impacto:\n- Contribuição no desenvolvimento de componentes reutilizáveis em React e TypeScript;\n- Implementação de layouts focados em legibilidade e experiência conversacional para os usuários finais;\n- Aceleração massiva das etapas de pesquisa preliminar em auditorias e consultorias internas.",
        image: {
            url: '/experience/ChatOpice.png',
            alt: "Interface conversacional corporativa focada em pesquisa e suporte interno.",
            date: '2025'
        }
    },
    {
        slug: 'portal-carreiras',
        name: 'Portal de Carreiras',
        role: 'Autor & Desenvolvedor Principal',
        status: 'Aplicação Web Institucional',
        impactBadge: 'Otimização de Employer Branding',
        icons: (
            <>
                <FaReact />
                <RiTailwindCssFill />
                <FaFigma />
                <FaMicrosoft />
            </>
        ),
        description: "Portal Web desenvolvido exclusivamente para o departamento de Recursos Humanos corporativo, focado em atração de talentos, divulgação de vagas e fortalecimento da marca empregadora (Employer Branding).\n\nA aplicação prioriza a velocidade de carregamento, SEO otimizado e uma jornada do candidato extremamente fluida desde a visualização da vaga até a submissão de currículos. Além da excelência em interface, o sistema conta com uma infraestrutura de orquestração construída em Power Automate, responsável por coletar, padronizar e rotear automaticamente as candidaturas para caixas de correio compartilhadas, garantindo segurança de dados e agilidade na triagem pelo RH.\n\n Destaques Técnicos & Impacto:\n- Arquitetura estática e otimizada utilizando Next.js (App Router) e Tailwind CSS;\n- Integração de backend assíncrono para roteamento automatizado de currículos;\n- Prototipagem e Design System construídos sob medida no Figma;\n- Modernização estrutural do processo de atração de profissionais para a empresa.",
        image: {
            url: '/experience/Carreiras.png',
            alt: "Visualização do Portal de Carreiras institucional otimizado para candidatos.",
            date: '2025'
        }
    },
    {
        slug: 'portal-dps-fenalaw',
        name: 'Portal Institucional de Eventos',
        role: 'Autor & Desenvolvedor Principal',
        status: 'Aplicação Web de Marketing',
        impactBadge: 'Apresentação em Evento Nacional',
        icons: (
            <>
                <FaReact />
                <RiTailwindCssFill />
                <FaFigma />
            </>
        ),
        description: "Página web de alta performance desenvolvida sob demanda para o time de Marketing em apoio à participação institucional na Fenalaw (maior evento de tecnologia e negócios do setor na América Latina).\n\nO portal atuou como vitrine interativa para apresentação de cases de sucesso e soluções aplicadas, com foco em impacto visual e alta fluidez de navegação em dispositivos móveis.\n\n Destaques Técnicos & Impacto:\n- Desenvolvimento acelerado utilizando Next.js e estilização refinada com Tailwind CSS;\n- Animações fluidas de scroll e transições pensadas para prender a atenção do visitante em ambientes de feira e estande;\n- Sucesso de engajamento durante a exposição institucional da marca no evento.",
        image: {
            url: '/experience/DPSFenalaw.png',
            alt: "Página estática com navegação de alta performance projetada para evento corporativo.",
            date: '2025'
        }
    }
];