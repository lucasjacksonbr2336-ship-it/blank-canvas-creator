import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Puzzle, CheckCircle2 } from "lucide-react";
import { triggerExtensionDownload } from "@/lib/extension-package";

export const Route = createFileRoute("/download")({
  component: DownloadPage,
  head: () => ({
    meta: [
      { title: "Baixar Extensão" },
      { name: "description", content: "Faça o download da extensão." },
    ],
  }),
});

function DownloadPage() {
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
    <main className="relative min-h-screen flex flex-col items-center justify-center bg-[#07090e] text-slate-100 p-6">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
            <Puzzle className="h-8 w-8" />
          </div>
          <h1 className="mt-6 text-2xl font-bold tracking-tight text-white">
            Extensão do Navegador
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Extensão compacta e pronta para o seu navegador.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl space-y-6">
          <Button
            onClick={handleDownload}
            disabled={downloading}
            size="lg"
            className="w-full h-12 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold"
          >
            {downloading ? (
              <>
                <Download className="mr-2 h-4 w-4 animate-bounce" />
                Baixando...
              </>
            ) : downloaded ? (
              <>
                <CheckCircle2 className="mr-2 h-4 w-4" />
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
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Instruções</h2>
            <ol className="space-y-2 text-xs text-slate-300">
              <li className="flex gap-2">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-300 font-bold">1</span>
                <span>Baixe e extraia o arquivo.</span>
              </li>
              <li className="flex gap-2">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-300 font-bold">2</span>
                <span>Acesse <code className="bg-slate-800 text-cyan-300 px-1 py-0.5 rounded">chrome://extensions</code>.</span>
              </li>
              <li className="flex gap-2">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-300 font-bold">3</span>
                <span>Ative o Modo Desenvolvedor.</span>
              </li>
              <li className="flex gap-2">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-300 font-bold">4</span>
                <span>Clique em "Carregar sem compactação" e escolha a pasta.</span>
              </li>
            </ol>
          </div>
        </div>

        <Button variant="ghost" asChild className="w-full text-slate-400 hover:text-white">
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para o início
          </Link>
        </Button>
      </div>
    </main>
  );
}

