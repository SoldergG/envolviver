import type { Metadata } from "next";
import Link from "next/link";
import { getSite } from "@/lib/site";
import { Reveal } from "@/components/Reveal";
import { Arrow } from "@/components/Arrow";

export const metadata: Metadata = {
  title: "Notícias",
  description: "Novidades, recrutamento e inscrições da Envolviver.",
};

export default async function Page() {
  const { posts } = await getSite();
  return (
    <>
      <section className="shell pb-14 pt-16 md:pt-24">
        <Reveal>
          <h1 className="text-hero balance max-w-[14ch]">Notícias</h1>
          <p className="muted text-lead pretty mt-6 max-w-[46ch]">
            Recrutamento, inscrições e novidades dos nossos programas.
          </p>
        </Reveal>
      </section>

      <section className="shell pb-24 md:pb-32">
        <ul className="border-t rule">
          {posts.map((p, i) => (
            <li key={p.slug} className="border-b rule">
              <Reveal delay={i * 60}>
                <Link
                  href={`/noticias/${p.slug}`}
                  className="group grid gap-3 py-10 transition-opacity hover:opacity-70 md:grid-cols-[minmax(0,16ch)_1fr] md:gap-12"
                >
                  <time
                    className="muted text-[0.9375rem]"
                    dateTime={p.date ?? undefined}
                  >
                    {p.dateLabel}
                  </time>
                  <div>
                    <h2 className="text-title balance">{p.title}</h2>
                    <p className="muted pretty mt-3 max-w-[62ch] text-[1.0625rem] leading-relaxed">
                      {p.excerpt}
                    </p>
                    <span className="link-arrow mt-5 text-[0.9375rem]">
                      Ler <Arrow />
                    </span>
                  </div>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
