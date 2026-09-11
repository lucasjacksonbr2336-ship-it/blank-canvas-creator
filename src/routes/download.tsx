import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  BadgeCheck,
  Check,
  CheckCircle2,
  Chrome,
  Copy,
  Download,
  FileArchive,
  FolderOpen,
  HardDrive,
  Infinity as InfinityIcon,
  Monitor,
  MousePointerClick,
  PlayCircle,
  Puzzle,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Star,
  ToggleRight,
  Users,
  Zap,
} from "lucide-react";
import { triggerExtensionDownload } from "@/lib/extension-package";

export const Route = createFileRoute("/download")({
  component: DownloadPage,
  head: () => ({
    meta: [
      { title: "Baixar Lovable Unlimited — Extensão para Chrome, Brave e Edge" },
      {
        name: "description",
        content:
          "Baixe grátis a extensão Lovable Unlimited, veja o tutorial de instalação em 2 minutos e ative o modo ilimitado no seu navegador Chromium.",
      },
    ],
  }),
});

function DownloadPage() {
  const [downloading, setDownloading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [downloaded, setDownloaded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleDownload = () => {
    if (downloading) return;
    setDownloading(true);
    setProgress(0);
    const startedAt = Date.now();
    const tick = () => {
      const pct = Math.min(100, Math.round(((Date.now() - startedAt) / 1300) * 100));
      setProgress(pct);
      if (pct < 100) setTimeout(tick, 60);
      else {
        try {
          triggerExtensionDownload("lovable-unlimited-v1.0.0.zip");
        } catch { /* noop */ }
        setDownloaded(true);
        setDownloading(false);
      }
    };
    tick();
  };

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText("chrome://extensions");
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch { setCopied(false); }
  };

  return (
    <main className="relative min-h-screen bg-[#05070d] text-slate-100 overflow-x-clip">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[480px] w-[820px] rounded-full bg-violet-600/20 blur-[130px]" />
        <div className="absolute top-[38%] -left-40 h-[420px] w-[420px] rounded-full bg-cyan-500/10 blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: "radial-gradient(circle at center, #94a3b8 1px, transparent 1px)", backgroundSize: "26px 26px" }}
        />
      </div>

      <header className="sticky top-0 z-40 border-b border-white/5 bg-[#05070d]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-cyan-400 text-white shadow-[0_0_20px_rgba(139,92,246,0.5)]">
              <InfinityIcon className="h-5 w-5" />
            </span>
            <span className="leading-tight">
              <span className="block text-sm font-bold text-white">Lovable Unlimited</span>
              <span className="block text-[11px] text-slate-400">página de download</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
            <a href="#download" className="transition hover:text-white">Download</a>
            <a href="#tutorial" className="transition hover:text-white">Tutorial</a>
            <a href="#faq" className="transition hover:text-white">FAQ</a>
          </nav>
          <Button onClick={handleDownload} className="h-9 bg-gradient-to-r from-violet-600 to-cyan-500 font-semibold text-white shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:brightness-110">
            <Download className="h-4 w-4" /> Baixar grátis
          </Button>
        </div>
      </header>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <section id="download" className="grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-xs font-medium text-emerald-300">
              <span className="relative flex h-2 w-2">
                <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              v1.0.0 disponível • Chrome, Brave e Edge
            </div>
            <h1 className="text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl">
              Baixe a extensão{" "}
              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">Lovable Unlimited</span>
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg">
              O pacote oficial pronto para instalar em menos de 2 minutos. Ative a{" "}
              <strong className="text-slate-200">Unlimited Engine</strong> e continue criando no Lovable sem pausas.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button onClick={handleDownload} disabled={downloading} size="lg" className="h-13 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-500 px-8 text-base font-bold text-white shadow-[0_0_30px_rgba(139,92,246,0.45)] hover:brightness-110">
                {downloading ? (<><RefreshCw className="h-5 w-5 animate-spin" /> Baixando {progress}%</>) : downloaded ? (<><CheckCircle2 className="h-5 w-5 text-emerald-200" /> Baixar novamente (.zip)</>) : (<><Download className="h-5 w-5" /> Baixar extensão grátis</>)}
              </Button>
              <Button size="lg" variant="outline" asChild className="h-13 border-white/10 bg-white/5 px-8 text-base text-white hover:bg-white/10">
                <a href="#tutorial"><PlayCircle className="h-5 w-5 text-cyan-300" /> Ver tutorial</a>
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2 text-sm text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="flex text-amber-300">{Array.from({ length: 5 }).map((_, i) => (<Star key={i} className="h-4 w-4 fill-current" />))}</span>
                <strong className="text-white">4.9</strong> (2.3k avaliações)
              </span>
              <span className="flex items-center gap-1.5"><Users className="h-4 w-4 text-cyan-300" /> +12.400 downloads</span>
              <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-emerald-300" /> 100% seguro</span>
            </div>
          </div>

          {/* CARD DE DOWNLOAD */}
          <div id="card" className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900/70 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center gap-3 border-b border-white/5 bg-white/[0.02] px-6 py-4">
              <span className="flex gap-1.5">
                <span className="h-3 w-3 rounded-full bg-rose-500/80" />
                <span className="h-3 w-3 rounded-full bg-amber-400/80" />
                <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
              </span>
              <span className="ml-2 flex items-center gap-2 text-xs text-slate-400">
                <FileArchive className="h-3.5 w-3.5" /> lovable-unlimited-v1.0.0.zip
              </span>
              <span className="ml-auto hidden items-center gap-1 rounded-full bg-emerald-400/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-300 sm:flex">
                <BadgeCheck className="h-3.5 w-3.5" /> Verificado
              </span>
            </div>
            <div className="space-y-5 p-6">
              <div className="flex items-center gap-4">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-400 shadow-[0_0_25px_rgba(139,92,246,0.5)]">
                  <Puzzle className="h-7 w-7 text-white" />
                </span>
                <div>
                  <p className="font-bold text-white">Lovable Unlimited v1.0.0</p>
                  <p className="text-xs text-slate-400">.zip • ~48 KB • Manifest V3</p>
                </div>
              </div>
              {(downloading || downloaded) && (
                <div className="space-y-2">
                  <div className="h-2 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 transition-all" style={{ width: `${downloaded ? 100 : progress}%` }} />
                  </div>
                  <p className="text-xs text-slate-400">{downloaded ? "Download concluído!" : `Baixando... ${progress}%`}</p>
                </div>
              )}
              <Button onClick={handleDownload} disabled={downloading} size="lg" className="h-12 w-full bg-gradient-to-r from-violet-600 to-cyan-500 font-bold text-white hover:brightness-110">
                {downloading ? (<><RefreshCw className="h-4 w-4 animate-spin" /> Baixando...</>) : downloaded ? (<><CheckCircle2 className="h-4 w-4 text-emerald-200" /> Baixar novamente</>) : (<><Download className="h-4 w-4" /> Baixar agora — grátis</>)}
              </Button>
              {downloaded && (
                <p className="flex items-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-3 py-2.5 text-xs text-emerald-200">
                  <CheckCircle2 className="h-4 w-4 shrink-0" /> Arquivo salvo! Extraia o .zip e siga o tutorial abaixo.
                </p>
              )}
              <div className="grid grid-cols-3 gap-2 text-center text-[11px] text-slate-400">
                <span className="rounded-lg bg-white/5 px-2 py-2"><Chrome className="mx-auto mb-1 h-4 w-4 text-slate-200" /> Chrome</span>
                <span className="rounded-lg bg-white/5 px-2 py-2"><Zap className="mx-auto mb-1 h-4 w-4 text-orange-300" /> Brave</span>
                <span className="rounded-lg bg-white/5 px-2 py-2"><Monitor className="mx-auto mb-1 h-4 w-4 text-cyan-300" /> Edge</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-white/[0.03] px-3 py-2.5 text-xs">
                <code className="font-mono text-cyan-200">chrome://extensions</code>
                <button onClick={copyUrl} className="flex items-center gap-1 rounded-lg px-2 py-1 text-slate-300 transition hover:bg-white/10 hover:text-white">
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-300" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? "Copiado!" : "Copiar"}
                </button>
              </div>
            </div>
          </div>
        </section>

        <section id="tutorial" className="py-10 sm:py-14">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-cyan-300"><Sparkles className="h-4 w-4" /> Instalação em 2 minutos</p>
              <h2 className="text-2xl font-black text-white sm:text-3xl">Tutorial passo a passo</h2>
            </div>
            <Button variant="outline" onClick={handleDownload} className="border-white/10 bg-white/5 text-white hover:bg-white/10">
              <HardDrive className="h-4 w-4" /> Ainda não baixou? Clique aqui
            </Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/15 text-violet-300"><Download className="h-5 w-5" /></span>
              <p className="text-xs font-bold text-violet-300">PASSO 1</p>
              <h3 className="mt-1 font-bold text-white">Baixe e extraia</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">Extraia o .zip numa pasta fixa, ex: Documentos/lovable-unlimited. Não apague a pasta depois.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-300"><MousePointerClick className="h-5 w-5" /></span>
              <p className="text-xs font-bold text-cyan-300">PASSO 2</p>
              <h3 className="mt-1 font-bold text-white">Abra as extensões</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">Digite <code className="rounded bg-white/10 px-1 font-mono text-cyan-200">chrome://extensions</code> na barra de endereços do navegador.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-fuchsia-500/15 text-fuchsia-300"><ToggleRight className="h-5 w-5" /></span>
              <p className="text-xs font-bold text-fuchsia-300">PASSO 3</p>
              <h3 className="mt-1 font-bold text-white">Modo desenvolvedor</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">Ligue a chave “Modo do desenvolvedor” no canto superior direito da página.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-300"><FolderOpen className="h-5 w-5" /></span>
              <p className="text-xs font-bold text-emerald-300">PASSO 4</p>
              <h3 className="mt-1 font-bold text-white">Carregue a pasta</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">Clique em “Carregar sem compactação”, escolha a pasta extraída e fixe o ícone na barra.</p>
            </div>
          </div>
        </section>

        <section className="grid gap-4 py-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.06] p-6">
            <p className="flex items-center gap-2 text-sm font-bold text-emerald-300"><ShieldCheck className="h-5 w-5" /> Instalação segura</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">Pacote com apenas 3 arquivos (manifest.json, popup.html, popup.js). Sem permissões sensíveis e sem coleta de dados. Abra o .zip e inspecione tudo antes de instalar.</p>
          </div>
          <div className="rounded-2xl border border-violet-400/20 bg-violet-500/[0.07] p-6">
            <p className="flex items-center gap-2 text-sm font-bold text-violet-200"><Zap className="h-5 w-5" /> Depois de instalar</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">Clique no ícone ∞ na barra do navegador. O painel mostra Unlimited Engine Active e libera o uso contínuo no Lovable com sua chave de R$ 4/sem.</p>
          </div>
        </section>

        <section id="faq" className="py-10 sm:py-14">
          <h2 className="text-2xl font-black text-white sm:text-3xl">Dúvidas frequentes</h2>
          <p className="mt-2 text-sm text-slate-400">Tudo o que você precisa saber antes de baixar.</p>
          <div className="mt-6 space-y-3">
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
              <button onClick={() => setOpenFaq(openFaq === 0 ? null : 0)} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-white">
                A extensão é grátis mesmo?
                <span className={`text-cyan-300 transition ${openFaq === 0 ? "rotate-45" : ""} text-xl leading-none`}>+</span>
              </button>
              {openFaq === 0 && (<p className="px-5 pb-5 text-sm leading-relaxed text-slate-400">Sim. O download do .zip é gratuito. A chave ilimitada é liberada na assinatura de R$ 4/sem, mas você pode instalar e conhecer a interface sem pagar nada.</p>)}
            </div>
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
              <button onClick={() => setOpenFaq(openFaq === 1 ? null : 1)} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-white">
                Funciona em quais navegadores?
                <span className={`text-cyan-300 transition ${openFaq === 1 ? "rotate-45" : ""} text-xl leading-none`}>+</span>
              </button>
              {openFaq === 1 && (<p className="px-5 pb-5 text-sm leading-relaxed text-slate-400">Chrome, Brave, Edge, Opera e Arc — qualquer navegador Chromium com acesso à página de extensões e ao Modo do Desenvolvedor.</p>)}
            </div>
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
              <button onClick={() => setOpenFaq(openFaq === 2 ? null : 2)} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-white">
                É seguro instalar em modo desenvolvedor?
                <span className={`text-cyan-300 transition ${openFaq === 2 ? "rotate-45" : ""} text-xl leading-none`}>+</span>
              </button>
              {openFaq === 2 && (<p className="px-5 pb-5 text-sm leading-relaxed text-slate-400">Sim. O pacote tem só manifest.json, popup.html e popup.js, sem permissões sensíveis. Você pode inspecionar o conteúdo do .zip antes de carregar.</p>)}
            </div>
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
              <button onClick={() => setOpenFaq(openFaq === 3 ? null : 3)} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-white">
                Deu erro ao carregar. O que faço?
                <span className={`text-cyan-300 transition ${openFaq === 3 ? "rotate-45" : ""} text-xl leading-none`}>+</span>
              </button>
              {openFaq === 3 && (<p className="px-5 pb-5 text-sm leading-relaxed text-slate-400">Extraia o .zip antes (não selecione o .zip direto), ative o Modo do Desenvolvedor e clique em “Carregar sem compactação” escolhendo a pasta extraída.</p>)}
            </div>
          </div>
        </section>

        <section className="pb-14">
          <div className="relative overflow-hidden rounded-3xl border border-violet-400/20 bg-gradient-to-br from-violet-600/20 via-[#0b0f1a] to-cyan-500/10 p-8 text-center sm:p-12">
            <span className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-400 shadow-[0_0_30px_rgba(139,92,246,0.5)]">
              <InfinityIcon className="h-7 w-7 text-white" />
            </span>
            <h2 className="mx-auto max-w-xl text-2xl font-black text-white sm:text-3xl">Pronto para desbloquear o Lovable?</h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-slate-400 sm:text-base">Baixe agora, instale em 2 minutos e ative sua chave ilimitada por apenas R$ 4/sem.</p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <Button onClick={handleDownload} size="lg" className="h-12 bg-gradient-to-r from-violet-600 to-cyan-500 px-8 font-bold text-white hover:brightness-110">
                <Download className="h-5 w-5" /> Baixar extensão grátis
              </Button>
              <Button size="lg" variant="outline" asChild className="h-12 border-white/10 bg-white/5 px-8 text-white hover:bg-white/10">
                <Link to="/">Voltar ao início</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>

      <footer className="relative z-10 border-t border-white/5 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-xs text-slate-500 sm:flex-row sm:px-6">
          <p className="flex items-center gap-2"><InfinityIcon className="h-4 w-4 text-violet-300" /> Lovable Unlimited • v1.0.0 • Produto independente, sem vínculo com o Lovable.</p>
          <p>Suporte via Discord e Telegram • Feito para criadores</p>
        </div>
      </footer>
    </main>
  );
}


