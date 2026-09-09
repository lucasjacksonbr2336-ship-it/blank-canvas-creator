import React from 'react';
import { Sparkles, Code2, Rocket } from 'lucide-react';

export default function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="max-w-lg w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl text-center space-y-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
          <Sparkles className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Olá! Como posso ajudar hoje?
          </h1>
          <p className="text-slate-400 text-sm">
            O ambiente com React, TypeScript e Tailwind CSS está pronto. O que você gostaria de construir?
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <div className="flex items-center gap-2 p-3 bg-slate-800/50 rounded-xl border border-slate-700/50 text-left text-xs text-slate-300">
            <Code2 className="w-5 h-5 text-indigo-400 flex-shrink-0" />
            <span>Dashboard, Landing Page ou Ferramenta Web</span>
          </div>
          <div className="flex items-center gap-2 p-3 bg-slate-800/50 rounded-xl border border-slate-700/50 text-left text-xs text-slate-300">
            <Rocket className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <span>Componentes UI rápidos e interativos</span>
          </div>
        </div>
      </div>
    </div>
  );
}
