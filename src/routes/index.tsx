import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, ArrowUpRight, BadgeCheck, Check, Copy, Download, Infinity as InfinityIcon, Menu, MousePointerClick, ShieldCheck, Sparkles, Star, Timer, Wallet, X, Zap } from "lucide-react";

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    meta: [
      { title: "Lovable Unlimited — Continue criando sem pausas" },
      { name: "description", content: "A extensão leve para o Lovable: baixe grátis, instale em 2 minutos e volte ao seu ritmo." },
    ],
  }),
});

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

const STEPS = [
  { n: "01", title: "Baixe o pacote", desc: "Um .zip pequeno, direto desta página. Sem conta, sem checkout para baixar.", meta: "~48 KB" },
  { n: "02", title: "Extraia a pasta", desc: "Descompacte o arquivo — o navegador lê a pasta, não o .zip fechado.", meta: "10 seg" },
  { n: "03", title: "Abra as extensões", desc: "Ative o Modo do desenvolvedor e clique em “Carregar sem compactação”.", meta: "chrome://extensions", copy: true },
  { n: "04", title: "Volte a criar", desc: "Fixe o ícone ∞ na barra, abra o painel e siga de onde parou.", meta: "pronto" },
];

const FAQS = [
  { q: "Funciona em qual navegador?", a: "Chrome, Brave, Edge, Opera e Arc — qualquer Chromium com página de extensões e Modo do desenvolvedor." },
  { q: "É seguro instalar desse jeito?", a: "Sim. O pacote contém apenas manifest.json, popup.html e popup.js, sem permissões sensíveis. Você pode abrir o .zip e inspecionar tudo antes de carregar." },
  { q: "Preciso pagar para baixar?", a: "Não. O download é grátis. A ativação ilimitada custa R$ 4 por semana e você cancela quando quiser." },
  { q: "Deu erro ao carregar. E agora?", a: "Extraia o .zip antes de selecionar, confirme o Modo do desenvolvedor ativado e escolha a pasta extraída — não o arquivo compactado." },
];

