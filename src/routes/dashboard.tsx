import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { User } from "@/types/auth";
import { getCurrentUser, setCurrentUser } from "@/utils/storage";
import { Dashboard } from "@/components/Dashboard";

export const Route = createFileRoute("/dashboard")({
  component: DashboardPage,
  head: () => ({
    meta: [
      { title: "Dashboard - Canvas Lovable" },
      { name: "description", content: "Painel da sua conta." },
    ],
  }),
});

function DashboardPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      void navigate({ to: "/login" });
    } else {
      setUser(currentUser);
    }
    setIsLoading(false);
  }, [navigate]);

  const handleLogout = () => {
    setCurrentUser(null);
    setUser(null);
    void navigate({ to: "/login" });
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#05070d] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </main>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#05070d] flex items-center justify-center p-4">
      <Dashboard user={user} onLogout={handleLogout} />
    </main>
  );
}
