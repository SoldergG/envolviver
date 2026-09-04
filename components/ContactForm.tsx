"use client";

import { useState } from "react";
import { Arrow } from "./Arrow";

/**
 * O original usava um CAPTCHA Telerik servido por WebResource.axd,
 * que não é reproduzível nem acessível. Este formulário compõe uma
 * mensagem e abre o cliente de email — funciona sem backend.
 * Para envio no servidor, ligar a um endpoint (Resend, Supabase, etc.).
 */
export function ContactForm({ email }: { email: string }) {
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const subject = `Pedido de proposta — ${data.get("organizacao") || data.get("nome")}`;
    const body = [
      `Nome: ${data.get("nome")}`,
      `Organização: ${data.get("organizacao") || "—"}`,
      `Email: ${data.get("email")}`,
      `Telefone: ${data.get("telefone") || "—"}`,
      "",
      String(data.get("mensagem") ?? ""),
    ].join("\n");

    window.location.href = `mailto:${email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  const field =
    "mt-2 w-full rounded-xl border rule bg-transparent px-4 py-3 text-[1.0625rem] outline-none transition-colors focus:border-[var(--color-brand-teal)]";

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="nome" className="text-[0.9375rem] font-medium">
            Nome <span className="muted font-normal">(obrigatório)</span>
          </label>
          <input id="nome" name="nome" type="text" required autoComplete="name" className={field} />
        </div>
        <div>
          <label htmlFor="organizacao" className="text-[0.9375rem] font-medium">
            Escola ou organização
          </label>
          <input id="organizacao" name="organizacao" type="text" autoComplete="organization" className={field} />
        </div>
        <div>
          <label htmlFor="email" className="text-[0.9375rem] font-medium">
            Email <span className="muted font-normal">(obrigatório)</span>
          </label>
          <input id="email" name="email" type="email" required autoComplete="email" className={field} />
        </div>
        <div>
          <label htmlFor="telefone" className="text-[0.9375rem] font-medium">
            Telefone
          </label>
          <input id="telefone" name="telefone" type="tel" autoComplete="tel" className={field} />
        </div>
      </div>

      <div>
        <label htmlFor="mensagem" className="text-[0.9375rem] font-medium">
          Mensagem <span className="muted font-normal">(obrigatório)</span>
        </label>
        <textarea
          id="mensagem"
          name="mensagem"
          required
          rows={6}
          placeholder="Diga-nos o contexto: nível de ensino, número de crianças, que serviço procura."
          className={`${field} resize-y`}
        />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" className="btn btn-fill">
          Enviar pedido <Arrow />
        </button>
        <p className="muted text-[0.8125rem]" role="status">
          {sent
            ? "Abrimos o seu cliente de email com a mensagem pronta."
            : "Abre o seu cliente de email com a mensagem preenchida."}
        </p>
      </div>
    </form>
  );
}
