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
  { category: "Languages", items: ["JavaScript", "TypeScript", "SQL", "Python"] },
  { category: "Frontend", items: ["React", "Next.js", "Tailwind CSS", "Framer Motion"] },
  { category: "Backend", items: ["Node.js", "Express", "REST APIs", "Supabase"] },
  { category: "Tools", items: ["Git", "FlutterFlow", "N8N", "Docker (learning)"] },
  { category: "Databases", items: ["PostgreSQL", "NoSQL", "Supabase"] },
];

export const experience = [
  {
    role: "Full Stack Developer",
    company: "Mercado Net Zero",
    period: "Current",
    description:
      "Sole developer working directly with the CTO. Building real systems, automations, and a white-label platform for carbon credit certificates.",
    highlights: [
      "Platform architecture",
      "API integrations",
      "Automation with N8N",
      "Direct CTO collaboration",
    ],
  },
  {
    role: "Previous Experience",
    company: "Diverse Background",
    period: "Before Tech",
    description:
      "Worked as waiter, construction helper, school monitor, and entrepreneur (food sales). Volunteer and public speaker.",
    highlights: ["Entrepreneurship", "Public speaking", "Adaptability", "Work ethic"],
  },
];

export const projects = [
  {
    title: "Retail AI Analyst",
    description:
      "AI-powered analytics platform for retail businesses, providing intelligent insights and automated analysis.",
    technologies: ["React", "TypeScript", "AI/ML", "Node.js"],
    problem: "Retail businesses struggle to extract actionable insights from their data.",
    solution:
      "Built an AI-powered analyst that automates data interpretation and provides smart recommendations.",
    impact: "Enables data-driven decisions without requiring technical expertise.",
    url: "https://retail-ai-analyst-4bco2yh3t-wiliamfagundeslima-6364s-projects.vercel.app/",
  },
  {
    title: "Mercado Net Zero",
    description:
      "White-label platform for buying and managing carbon credit certificates, supporting environmental sustainability.",
    technologies: ["React", "Supabase", "Node.js", "FlutterFlow"],
    problem: "Companies need accessible ways to offset carbon emissions through verified credits.",
    solution:
      "Developed a comprehensive platform for carbon credit management with automated workflows.",
    impact: "Streamlines the carbon credit market, making sustainability accessible to businesses.",
    url: "https://mercado-net-zero-dvhe7etnj-wiliamfagundeslima-6364s-projects.vercel.app/",
  },
];

export const achievements = [
  {
    icon: "🚀",
    title: "Sole Developer",
    description: "Single-handedly building production systems at Mercado Net Zero",
  },
  {
    icon: "🤝",
    title: "CTO Direct Report",
    description: "Working directly with leadership on strategic technical decisions",
  },
  {
    icon: "🌍",
    title: "3 Languages",
    description: "Portuguese (native), English & Spanish (intermediate)",
  },
  {
    icon: "🎤",
    title: "Public Speaker",
    description: "Volunteer and speaker, sharing knowledge with communities",
  },
  {
    icon: "💡",
    title: "Entrepreneur",
    description: "Founded food business, understanding business from ground up",
  },
  {
    icon: "⚡",
    title: "Self-Taught",
    description: "Continuously learning and adapting to new technologies",
  },
];

export const contactLinks = [
  { label: "GitHub", url: "https://github.com/wiliamfagundeslima", icon: "github" },
  { label: "LinkedIn", url: "https://linkedin.com/in/wiliamfagundes", icon: "linkedin" },
  { label: "Email", url: "mailto:wiliam@example.com", icon: "mail" },
];
