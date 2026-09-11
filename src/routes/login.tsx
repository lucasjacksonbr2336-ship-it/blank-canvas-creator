import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { getUserByCode, setCurrentUser } from "@/utils/storage";
import { KeyRound, ArrowRight, UserPlus } from "lucide-react";

export const Route = createFileRoute("/login")({
  component: LoginPage,
  head: () => ({
    meta: [
      { title: "Entrar - Canvas Lovable" },
      { name: "description", content: "Acesse sua conta com seu código de acesso." },
    ],
  }),
});

function LoginPage() {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!code.trim()) {
      setError("Por favor, informe seu código de acesso.");
      return;
    }

    const user = getUserByCode(code.trim().toUpperCase());

    if (!user) {
      setError("Código de acesso inválido ou não encontrado.");
      return;
    }

    setCurrentUser(user);
    void navigate({ to: "/dashboard" });
  };

  return (
    <main className="min-h-screen bg-[#05070d] text-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-card rounded-2xl shadow-xl border border-border p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 text-primary rounded-2xl mb-4 shadow-inner">
            <KeyRound className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">Acessar com Código</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Digite seu código exclusivo para entrar na conta
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 text-destructive rounded-xl text-sm flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-destructive flex-shrink-0" />
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              Seu Código de Acesso
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground">
                <KeyRound className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="Ex: ABC123"
                className="w-full pl-10 pr-4 py-3.5 bg-secondary border border-input rounded-xl text-foreground placeholder-muted-foreground text-base font-mono tracking-widest uppercase focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-ring transition-all text-center"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-4 bg-primary text-primary-foreground font-medium rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center justify-center gap-2 group"
          >
            <span>Entrar no Sistema</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            Ainda não tem um código?{" "}
            <Link
              to="/register"
              className="font-semibold text-primary hover:text-primary/80 inline-flex items-center gap-1 transition-colors"
            >
              <UserPlus className="w-3.5 h-3.5" />
              Cadastre-se
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
