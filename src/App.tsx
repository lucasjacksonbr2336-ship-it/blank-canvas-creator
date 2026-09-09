import { Hero } from './components/Hero';

function App() {
  return (
    <div className="min-h-screen bg-dark-900">
      <nav className="border-b border-white/5 p-6">
        <div className="container mx-auto flex justify-between items-center">
          <span className="text-2xl font-bold text-white tracking-tighter">Nexus<span className="text-brand-500">UI</span></span>
          <div className="flex gap-8 text-sm font-medium text-slate-400">
            <a href="#" className="hover:text-white transition-colors">Produtos</a>
            <a href="#" className="hover:text-white transition-colors">Soluções</a>
            <a href="#" className="hover:text-white transition-colors">Preços</a>
          </div>
        </div>
      </nav>

      <Hero />

      <section className="container mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="glass-card p-8">
              <div className="w-12 h-12 bg-brand-500/20 rounded-lg mb-6 flex items-center justify-center text-brand-400">
                ★
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Performance Otimizada</h3>
              <p className="text-slate-400">Arquitetura pensada para velocidade máxima e escalabilidade infinita.</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
