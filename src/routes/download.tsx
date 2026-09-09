import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Puzzle, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import { triggerExtensionDownload } from "@/lib/extension-package";

export const Route = createFileRoute("/download")({
  component: DownloadPage,
  head: () => ({
    meta: [
      { title: "Baixar Extensão Lovable Grátis" },
      { name: "description", content: "Faça o download do pacote zip da extensão." },
    ],
  }),
});

function DownloadPage() {
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    try {
      triggerExtensionDownload("extensao-lovable-gratis.zip");
      setDownloaded(true);
      setTimeout(() => setDownloading(false), 700);
    } catch {
      setDownloading(false);
    }
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center bg-[#05070d] text-slate-100 p-6 overflow-hidden">
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-pink-600/15 rounded-full blur-[110px] animate-pulse-glow" />

      <div className="relative z-10 w-full max-w-md space-y-6">
        <div className="text-center space-y-3">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-pink-500/15 border border-pink-500/30 text-pink-400 shadow-lg">
            <Puzzle className="h-8 w-8" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Download Direto
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Pacote completo da extensão pronto para navegadores Chromium.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl backdrop-blur-xl space-y-6">
          <Button
            onClick={handleDownload}
            disabled={downloading}
            size="lg"
            className="w-full h-13 bg-gradient-to-r from-orange-500 via-pink-600 to-purple-600 hover:from-orange-400 hover:via-pink-500 hover:to-purple-500 text-white font-bold shadow-[0_0_25px_rgba(236,72,153,0.3)] transition-all cursor-pointer"
          >
            {downloading ? (
              <>
                <Download className="mr-2 h-4 w-4 animate-bounce" />
                Baixando...
              </>
            ) : downloaded ? (
              <>
                <CheckCircle2 className="mr-2 h-4 w-4 text-emerald-300" />
                Baixar Novamente
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Baixar Extensão (.zip)
              </>
            )}
          </Button>

          <div className="space-y-3 pt-2">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Passos de instalação</h2>
            <ol className="space-y-2 text-xs text-slate-300">
              <li className="flex gap-2.5">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-pink-500/20 text-pink-300 font-bold text-[11px]">1</span>
                <span>Baixe e extraia o arquivo <code className="bg-slate-800 text-pink-300 px-1 py-0.5 rounded font-mono">.zip</code>.</span>
              </li>
              <li className="flex gap-2.5">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-pink-500/20 text-pink-300 font-bold text-[11px]">2</span>
                <span>Acesse <code className="bg-slate-800 text-pink-300 px-1 py-0.5 rounded font-mono">chrome://extensions</code>.</span>
              </li>
              <li className="flex gap-2.5">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-pink-500/20 text-pink-300 font-bold text-[11px]">3</span>
                <span>Ative o <strong>Modo do Desenvolvedor</strong> no canto direito.</span>
              </li>
              <li className="flex gap-2.5">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-pink-500/20 text-pink-300 font-bold text-[11px]">4</span>
                <span>Clique em <strong>"Carregar sem compactação"</strong> e escolha a pasta.</span>
              </li>
            </ol>
          </div>
        </div>

        <Button variant="ghost" asChild className="w-full text-slate-400 hover:text-white">
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para a página inicial
          </Link>
        </Button>
      </div>
    </main>
  );
}


