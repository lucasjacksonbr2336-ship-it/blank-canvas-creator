import { createFileRoute } from "@tanstack/react-router";
import { LayoutGrid } from "lucide-react";

export const Route = createFileRoute("/")({
  component: CanvasPage,
  head: () => ({
    meta: [
      { title: "Canvas Limpa - Canvas Lovable" },
      { name: "description", content: "Tela em branco limpa e minimalista para criação e organização de layouts." },
    ],
  }),
});

function CanvasPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#05070d]">
      {/* Minimal top bar */}
      <header className="h-12 border-b border-border/50 bg-card/30 backdrop-blur-md flex items-center justify-between px-4 sm:px-6 shrink-0">
        <div className="flex items-center gap-2 text-sm font-medium text-foreground">
          <LayoutGrid className="w-4 h-4 text-primary" />
          <span>Canvas</span>
        </div>
      </header>

      {/* Clean white canvas */}
      <main className="flex-1 overflow-hidden relative">
        <div className="absolute inset-0 bg-[#f8fafc]">
          {/* Subtle dot grid */}
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "radial-gradient(circle at center, #0f172a 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          {/* Empty hint */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center space-y-3 opacity-30">
              <p className="text-sm font-medium text-slate-600">
                Canvas limpo e pronto para começar
              </p>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Use esta área para criar e organizar layouts e componentes livremente.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
