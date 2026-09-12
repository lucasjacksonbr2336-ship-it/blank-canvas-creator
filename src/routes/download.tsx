import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  Copy,
  Download,
  Infinity as InfinityIcon,
} from "lucide-react";
import { triggerExtensionDownload } from "../lib/extension-package";

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

const FAQS = [
  { q: "O download é grátis?", a: "Sim. O download do .zip é gratuito. A chave ilimitada é liberada na assinatura de R$ 4/sem, mas você pode instalar e conhecer a interface sem pagar nada." },
  { q: "Funciona em qual navegador?", a: "Chrome, Brave, Edge, Opera e Arc — qualquer navegador Chromium com acesso à página de extensões e ao Modo do Desenvolvedor." },
  { q: "É seguro instalar em modo desenvolvedor?", a: "Sim. O pacote tem só manifest.json, popup.html e popup.js, sem permissões sensíveis. Você pode inspecionar o conteúdo do .zip antes de carregar." },
  { q: "Deu erro ao carregar. O que faço?", a: "Extraia o .zip antes (não selecione o .zip direto), ative o Modo do Desenvolvedor e clique em “Carregar sem compactação” escolhendo a pasta extraída." },
];

const STEPS = [
  { n: "01", title: "Baixe e extraia", desc: "Extraia o .zip numa pasta fixa, ex: Documentos/lovable-unlimited. Não apague a pasta depois.", meta: "~48 KB" },
  { n: "02", title: "Abra as extensões", desc: "Digite chrome://extensions na barra de endereços do navegador.", meta: "10 seg" },
  { n: "03", title: "Modo desenvolvedor", desc: "Ligue a chave “Modo do desenvolvedor” no canto superior direito da página.", meta: "1 toque" },
  { n: "04", title: "Carregue a pasta", desc: "Clique em “Carregar sem compactação”, escolha a pasta extraída e fixe o ícone na barra.", meta: "pronto" },
];

function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") { el.classList.add("is-visible"); return; }
    const io = new IntersectionObserver(
      (entries) => { if (entries[0]?.isIntersecting) { el.classList.add("is-visible"); io.disconnect(); } },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}>
      {children}
    </div>
  );
}

