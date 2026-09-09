import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Download,
  Puzzle,
  CheckCircle2,
  ShieldCheck,
  Chrome,
  Sparkles,
  Zap,
  Lock,
  Copy,
  Check,
  Laptop,
  Flame,
  Layers,
} from "lucide-react";
import { triggerExtensionDownload } from "@/lib/extension-package";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Extensão Lovable Grátis - Download Oficial" },
      {
        name: "description",
        content: "Baixe a extensão oficial para o seu navegador.",
      },
    ],
  }),
});

function Index() {
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);

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

  const copyExtensionsUrl = () => {
    navigator.clipboard.writeText("chrome://extensions");
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  return (
    <main className="relative min-h-screen bg-[#05070d] text-slate-100 selection:bg-pink-500 selection:text-white overflow-hidden pb-16">
      {/* Background glow effects */}
      <div className="pointer-events-none absolute top-[-100px] left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-pink-600/20 via-purple-600/20 to-orange-500/20 rounded-full blur-[120px] animate-pulse-glow" />
      <div className="pointer-events-none absolute top-[40%] right-[-100px] w-[400px] h-[400px] bg-orange-500/10 rounded-full blur-[100px]" />
      <div className="pointer-events-none absolute bottom-10 left-[-100px] w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[110px]" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 pt-8 sm:pt-14 space-y-10">
        {/* Header */}
        <header className="flex flex-col items-center justify-center text-center space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-pink-500/30 bg-pink-500/10 backdrop-blur-md px-4 py-1.5 text-xs font-semibold text-pink-300 shadow-[0_0_20px_rgba(236,72,153,0.25)] hover:border-pink-500/50 hover:bg-pink-500/15 transition-all">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="h-2 w-2 rounded-full bg-emerald-400 -ml-3.5" />
            <Sparkles className="h-3.5 w-3.5 text-pink-400" />
            <span>Versão Oficial 1.0 • 100% Gratuita</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
            Extensão{" "}
            <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
              Lovable Grátis
            </span>
          </h1>

          <p className="max-w-2xl text-sm sm:text-base text-slate-300">
            A extensão definitiva para turbinar seu navegador. Instalação rápida em menos de 1 minuto.
          </p>
        </header>

        {/* Thumbnail Hero Showcase */}
        <div className="relative group">
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-orange-500 via-pink-600 to-purple-600 opacity-60 blur-xl group-hover:opacity-90 transition duration-700" />
          <div className="relative rounded-2xl overflow-hidden border border-slate-700/60 bg-slate-900 shadow-2xl backdrop-blur-xl">
            <div className="relative aspect-[21/9] sm:aspect-[2.3/1] w-full overflow-hidden bg-slate-950 flex items-center justify-center">
              <img
                src="/uploads/Gemini_Generated_Image_3djsu3djsu3djsu3.jpg"
                alt="Thumbnail da Extensão Lovable Grátis"
                className="w-full h-full object-cover object-center transform transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#05070d]/80 via-transparent to-black/30 pointer-events-none" />
              <div className="absolute top-3 left-3 sm:top-5 sm:left-5 flex items-center gap-2 rounded-full bg-slate-950/80 border border-slate-700/80 backdrop-blur-md px-3 py-1 text-xs font-medium text-slate-200 shadow-lg">
                <Flame className="h-3.5 w-3.5 text-orange-400 animate-bounce" />
                <span>Extensão Verificada</span>
              </div>
              <div className="absolute bottom-3 right-3 sm:bottom-5 sm:right-5 hidden sm:flex items-center gap-2 rounded-xl bg-slate-950/85 border border-purple-500/30 backdrop-blur-md px-3.5 py-1.5 text-xs font-medium text-slate-300 shadow-lg">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span>Manifest V3 • Sem Anúncios</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Action Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Download Box */}
          <div className="lg:col-span-7 rounded-2xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500/20 to-purple-600/20 border border-pink-500/30 text-pink-400 shadow-inner">
                  <Puzzle className="h-7 w-7" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Pacote da Extensão (.zip)</h2>
                  <p className="text-xs text-slate-400">Download direto e seguro • Zip completo</p>
                </div>
              </div>

              <span className="inline-flex items-center self-start sm:self-auto rounded-full bg-emerald-500/15 border border-emerald-500/30 px-3 py-1 text-xs font-medium text-emerald-400">
                ✓ Pronto para Baixar
              </span>
            </div>

            <div className="space-y-3">
              <Button
                onClick={handleDownload}
                disabled={downloading}
                size="lg"
                className="w-full h-14 bg-gradient-to-r from-orange-500 via-pink-600 to-purple-600 hover:from-orange-400 hover:via-pink-500 hover:to-purple-500 text-white font-bold text-base shadow-[0_0_30px_rgba(236,72,153,0.35)] transition-all hover:scale-[1.01] active:scale-[0.99] border-none cursor-pointer"
              >
                {downloading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Download className="h-5 w-5 animate-bounce" />
                    Gerando pacote (.zip)...
                  </span>
                ) : downloaded ? (
                  <span className="flex items-center justify-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-emerald-300" />
                    Download Concluído! Baixar Novamente
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Download className="h-5 w-5" />
                    Baixar Extensão Grátis (.ZIP)
                  </span>
                )}
              </Button>
              <p className="text-center text-[11px] text-slate-400">
                Compatível com Google Chrome, Brave, Edge, Opera e Opera GX.
              </p>
            </div>

            {/* Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="flex items-center gap-2 rounded-xl bg-slate-800/50 p-2.5 border border-slate-800">
                <Zap className="h-4 w-4 text-amber-400 shrink-0" />
                <div className="text-xs">
                  <p className="font-semibold text-slate-200">Instantâneo</p>
                  <p className="text-[10px] text-slate-400">1 clique</p>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-slate-800/50 p-2.5 border border-slate-800">
                <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
                <div className="text-xs">
                  <p className="font-semibold text-slate-200">100% Segura</p>
                  <p className="text-[10px] text-slate-400">Sem rastreadores</p>
                </div>
              </div>
              <div className="col-span-2 sm:col-span-1 flex items-center gap-2 rounded-xl bg-slate-800/50 p-2.5 border border-slate-800">
                <Chrome className="h-4 w-4 text-pink-400 shrink-0" />
                <div className="text-xs">
                  <p className="font-semibold text-slate-200">Chromium</p>
                  <p className="text-[10px] text-slate-400">Universal</p>
                </div>
              </div>
            </div>
          </div>

          {/* Guide Steps */}
          <div className="lg:col-span-5 rounded-2xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <Layers className="h-4 w-4 text-pink-400" />
                Instalação Fácil
              </h3>
              <span className="text-[11px] text-slate-500 font-mono">4 passos</span>
            </div>

            <ol className="space-y-3 text-xs text-slate-300">
              <li className="flex gap-3 items-start">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-lg bg-pink-500/20 border border-pink-500/30 text-[11px] font-bold text-pink-300">
                  1
                </span>
                <div>
                  <p className="font-semibold text-white">Baixe e extraia</p>
                  <p className="text-slate-400">
                    Baixe e descompacte o arquivo <code className="bg-slate-800 text-pink-300 px-1 py-0.5 rounded">.zip</code>.
                  </p>
                </div>
              </li>

              <li className="flex gap-3 items-start">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-lg bg-pink-500/20 border border-pink-500/30 text-[11px] font-bold text-pink-300">
                  2
                </span>
                <div className="space-y-1.5 flex-1">
                  <p className="font-semibold text-white">Acesse extensões</p>
                  <div className="flex items-center gap-2 bg-slate-950/80 border border-slate-800 rounded-lg px-2.5 py-1 font-mono text-[11px] text-pink-300">
                    <span className="flex-1 truncate">chrome://extensions</span>
                    <button
                      onClick={copyExtensionsUrl}
                      title="Copiar URL"
                      className="text-slate-400 hover:text-white p-0.5 transition-colors cursor-pointer"
                    >
                      {copiedUrl ? (
                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              </li>

              <li className="flex gap-3 items-start">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-lg bg-pink-500/20 border border-pink-500/30 text-[11px] font-bold text-pink-300">
                  3
                </span>
                <div>
                  <p className="font-semibold text-white">Modo Desenvolvedor</p>
                  <p className="text-slate-400">
                    Ative o <strong>"Modo do desenvolvedor"</strong> no topo direito.
                  </p>
                </div>
              </li>

              <li className="flex gap-3 items-start">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-lg bg-pink-500/20 border border-pink-500/30 text-[11px] font-bold text-pink-300">
                  4
                </span>
                <div>
                  <p className="font-semibold text-white">Carregar pasta</p>
                  <p className="text-slate-400">
                    Clique em <strong>"Carregar sem compactação"</strong> e selecione a pasta.
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </div>

        {/* Feature Cards */}
        <section className="pt-6 space-y-6">
          <div className="text-center space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Recursos e Vantagens
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Criada para entregar leveza e rapidez sem complicações.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5 backdrop-blur-sm hover:border-pink-500/40 transition-all">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 mb-3">
                <Zap className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-semibold text-white mb-1">Ultra Rápida</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Leve e instantânea, não consome memória e funciona fluidamente.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5 backdrop-blur-sm hover:border-pink-500/40 transition-all">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-500/10 border border-pink-500/20 text-pink-400 mb-3">
                <Lock className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-semibold text-white mb-1">Privacidade Garantida</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Execução local no seu navegador, sem rastreamento nem coleta de dados.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5 backdrop-blur-sm hover:border-purple-500/40 transition-all">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 mb-3">
                <Laptop className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-semibold text-white mb-1">Suporte Completo</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Manifest V3 otimizado para compatibilidade contínua com seu navegador.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Extensão Lovable Grátis.</p>
          <div className="flex items-center gap-4">
            <Link to="/download" className="hover:text-pink-400 transition-colors">
              Página Alternativa
            </Link>
            <span>•</span>
            <span className="text-emerald-400 flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400 inline-block animate-ping" />
              Download Ativo
            </span>
          </div>
        </footer>
      </div>
    </main>
  );
}

