"use client";

import { useState, useTransition } from "react";
import type { SiteContent } from "@/lib/site";
import { resetAll, saveSection } from "@/app/admin/actions";
import { Field, ImageField, ListField } from "./Fields";

type Tab = "hero" | "servicos" | "aec" | "caf" | "sobre" | "ferias" | "noticias" | "contactos";

const TABS: { id: Tab; label: string }[] = [
  { id: "hero", label: "Início" },
  { id: "servicos", label: "Serviços" },
  { id: "aec", label: "AEC" },
  { id: "caf", label: "CAF" },
  { id: "sobre", label: "A Envolviver" },
  { id: "ferias", label: "Férias" },
  { id: "noticias", label: "Notícias" },
  { id: "contactos", label: "Contactos" },
];

export function Panel({ initial }: { initial: SiteContent }) {
  const [site, setSite] = useState<SiteContent>(initial);
  const [tab, setTab] = useState<Tab>("hero");
  const [note, setNote] = useState<{ ok: boolean; message: string } | null>(null);
  const [pending, start] = useTransition();

  function patch<K extends keyof SiteContent>(key: K, value: SiteContent[K]) {
    setSite((s) => ({ ...s, [key]: value }));
    setNote(null);
  }

  function save(section: keyof SiteContent) {
    start(async () => setNote(await saveSection(section, site[section])));
  }

  /* Cada separador grava a sua própria secção do documento. */
  const sectionOf: Record<Tab, keyof SiteContent> = {
    hero: "hero", servicos: "services", aec: "aec", caf: "caf",
    sobre: "about", ferias: "ferias", noticias: "posts", contactos: "contacts",
  };

  return (
    <div className="shell py-10">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-title">Conteúdo do site</h1>
          <p className="muted mt-1 text-[0.9375rem]">
            As alterações ficam publicadas assim que gravar.
          </p>
        </div>
        <a href="/" target="_blank" rel="noreferrer" className="btn btn-ghost text-[0.9375rem]">
          Ver o site
        </a>
      </header>

      <nav aria-label="Secções" className="mt-8 flex flex-wrap gap-1 border-b rule pb-3">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => { setTab(t.id); setNote(null); }}
            aria-current={tab === t.id ? "true" : undefined}
            className="min-h-[40px] rounded-lg px-3 text-[0.9375rem] transition-colors"
            style={
              tab === t.id
                ? { background: "var(--fg)", color: "var(--shell)" }
                : { opacity: 0.66 }
            }
          >
            {t.label}
          </button>
        ))}
      </nav>

      <div className="mt-8 max-w-2xl space-y-6">
        {tab === "hero" && (
          <>
            <Field label="Sobretítulo" value={site.hero.eyebrow}
              onChange={(v) => patch("hero", { ...site.hero, eyebrow: v })} />
            <Field label="Título — 1.ª linha" value={site.hero.titleLine1}
              onChange={(v) => patch("hero", { ...site.hero, titleLine1: v })} />
            <Field label="Título — 2.ª linha" value={site.hero.titleLine2}
              onChange={(v) => patch("hero", { ...site.hero, titleLine2: v })} />
            <Field label="Texto de entrada" multiline value={site.hero.lead}
              onChange={(v) => patch("hero", { ...site.hero, lead: v })} />
            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="Botão principal" value={site.hero.ctaPrimary}
                onChange={(v) => patch("hero", { ...site.hero, ctaPrimary: v })} />
              <Field label="Botão secundário" value={site.hero.ctaSecondary}
                onChange={(v) => patch("hero", { ...site.hero, ctaSecondary: v })} />
            </div>
            <ImageField label="Imagem principal" value={site.hero.image}
              onChange={(v) => patch("hero", { ...site.hero, image: v })} />
          </>
        )}

        {tab === "servicos" && (
          <>
            <Field label="Título da secção" multiline value={site.servicesHeading}
              onChange={(v) => patch("servicesHeading", v)} />
            {site.services.map((s, i) => (
              <fieldset key={s.key} className="rounded-xl border rule p-5">
                <legend className="px-1.5 text-[0.8125rem] font-semibold">{s.eyebrow}</legend>
                <div className="space-y-5">
                  <Field label="Título" value={s.title}
                    onChange={(v) => patch("services", site.services.map((x, k) => k === i ? { ...x, title: v } : x))} />
                  <Field label="Descrição" multiline value={s.blurb}
                    onChange={(v) => patch("services", site.services.map((x, k) => k === i ? { ...x, blurb: v } : x))} />
                </div>
              </fieldset>
            ))}
            <p className="muted text-[0.8125rem]">
              Nota: o título da secção grava-se no separador Início.
            </p>
          </>
        )}

        {(tab === "aec" || tab === "caf") && (() => {
          const key = tab === "aec" ? "aec" : "caf";
          const prog = site[key];
          const upd = (v: Partial<typeof prog>) => patch(key, { ...prog, ...v });
          return (
            <>
              <Field label="Título" value={prog.title} onChange={(v) => upd({ title: v })} />
              <Field label="Texto de entrada" multiline value={prog.lead} onChange={(v) => upd({ lead: v })} />
              <ListField label="Parágrafos" items={prog.body} rows={4}
                onChange={(v) => upd({ body: v })} />

              {prog.activities.map((a, i) => (
                <fieldset key={a.slug} className="rounded-xl border rule p-5">
                  <legend className="flex items-center gap-2 px-1.5 text-[0.8125rem] font-semibold">
                    <span className="h-2 w-2 rounded-full" style={{ background: a.color }} />
                    {a.name}
                  </legend>
                  <div className="space-y-5">
                    <Field label="Nome" value={a.name}
                      onChange={(v) => upd({ activities: prog.activities.map((x, k) => k === i ? { ...x, name: v } : x) })} />
                    <Field label="Resumo" multiline value={a.summary}
                      onChange={(v) => upd({ activities: prog.activities.map((x, k) => k === i ? { ...x, summary: v } : x) })} />
                    <ListField label="Objetivos" items={a.bullets ?? []}
                      onChange={(v) => upd({ activities: prog.activities.map((x, k) => k === i ? { ...x, bullets: v } : x) })} />
                    <ListField label="Parágrafos" items={a.paragraphs ?? []} rows={4}
                      onChange={(v) => upd({ activities: prog.activities.map((x, k) => k === i ? { ...x, paragraphs: v } : x) })} />
                    <ImageField label="Fotografia" value={a.photo}
                      onChange={(v) => upd({ activities: prog.activities.map((x, k) => k === i ? { ...x, photo: v } : x) })} />
                  </div>
                </fieldset>
              ))}
            </>
          );
        })()}

        {tab === "sobre" && (
          <>
            <Field label="Introdução" multiline value={site.about.intro}
              onChange={(v) => patch("about", { ...site.about, intro: v })} />
            {site.about.sections.map((sec, i) => (
              <fieldset key={sec.slug} className="rounded-xl border rule p-5">
                <legend className="px-1.5 text-[0.8125rem] font-semibold">{sec.title}</legend>
                <div className="space-y-5">
                  <Field label="Título" value={sec.title}
                    onChange={(v) => patch("about", { ...site.about, sections: site.about.sections.map((x, k) => k === i ? { ...x, title: v } : x) })} />
                  <ListField label="Parágrafos" items={sec.body} rows={4}
                    onChange={(v) => patch("about", { ...site.about, sections: site.about.sections.map((x, k) => k === i ? { ...x, body: v } : x) })} />
                  {sec.list && (
                    <ListField label="Pontos" items={sec.list}
                      onChange={(v) => patch("about", { ...site.about, sections: site.about.sections.map((x, k) => k === i ? { ...x, list: v } : x) })} />
                  )}
                </div>
              </fieldset>
            ))}
          </>
        )}

        {tab === "ferias" && (
          <>
            <Field label="Título" value={site.ferias.title}
              onChange={(v) => patch("ferias", { ...site.ferias, title: v })} />
            <Field label="Texto de entrada" multiline value={site.ferias.lead}
              onChange={(v) => patch("ferias", { ...site.ferias, lead: v })} />
            <ListField label="Parágrafos" items={site.ferias.body} rows={4}
              onChange={(v) => patch("ferias", { ...site.ferias, body: v })} />
          </>
        )}

        {tab === "noticias" && (
          <>
            <button
              type="button"
              onClick={() => patch("posts", [
                { slug: `noticia-${Date.now()}`, title: "Nova notícia", date: null,
                  dateLabel: new Date().toLocaleDateString("pt-PT", { day: "numeric", month: "long", year: "numeric" }),
                  excerpt: "", body: [""] },
                ...site.posts,
              ])}
              className="rounded-lg border rule px-3 py-2 text-[0.8125rem] transition-colors hover:bg-[var(--shell-2)]"
            >
              Adicionar notícia
            </button>
            {site.posts.map((p, i) => (
              <fieldset key={p.slug} className="rounded-xl border rule p-5">
                <legend className="px-1.5 text-[0.8125rem] font-semibold">{p.title}</legend>
                <div className="space-y-5">
                  <Field label="Título" value={p.title}
                    onChange={(v) => patch("posts", site.posts.map((x, k) => k === i ? { ...x, title: v } : x))} />
                  <Field label="Data (como aparece)" value={p.dateLabel}
                    onChange={(v) => patch("posts", site.posts.map((x, k) => k === i ? { ...x, dateLabel: v } : x))} />
                  <Field label="Resumo" multiline value={p.excerpt}
                    onChange={(v) => patch("posts", site.posts.map((x, k) => k === i ? { ...x, excerpt: v } : x))} />
                  <ListField label="Parágrafos" items={p.body} rows={4}
                    onChange={(v) => patch("posts", site.posts.map((x, k) => k === i ? { ...x, body: v } : x))} />
                  <Field label="Endereço (slug)" hint="Muda o URL da notícia." value={p.slug}
                    onChange={(v) => patch("posts", site.posts.map((x, k) => k === i ? { ...x, slug: v } : x))} />
                  <button
                    type="button"
                    onClick={() => patch("posts", site.posts.filter((_, k) => k !== i))}
                    className="text-[0.8125rem] text-[var(--color-brand-red)] underline underline-offset-2"
                  >
                    Apagar esta notícia
                  </button>
                </div>
              </fieldset>
            ))}
          </>
        )}

        {tab === "contactos" && (
          <>
            <ListField label="Morada" items={site.contacts.address} rows={1}
              onChange={(v) => patch("contacts", { ...site.contacts, address: v })} />
            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="Telefone" value={site.contacts.phone}
                onChange={(v) => patch("contacts", { ...site.contacts, phone: v })} />
              <Field label="Telefone (link tel:)" hint="Só dígitos e +." value={site.contacts.phoneHref}
                onChange={(v) => patch("contacts", { ...site.contacts, phoneHref: v })} />
            </div>
            <Field label="Email" value={site.contacts.email}
              onChange={(v) => patch("contacts", { ...site.contacts, email: v })} />
            {site.contacts.transport.map((t, i) => (
              <div key={t.mode} className="grid gap-4 sm:grid-cols-[10rem_1fr]">
                <Field label="Meio" value={t.mode}
                  onChange={(v) => patch("contacts", { ...site.contacts, transport: site.contacts.transport.map((x, k) => k === i ? { ...x, mode: v } : x) })} />
                <Field label="Detalhe" value={t.detail}
                  onChange={(v) => patch("contacts", { ...site.contacts, transport: site.contacts.transport.map((x, k) => k === i ? { ...x, detail: v } : x) })} />
              </div>
            ))}
          </>
        )}
      </div>

      {/* Barra de gravação — fixa ao fundo */}
      <div className="material-bar sticky bottom-0 z-10 -mx-6 mt-10 flex flex-wrap items-center gap-4 border-t rule px-6 py-4 backdrop-blur-xl md:-mx-10 md:px-10">
        <button
          type="button"
          onClick={() => save(sectionOf[tab])}
          disabled={pending}
          className="btn btn-fill disabled:opacity-50"
        >
          {pending ? "A guardar…" : "Guardar alterações"}
        </button>
        {note && (
          <p
            role="status"
            className="text-[0.9375rem]"
            style={{ color: note.ok ? "var(--color-brand-teal)" : "var(--color-brand-red)" }}
          >
            {note.message}
          </p>
        )}
        <button
          type="button"
          onClick={() => {
            if (confirm("Repor todo o conteúdo do site para os valores originais?")) {
              start(async () => {
                const r = await resetAll();
                setNote(r);
                if (r.ok) window.location.reload();
              });
            }
          }}
          disabled={pending}
          className="muted ml-auto text-[0.8125rem] underline underline-offset-2 hover:text-[var(--fg)] disabled:opacity-50"
        >
          Repor tudo
        </button>
      </div>
    </div>
  );
}