function HomePage() {
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [planoAnual, setPlanoAnual] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const copyExtensions = async () => {
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
          <p className="uppercase">Lovable Unlimited — edição para navegador</p>
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
            <a href="#destaque" className="ed-link hover:text-stone-950">Destaque</a>
            <a href="#ideia" className="ed-link hover:text-stone-950">A ideia</a>
            <a href="#planos" className="ed-link hover:text-stone-950">Planos</a>
            <a href="#instalar" className="ed-link hover:text-stone-950">Instalação</a>
            <a href="#faq" className="ed-link hover:text-stone-950">Dúvidas</a>
          </nav>
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="hidden items-center gap-1.5 rounded-full border border-stone-200 bg-stone-100 px-3 py-1.5 text-[11.5px] font-medium text-stone-600 lg:inline-flex">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-600" />
              Novo · v1.0.0
            </span>
            <Link to="/download" className="btn-ink btn-shine hidden h-10 items-center gap-2 rounded-full bg-stone-900 px-5 text-[13.5px] font-medium text-white sm:inline-flex">
              <Download className="h-4 w-4" />
              Baixar extensão
            </Link>
            <button onClick={() => setMenuOpen((v) => !v)} aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={menuOpen} className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 text-stone-700 md:hidden">
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
          {menuOpen && (
            <nav className="border-t border-stone-200/80 px-5 py-3 md:hidden">
              <div className="flex flex-col gap-1 text-[14px]">
                <a href="#destaque" onClick={() => setMenuOpen(false)} className="rounded-lg px-2 py-2.5 text-stone-700 hover:bg-stone-100">Destaque</a>
                <a href="#ideia" onClick={() => setMenuOpen(false)} className="rounded-lg px-2 py-2.5 text-stone-700 hover:bg-stone-100">A ideia</a>
                <a href="#planos" onClick={() => setMenuOpen(false)} className="rounded-lg px-2 py-2.5 text-stone-700 hover:bg-stone-100">Planos</a>
                <a href="#instalar" onClick={() => setMenuOpen(false)} className="rounded-lg px-2 py-2.5 text-stone-700 hover:bg-stone-100">Instalação</a>
                <a href="#faq" onClick={() => setMenuOpen(false)} className="rounded-lg px-2 py-2.5 text-stone-700 hover:bg-stone-100">Dúvidas</a>
                <Link to="/download" onClick={() => setMenuOpen(false)} className="mt-1 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-stone-900 px-5 text-[14px] font-medium text-white">
                  <Download className="h-4 w-4" />
                  Baixar grátis
                </Link>
              </div>
            </nav>
          )}
      </header>
      <section className="relative mx-auto max-w-6xl px-5 pb-16 pt-14 sm:pt-20 lg:pb-24">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="anim-blob-a absolute -top-24 -left-24 h-96 w-96 rounded-full bg-gradient-to-br from-amber-200/60 via-rose-200/50 to-violet-300/50 blur-3xl" />
          <div className="anim-blob-b absolute top-10 right-[-6rem] h-[28rem] w-[28rem] rounded-full bg-gradient-to-br from-emerald-200/50 via-sky-200/40 to-amber-100/60 blur-3xl" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-stone-300 to-transparent" />
        </div>
        <div className="grid items-end gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <p className="ed-enter ed-enter-1 flex flex-wrap items-center gap-3 text-[11.5px] font-medium uppercase tracking-[0.14em] text-stone-500">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-stone-900 bg-stone-900 px-3 py-1 text-[10.5px] tracking-[0.12em] text-white">
                <Sparkles className="h-3 w-3" />
                Novo · v1.0.0
              </span>
              Extensão para Chrome · Manifest V3
              <span className="hidden h-px w-16 bg-stone-300 sm:inline-block" />
            </p>
            <h1 className="ed-enter ed-enter-2 font-editorial mt-6 max-w-[16ch] text-[2.65rem] font-light leading-[1.04] tracking-[-0.02em] text-stone-950 sm:text-6xl sm:leading-[1.02]">
              O Lovable tem limite. <em className="grad-text-warm font-normal">Seu ritmo</em> não precisa ter.
            </h1>
            <p className="ed-enter ed-enter-3 mt-6 max-w-md text-[15.5px] leading-relaxed text-stone-600">
              A Lovable Unlimited é uma extensão pequena que roda no seu navegador e acompanha o seu fluxo — baixe, instale em dois minutos e volte a criar de onde parou.
            </p>
            <div className="ed-enter ed-enter-4 mt-8 flex flex-wrap items-center gap-4">
              <Link to="/download" className="btn-ink btn-shine inline-flex h-12 items-center gap-2 rounded-full bg-stone-900 px-7 text-[14.5px] font-medium text-white">
                <Download className="h-4 w-4 animate-bounce" />
                Baixar a extensão
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="#planos" className="group inline-flex h-12 items-center gap-2 rounded-full border border-stone-300 bg-white/70 px-6 text-[14.5px] font-medium text-stone-900 backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-stone-900 hover:shadow-lg">
                <Wallet className="h-4 w-4" />
                Ver planos
              </a>
            </div>
            <div className="ed-enter ed-enter-4 mt-4 flex flex-wrap items-center gap-3 text-[12.5px]">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 font-medium text-emerald-700 ring-1 ring-emerald-200">
                <ShieldCheck className="h-3.5 w-3.5" /> Download grátis para sempre
              </span>
              <a href="#instalar" className="group inline-flex items-center gap-1.5 font-medium text-stone-700 hover:text-stone-950">
                <span className="ed-link">Ver como se instala</span>
                <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
              </a>
            </div>
            <div className="ed-enter ed-enter-5 mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-stone-200 pt-5 text-[12.5px] text-stone-500">
              <span className="tabular-nums">48 KB · Manifest V3</span>
              <span className="hidden h-3 w-px bg-stone-300 sm:inline-block" />
              <span>Chrome · Brave · Edge</span>
              <span className="hidden h-3 w-px bg-stone-300 sm:inline-block" />
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                Pacote auditável · 3 arquivos
              </span>
            </div>
          </div>
          <div className="ed-fade-late relative lg:col-span-5 lg:pb-2 lg:pl-6">
            <p className="mb-4 flex items-center justify-end gap-2 text-[11px] uppercase tracking-[0.16em] text-stone-400 lg:absolute lg:-top-8 lg:right-1">
              <span className="live-dot inline-block h-1.5 w-1.5 rounded-full bg-emerald-600" />
              fig. 01 — painel da extensão · ao vivo
            </p>
            <div className="relative ml-auto max-w-[340px] rotate-[1.2deg]">
              <div className="absolute inset-0 translate-x-3 translate-y-3 rotate-[-2.4deg] rounded-xl border border-stone-200 bg-[#f7f5f1]" />
              <div className="anim-float-y absolute -left-10 top-6 z-10 hidden items-center gap-2 rounded-full border border-stone-200 bg-white/95 px-3.5 py-2 text-[11.5px] font-medium text-stone-800 shadow-xl backdrop-blur sm:flex">
                <Timer className="h-3.5 w-3.5 text-emerald-600" /> 2 min para instalar
              </div>
              <div className="anim-float-y absolute -right-4 bottom-16 z-10 hidden items-center gap-2 rounded-full bg-stone-900 px-3.5 py-2 text-[11.5px] font-medium text-white shadow-xl sm:flex" style={{ animationDelay: "1.2s" }}>
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" /> 4,9 · 2.3k avaliações
              </div>
              <div className="ed-drift relative rounded-xl border border-stone-200 bg-white/95 p-6 shadow-[0_24px_60px_-30px_rgba(28,25,23,0.3)] backdrop-blur">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-stone-900 text-white">
                    <InfinityIcon className="h-5 w-5" strokeWidth={2.2} />
                  </span>
                  <div>
                    <p className="text-[13.5px] font-semibold text-stone-950">Lovable Unlimited</p>
                    <p className="text-[11.5px] text-stone-500">Produtividade sem pausas</p>
                  </div>
                </div>
                <div className="mt-5 flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50/70 px-3 py-2.5 text-[12px] font-medium text-emerald-800">
                  <span className="live-dot h-1.5 w-1.5 rounded-full bg-emerald-600" />
                  Unlimited Engine ativa
                  <MousePointerClick className="ml-auto h-3.5 w-3.5 text-emerald-600" />
                </div>
                <div className="mt-3 space-y-2">
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-stone-100"><div className="bar-shimmer h-full w-full rounded-full bg-stone-300/60" /></div>
                  <div className="h-1.5 w-4/5 rounded-full bg-gradient-to-r from-emerald-500/70 to-emerald-500/20" />
                  <div className="h-1.5 w-3/5 rounded-full bg-stone-200" />
                </div>
                <div className="btn-shine mt-5 rounded-full bg-stone-900 py-2.5 text-center text-[12.5px] font-medium text-white">
                  Abrir painel
                </div>
                <p className="mt-3 text-center text-[10.5px] tabular-nums text-stone-400">v1.0.0 · Chrome / Brave / Edge</p>
              </div>
              <p className="mt-4 flex items-center gap-2 text-[11.5px] text-stone-400">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#c2410c]" />
                desenho fiel ao popup real, em tamanho reduzido
              </p>
            </div>
          </div>
        </div>
      </section>
      <section id="destaque" className="mx-auto max-w-6xl scroll-mt-24 px-5 pb-20 lg:pb-28">
        <Reveal>
          <article className="ad-frame group relative overflow-hidden rounded-2xl border border-stone-200 bg-white">
            <div className="grid lg:grid-cols-12">
              <div className="relative px-7 py-10 sm:px-10 sm:py-12 lg:col-span-7 lg:px-12 lg:py-14">
                <div className="flex items-center justify-between text-[11px] font-medium uppercase tracking-[0.16em] text-stone-500">
                  <span className="inline-flex items-center gap-2">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#c2410c]" />
                    Peça em destaque
                  </span>
                  <span className="tabular-nums text-stone-400">Nº 01</span>
                </div>
                <h2 className="font-editorial mt-7 max-w-[20ch] text-3xl font-light leading-[1.1] text-stone-950 sm:text-[2.6rem]">
                  Uma tarde inteira sem <span className="whitespace-nowrap">“limite atingido”.</span>
                </h2>
                <p className="mt-5 max-w-md text-[14.5px] leading-relaxed text-stone-600">
                  Quem cria no Lovable conhece a cena: você está no meio de uma ideia boa e o contador interrompe. Esta peça existe para que isso não decida o seu dia.
                </p>
                <ul className="mt-8 max-w-md divide-y divide-stone-200 border-y border-stone-200 text-[13.5px]">
                  <li className="flex items-baseline justify-between gap-4 py-3">
                    <span className="font-medium text-stone-900">Instalação em 2 minutos</span>
                    <span className="text-right text-stone-500">guia curto, sem vídeo de 40 min</span>
                  </li>
                  <li className="flex items-baseline justify-between gap-4 py-3">
                    <span className="font-medium text-stone-900">Sem conta nova</span>
                    <span className="text-right text-stone-500">funciona onde você já cria</span>
                  </li>
                  <li className="flex items-baseline justify-between gap-4 py-3">
                    <span className="font-medium text-stone-900">Pacote auditável</span>
                    <span className="text-right text-stone-500">três arquivos, nada escondido</span>
                  </li>
                </ul>
                <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                  <Link to="/download" className="btn-ink inline-flex h-11 items-center gap-2 rounded-full bg-stone-900 px-6 text-[13.5px] font-medium text-white">
                    Baixar agora — grátis
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                  <p className="text-[12.5px] text-stone-500">
                    Ativação ilimitada por <span className="font-medium text-stone-800">R$ 4/sem</span>
                  </p>
                </div>
              </div>
              <div className="ad-visual relative flex flex-col justify-between overflow-hidden border-t border-stone-200 bg-[#f6f4ef] p-8 sm:p-10 lg:col-span-5 lg:border-l lg:border-t-0">
                <span aria-hidden className="font-editorial pointer-events-none absolute -right-4 -top-8 select-none text-[11rem] font-light leading-none text-stone-900/[0.05]">∞</span>
                <div className="relative flex items-start justify-between text-[11px] uppercase tracking-[0.16em] text-stone-500">
                  <span>Vale-instalação</span>
                  <span className="tabular-nums">48 KB</span>
                </div>
                <div className="relative py-10">
                  <p className="font-editorial text-6xl font-light text-stone-950 sm:text-7xl">∞</p>
                  <p className="mt-4 text-[12px] uppercase tracking-[0.18em] text-stone-500">Unlimited Engine</p>
                  <div className="mt-6 flex items-center gap-3 border-t border-dashed border-stone-300 pt-5 text-[12.5px] text-stone-600">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-stone-300 text-[11px]">✓</span>
                    carimbo de verificação — pacote conferido
                  </div>
                </div>
                <div className="relative flex items-end justify-between border-t border-stone-300/70 pt-4 text-[11.5px] text-stone-500">
                  <span className="tabular-nums">série 1.0.0 — PT</span>
                  <span aria-hidden className="tracking-[0.3em]">· · ·</span>
                </div>
              </div>
            </div>
          </article>
        </Reveal>
        <Reveal delay={120}>
          <p className="mt-4 flex items-center justify-between text-[11.5px] text-stone-400">
            <span>Peça editorial — não é um banner. Faz parte da página.</span>
            <a href="#ideia" className="ed-link hidden text-stone-500 sm:inline">continuar lendo ↓</a>
          </p>
        </Reveal>
      </section>
      <section id="ideia" className="mx-auto max-w-6xl scroll-mt-24 px-5 pb-20 lg:pb-28">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="lg:sticky lg:top-28">
                <span className="text-[11.5px] font-medium uppercase tracking-[0.16em] text-stone-500">01 — A ideia</span>
                <span className="font-editorial mt-4 block max-w-[16ch] text-2xl font-light leading-snug text-stone-950">
                  Ferramenta pequena, tarde grande.
                </span>
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal>
              <p className="text-[16.5px] leading-[1.75] text-stone-700">
                <span className="font-editorial float-left mr-3 mt-1 text-[3.4rem] font-light leading-[0.85] text-stone-950">C</span>
                riar no Lovable é rápido até deixar de ser. A extensão nasceu de um incômodo simples: pausas no meio do fluxo quebram ideias melhores do que qualquer erro de código. Então fizemos o mínimo necessário — e fizemos bem feito.
              </p>
            </Reveal>
            <Reveal delay={100}>
              <p className="mt-6 text-[15px] leading-[1.75] text-stone-600">
                Nada de painel cheio de botões ou promessa exagerada. Um pacote leve no seu navegador, um ícone fixado na barra e um painel direto. O resto do tempo é seu — para o projeto, não para a ferramenta.
              </p>
            </Reveal>
            <Reveal delay={160}>
              <blockquote className="mt-8 border-l-2 border-stone-900 pl-5">
                <p className="font-editorial text-xl font-light italic leading-snug text-stone-900">
                  “Não parece uma ferramenta nova. Parece que tiraram um obstáculo do caminho.”
                </p>
                <cite className="mt-3 block text-[12.5px] not-italic text-stone-500">— Marina H., designer · usa desde a v0.9</cite>
              </blockquote>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-y border-stone-200 bg-[#faf9f7]">
        <div className="mx-auto grid max-w-6xl grid-cols-2 px-5 max-sm:divide-y max-sm:divide-stone-200 sm:px-5 lg:grid-cols-4 lg:divide-x lg:divide-stone-200">
          <Reveal delay={0} className="px-2 py-8 lg:px-8">
            <p className="font-editorial text-4xl font-light tabular-nums text-stone-950">2 min</p>
            <p className="mt-2 max-w-[22ch] text-[12.5px] leading-snug text-stone-500">instalação média, do download ao painel</p>
          </Reveal>
          <Reveal delay={80} className="px-2 py-8 lg:px-8">
            <p className="font-editorial text-4xl font-light tabular-nums text-stone-950">48 KB</p>
            <p className="mt-2 max-w-[22ch] text-[12.5px] leading-snug text-stone-500">pacote .zip, Manifest V3</p>
          </Reveal>
          <Reveal delay={160} className="px-2 py-8 lg:px-8">
            <p className="font-editorial text-4xl font-light tabular-nums text-stone-950">3+</p>
            <p className="mt-2 max-w-[22ch] text-[12.5px] leading-snug text-stone-500">navegadores Chromium suportados</p>
          </Reveal>
          <Reveal delay={240} className="px-2 py-8 lg:px-8">
            <p className="font-editorial text-4xl font-light tabular-nums text-stone-950">4,9</p>
            <p className="mt-2 max-w-[22ch] text-[12.5px] leading-snug text-stone-500">nota média em 2.3k avaliações</p>
          </Reveal>
        </div>
      </section>
      <section id="instalar" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <div className="lg:sticky lg:top-28">
                <p className="text-[11.5px] font-medium uppercase tracking-[0.16em] text-stone-500">02 — Instalação</p>
                <h2 className="font-editorial mt-4 max-w-[14ch] text-3xl font-light leading-[1.12] text-stone-950 sm:text-4xl">
                  Quatro gestos, nenhum manual.
                </h2>
                <p className="mt-4 max-w-xs text-[14px] leading-relaxed text-stone-600">
                  O caminho completo está na página de download. Aqui vai o resumo honesto:
                </p>
                <Link to="/download" className="group mt-6 inline-flex items-center gap-2 text-[14px] font-medium text-stone-900">
                  <span className="ed-link">Abrir página de download</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <ol className="border-t border-stone-200">
              {STEPS.map((s, i) => (
                <Reveal key={s.n} delay={i * 70}>
                  <li className="row-hover grid gap-2 border-b border-stone-200 px-2 py-6 sm:grid-cols-[auto_1fr_auto] sm:items-baseline sm:gap-6 sm:px-4">
                    <span className="font-editorial text-lg font-light tabular-nums text-stone-400">{s.n}</span>
                    <span>
                      <span className="flex items-center gap-2 text-[15.5px] font-medium text-stone-950">
                        {s.title}
                        <ArrowRight className="row-arrow h-4 w-4 text-stone-300" />
                      </span>
                      <span className="mt-1 block max-w-lg text-[13.5px] leading-relaxed text-stone-600">{s.desc}</span>
                      {s.copy && (
                        <button onClick={copyExtensions} className="mt-3 inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white px-3.5 py-1.5 font-mono text-[12px] text-stone-700 transition-colors hover:border-stone-900 hover:text-stone-950">
                          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                          {copied ? "copiado!" : "chrome://extensions"}
                        </button>
                      )}
                    </span>
                    <span className="font-mono text-[11.5px] tabular-nums text-stone-400 sm:text-right">{s.meta}</span>
                  </li>
                </Reveal>
              ))}
            </ol>
            <Reveal delay={120}>
              <p className="mt-4 text-[12px] leading-relaxed text-stone-400">
                Nota de rodapé: o navegador pede a pasta extraída, não o .zip fechado. É o erro mais comum — e o mais rápido de corrigir.
              </p>
            </Reveal>
          </div>
        </div>
      </section>
      <section className="border-y border-stone-200 bg-[#faf9f7]">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="text-[11.5px] font-medium uppercase tracking-[0.16em] text-stone-500">03 — No navegador</p>
              <h2 className="font-editorial mt-4 text-3xl font-light leading-[1.12] text-stone-950 sm:text-4xl">
                Discreta por <em className="font-normal">desenho.</em>
              </h2>
              <p className="mt-4 max-w-sm text-[14.5px] leading-relaxed text-stone-600">
                Sem janela flutuante, sem selo piscando. A extensão mora na barra do navegador e aparece só quando você chama.
              </p>
              <dl className="mt-8 border-t border-stone-200 text-[13.5px]">
                <div className="flex items-baseline justify-between gap-4 border-b border-stone-200 py-3">
                  <dt className="font-medium text-stone-900">Permissões</dt>
                  <dd className="text-right text-stone-500">apenas aba ativa e armazenamento</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 border-b border-stone-200 py-3">
                  <dt className="font-medium text-stone-900">Conteúdo</dt>
                  <dd className="text-right text-stone-500">manifest.json + popup.html + popup.js</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 border-b border-stone-200 py-3">
                  <dt className="font-medium text-stone-900">Leitura</dt>
                  <dd className="text-right text-stone-500">você pode abrir o .zip antes de instalar</dd>
                </div>
              </dl>
            </Reveal>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal delay={120}>
              <div className="overflow-hidden rounded-xl border border-stone-200 bg-white">
                <div className="flex items-center gap-2 border-b border-stone-200 bg-[#fbfaf8] px-4 py-3">
                  <span className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-stone-300" />
                    <span className="h-2.5 w-2.5 rounded-full bg-stone-300" />
                    <span className="h-2.5 w-2.5 rounded-full bg-stone-300" />
                  </span>
                  <span className="ml-2 hidden rounded-full border border-stone-200 bg-white px-3 py-1 font-mono text-[11px] text-stone-500 sm:inline">chrome://extensions</span>
                  <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-emerald-700/10 px-2.5 py-1 text-[11px] font-medium text-emerald-800">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-700" />
                    Ativada
                  </span>
                </div>
                <div className="grid gap-0 sm:grid-cols-[1fr_220px]">
                  <div className="flex items-center gap-3 border-b border-stone-200 p-5 sm:border-b-0 sm:border-r">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-stone-900 text-white">
                      <InfinityIcon className="h-5 w-5" strokeWidth={2.2} />
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-[13.5px] font-medium text-stone-950">Lovable Unlimited</p>
                      <p className="truncate text-[12px] text-stone-500">1.0.0 · ID fixado na barra</p>
                    </div>
                    <span className="ml-auto inline-flex h-6 w-11 shrink-0 items-center rounded-full bg-stone-900 px-1">
                      <span className="ml-auto h-4 w-4 rounded-full bg-white" />
                    </span>
                  </div>
                  <div className="bg-[#fbfaf8] p-5">
                    <p className="text-[11px] uppercase tracking-[0.14em] text-stone-400">Detalhes</p>
                    <p className="mt-2 font-mono text-[11px] leading-relaxed text-stone-500">manifest.json<br />popup.html<br />popup.js</p>
                  </div>
                </div>
              </div>
              <p className="mt-3 text-[11.5px] text-stone-400">fig. 02 — como a extensão aparece após instalada.</p>
            </Reveal>
          </div>
        </div>
      </section>
      <section id="faq" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <div className="lg:sticky lg:top-28">
                <p className="text-[11.5px] font-medium uppercase tracking-[0.16em] text-stone-500">04 — Dúvidas</p>
                <h2 className="font-editorial mt-4 text-3xl font-light leading-tight text-stone-950">Perguntas de quem instala.</h2>
                <p className="mt-4 max-w-xs text-[14px] leading-relaxed text-stone-600">
                  O restante — tutorial passo a passo e download — está na página dedicada.
                </p>
                <Link to="/download" className="group mt-5 inline-flex items-center gap-2 text-[14px] font-medium text-stone-900">
                  <span className="ed-link">Ir para o download</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
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

      <section className="mx-auto max-w-6xl px-5 pb-24 lg:pb-32">
        <Reveal>
          <div className="border-t border-stone-200 pt-16 text-center sm:pt-20">
            <p className="text-[11.5px] font-medium uppercase tracking-[0.16em] text-stone-400">Pronto quando você estiver</p>
            <h2 className="font-editorial mx-auto mt-5 max-w-[18ch] text-4xl font-light leading-[1.08] text-stone-950 sm:text-5xl">
              Volte a criar <em className="font-normal">hoje.</em>
            </h2>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link to="/download" className="btn-ink inline-flex h-12 items-center gap-2 rounded-full bg-stone-900 px-8 text-[14.5px] font-medium text-white">
                <Download className="h-4 w-4" />
                Baixar grátis
              </Link>
              <span className="text-[12.5px] text-stone-500">2 minutos · sem conta · cancele quando quiser</span>
            </div>
          </div>
        </Reveal>
      </section>

      <footer className="border-t border-stone-200">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 px-5 py-8 text-[12.5px] text-stone-500 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2">
            <InfinityIcon className="h-4 w-4 text-stone-700" />
            <span><span className="font-medium text-stone-800">Unlimited</span> · v1.0.0 · produto independente, sem vínculo com o Lovable.</span>
          </p>
          <nav className="flex items-center gap-5">
            <Link to="/download" className="ed-link hover:text-stone-900">Download</Link>
            <a href="#instalar" className="ed-link hover:text-stone-900">Instalação</a>
            <a href="#faq" className="ed-link hover:text-stone-900">Dúvidas</a>
          </nav>
        </div>
      </footer>
    </main>
  );
}
