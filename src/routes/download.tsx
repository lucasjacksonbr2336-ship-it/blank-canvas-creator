import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Puzzle } from "lucide-react";

export const Route = createFileRoute("/download")({
  component: DownloadPage,
  head: () => ({
    meta: [
      { title: "Download Extension | Minimal Starter" },
      { name: "description", content: "Download the Minimal Starter browser extension." },
      { property: "og:title", content: "Download Extension | Minimal Starter" },
      { property: "og:description", content: "Download the Minimal Starter browser extension." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function DownloadPage() {
  const handleDownload = async () => {
    try {
      const response = await fetch("/minimal-starter-extension.zip");
      if (!response.ok) {
        throw new Error(`Download failed: ${response.status}`);
      }
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "minimal-starter-extension.zip";
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      alert(error instanceof Error ? error.message : "Download failed");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-6">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
            <Puzzle className="h-8 w-8 text-primary" />
          </div>
          <h1 className="mt-6 text-3xl font-semibold tracking-tight text-foreground">
            Minimal Starter Extension
          </h1>
          <p className="mt-2 text-muted-foreground">
            A clean browser extension that matches your minimal starter app.
          </p>
        </div>

        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <Button onClick={handleDownload} size="lg" className="w-full">
            <Download className="h-4 w-4" />
            Download extension
          </Button>

          <div className="mt-6 space-y-4">
            <h2 className="text-sm font-semibold text-foreground">How to install</h2>
            <ol className="space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-3">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium text-secondary-foreground">
                  1
                </span>
                Download and unzip the file.
              </li>
              <li className="flex gap-3">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium text-secondary-foreground">
                  2
                </span>
                Open <code className="rounded bg-muted px-1 py-0.5 text-foreground">chrome://extensions</code>.
              </li>
              <li className="flex gap-3">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium text-secondary-foreground">
                  3
                </span>
                Enable Developer mode (top-right toggle).
              </li>
              <li className="flex gap-3">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium text-secondary-foreground">
                  4
                </span>
                Click Load unpacked and select the unzipped folder.
              </li>
            </ol>
          </div>
        </div>

        <Button variant="ghost" asChild className="w-full">
          <Link to="/">
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
        </Button>
      </div>
    </main>
  );
}
