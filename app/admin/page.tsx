import type { Metadata } from "next";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getSite } from "@/lib/site";
import { clerkConfigured } from "@/lib/auth-config";
import { Panel } from "@/components/admin/Panel";
import { SetupNotice } from "@/components/admin/SetupNotice";

export const metadata: Metadata = {
  title: "Administração",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  // Falha fechada: sem autenticação configurada, ninguém edita nada.
  if (!clerkConfigured) return <SetupNotice />;

  const { userId } = await auth();
  if (!userId) redirect("/admin/entrar");

  const site = await getSite();
  return <Panel initial={site} />;
}
