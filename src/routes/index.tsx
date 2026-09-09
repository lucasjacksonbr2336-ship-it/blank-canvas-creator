import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Download, Puzzle, CheckCircle2, ShieldCheck, Chrome, Sparkles } from "lucide-react";
import { triggerExtensionDownload } from "@/lib/extension-package";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Baixar Extensão" },
      { name: "description", content: "Baixe a extensão oficial para o seu navegador." },
    ],
  }),
});

function Index() {
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    try {
      triggerExtensionDownload("extensao-navegador.zip");
      setDownloaded(true);
      setTimeout(() => setDownloading(false), 600);
    } catch {
      setDownloading(false);
    }
  };

  return (
    <main className="relative min-h-screen bg-[#07090e] text-slate-100 flex flex-col justify-center items-center p-6">
      {/* Subtle background glow */}
      <div className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl" />

      <div className="relative w-full max-w-xl space-y-8 my-auto">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-3.5 py-1 text-xs font-medium text-cyan-300">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Extensão do Navegador</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Baixar Extensão
          </h1>

          <p className="text-sm text-slate-400">
            Faça o download do pacote da extensão para o Google Chrome, Brave, Edge ou Opera.
          </p>
        </div>

        {/* Download Card */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <Puzzle className="h-7 w-7" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-white">Pacote da Extensão (.zip)</h2>
              <p className="text-xs text-slate-400">Manifest V3 • Pronto para instalação</p>
            </div>
          </div>

          <Button
            onClick={handleDownload}
            disabled={downloading}
            size="lg"
            className="w-full h-12 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold shadow-lg shadow-cyan-500/20 transition-all"
          >
            {downloading ? (
              <>
                <Download className="mr-2 h-5 w-5 animate-bounce" />
                Baixando...
              </>
            ) : downloaded ? (
              <>
                <CheckCircle2 className="mr-2 h-5 w-5 text-slate-950" />
                Baixar Novamente
              </>
            ) : (
              <>
                <Download className="mr-2 h-5 w-5" />
                Baixar Extensão (.ZIP)
              </>
            )}
          </Button>

          {/* Features */}
          <div className="grid grid-cols-2 gap-3 pt-2 text-xs text-slate-300">
            <div className="flex items-center gap-2 rounded-lg bg-slate-800/40 p-2.5 border border-slate-800">
              <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>100% Segura</span>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-slate-800/40 p-2.5 border border-slate-800">
              <Chrome className="h-4 w-4 text-cyan-400 shrink-0" />
              <span>Chromium / Chrome</span>
            </div>
          </div>

          {/* Steps */}
          <div className="pt-4 border-t border-slate-800 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Como instalar no Chrome:
            </h3>
            <ol className="space-y-2.5 text-xs text-slate-300">
              <li className="flex gap-2.5 items-start">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-500/20 text-[10px] font-bold text-cyan-300">
                  1
                </span>
                <span>Baixe e extraia o arquivo <code className="bg-slate-800 text-cyan-300 px-1 py-0.5 rounded">.zip</code>.</span>
              </li>
              <li className="flex gap-2.5 items-start">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-500/20 text-[10px] font-bold text-cyan-300">
                  2
                </span>
                <span>Abra a aba <code className="bg-slate-800 text-cyan-300 px-1 py-0.5 rounded">chrome://extensions</code>.</span>
              </li>
              <li className="flex gap-2.5 items-start">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-500/20 text-[10px] font-bold text-cyan-300">
                  3
                </span>
                <span>Ative a opção <strong>"Modo do desenvolvedor"</strong> no topo direito.</span>
              </li>
              <li className="flex gap-2.5 items-start">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-500/20 text-[10px] font-bold text-cyan-300">
                  4
                </span>
                <span>Clique em <strong>"Carregar sem compactação"</strong> e selecione a pasta extraída.</span>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </main>
  );
}

