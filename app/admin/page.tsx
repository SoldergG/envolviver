import type { Metadata } from "next";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getSite } from "@/lib/site";
import { Panel } from "@/components/admin/Panel";

export const metadata: Metadata = {
  title: "Administração",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const { userId } = await auth();
  if (!userId) redirect("/admin/entrar");

  const site = await getSite();
  return <Panel initial={site} />;
}
