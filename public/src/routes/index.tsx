import { createFileRoute } from "@tanstack/react-router";

const Index = () => (
  <div className="min-h-screen bg-gradient-to-br from-black to-slate-900 text-white flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-6xl font-bold mb-4">Wiliam Fagundes</h1>
      <p className="text-2xl opacity-90">Desenvolvedor Full Stack</p>
      <p className="text-lg opacity-75 mt-4">Portfólio rodando localmente!</p>
    </div>
  </div>
);

export const Route = createFileRoute("/")({ component: Index });

