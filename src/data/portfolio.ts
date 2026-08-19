export type PlanetId = "mercury" | "venus" | "earth" | "mars" | "jupiter" | "saturn";

export interface PlanetData {
  id: PlanetId;
  name: string;
  section: string;
  color: string;
  glowColor: string;
  orbitRadius: number;
  orbitDuration: number;
  size: number;
  image: string;
}

export const planets: PlanetData[] = [
  {
    id: "mercury",
    name: "Mercury",
    section: "Skills",
    color: "#c4a35a",
    glowColor: "rgba(196,163,90,0.4)",
    orbitRadius: 100,
    orbitDuration: 8,
    size: 22,
    image: "/images/planets/p-mercury.png",
  },
  {
    id: "venus",
    name: "Venus",
    section: "Experience",
    color: "#e8c468",
    glowColor: "rgba(232,196,104,0.4)",
    orbitRadius: 155,
    orbitDuration: 12,
    size: 30,
    image: "/images/planets/p-venus.png",
  },
  {
    id: "earth",
    name: "Earth",
    section: "Projects",
    color: "#4a9eff",
    glowColor: "rgba(74,158,255,0.4)",
    orbitRadius: 215,
    orbitDuration: 16,
    size: 32,
    image: "/images/planets/p-earth.png",
  },
  {
    id: "mars",
    name: "Mars",
    section: "Tech Stack",
    color: "#e05533",
    glowColor: "rgba(224,85,51,0.4)",
    orbitRadius: 275,
    orbitDuration: 22,
    size: 26,
    image: "/images/planets/p-mars.png",
  },
  {
    id: "jupiter",
    name: "Jupiter",
    section: "Achievements",
    color: "#d4a574",
    glowColor: "rgba(212,165,116,0.4)",
    orbitRadius: 355,
    orbitDuration: 30,
    size: 48,
    image: "/images/planets/p-jupiter.png",
  },
  {
    id: "saturn",
    name: "Saturn",
    section: "Contact",
    color: "#e8d5a3",
    glowColor: "rgba(232,213,163,0.4)",
    orbitRadius: 440,
    orbitDuration: 38,
    size: 42,
    image: "/images/planets/p-saturn.png",
  },
];

