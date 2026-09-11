import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { User } from "@/types/auth";
import { getUsers, saveUser, setCurrentUser } from "@/utils/storage";
import { KeyRound, User as UserIcon, Mail, ShieldCheck, ArrowRight, LogIn } from "lucide-react";

export const Route = createFileRoute("/register")({
  component: RegisterPage,
  head: () => ({
    meta: [
      { title: "Criar Conta - Canvas Lovable" },
      { name: "description", content: "Crie sua conta e acesse o canvas." },
    ],
  }),
});

function RegisterPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [confirmCode, setConfirmCode] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleGenerateCode = () => {
    const randomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    setCode(randomCode);
    setConfirmCode(randomCode);
    setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!name.trim() || !email.trim() || !code.trim()) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    if (code !== confirmCode) {
      setError("Os códigos de acesso não coincidem.");
      return;
    }

    if (code.length < 4) {
      setError("O código de acesso deve ter pelo menos 4 caracteres.");
      return;
    }

    const users = getUsers();

    const emailExists = users.some((u) => u.email.toLowerCase() === email.toLowerCase());
    if (emailExists) {
      setError("Este e-mail já está cadastrado.");
      return;
    }

    const codeExists = users.some((u) => u.code === code);
    if (codeExists) {
      setError("Este código de acesso já está em uso. Por favor, escolha outro.");
      return;
    }

    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      code,
      createdAt: new Date().toISOString(),
    };

    saveUser(newUser);
    setCurrentUser(newUser);
    setSuccessMessage("Cadastro realizado com sucesso!");

    setTimeout(() => {
      void navigate({ to: "/dashboard" });
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-[#05070d] text-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-card rounded-2xl shadow-xl border border-border p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 text-primary rounded-2xl mb-4 shadow-inner">
            <KeyRound className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">Criar Nova Conta</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Cadastre-se definindo seu código de acesso exclusivo
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 text-destructive rounded-xl text-sm flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-destructive flex-shrink-0" />
            {error}
          </div>
        )}

        {successMessage && (
          <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-sm flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0" />
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              Nome Completo
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground">
                <UserIcon className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu nome"
                className="w-full pl-10 pr-4 py-3 bg-secondary border border-input rounded-xl text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-ring transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              E-mail
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu.email@exemplo.com"
                className="w-full pl-10 pr-4 py-3 bg-secondary border border-input rounded-xl text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-ring transition-all"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Código de Acesso
              </label>
              <button
                type="button"
                onClick={handleGenerateCode}
                className="text-xs text-primary hover:text-primary/80 font-medium transition-colors"
              >
                Gerar automático
              </button>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground">
                <KeyRound className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="Ex: ABC123 ou 1234"
                className="w-full pl-10 pr-4 py-3 bg-secondary border border-input rounded-xl text-foreground placeholder-muted-foreground text-sm font-mono tracking-wider focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-ring transition-all uppercase"
              />
            </div>
            <p className="text-[11px] text-muted-foreground mt-1">
              Este código será usado para entrar no sistema posteriormente.
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              Confirmar Código de Acesso
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={confirmCode}
                onChange={(e) => setConfirmCode(e.target.value.toUpperCase())}
                placeholder="Repita o código"
                className="w-full pl-10 pr-4 py-3 bg-secondary border border-input rounded-xl text-foreground placeholder-muted-foreground text-sm font-mono tracking-wider focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-ring transition-all uppercase"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-3.5 px-4 bg-primary text-primary-foreground font-medium rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center justify-center gap-2 group"
          >
            <span>Cadastrar Conta</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            Já possui um código cadastrado?{" "}
            <Link
              to="/login"
              className="font-semibold text-primary hover:text-primary/80 inline-flex items-center gap-1 transition-colors"
            >
              <LogIn className="w-3.5 h-3.5" />
              Entrar
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