function DownloadPage() {
  const [downloading, setDownloading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [downloaded, setDownloaded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const startDownload = () => {
    if (downloading) return;
    setDownloading(true);
    setProgress(0);
    const startedAt = Date.now();
    const tick = () => {
      const pct = Math.min(100, Math.round(((Date.now() - startedAt) / 900) * 100));
      setProgress(pct);
      if (pct < 100) setTimeout(tick, 60);
      else {
        triggerExtensionDownload("lovable-unlimited-v1.0.0.zip");
        setDownloaded(true);
        setDownloading(false);
      }
    };
    tick();
  };

  const handleDownload = () => {
    startDownload();
  };

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText("chrome://extensions");
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch { setCopied(false); }
  };

  return (
    <main className="min-h-screen w-full overflow-x-clip bg-[#fdfdfc] text-stone-900 antialiased">
      <header className="sticky top-0 z-40 border-b border-stone-200/80 bg-[#fdfdfc]/90 backdrop-blur-md">
        <div className="mx-auto hidden max-w-6xl items-center justify-between px-5 pt-2 text-[11px] tracking-wide text-stone-500 sm:flex">
          <p className="uppercase">Lovable Unlimited — página de download</p>
          <p className="tabular-nums">v1.0.0 · PT-BR</p>
        </div>
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <Link to="/" className="group flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-stone-900 text-white transition-transform duration-300 group-hover:-rotate-6">
              <InfinityIcon className="h-4 w-4" strokeWidth={2.2} />
            </span>
            <span className="leading-none">
              <span className="block text-[15px] font-semibold tracking-tight">Unlimited</span>
              <span className="mt-0.5 block text-[11px] text-stone-500">para o Lovable</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-7 text-[13.5px] text-stone-600 md:flex">
            <a href="#download" className="ed-link hover:text-stone-950">Download</a>
            <a href="#tutorial" className="ed-link hover:text-stone-950">Tutorial</a>
            <a href="#faq" className="ed-link hover:text-stone-950">Dúvidas</a>
          </nav>
          <button onClick={handleDownload} className="btn-ink inline-flex h-10 items-center gap-2 rounded-full bg-stone-900 px-5 text-[13.5px] font-medium text-white">
            <Download className="h-4 w-4" />
            {downloading ? `${progress}%` : downloaded ? "Baixado · repetir" : "Baixar"}
          </button>
        </div>
        <div className="mx-auto max-w-6xl px-5">
          <div className={`h-px w-full transition-opacity duration-500 ${downloading || downloaded ? "opacity-100" : "opacity-0"}`}>
            <div className="h-px bg-stone-900 transition-[width] duration-150 ease-out" style={{ width: `${downloaded ? 100 : progress}%` }} />
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5">
        <section id="download" className="grid items-start gap-12 py-14 sm:py-20 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <div>
              <p className="ed-enter ed-enter-1 flex items-center gap-3 text-[11.5px] font-medium uppercase tracking-[0.16em] text-stone-500">
                <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-600" aria-hidden />
                Download · v1.0.0 estável
                <span className="hidden h-px w-16 bg-stone-300 sm:inline-block" />
              </p>
              <h1 className="ed-enter ed-enter-2 font-editorial mt-6 max-w-[16ch] text-[2.65rem] font-light leading-[1.04] tracking-[-0.02em] text-stone-950 sm:text-6xl sm:leading-[1.02]">
                Baixe, instale, <em className="font-normal">volte a criar.</em>
              </h1>
              <p className="ed-enter ed-enter-3 mt-6 max-w-[46ch] text-[15.5px] leading-[1.75] text-stone-600">
                O pacote oficial, pronto em menos de 2 minutos. Ative a Unlimited&nbsp;Engine
                e continue no Lovable sem pausas — sem conta, sem checkout para baixar.
              </p>
              <div className="ed-enter ed-enter-4 mt-8 flex flex-wrap items-center gap-4">
                <button onClick={handleDownload} disabled={downloading} className="btn-ink inline-flex h-12 items-center gap-2 rounded-full bg-stone-900 px-7 text-[14.5px] font-medium text-white disabled:opacity-70">
                  <Download className="h-4 w-4" />
                  {downloading ? `Baixando ${progress}%` : downloaded ? "Baixar novamente" : "Baixar a extensão"}
                  {!downloading && <ArrowRight className="h-4 w-4" />}
                </button>
                <a href="#tutorial" className="group inline-flex items-center gap-2 text-[14.5px] font-medium text-stone-900">
                  <span className="ed-link">Ver como se instala</span>
                  <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                </a>
              </div>
              <p className="ed-enter ed-enter-5 mt-5 text-[12.5px] tabular-nums text-stone-500">
                2 minutos · sem conta · ~48 KB · Manifest V3
                {downloaded && <span className="mt-1 flex items-center gap-1.5 text-emerald-700"><Check className="h-3.5 w-3.5" /> Arquivo salvo — extraia o .zip e siga o tutorial abaixo.</span>}
              </p>
            </div>
            <Reveal delay={140}>
              <dl className="mt-10 grid grid-cols-3 divide-x divide-stone-200 border-y border-stone-200">
                <div className="px-4 py-5 first:pl-0 sm:px-6">
                  <dt className="text-[11px] uppercase tracking-[0.14em] text-stone-500">Tamanho</dt>
                  <dd className="font-editorial mt-1 text-2xl font-light tabular-nums text-stone-950">48 KB</dd>
                </div>
                <div className="px-4 py-5 sm:px-6">
                  <dt className="text-[11px] uppercase tracking-[0.14em] text-stone-500">Formato</dt>
                  <dd className="font-editorial mt-1 text-2xl font-light text-stone-950">.zip</dd>
                </div>
                <div className="px-4 py-5 sm:px-6">
                  <dt className="text-[11px] uppercase tracking-[0.14em] text-stone-500">Avaliação</dt>
                  <dd className="font-editorial mt-1 text-2xl font-light tabular-nums text-stone-950">4,9 <span className="text-sm text-stone-400">/ 2,3k</span></dd>
                </div>
              </dl>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={140}>
              <aside className="ad-frame overflow-hidden rounded-2xl border border-stone-200 bg-white">
                <div className="flex items-center justify-between border-b border-stone-200 bg-[#fbfaf8] px-6 py-3.5 text-[11px] uppercase tracking-[0.16em] text-stone-500">
                  <span>Ficha do pacote</span>
                  <span className="tabular-nums">v1.0.0</span>
                </div>
                <div className="p-7 sm:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-editorial text-[1.7rem] font-light leading-none text-stone-950">∞</p>
                      <h2 className="mt-3 text-[16px] font-medium tracking-tight text-stone-950">Lovable Unlimited</h2>
                      <p className="mt-1 text-[12.5px] tabular-nums text-stone-500">.zip · ~48 KB · Manifest V3</p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 bg-[#fdfdfc] px-3 py-1 text-[11.5px] font-medium text-stone-600">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" aria-hidden />
                      Verificado
                    </span>
                  </div>
                  <div className="mt-6 border-y border-dashed border-stone-200 py-3 text-[12.5px] text-stone-500">
                    <p className="flex items-center justify-between gap-3">
                      <code className="truncate font-mono text-[12px] text-stone-700">lovable-unlimited-v1.0.0.zip</code>
                      <span className="shrink-0 tabular-nums">{downloaded ? "100%" : `${progress}%`}</span>
                    </p>
                    <div className="mt-2.5 h-px w-full bg-stone-200/80">
                      <div className="h-px bg-stone-900 transition-[width] duration-200 ease-out" style={{ width: `${downloaded ? 100 : progress}%` }} />
                    </div>
                    <p className="mt-2 text-[12px]">{downloaded ? "Download concluído." : downloading ? "Preparando o pacote…" : "Pronto para baixar."}</p>
                  </div>
                  <button onClick={handleDownload} disabled={downloading} className="btn-ink mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-stone-900 px-7 text-[14px] font-medium text-white disabled:opacity-70">
                    <Download className="h-4 w-4" />
                    {downloading ? `Baixando ${progress}%` : downloaded ? "Baixar novamente" : "Baixar agora — grátis"}
                  </button>
                  {downloaded && (
                    <p className="mt-3 flex items-start gap-2 text-[12.5px] leading-snug text-emerald-800">
                      <Check className="mt-0.5 h-4 w-4 shrink-0" /> Arquivo salvo. Extraia o .zip e siga o tutorial abaixo.
                    </p>
                  )}
                  <p className="mt-6 text-[12.5px] leading-relaxed text-stone-500">Chrome · Brave · Edge · Opera · Arc</p>
                  <div className="mt-3 flex items-center justify-between gap-3 rounded-full border border-stone-200 bg-[#fbfaf8] py-1.5 pl-4 pr-1.5">
                    <code className="font-mono text-[12px] text-stone-700">chrome://extensions</code>
                    <button onClick={copyUrl} className="inline-flex h-8 items-center gap-1.5 rounded-full border border-stone-200 bg-white px-3 text-[12px] font-medium text-stone-700 transition-all duration-300 hover:border-stone-900 hover:text-stone-950 active:scale-[0.97]">
                      {copied ? <Check className="h-3.5 w-3.5 text-emerald-700" /> : <Copy className="h-3.5 w-3.5" />}
                      {copied ? "Copiado" : "Copiar"}
                    </button>
                  </div>
                </div>
              </aside>
            </Reveal>
            <Reveal delay={220}>
              <p className="mt-4 flex items-center justify-between text-[11.5px] text-stone-400">
                <span>Pacote inspecionável — abra o .zip antes de instalar.</span>
                <Link to="/" className="ed-link hidden text-stone-500 sm:inline">voltar ao início</Link>
              </p>
            </Reveal>
          </div>
        </section>

        <section id="tutorial" className="scroll-mt-24 border-t border-stone-200 py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Reveal>
                <div className="lg:sticky lg:top-28">
                  <p className="text-[11.5px] font-medium uppercase tracking-[0.16em] text-stone-500">01 — Instalação</p>
                  <h2 className="font-editorial mt-4 max-w-[14ch] text-3xl font-light leading-[1.12] text-stone-950 sm:text-4xl">
                    Quatro gestos, nenhum manual.
                  </h2>
                  <p className="mt-4 max-w-xs text-[14px] leading-relaxed text-stone-600">
                    Do .zip à barra do navegador em cerca de dois minutos. Se travar em algum passo, o erro quase sempre é o mesmo — e está no final da lista.
                  </p>
                  <button onClick={handleDownload} className="group mt-6 inline-flex items-center gap-2 text-[14px] font-medium text-stone-900">
                    <span className="ed-link">{downloaded ? "Baixar o pacote de novo" : "Baixar o pacote primeiro"}</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </button>
                </div>
              </Reveal>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <Reveal>
                <ol className="border-t border-stone-200">
                  {STEPS.map((s, i) => (
                    <Reveal key={s.n} delay={i * 70}>
                      <li className="row-hover grid gap-2 border-b border-stone-200 px-2 py-6 sm:grid-cols-[auto_1fr_auto] sm:items-baseline sm:gap-6 sm:px-4">
                        <span className="font-editorial text-lg font-light tabular-nums text-stone-400">{s.n}</span>
                        <span>
                          <span className="flex items-center gap-2 text-[15.5px] font-medium text-stone-950">
                            {s.title}
                            {i === 1 && (
                              <button onClick={copyUrl} title="Copiar chrome://extensions" className="inline-flex items-center gap-1 rounded-full border border-stone-200 px-2 py-0.5 text-[11.5px] font-medium text-stone-500 transition-all duration-300 hover:border-stone-900 hover:text-stone-900 active:scale-95">
                                {copied ? <Check className="h-3 w-3 text-emerald-700" /> : <Copy className="h-3 w-3" />}
                                {copied ? "copiado" : "copiar endereço"}
                              </button>
                            )}
                          </span>
                          <span className="mt-1.5 block max-w-[52ch] text-[14px] leading-relaxed text-stone-600">{s.desc}</span>
                        </span>
                        <span className="font-mono text-[11.5px] tabular-nums text-stone-400">{s.meta}</span>
                      </li>
                    </Reveal>
                  ))}
                </ol>
              </Reveal>
              <Reveal delay={120}>
                <p className="mt-5 max-w-[62ch] text-[13px] leading-relaxed text-stone-500">
                  O navegador pede a pasta extraída, não o .zip fechado. É o erro mais comum — e o mais rápido de corrigir.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="border-t border-stone-200 py-12 sm:py-14">
          <div className="grid gap-8 sm:grid-cols-2 sm:gap-10">
            <Reveal>
              <p className="text-[11.5px] font-medium uppercase tracking-[0.16em] text-stone-500">Segurança</p>
              <p className="mt-3 max-w-[46ch] text-[14.5px] leading-relaxed text-stone-700">
                Pacote com apenas 3 arquivos — <span className="font-mono text-[13px] text-stone-900">manifest.json</span>, <span className="font-mono text-[13px] text-stone-900">popup.html</span>, <span className="font-mono text-[13px] text-stone-900">popup.js</span>. Sem permissões sensíveis, sem coleta de dados. Abra o .zip e inspecione tudo antes de instalar.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <p className="text-[11.5px] font-medium uppercase tracking-[0.16em] text-stone-500">Depois de instalar</p>
              <p className="mt-3 max-w-[46ch] text-[14.5px] leading-relaxed text-stone-700">
                Clique no ícone ∞ na barra do navegador. O painel mostra <em className="font-editorial">Unlimited Engine Active</em> e libera o uso contínuo no Lovable com sua chave de R$ 4/sem.
              </p>
            </Reveal>
          </div>
        </section>

        <section id="faq" className="scroll-mt-24 border-t border-stone-200 py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Reveal>
                <div className="lg:sticky lg:top-28">
                  <p className="text-[11.5px] font-medium uppercase tracking-[0.16em] text-stone-500">02 — Dúvidas</p>
                  <h2 className="font-editorial mt-4 text-3xl font-light leading-tight text-stone-950">Perguntas de quem baixa.</h2>
                  <p className="mt-4 max-w-xs text-[14px] leading-relaxed text-stone-600">
                    O essencial antes de instalar. Se algo falhar no caminho, a última resposta resolve 9 em cada 10 casos.
                  </p>
                  <a href="#download" className="group mt-5 inline-flex items-center gap-2 text-[14px] font-medium text-stone-900">
                    <span className="ed-link">Voltar ao download</span>
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </Reveal>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <Reveal>
                <div className="border-t border-stone-200">
                  {FAQS.map((f, i) => {
                    const open = openFaq === i;
                    return (
                      <div key={f.q} className="border-b border-stone-200">
                        <button onClick={() => setOpenFaq(open ? null : i)} aria-expanded={open} className="flex w-full items-center justify-between gap-6 py-5 text-left">
                          <span className={`text-[15px] ${open ? "font-medium text-stone-950" : "text-stone-800"}`}>{f.q}</span>
                          <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-lg leading-none transition-colors duration-300 ${open ? "border-stone-900 bg-stone-900 text-white" : "border-stone-300 text-stone-500"}`}>
                            {open ? "−" : "+"}
                          </span>
                        </button>
                        <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                          <div className="overflow-hidden">
                            <p className="max-w-xl pb-6 text-[14px] leading-relaxed text-stone-600">{f.a}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="pb-24 lg:pb-32">
          <Reveal>
            <div className="border-t border-stone-200 pt-16 text-center sm:pt-20">
              <p className="text-[11.5px] font-medium uppercase tracking-[0.16em] text-stone-400">Pronto quando você estiver</p>
              <h2 className="font-editorial mx-auto mt-5 max-w-[18ch] text-4xl font-light leading-[1.08] text-stone-950 sm:text-5xl">
                Baixe uma vez, <em className="font-normal">use a tarde inteira.</em>
              </h2>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <button onClick={handleDownload} disabled={downloading} className="btn-ink inline-flex h-12 items-center gap-2 rounded-full bg-stone-900 px-8 text-[14.5px] font-medium text-white disabled:opacity-70">
                  <Download className="h-4 w-4" />
                  {downloading ? `Baixando ${progress}%` : downloaded ? "Baixar novamente" : "Baixar grátis"}
                </button>
                <span className="text-[12.5px] text-stone-500">2 minutos · sem conta · cancele quando quiser</span>
              </div>
            </div>
          </Reveal>
        </section>
      </div>

      <footer className="border-t border-stone-200">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 px-5 py-8 text-[12.5px] text-stone-500 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2">
            <InfinityIcon className="h-4 w-4 text-stone-700" />
            <span><span className="font-medium text-stone-800">Unlimited</span> · v1.0.0 · produto independente, sem vínculo com o Lovable.</span>
          </p>
          <nav className="flex items-center gap-5">
            <a href="#download" className="ed-link hover:text-stone-900">Download</a>
            <a href="#tutorial" className="ed-link hover:text-stone-900">Instalação</a>
            <a href="#faq" className="ed-link hover:text-stone-900">Dúvidas</a>
          </nav>
        </div>
      </footer>
    </main>
  );
}


