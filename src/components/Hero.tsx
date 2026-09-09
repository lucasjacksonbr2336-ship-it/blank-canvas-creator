export const Hero = () => {
  return (
    <section className="relative pt-20 pb-32 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-brand-600/20 blur-[120px] rounded-full -z-10" />
      
      <div className="container mx-auto px-6 text-center">
        <span className="px-4 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-sm font-medium mb-6 inline-block">
          v2.0 agora disponível
        </span>
        <h1 className="text-6xl md:text-7xl font-bold text-white mb-8 tracking-tight">
          Construa o futuro com <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-blue-600">design de elite.</span>
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Uma plataforma robusta, escalável e visualmente impressionante para acelerar seu fluxo de trabalho e impressionar seus clientes.
        </p>
        <div className="flex gap-4 justify-center">
          <button className="btn-primary">Começar Agora</button>
          <button className="px-6 py-3 border border-white/10 hover:bg-white/5 rounded-xl font-semibold transition-all">
            Ver Documentação
          </button>
        </div>
      </div>
    </section>
  );
};
