import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: CanvasPage,
  head: () => ({
    meta: [
      { title: "Canvas Limpa" },
      { name: "description", content: "Tela em branco limpa e minimalista para criação de layouts." },
    ],
  }),
});

function CanvasPage() {
  return (
    <main className="min-h-screen w-full bg-[#f8fafc]">
      {/* Subtle dot grid for alignment */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, #0f172a 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
    </main>
  );
}
