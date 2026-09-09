import React from 'react';
import { LogOut, User as UserIcon, Shield, CheckCircle } from 'lucide-react';
import { User } from '../types';

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  return (
    <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 p-8 text-white flex justify-between items-center">
        <div>
          <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm mb-3">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-300" /> Conta ativa
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Olá, {user.name}!</h2>
          <p className="text-indigo-100 text-sm mt-0.5">{user.email}</p>
        </div>
        <button
          onClick={onLogout}
          className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2.5 rounded-xl font-medium text-sm transition-colors backdrop-blur-sm cursor-pointer"
        >
          <LogOut className="w-4 h-4" /> Sair
        </button>
      </div>

      <div className="p-8">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Painel do Usuário</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100 flex items-start gap-4">
            <div className="p-3 bg-indigo-100 text-indigo-600 rounded-xl">
              <UserIcon className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 text-sm">Perfil Verificado</h4>
              <p className="text-gray-500 text-xs mt-1">Seu cadastro foi realizado com sucesso em nossa plataforma.</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100 flex items-start gap-4">
            <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 text-sm">Segurança Ativa</h4>
              <p className="text-gray-500 text-xs mt-1">Sua senha e dados estão protegidos com criptografia moderna.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
