import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Minimal Starter" },
      { name: "description", content: "A clean, minimal starting point." },
      { property: "og:title", content: "Minimal Starter" },
      { property: "og:description", content: "A clean, minimal starting point." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function Index() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background p-6">
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Button>Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="gradient">Gradient</Button>
        <Button variant="ghost">Ghost</Button>
      </div>
      <p className="text-sm text-muted-foreground">Passe o mouse e clique nos botões para ver os efeitos.</p>
    </main>
  );
}
