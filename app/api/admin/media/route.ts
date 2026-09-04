import { auth } from "@clerk/nextjs/server";
import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { clerkConfigured } from "@/lib/auth-config";

const MAX_BYTES = 8 * 1024 * 1024; // 8 MB
const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif"];

export async function POST(request: Request) {
  if (!clerkConfigured) {
    return NextResponse.json({ error: "Autenticação não configurada." }, { status: 503 });
  }
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Sem autorização." }, { status: 401 });
  }

  const form = await request.formData();
  const file = form.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Nenhum ficheiro recebido." }, { status: 400 });
  }
  if (!ALLOWED.includes(file.type)) {
    return NextResponse.json(
      { error: `Formato não aceite (${file.type || "desconhecido"}). Use JPEG, PNG, WebP, AVIF ou GIF.` },
      { status: 415 },
    );
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: `Ficheiro demasiado grande (${(file.size / 1024 / 1024).toFixed(1)} MB). Máximo 8 MB.` },
      { status: 413 },
    );
  }

  try {
    const safe = file.name.toLowerCase().replace(/[^a-z0-9.\-]+/g, "-");
    const blob = await put(`media/${Date.now()}-${safe}`, file, {
      access: "public",
      contentType: file.type,
    });
    return NextResponse.json({ url: blob.url });
  } catch (err) {
    console.error("[admin] falha no upload", err);
    return NextResponse.json({ error: "Falha no upload." }, { status: 500 });
  }
}
