"use server";

import { auth } from "@clerk/nextjs/server";
import { put } from "@vercel/blob";
import { revalidatePath, revalidateTag } from "next/cache";
import { CONTENT_KEY, CONTENT_TAG, defaults, getSite, type SiteContent } from "@/lib/site";

/** Toda a escrita passa por aqui — sem sessão Clerk, nada é gravado. */
async function requireAdmin() {
  const { userId } = await auth();
  if (!userId) throw new Error("Sem sessão. Entre em /admin/entrar.");
  return userId;
}

async function persist(next: SiteContent) {
  await put(CONTENT_KEY, JSON.stringify(next, null, 2), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
  // O documento mudou: invalida a cache e volta a gerar as páginas.
  revalidateTag(CONTENT_TAG, "max");
  revalidatePath("/", "layout");
}

export type ActionResult = { ok: boolean; message: string };

/** Grava uma secção inteira do documento. */
export async function saveSection(
  section: keyof SiteContent,
  value: unknown,
): Promise<ActionResult> {
  try {
    await requireAdmin();
    const current = await getSite();
    await persist({ ...current, [section]: value } as SiteContent);
    return { ok: true, message: "Guardado." };
  } catch (err) {
    console.error("[admin] falha a guardar", section, err);
    return {
      ok: false,
      message: err instanceof Error ? err.message : "Não foi possível guardar.",
    };
  }
}

/** Repõe tudo como estava no site original. */
export async function resetAll(): Promise<ActionResult> {
  try {
    await requireAdmin();
    await persist(defaults);
    return { ok: true, message: "Conteúdo reposto para os valores originais." };
  } catch (err) {
    console.error("[admin] falha a repor", err);
    return { ok: false, message: "Não foi possível repor." };
  }
}
