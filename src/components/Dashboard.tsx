import React from 'react';
import { User } from '../types/auth';
import { LogOut, KeyRound, Mail, Calendar, User as UserIcon, Shield } from 'lucide-react';

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  return (
    <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 p-8 text-white">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 flex items-center justify-center text-2xl font-bold text-white shadow-inner">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/10 rounded-full text-xs font-medium text-indigo-100 mb-1 backdrop-blur-sm">
                <Shield className="w-3 h-3" /> Conta Verificada
              </div>
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-indigo-100 text-sm">{user.email}</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-sm font-medium backdrop-blur-md transition-all flex items-center gap-2 border border-white/20 shadow-sm"
          >
            <LogOut className="w-4 h-4" />
            Sair
          </button>
        </div>
      </div>

      <div className="p-8">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4">
          Informações da Conta
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 bg-slate-50 border border-slate-100 rounded-2xl flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
              <KeyRound className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                Seu Código de Acesso
              </span>
              <span className="text-lg font-mono font-bold text-slate-800 tracking-wider">
                {user.code}
              </span>
            </div>
          </div>

          <div className="p-5 bg-slate-50 border border-slate-100 rounded-2xl flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                Membro desde
              </span>
              <span className="text-sm font-medium text-slate-800">
                {new Date(user.createdAt).toLocaleDateString('pt-BR')}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-8 p-5 bg-indigo-50/50 border border-indigo-100 rounded-2xl flex items-start gap-4">
          <div className="p-2 bg-indigo-100 text-indigo-700 rounded-lg mt-0.5">
            <KeyRound className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-indigo-900 mb-1">Dica sobre seu código</h4>
            <p className="text-xs text-indigo-700/80 leading-relaxed">
              Guarde seu código de acesso <strong className="font-mono">{user.code}</strong> em um lugar seguro. Ele é a única chave necessária para entrar na sua conta futuramente.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
