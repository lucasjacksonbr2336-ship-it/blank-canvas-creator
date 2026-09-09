import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';

function App() {
  return (
    <div className="min-h-screen selection:bg-primary-100 selection:text-primary-900">
      <Navbar />
      <main>
        <Hero />
        
        {/* Seção de Prova Social / Logos */}
        <section className="py-12 border-y border-slate-100 bg-white/50">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-8">Confiado por empresas inovadoras</p>
            <div className="flex flex-wrap justify-center gap-12 opacity-40 grayscale">
              {['Vercel', 'Stripe', 'Airbnb', 'Linear', 'Slack'].map((brand) => (
                <span key={brand} className="text-2xl font-bold text-slate-900">{brand}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Footer Simples */}
        <footer className="py-12 text-center text-slate-500 text-sm">
          <p>© 2024 NexusUI. Todos os direitos reservados.</p>
        </footer>
      </main>
    </div>
  );
}

export default App;
