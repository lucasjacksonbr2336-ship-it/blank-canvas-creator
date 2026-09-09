import React, { useState } from 'react';
import { User } from '../types/auth';
import { getUserByCode, setCurrentUser } from '../utils/storage';
import { KeyRound, ArrowRight, UserPlus } from 'lucide-react';

interface LoginProps {
  onLoginSuccess: (user: User) => void;
  onSwitchToRegister: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLoginSuccess, onSwitchToRegister }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!code.trim()) {
      setError('Por favor, informe seu código de acesso.');
      return;
    }

    const user = getUserByCode(code.trim().toUpperCase());

    if (!user) {
      setError('Código de acesso inválido ou não encontrado.');
      return;
    }

    setCurrentUser(user);
    onLoginSuccess(user);
  };

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl mb-4 shadow-inner">
          <KeyRound className="w-7 h-7" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">Acessar com Código</h2>
        <p className="text-sm text-slate-500 mt-1">Digite seu código exclusivo para entrar na conta</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-sm flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-rose-500 flex-shrink-0" />
          {error}
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-5">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
            Seu Código de Acesso
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <KeyRound className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="Ex: ABC123"
              className="w-full pl-10 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 text-base font-mono tracking-widest uppercase focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all text-center"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 group"
        >
          <span>Entrar no Sistema</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </form>

      <div className="mt-8 pt-6 border-t border-slate-100 text-center">
        <p className="text-sm text-slate-500">
          Ainda não tem um código?{' '}
          <button
            onClick={onSwitchToRegister}
            className="font-semibold text-indigo-600 hover:text-indigo-700 inline-flex items-center gap-1 transition-colors"
          >
            <UserPlus className="w-3.5 h-3.5" />
            Cadastre-se
          </button>
        </p>
      </div>
    </div>
  );
};
