import type { Dictionary } from "../getDictionary";

/* English texts. Same keys as pt.ts — TypeScript flags anything missing. */
const en: Dictionary = {
    meta: {
        title: "Anderson Diniz | Automation & AI Developer",
        description:
            "Automation & AI developer: RPA, Power Automate, n8n, Python, LLM agents (Vertex AI, Gemini, Claude Code) and Next.js interfaces. Manual processes become autonomous, auditable routines.",
        keywords: ["automation", "RPA", "artificial intelligence", "Power Automate", "n8n", "Python", "Vertex AI", "Claude Code", "Next.js", "Legal Ops"],
    },

    nav: {
        how: "How I work",
        skills: "Skills",
        projects: "Projects",
        experience: "Experience",
        education: "Education",
        about: "About me",
        contact: "Contact",
        home: "Home",
        openMenu: "Open menu",
        closeMenu: "Close menu",
        language: "Language",
        switchLanguage: "Mudar para português",
        themeToLight: "Switch to light mode",
        themeToDark: "Switch to dark mode",
    },

    hero: {
        greeting: "Hi, I'm",
        name: "Anderson",
        headline: "Automation & AI for operations that can't stop.",
        subtitle:
            "I build robots (RPA), AI agents and integrations that take repetitive work off people's plates — with traceability, monitoring and human review where it matters.",
        ctaTalk: "Let's talk",
        ctaCv: "Download CV",
        ctaClose: "Close",
        cvPt: "Résumé in Portuguese",
        cvEn: "Résumé in English",
        photoAlt: "Photo of Anderson Diniz",
        badgeValue: "2+",
        badgeLabel: "years of experience",
        faceHint: "3D · click",
        faceAction: "See my face in 3D: it turns to the screen and blinks",
        techsLabel: "Everyday tools",
        statsLabel: "Results in production",
        stats: [
            { value: "45h → 8h", label: "per week on financial entries" },
            { value: "3,500+", label: "requests processed with zero data loss" },
            { value: "80–90%", label: "operational efficiency gain" },
        ],
    },

    how: {
        title: "How I work",
        intro: "The same method for any process, from the first coffee with the team to the robot running on its own.",
        steps: [
            {
                title: "Map",
                text: "I talk to the people who run the process, draw the current flow and find where time is lost. It's the design mindset I brought from architecture.",
            },
            {
                title: "Automate",
                text: "Robots, API integrations and AI where it adds value — every step with error handling, retries and logging.",
            },
            {
                title: "Measure",
                text: "Every run produces a report and a log. Without numbers nobody knows if it got better: not me, not the team.",
            },
            {
                title: "Monitor",
                text: "Scheduled runs, alerts when something drifts and human review at the sensitive points.",
            },
        ],
    },

    skills: {
        title: "My Skills",
        intro: "Four fronts that fit together: understanding the process, automating it, applying AI and shipping the interface that makes it all visible.",
        tabsLabel: "Areas of expertise",
        deliverLabel: "What I deliver",
        toolsLabel: "Tools",
        stackTitle: "Full stack",
        toolNames: { process: "Process mapping", infoArch: "Information architecture" },
        groups: {
            automation: "Automation & integration",
            ai: "Artificial intelligence",
            web: "Web & product",
            data: "Data & cloud",
            design: "Concept & design",
        },
        pillars: [
            {
                id: "automation",
                title: "Automation & RPA",
                impact: "Manual processes become autonomous, auditable and monitored routines.",
                bullets: [
                    "Robots in Power Automate (Desktop and Cloud) and Python that operate portals, legacy systems and mailboxes.",
                    "Integrations through REST APIs, Microsoft Graph and SharePoint, with retries, deduplication and an audit trail.",
                    "In practice: financial entries down from 45h to 8h a week and 3,500+ requests with zero data loss.",
                ],
            },
            {
                id: "ai",
                title: "Applied AI & agents",
                impact: "LLMs working inside the process, with a human in the loop where the decision matters.",
                bullets: [
                    "Document extraction and classification with Gemini and Vertex AI, feeding structured data back into the flow.",
                    "Agents and asynchronous pipelines in n8n connected to Google Cloud (human-in-the-loop).",
                    "Claude Code as an engineering pair: debugging, refactoring and documentation in a fraction of the time.",
                ],
            },
            {
                id: "web",
                title: "Product & interfaces",
                impact: "Dashboards and portals that make automation visible to the people who use it.",
                bullets: [
                    "Apps in Next.js, React and TypeScript, styled with Tailwind, focused on performance and accessibility.",
                    "Design systems and prototypes in Figma before the code, to validate ideas early.",
                    "Deploy and operations with Docker, Google Cloud, Oracle Cloud and my own VPSs.",
                ],
            },
            {
                id: "concept",
                title: "Concept & process",
                impact: "Before the first line of code, I understand the business and design the solution.",
                bullets: [
                    "Requirements gathering and turning complex business rules into clear flows.",
                    "Architecture degree and a BIM postgraduate: design thinking, Lean and continuous improvement.",
                    "Information architecture and high-fidelity prototypes to get everyone aligned.",
                ],
            },
        ],
    },

    projects: {
        title: "Portfolio & Cases",
        intro: "Real company cases (NDAs respected) and personal projects where I try out new ideas.",
        corporate: "Corporate solutions",
        personal: "Personal & open-source projects",
        filtersLabel: "Filter projects",
        filters: { all: "All", automation: "Automation", ai: "AI", web: "Web" },
        viewCase: "View case",
        showMore: "Show more projects",
        showLess: "Show less",
        empty: "No projects in this category.",
        nda: "NDA Compliant",
        ndaText:
            "To protect information security and confidentiality agreements (NDA), the visual identity and sensitive data of this interface were sanitized and recreated with generative AI (Gemini). The architecture, usability (UX) and interface design (UI) remain faithful to the original system.",
        open: "Open project",
        repo: "Repository",
        linkedin: "LinkedIn post",
        close: "Close",
        problem: "Problem",
        solution: "Solution",
        result: "Result",
        highlights: "Technical highlights",
        mediaUnavailable: "Preview unavailable",
        ndaDiagram:
            "Diagram redrawn with generic names to respect confidentiality: no client, internal system, real screen or case data appears here.",
        items: {
            "pg-rpa-ia": {
                name: "Running robots with AI",
                role: "Automation & AI Developer",
                status: "Internal corporate ecosystem",
                badge: "40+ robots in production",
                alt: "Ecosystem diagram: inputs, robots, decision and outputs, maintained with AI-assisted engineering.",
                problem:
                    "Dozens of Power Automate Desktop robots captured cases from portals, mailboxes and spreadsheets and registered them in the legal system. Each one was maintained by hand, with no versioning or standards, and silent failures only showed up when someone complained.",
                solution:
                    "I treated the operation as software: every flow versioned in a repository, written standards, a validator that catches errors before the code reaches the designer, and run logs read to find the cause of each failure. Claude Code came in as an engineering pair to diagnose, fix and document. Each robot writes every case to a control file, including the failed ones (which become a human review queue), uses AI only where there is a document to read, and notifies the team with a single Teams card.",
                result:
                    "40+ automations sustained with the same method, silent failures turned into alerts, and every fix documented next to the code so the error does not come back.",
                highlights: [
                    "Single repository with standards, a validator and docs per automation",
                    "Every write checks the target before writing",
                    "A failed case never disappears: it becomes a human review queue",
                    "One Teams card with totals, errors and a link to the reports",
                ],
                diagram: {
                    columns: [
                        { title: "Inputs", nodes: ["Client portals", "Mailboxes", "Team spreadsheets"] },
                        { title: "Robots", accent: true, nodes: ["40+ Power Automate Desktop flows", "Scheduled from the cloud"] },
                        { title: "Decision", nodes: ["Dedup against the control file", "AI reads the documents", "Error → human review"] },
                        { title: "Outputs", nodes: ["Legal system (API)", "Teams card", "Reports on SharePoint"] },
                    ],
                    band: {
                        title: "AI-assisted engineering",
                        text: "Versioned repository · code validator · run logs · living documentation, with Claude Code as an engineering pair.",
                    },
                },
            },
            "pg-prisma": {
                name: "PG Prisma",
                role: "Creator & developer",
                status: "Internal corporate platform",
                badge: "Robots and AI agents in one place",
                alt: "PG Prisma diagram: the person, the assistant with skills per team, the broker with permissions and the data sources.",
                problem:
                    "The automations ran, but outside the tech team nobody could see what was happening or how much time they gave back. And teams wanted to use AI every day without exposing documents or handing credentials to a tool.",
                solution:
                    "A platform with two fronts. A live dashboard where each robot is a node on an interactive planet, with runs, queues and failures in real time, and a constellation shows the work hours each team got back. And a tool broker (MCP) for AI agents per team: people sign in with their own corporate account, the broker unlocks only the tools of their role, acts on their behalf and logs every call without storing content.",
                result:
                    "Non-technical teams querying documents, runs and indicators in a conversation, with the same permissions they already had, and management seeing the return of the automations in hours.",
                highlights: [
                    "Live 3D dashboard of the robots, built from run records",
                    "Time returned calculated run by run, not estimated",
                    "Agents access data as the person, with no stored secret",
                    "Every call audited, with no content or token",
                ],
                diagram: {
                    columns: [
                        { title: "Person", nodes: ["Legal", "Finance and purchasing", "IT and marketing"] },
                        { title: "Assistant", accent: true, nodes: ["Claude with skills per team", "Drafts always reviewed by someone"] },
                        { title: "MCP broker", nodes: ["The person's corporate login", "Tools unlocked by role", "Audit without content"] },
                        { title: "Sources", nodes: ["Documents the person can already see", "Robot runs", "BI indicators"] },
                    ],
                    band: {
                        title: "Live dashboard",
                        text: "A planet of runs in real time and a constellation of the hours given back to each team.",
                    },
                },
            },
            digitalizafinanceiro: {
                name: "Financial Manager",
                role: "Author & lead developer",
                status: "Internal corporate system",
                badge: "Company success case",
                alt: "Financial automation flow in the Microsoft ecosystem.",
                problem:
                    "Expenses arrived by email and text files to be triaged and typed in by hand: hours of repetitive work every week, prone to human error and lost documents.",
                solution:
                    "A Power Apps and Power Automate ecosystem that captures standardized emails, sends approvals straight to Microsoft Teams and posts the data 100% automatically into the legal ERP, with its own database for governance and consolidated reports.",
                result:
                    "From 45 to 8 hours a week in 9 months, an 80–90% administrative efficiency gain and over 3,500 entries processed with no information lost.",
                highlights: [
                    "Integration of Power Apps, Power Automate, Teams and legacy systems",
                    "Approvals down to a few minutes",
                    "End-to-end accounting traceability",
                ],
            },
            ipscraper: {
                name: "Axon Datafind | IPScraper",
                role: "Author & lead developer",
                status: "Internal corporate system",
                badge: "From hours to seconds",
                alt: "IPScraper dashboard extracting telematic data.",
                problem:
                    "Mass-litigation analysts read telecom carriers' reports and PDFs by hand to extract telematic data.",
                solution:
                    "A Python backend for bulk reading and structuring of unstructured documents, with a React and TypeScript interface to follow runs and export clean spreadsheets.",
                result: "Analyses that took hours now take seconds, with precision and consistency.",
                highlights: [
                    "Parsing unstructured documents in Python",
                    "Isolated execution in Docker containers",
                    "Monitoring dashboard in Next.js",
                ],
            },
            "opice-clause": {
                name: "Clause AI | Data Privacy Agent",
                role: "Author & lead developer",
                status: "Internal corporate system",
                badge: "Cognitive AI orchestration",
                alt: "AI agent analyzing and classifying contract clauses.",
                problem:
                    "The first review of privacy and data-protection drafts took specialists' time and varied from one reviewer to another.",
                solution:
                    "An agent that uses LLMs (Vertex AI / Gemini) orchestrated in n8n to read the draft, classify clauses against defined parameters and flag risks, with a final human review (human-in-the-loop).",
                result: "Faster, more consistent first reviews when spotting abusive or non-compliant clauses.",
                highlights: [
                    "Asynchronous n8n flows integrated with Google Cloud",
                    "Closed loop: AI scans, the human decides",
                    "Standardized review criteria",
                ],
            },
            "rpa-python-architecture": {
                name: "Python RPA Architecture",
                role: "Contributing developer (backend & infra)",
                status: "Automation infrastructure",
                badge: "Lower cloud costs",
                alt: "Diagram and logs of the Python and Docker RPA orchestration.",
                problem:
                    "Legacy Power Automate Desktop automations depended on interactive desktops, dedicated virtual machines and licenses.",
                solution: "Migration to Python scripts in isolated Docker containers, with a scheduler and worker architecture.",
                result:
                    "No more recurring license and dedicated-VM costs, and more resilient automations with exception handling, retries and detailed logs.",
                highlights: [
                    "Refactoring of critical routines",
                    "Reliable unattended runs",
                    "Observability with logs and dashboards (Metabase + PostgreSQL)",
                ],
            },
            opicedesk: {
                name: "WorkspacePro | Helpdesk",
                role: "Author & lead developer",
                status: "Internal corporate system",
                badge: "Efficient SLA management",
                alt: "WorkspacePro helpdesk interface.",
                problem: "IT and back-office tickets came through scattered channels, with no queue and no visibility of deadlines.",
                solution:
                    "A web app designed in Figma and built in React and TypeScript, centralizing ticket creation, triage, priority and SLA.",
                result: "Centralized history, visible bottlenecks and a lower mean time to respond (MTTR) to internal requests.",
                highlights: ["UX/UI study in Figma before coding", "Priority queues and SLA deadlines", "Firebase as the backend"],
            },
            chatopice: {
                name: "Corporate AI Chat",
                role: "Contributing developer (UI & integration)",
                status: "Generative AI tool",
                badge: "Smart search",
                alt: "Corporate conversational search interface.",
                problem: "Looking up internal rules, legal theses and the knowledge base meant slow manual research.",
                solution:
                    "An internal generative AI platform. I worked on interface components, frontend refactoring and the integration with the language model APIs.",
                result: "Much faster preliminary research in internal audits and advisory work.",
                highlights: ["Reusable React and TypeScript components", "Layout designed for reading and conversation", "Integration with LLM pipelines"],
            },
            "portal-carreiras": {
                name: "Careers Portal",
                role: "Author & lead developer",
                status: "Corporate web application",
                badge: "Employer branding",
                alt: "Corporate careers portal.",
                problem: "HR needed to publish openings and receive résumés quickly, without triaging mailboxes by hand.",
                solution:
                    "A Next.js and Tailwind portal with optimized SEO, a Figma design system and Power Automate orchestration that collects, standardizes and routes applications to shared mailboxes.",
                result: "A smoother candidate journey, faster triage for HR and candidate data handled securely.",
                highlights: ["Static, optimized Next.js (App Router)", "Automatic résumé routing", "Custom design system in Figma"],
            },
            "portal-dps-fenalaw": {
                name: "Corporate Events Portal",
                role: "Author & lead developer",
                status: "Marketing web application",
                badge: "Showcased at a national event",
                alt: "High-performance page for a corporate event.",
                problem:
                    "Marketing needed an interactive showcase of cases for Fenalaw, Latin America's largest legal technology and business event.",
                solution:
                    "A high-performance Next.js and Tailwind page, with scroll animations designed to catch attention at the booth and smooth navigation on phones.",
                result: "The company's cases presented with strong engagement during the event.",
                highlights: ["Fast delivery in Next.js", "Smooth scroll animations", "Built for tablets and phones"],
            },
            disordle: {
                name: "Disordle",
                alt: "Disordle word game interface with guesses in colored tiles.",
                description:
                    "Disordle was born from my love of word-logic games and the wish to build something of my own. Inspired by Wordle and Termo, I built my own version — familiar mechanics plus features that improve the player's experience.\n\nAs in other personal projects, I used clone-by-observation: I rely only on my experience as a player, never on the original source code. That forces me to decode and rebuild every rule from how the game behaves.\n\nDisordle allows unlimited games, a configurable word length and shows the meaning of the final word — which trains reasoning and vocabulary.\n\nThe hardest technical challenge was a reliable word bank. To get variety and accuracy:\n- Integration with the Dicionário Aberto API for lexical validation;\n- Web scraping of Dicio with Node.js to expand the vocabulary;\n- Custom filters to keep only common verbs and nouns, for fair gameplay.\n\nAll guess checking was built from scratch in React, with clear, responsive visual feedback. The game is live and still evolving: next up are authentication, rankings and achievements.",
            },
            hexis: {
                name: "HEXIS!",
                alt: "HEXIS! gameplay with the hexagonal board and geometric pieces.",
                description:
                    "Hexis came from wanting to challenge myself with interactive applications. Inspired by the mobile game Trigon, by IEC Games, I recreated its essence by clone-by-observation, relying only on my experience as a player, with no access to the original code. The goal was to replicate the gameplay and understand the logic and visuals that make it so engaging.\n\nIt was one of the hardest builds I've done. The SVG board required meticulous work, and placing every triangle took precise geometry so pieces and board interact smoothly. Teaching the pieces to recognize their positions sharpened my programming logic and DOM handling in React.\n\nThe result is a fully playable game at hexis.vercel.app — a project that captures the determination, creativity and continuous learning I bring to every challenge.",
            },
            restora: {
                name: "reStora",
                alt: "reStora app restoring images with AI.",
                description:
                    "A project to explore APIs, AI integration, SaaS systems and full-stack wiring between frontend and backend with Supabase. The idea: an app that restores damaged photos, pairing cutting-edge tech with a simple experience.\n\nThe flow has three steps: the user uploads an image to a Supabase bucket; an API integrated with Replicate restores it with AI models; the result is shown for download.\n\nAlong the way I tackled AI service setup, TypeScript typing and Supabase permissions — a milestone in learning scalable systems.",
            },
            projex: {
                name: "ProjEx",
                alt: "ProjEx dashboard with dynamic values and project management.",
                description:
                    "A project to master JavaScript operations — numeric and currency values, dynamic data and the link between front end and back end. It started on a JSON server and, after hitting its limits, moved to Firebase.\n\nFirebase brought scale, performance and full email-and-password login, which makes ProjEx the seed of a SaaS.\n\nNext steps: subscription plans, multi-user support with permissions, interface improvements and automatic reports.",
            },
            "sobrinha-artesanatos": {
                name: "Sobrinha | Online Store",
                alt: "Home page of the Sobrinha Artesanatos online store.",
                description:
                    "A Next.js online store built for the artisan Lourdes Maria Candida Sobrinha, with a simple and secure shopping experience.\n\nAuthentication with Clerk, a PostgreSQL database through Prisma and payments with Stripe. The catalog is organized by category and the cart was built in TypeScript, always focused on performance and user experience, from browsing to checkout.",
            },
            "new-portfolio": {
                name: "This Portfolio | Candiniz",
                alt: "Interface of Anderson Diniz's current portfolio.",
                description:
                    "The site you're looking at. Built with Next.js 16, TypeScript, Tailwind and Framer Motion, with pages pre-rendered per language (Portuguese and English), light and dark themes and a custom animation system: tiny robot cursors that select, outline and “render” each element on screen like in an illustration app — and type the text.\n\nBeyond the code, it shows my care for performance, accessibility and the browsing experience.",
            },
            "old-portfolio": {
                name: "Old Portfolio | Candiniz",
                alt: "Old portfolio built with plain HTML, CSS and JavaScript.",
                description:
                    "My first portfolio, built to sharpen HTML, CSS and JavaScript without frameworks. Made while I lived in Ireland, it was one of my most complex projects at the time: DOM manipulation, animations, interactivity, layouts and responsive design.",
            },
            "finance-control": {
                name: "Finance Control",
                alt: "Finance dashboard with expenses and income in euros.",
                description:
                    "My first React project. It records costs and earnings and automatically computes expenses, income and the final balance. Values are in euros because I built it in 2023 while studying English in Ireland — great practice for state and data handling.",
            },
            "mario-js": {
                name: "Mario JS",
                alt: "Mario JS game with the character jumping over obstacles.",
                description:
                    "A plain-JavaScript game inspired by Chrome's dinosaur game: Mario runs and jumps over pipes, with a survival timer. On collision, the game shows the score and lets you restart.\n\nThe challenge was mastering DOM manipulation, events and game logic without any external library.",
            },
            "iss-finder": {
                name: "ISS JS Finder",
                alt: "Interactive map with the position of the International Space Station.",
                description:
                    "My first plain-JavaScript app integrating APIs. With Leaflet and the wheretheiss.at API, the map shows the International Space Station's position in real time, updated every 5 seconds, along with its trail.\n\nA circle around the icon shows the area from which the ISS can be seen. The goal was to learn asynchronous calls and dynamic interfaces without frameworks.",
            },
            "landing-page": {
                name: "My first Landing Page",
                alt: "First landing page built with HTML and CSS.",
                description: "My first landing page, built with plain HTML and CSS early in my studies. Worth keeping here as a starting point.",
            },
        },
    },

    experience: {
        title: "Professional Experience",
        intro: "Drag or use the arrows to navigate. Click the company to see the details.",
        details: "See details",
        hideDetails: "Close details",
        goTo: "Go to",
        prev: "Previous experience",
        next: "Next experience",
        current: "Current",
        cases: "Cases",
        items: [
            {
                id: "opice",
                company: "Opice Blum Advogados",
                role: "Development Analyst",
                period: "2025 – 2026",
                summary: "Digital transformation and legal tech: legal and financial routines turned into scalable, secure and auditable software.",
                balloons: [
                    {
                        title: "Digital transformation",
                        text: "Modernizing the firm's operations, combining full-stack development and process orchestration to turn complex routines into scalable, auditable architectures.",
                        list: [
                            "Hybrid architecture: Power Platform, SharePoint and Legal One connected to Next.js, React and Python solutions.",
                            "Privacy by Design: interfaces and databases built for governance and compliance.",
                        ],
                    },
                    {
                        title: "Process & automation",
                        text: "Unified, autonomous platforms instead of scattered manual operations.",
                        list: [
                            "Critical entries cut from 45 to 8 hours a week in 9 months.",
                            "80% to 90% operational efficiency gain on the administrative side.",
                            "Over 3,500 requests processed with no information lost.",
                        ],
                    },
                    {
                        title: "Cognitive AI",
                        text: "Technical lead in moving from UI-based RPA to agent-driven systems, with LLMs inside litigation and advisory workflows.",
                        list: [
                            "Asynchronous n8n pipelines with Google Cloud (Vertex AI and Gemini).",
                            "Python and Docker backends that extract and structure data in seconds.",
                            "Human-in-the-loop apps: AI speeds things up, the specialist decides.",
                        ],
                    },
                ],
            },
            {
                id: "pg",
                company: "PG Advogados",
                cases: [
                    { slug: "pg-rpa-ia", label: "Running robots with AI" },
                    { slug: "pg-prisma", label: "PG Prisma" },
                ],
                role: "Automation & AI Developer",
                period: "2026 – present",
                summary:
                    "Automation and AI in Legal Ops: robots that capture cases from client portals, register them in the legal system through APIs and keep teams informed.",
                balloons: [
                    {
                        title: "Legal Ops at scale",
                        text: "Running and evolving 40+ production automations (Power Automate Desktop and Cloud) that operate portals, mailboxes and legal systems every day.",
                        list: [
                            "New-case capture with deduplication against a control file.",
                            "Registration through REST APIs with an audit trail.",
                            "Status card in Microsoft Teams at the end of every run.",
                        ],
                    },
                    {
                        title: "Data & integrations",
                        text: "Systems that don't talk start talking: REST APIs, Microsoft Graph, SharePoint, Power BI and Microsoft Fabric lakehouses.",
                        list: [
                            "DAX and SQL queries to deduplicate and cross-check data.",
                            "Python scripts supporting the flows.",
                            "A report and a log for every run.",
                        ],
                    },
                    {
                        title: "Applied AI",
                        text: "Gemini to read documents and extract structured data, and Claude Code as an engineering pair to debug, refactor and document.",
                        list: [
                            "Data extraction from PDFs and emails with LLMs.",
                            "Human review at the sensitive points.",
                            "Living documentation next to the code.",
                        ],
                    },
                    {
                        title: "Reliability",
                        text: "Production failures get fixed at the root cause, with evidence — not at the symptom.",
                        list: ["Scheduled, monitored runs.", "Failure alerts in Teams.", "Lessons recorded so the bug doesn't come back."],
                    },
                ],
            },
        ],
    },

    education: {
        title: "Education",
        academic: "Academic background",
        courses: "Online courses",
        details: "See details",
        hide: "Hide",
        coursesSummary: "4 web development courses · 2023",
        items: [
            {
                id: "fatec",
                degree: "Systems Analysis and Development",
                institution: "Fatec São Paulo",
                period: "2025 – 2028",
                description:
                    "Evening undergraduate program. With prior freelance development experience, I'm here to deepen software engineering and formalize my career move into technology, combining theory and practice.",
            },
            {
                id: "pucrs",
                degree: "Postgraduate degree in BIM",
                institution: "PUC-RS",
                period: "2023 – 2024",
                description:
                    "I went deep into Building Information Modeling and studied Lean — waste elimination and continuous improvement. I use that process-management foundation every day to design more efficient automations.",
            },
            {
                id: "uam",
                degree: "Architecture and Urbanism",
                institution: "Anhembi Morumbi University",
                period: "2016 – 2020",
                description:
                    "Urban design, planning and construction, with AutoCAD and Revit. That's where I saw how automation and data streamline creating and managing projects — the mindset I now bring to software.",
            },
        ],
        courseList: [
            {
                id: "html-css",
                title: "Build Responsive Real-World Websites with HTML and CSS",
                author: "Jonas Schmedtmann",
                description: "Responsive sites from scratch with HTML and CSS, from structure and typography to advanced layouts for desktop, tablet and phone.",
            },
            {
                id: "ztm",
                title: "Complete Web Developer",
                author: "Zero to Mastery Academy",
                description: "From a simple page to a full-stack app: HTML, CSS, JavaScript, Node.js, React and industry best practices.",
            },
            {
                id: "js",
                title: "The Complete JavaScript Course — From Zero to Expert!",
                author: "Jonas Schmedtmann",
                description: "A deep dive into modern JavaScript: async programming, the DOM and complete applications, with hands-on challenges.",
            },
            {
                id: "node",
                title: "All about NodeJS",
                author: "Ground Up & More",
                description: "Node.js for high-performance servers and real-time apps, with JavaScript from front to back.",
            },
        ],
    },

    about: {
        title: "About me",
        musician: {
            title: "MUSICIAN & MUSIC PRODUCER",
            p1: "I'm a self-taught musician and singer. I started at 11, and that first contact with music opened my horizons and expanded my creativity — it helped me get here and become the professional I am today. With 30+ original songs and several videos on my YouTube channel, I'm grateful to everyone who has supported and keeps supporting what I love to do.",
            p2: "I also have solid audiovisual and music production skills, which let me create complete, high-quality content from idea to final cut, telling stories and conveying emotion in an authentic, professional way.",
            showMore: "Show more",
            hide: "Hide",
            play: "Watch the video",
            videoLabel: "Video",
        },
        traveller: {
            title: "BACKPACKER & TRAVELLER",
            text: "Traveling is one of my greatest passions. I studied English for a year and a half at ELI Language School in Drogheda, Ireland, and reached an advanced C1 level. Traveling through Europe and Africa, I met incredible minds and learned a lot about architecture and technology.",
            timelineTitle: "Countries I visited during my exchange",
            timelineText: "A year and a half living in Ireland and, from there, trips across Europe and North Africa.",
            base: "base · 1.5 years",
            countryNames: {
                br: "Brazil",
                ie: "Ireland",
                en: "England",
                sc: "Scotland",
                ma: "Morocco",
                fr: "France",
                it: "Italy",
            },
            flags: {
                br: "Flag of Brazil",
                ie: "Flag of Ireland",
                en: "Flag of England",
                sc: "Flag of Scotland",
                ma: "Flag of Morocco",
                fr: "Flag of France",
                it: "Flag of Italy",
            },
            seal: {
                level: "C1",
                label: "ADVANCED",
                ring: "ADVANCED ENGLISH · C1 · CAE PREPARATION · IRELAND · ",
                title: "Advanced English (C1)",
                text: "A year and a half of immersion in Ireland and the C1 Advanced (CAE) preparation course completed at ELI Language School.",
                alt: "Advanced English seal, C1 level",
            },
        },
        architect: {
            title1: "ARCHITECT &",
            title2: "URBAN PLANNER",
            text: "I'm an architect and urban planner from Anhembi Morumbi University, with a postgraduate degree in BIM from PUC-RS. I worked as an architect, interior designer and on custom furniture projects, which gave me an integrated view of the creative process and its execution.",
            close: "Close",
            images: [
                { name: "Two-story house in São Paulo: main façade", alt: "My design for a two-story house in Morumbi, São Paulo, for a family of 5." },
                { name: "Two-story house in São Paulo: dining room", alt: "My design for a two-story house in Morumbi, São Paulo, for a family of 5." },
                { name: "Two-story house in São Paulo: living room", alt: "My design for a two-story house in Morumbi, São Paulo, for a family of 5." },
                { name: "Apartment in Osasco: living room and kitchen", alt: "My interior design for an apartment in downtown Osasco for a family of 4." },
                { name: "Apartment in Osasco: TV panel and dining room", alt: "My interior design for an apartment in downtown Osasco for a family of 4." },
                { name: "Apartment in Osasco: balcony", alt: "My interior design for an apartment in downtown Osasco for a family of 4." },
                { name: "Apartment in Osasco: counter joinery detail", alt: "My interior design for an apartment in downtown Osasco for a family of 4." },
                { name: "Apartment in Osasco: master bedroom", alt: "My interior design for an apartment in downtown Osasco for a family of 4." },
            ],
        },
    },

    contact: {
        eyebrow: "contact",
        title: "Shall we automate it?",
        cta: "Is a manual process eating up your team's hours? Tell me which one.",
        subtitle: "I reply fast on WhatsApp and email.",
        available: "Available for new projects",
        location: "São Paulo · remote",
        whatsapp: "Message on WhatsApp",
        email: "Send an email",
        formTitle: "Or describe the process",
        formProcess: "Which task takes most of your team's time?",
        formProcessPlaceholder: "E.g.: every day we download reports from 3 portals and merge them by hand into a spreadsheet…",
        formContact: "Your email or WhatsApp",
        formSend: "Send",
        formSendMail: "Open in my email",
        formSending: "Sending…",
        formSent: "Got it! I'll get back to you soon.",
        formError: "Couldn't send from here. I opened your email with the message ready.",
        mailSubject: "Automation: a process to talk about",
        terminalTitle: "contact.sh",
        terminalHint: "click to open · icon to copy",
        copy: "Copy",
        copied: "Copied!",
    },

    notFound: {
        title: "Oops, we couldn't find this page.",
        text: "Use the button below to go back home.",
        back: "Back to home",
    },
};

export default en;
