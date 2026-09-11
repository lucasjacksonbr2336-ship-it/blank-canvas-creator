import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { User } from "@/types/auth";
import { getCurrentUser } from "@/utils/storage";
import { Button } from "@/components/ui/button";
import { ArrowLeft, LayoutGrid, Plus, MousePointer2 } from "lucide-react";

export const Route = createFileRoute("/canvas")({
  component: CanvasPage,
  head: () => ({
    meta: [
      { title: "Canvas - Canvas Lovable" },
      { name: "description", content: "Tela em branco para criação e organização de layouts." },
    ],
  }),
});

function CanvasPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      void navigate({ to: "/login" });
    } else {
      setUser(currentUser);
    }
    setIsLoading(false);
  }, [navigate]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#05070d] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </main>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#05070d] text-foreground flex flex-col">
      {/* Top navigation bar */}
      <header className="h-14 border-b border-border bg-card/50 backdrop-blur-md flex items-center justify-between px-4 sm:px-6 shrink-0">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" asChild className="text-muted-foreground hover:text-foreground">
            <Link to="/dashboard">
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </Button>
          <div className="h-5 w-px bg-border" />
          <div className="flex items-center gap-2 text-sm font-medium text-foreground">
            <LayoutGrid className="w-4 h-4 text-primary" />
            <span>Canvas</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="hidden sm:flex gap-2">
            <MousePointer2 className="w-4 h-4" />
            Selecionar
          </Button>
          <Button size="sm" className="gap-2">
            <Plus className="w-4 h-4" />
            Adicionar
          </Button>
        </div>
      </header>

      {/* Clean white canvas area */}
      <main className="flex-1 overflow-hidden relative">
        <div className="absolute inset-0 bg-[#f8fafc] dark:bg-slate-50">
          {/* Subtle dot grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                "radial-gradient(circle at center, #0f172a 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          {/* Empty state hint */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center space-y-3 opacity-40">
              <div className="mx-auto w-16 h-16 rounded-2xl bg-slate-200/80 flex items-center justify-center">
                <LayoutGrid className="w-8 h-8 text-slate-400" />
              </div>
              <p className="text-sm font-medium text-slate-500">
                Canvas limpo e pronto para começar
              </p>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                Use esta área para criar e organizar layouts e componentes livremente.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