export const skills = [
  {
    category: "Frontend",
    items: ["React", "Next.js", "TypeScript", "JavaScript (ES6+)", "Tailwind CSS", "HTML5 / CSS3", "SPA & SEO"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express", "REST APIs", "Middlewares", "Cache", "Services / Controllers / Repositories"],
  },
  {
    category: "Auth & Segurança",
    items: ["Keycloak", "JWT", "OAuth 2.0", "RBAC", "CORS", "LGPD", "XSS / CSRF"],
  },
  {
    category: "Banco de Dados",
    items: ["PostgreSQL", "Supabase", "Modelagem", "Views & Procedures", "Triggers", "Migrations", "Tuning de queries"],
  },
  {
    category: "Infra & Cloud",
    items: ["Docker", "Docker Compose", "Linux (Ubuntu)", "Nginx", "SSL", "VPS", "Google Cloud", "Vercel", "Render"],
  },
  {
    category: "Integrações",
    items: ["Stripe", "Banco Inter", "OpenPix", "APIs governamentais", "APIs REST de terceiros"],
  },
];

export const experience = [
  {
    role: "Software Developer Jr.",
    company: "Mercado Net Zero",
    period: "Atual",
    description:
      "Startup enxuta com 2 desenvolvedores, atuação direta com o CTO (Software Engineer Sênior na SAP) em ciclos semanais. Responsável por arquitetura, desenvolvimento full stack e deploy de sistemas em produção usados por usuários reais.",
    highlights: [
      "Arquitetura do Marketplace em produção",
      "Liderança técnica da nova plataforma institucional",
      "Auth com Keycloak, JWT e OAuth",
      "Pagamentos: Stripe, Banco Inter, OpenPix",
      "PostgreSQL/Supabase: modelagem e performance",
      "Deploy com Docker, Nginx, SSL e VPS Linux",
    ],
  },
  {
    role: "Trajetória anterior à tecnologia",
    company: "Construção civil, comércio e vendas",
    period: "Antes da tech",
    description:
      "Atuação em construção civil e comércio próprio. Experiências que construíram disciplina, resiliência, comunicação efetiva e capacidade de adaptação, hoje aplicadas na entrega consistente de software.",
    highlights: ["Empreendedorismo", "Comunicação", "Resiliência", "Adaptabilidade"],
  },
];

export const projects = [
  {
    title: "Navalha & Co.",
    description:
      "Site institucional e sistema de agendamento online para barbearia premium, com apresentação de serviços, equipe e depoimentos.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Agendamento Online"],
    problem:
      "Barbearias perdem clientes por agendamento manual (telefone/WhatsApp), sem vitrine digital que transmita a experiência premium da casa.",
    solution:
      "Landing page de alta conversão com catálogo de serviços e preços, apresentação da equipe, prova social e fluxo de agendamento em poucos cliques, além de contato direto via WhatsApp.",
    impact:
      "Profissionaliza a presença digital da barbearia e reduz a fricção para o cliente marcar horário, sem depender de ligação.",
    url: "https://barbearia-da-villa.vercel.app/",
  },
  {
    title: "Bora Doar Sangue",
    description:
      "Plataforma de cadastro e gestão de doadores de sangue, com histórico de doações e organização de dados dos doadores.",
    technologies: ["React", "TypeScript", "Node.js"],
    problem:
      "Bancos de sangue e campanhas de doação têm dificuldade em manter um cadastro organizado dos doadores e acompanhar o histórico de doações de cada um.",
    solution:
      "Sistema de cadastro de doadores com armazenamento de dados pessoais, tipo sanguíneo e histórico de doações, facilitando o acompanhamento e a comunicação com a base de doadores.",
    impact:
      "Ajuda a organizar e manter atualizada a base de doadores, tornando mais fácil identificar doadores aptos e acompanhar a frequência das doações.",
    url: "https://ta-tintendi-boradoarsangre.vercel.app/",
  },
  {
    title: "Mercado Net Zero",
    description:
      "Plataforma de descarbonização e ESG: inventário de carbono, certificados e créditos de carbono.",
    technologies: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Keycloak", "Stripe"],
    problem: "Empresas precisam de um caminho acessível e auditável para compensar emissões.",
    solution:
      "Marketplace e plataforma institucional com fluxo completo de compra, autenticação e pagamentos integrados.",
    impact: "Simplifica o mercado de créditos de carbono e torna a sustentabilidade acessível.",
    url: "https://mercado-net-zero.vercel.app/",
  },
  {
    title: "Atelier Norte",
    description:
      "Site institucional para escritório de arquitetura e interiores em São Paulo, com foco em apresentação de serviços, projetos e contato.",
    technologies: ["Lovable", "React", "TypeScript", "Tailwind CSS", "Vercel"],
    problem: "Escritórios de arquitetura precisam comunicar autoridade, estilo e portfólio de forma elegante.",
    solution:
      "Criei uma experiência editorial com navegação clara, visual sofisticado e páginas voltadas para conversão.",
    impact: "Fortalece a presença digital e ajuda a transformar visitantes em novos contatos e orçamentos.",
    url: "https://arquitetura-pra-todos.vercel.app/",
  },
  {
    title: "Studio de Beleza Penélope",
    description:
      "Site para salão de beleza com páginas de serviços, galeria e agendamento, pensado para destacar a marca e facilitar reservas.",
    technologies: ["Lovable", "React", "TypeScript", "Tailwind CSS", "Vercel"],
    problem: "Um studio de beleza precisa de uma presença online bonita, clara e orientada para agendamento.",
    solution:
      "Desenvolvi uma vitrine digital acolhedora com destaque para serviços, experiência visual e chamada para agendar.",
    impact: "Aumenta a credibilidade da marca e deixa o processo de contato mais rápido para clientes novas.",
    url: "https://penelope-estudio-exemploeditavel-ma.vercel.app/",
  },
];

export const achievements = [
  {
    icon: "🚀",
    title: "Sistemas em produção",
    description: "Marketplace da Mercado Net Zero rodando com usuários reais",
  },
  {
    icon: "🤝",
    title: "Direto com o CTO",
    description: "Weeklys e decisões técnicas com Software Engineer Sênior da SAP",
  },
  {
    icon: "🧭",
    title: "Liderança técnica",
    description: "Lidero a construção da nova plataforma institucional",
  },
  {
    icon: "🔐",
    title: "Segurança aplicada",
    description: "Keycloak, JWT, OAuth 2.0, RBAC e conformidade com LGPD",
  },
  {
    icon: "💳",
    title: "Pagamentos integrados",
    description: "Stripe, Banco Inter e OpenPix em fluxo transacional real",
  },
  {
    icon: "🎓",
    title: "Ciência de Dados",
    description: "Bacharelado em andamento + Programa Geração Caldeira (2025)",
  },
];

export const profile = {
  name: "Wiliam Fagundes da Silva Lima",
  shortName: "Wiliam Fagundes",
  title: "Software Engineer | Full Stack Developer (React / Node.js)",
  location: "Porto Alegre, RS – Brasil",
  email: "wiliamfagundes.lima@gmail.com",
  phone: "+55 51 99364-0615",
  phoneRaw: "5551993640615",
  github: "https://github.com/Wiliam2213",
  linkedin: "https://www.linkedin.com/in/wiliam-fagundes-95a56726a/",
};

export const contactLinks = [
  { label: "Email", value: profile.email, url: `mailto:${profile.email}`, icon: "mail" },
  {
    label: "WhatsApp",
    value: profile.phone,
    url: `https://wa.me/${profile.phoneRaw}`,
    icon: "phone",
  },
  { label: "LinkedIn", value: "in/wiliam-fagundes", url: profile.linkedin, icon: "linkedin" },
  { label: "GitHub", value: "@Wiliam2213", url: profile.github, icon: "github" },
];
