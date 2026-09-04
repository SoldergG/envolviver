"use client";

import { useRef, useState } from "react";

const base =
  "w-full rounded-xl border rule bg-transparent px-3.5 py-2.5 text-[0.9375rem] outline-none transition-colors focus:border-[var(--color-brand-teal)]";

export function Field({
  label, value, onChange, hint, multiline, rows = 3,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  hint?: string;
  multiline?: boolean;
  rows?: number;
}) {
  const id = label.toLowerCase().replace(/\W+/g, "-");
  return (
    <div>
      <label htmlFor={id} className="text-[0.8125rem] font-medium">
        {label}
      </label>
      {hint && <p className="muted mt-0.5 text-[0.75rem]">{hint}</p>}
      {multiline ? (
        <textarea
          id={id} rows={rows} value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${base} mt-2 resize-y leading-relaxed`}
        />
      ) : (
        <input
          id={id} type="text" value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${base} mt-2`}
        />
      )}
    </div>
  );
}

/** Lista de linhas de texto — parágrafos, bullets, linhas de morada. */
export function ListField({
  label, items, onChange, hint, rows = 2,
}: {
  label: string;
  items: string[];
  onChange: (v: string[]) => void;
  hint?: string;
  rows?: number;
}) {
  const set = (i: number, v: string) =>
    onChange(items.map((it, k) => (k === i ? v : it)));

  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <span className="text-[0.8125rem] font-medium">{label}</span>
        <button
          type="button"
          onClick={() => onChange([...items, ""])}
          className="muted text-[0.8125rem] underline underline-offset-2 hover:text-[var(--fg)]"
        >
          Adicionar
        </button>
      </div>
      {hint && <p className="muted mt-0.5 text-[0.75rem]">{hint}</p>}

      <div className="mt-2 space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex gap-2">
            <textarea
              rows={rows} value={item}
              onChange={(e) => set(i, e.target.value)}
              className={`${base} resize-y leading-relaxed`}
              aria-label={`${label} ${i + 1}`}
            />
            <button
              type="button"
              onClick={() => onChange(items.filter((_, k) => k !== i))}
              aria-label={`Remover ${label} ${i + 1}`}
              className="muted shrink-0 self-start rounded-lg border rule px-2.5 py-2.5 text-[0.8125rem] transition-colors hover:text-[var(--fg)]"
            >
              ✕
            </button>
          </div>
        ))}
        {items.length === 0 && (
          <p className="muted text-[0.8125rem]">Vazio.</p>
        )}
      </div>
    </div>
  );
}

/** Campo de imagem com upload direto para o Vercel Blob. */
export function ImageField({
  label, value, onChange,
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
}) {
  const input = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function upload(file: File) {
    setBusy(true);
    setError(null);
    try {
      const body = new FormData();
      body.append("file", file);
      const res = await fetch("/api/admin/media", { method: "POST", body });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Falha no upload.");
      onChange(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha no upload.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <span className="text-[0.8125rem] font-medium">{label}</span>
      <div className="mt-2 flex items-start gap-4">
        <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-lg border rule surface-2">
          {value && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={value} alt="" className="h-full w-full object-cover" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <input
            ref={input} type="file" accept="image/*" className="sr-only"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) upload(f);
              e.target.value = "";
            }}
          />
          <button
            type="button"
            onClick={() => input.current?.click()}
            disabled={busy}
            className="rounded-lg border rule px-3 py-2 text-[0.8125rem] transition-colors hover:bg-[var(--shell-2)] disabled:opacity-50"
          >
            {busy ? "A enviar…" : "Escolher imagem"}
          </button>
          <input
            type="text" value={value}
            onChange={(e) => onChange(e.target.value)}
            aria-label={`${label} — caminho`}
            className={`${base} mt-2 text-[0.8125rem]`}
          />
          {error && (
            <p className="mt-2 text-[0.8125rem] text-[var(--color-brand-red)]" role="alert">
              {error}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
