import Image from "next/image";
import Link from "next/link";
import { getSite } from "@/lib/site";
import { onColor } from "@/lib/color";
import { Reveal } from "@/components/Reveal";
import { Arrow } from "@/components/Arrow";
import { ActivityCard } from "@/components/ActivityCard";
import { SectionHead } from "@/components/Section";

export default async function Home() {
  const site = await getSite();
  const { hero, services, aec, caf, posts, servicesHeading } = site;

  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <section className="relative overflow-hidden">
        <div className="shell pb-20 pt-20 md:pb-28 md:pt-28">
          <Reveal>
            <p className="muted text-[0.9375rem] font-medium tracking-[-0.01em]">
              {hero.eyebrow}
            </p>
            <h1 className="text-hero balance mt-5 max-w-[16ch]">
              {hero.titleLine1}
              <br />
              {hero.titleLine2}
            </h1>
            <p className="muted text-lead pretty mt-7 max-w-[46ch]">
              {hero.lead}
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/contactos" className="btn btn-fill">
                {hero.ctaPrimary}
              </Link>
              <Link href="/a-envolviver" className="btn btn-ghost">
                {hero.ctaSecondary}
              </Link>
            </div>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <div className="shell">
            <div className="relative aspect-[16/7] overflow-hidden rounded-[28px] surface-2">
              <Image
                src={hero.image}
                alt="Crianças em atividade escolar"
                fill
                priority
                sizes="(max-width: 1120px) 100vw, 1120px"
                className="object-cover"
              />
            </div>
          </div>
        </Reveal>
      </section>

      {/* ---------------- Os três serviços ---------------- */}
      <section className="stack">
        <div className="shell">
          <Reveal>
            <SectionHead
              eyebrow="O que fazemos"
              title={servicesHeading}
            />
          </Reveal>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.key} delay={i * 90}>
                <Link
                  href={s.href}
                  className="card group flex h-full flex-col justify-between p-8"
                >
                  <div>
                    <span
                      className="inline-flex h-7 items-center rounded-full px-3 text-[0.75rem] font-semibold uppercase tracking-[0.04em]"
                      style={{ background: s.color, color: onColor(s.color) }}
                    >
                      {s.eyebrow}
                    </span>
                    <h3 className="text-title mt-6">{s.title}</h3>
                    <p className="muted pretty mt-3 text-[0.9375rem] leading-relaxed">
                      {s.blurb}
                    </p>
                  </div>
                  <span className="link-arrow mt-8 text-[0.9375rem]">
                    Ver {s.count > 0 ? `as ${s.count} atividades` : "mais"}
                    <Arrow />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Enriquecimento curricular ---------------- */}
      <section className="surface-2 stack">
        <div className="shell">
          <Reveal>
            <SectionHead
              eyebrow="AEC"
              title={aec.title}
              lead={aec.lead}
            />
          </Reveal>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {aec.activities.map((a, i) => (
              <Reveal key={a.slug} delay={(i % 3) * 80}>
                <ActivityCard activity={a} base="/enriquecimento-curricular" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Apoio à família ---------------- */}
      <section className="stack">
        <div className="shell">
          <Reveal>
            <SectionHead eyebrow="CAF" title={caf.title} lead={caf.lead} />
          </Reveal>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {caf.activities.map((a, i) => (
              <Reveal key={a.slug} delay={(i % 3) * 80}>
                <ActivityCard activity={a} base="/apoio-a-familia" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Notícias ---------------- */}
      <section className="surface-2 stack">
        <div className="shell">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionHead eyebrow="Novidades" title="Notícias" />
              <Link href="/noticias" className="link-arrow text-[0.9375rem]">
                Ver todas <Arrow />
              </Link>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-px overflow-hidden rounded-[22px] border rule bg-[var(--rule)] md:grid-cols-3">
            {posts.slice(0, 3).map((p, i) => (
              <Reveal key={p.slug} delay={i * 80} className="h-full">
                <Link
                  href={`/noticias/${p.slug}`}
                  className="group flex h-full flex-col p-8 transition-colors surface hover:bg-[var(--shell-2)]"
                >
                  <time
                    className="muted text-[0.8125rem]"
                    dateTime={p.date ?? undefined}
                  >
                    {p.dateLabel}
                  </time>
                  <h3 className="text-title mt-3">{p.title}</h3>
                  <p className="muted pretty mt-3 flex-1 text-[0.9375rem] leading-relaxed">
                    {p.excerpt}
                  </p>
                  <span className="link-arrow mt-6 text-[0.9375rem]">
                    Ler <Arrow />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Chamada final ---------------- */}
      <section className="stack">
        <div className="shell">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-display balance">
                Uma proposta feita à medida da sua escola.
              </h2>
              <p className="muted text-lead pretty mt-6">
                Diga-nos o contexto e a nossa equipa faz um estudo prévio. Em
                poucos dias apresentamos uma proposta.
              </p>
              <div className="mt-9 flex flex-wrap justify-center gap-3">
                <Link href="/contactos" className="btn btn-fill">
                  Falar connosco
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
