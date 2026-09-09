import React from 'react';
import { Layout, Menu, Github } from 'lucide-react';

export const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2">
            <div className="bg-primary-600 p-2 rounded-lg">
              <Layout className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">Nexus<span className="text-primary-600">UI</span></span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#" className="hover:text-primary-600 transition-colors">Produtos</a>
            <a href="#" className="hover:text-primary-600 transition-colors">Recursos</a>
            <a href="#" className="hover:text-primary-600 transition-colors">Preços</a>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-500 hover:text-primary-600 transition-colors">
              <Github className="w-5 h-5" />
            </button>
            <button className="bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
              Começar Agora
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
