import React from 'react';
import { ArrowRight, Sparkles, Shield, Zap } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-200/50 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-200/50 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-sm font-medium mb-8 animate-fade-in">
          <Sparkles className="w-4 h-4" />
          <span>Nova versão 2.0 disponível</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-6 animate-fade-in">
          Construa o futuro da <br />
          <span className="gradient-text">Web Moderna</span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-lg text-slate-600 mb-10 leading-relaxed animate-fade-in" style={{ animationDelay: '0.1s' }}>
          Uma plataforma completa com componentes de alta performance, design system integrado e a melhor experiência para desenvolvedores.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <button className="w-full sm:w-auto bg-primary-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-primary-700 transition-all shadow-xl shadow-primary-200 flex items-center justify-center gap-2 group">
            Iniciar Projeto
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="w-full sm:w-auto bg-white text-slate-700 px-8 py-4 rounded-2xl font-bold text-lg border border-slate-200 hover:bg-slate-50 transition-all">
            Ver Documentação
          </button>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          {[
            { icon: <Zap className="text-amber-500" />, title: "Performance Extrema", desc: "Otimizado para Core Web Vitals e carregamento instantâneo." },
            { icon: <Shield className="text-emerald-500" />, title: "Segurança Nativa", desc: "Proteção avançada e conformidade com padrões globais." },
            { icon: <Layout className="text-blue-500" />, title: "Design Adaptável", desc: "Componentes que se ajustam perfeitamente a qualquer tela." }
          ].map((item, i) => (
            <div key={i} className="glass-card p-8 rounded-3xl text-left hover:translate-y-[-8px] transition-all duration-300">
              <div className="bg-slate-50 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                {React.cloneElement(item.icon as React.ReactElement, { className: "w-6 h-6" })}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-slate-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

import { Layout } from 'lucide-react';
