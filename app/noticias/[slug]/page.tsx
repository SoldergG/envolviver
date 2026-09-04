import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts as postsDefaults } from "@/lib/content";
import { getSite } from "@/lib/site";
import { Reveal } from "@/components/Reveal";
import { Arrow } from "@/components/Arrow";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return postsDefaults.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { posts } = await getSite();
  const p = posts.find((x) => x.slug === slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.excerpt,
    openGraph: {
      type: "article",
      title: p.title,
      description: p.excerpt,
      publishedTime: p.date ?? undefined,
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const { posts } = await getSite();
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const others = posts.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      <article className="shell pb-20 pt-10 md:pt-16">
        <Reveal>
          <Link href="/noticias" className="muted text-[0.8125rem] transition-colors hover:text-[var(--fg)]">
            ← Notícias
          </Link>

          <header className="mt-8 max-w-[24ch]">
            <time
              className="muted text-[0.9375rem]"
              dateTime={post.date ?? undefined}
            >
              {post.dateLabel}
            </time>
            <h1 className="text-hero balance mt-3">{post.title}</h1>
          </header>

          <div className="text-lead pretty mt-10 max-w-[64ch] space-y-6">
            {post.body.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
        </Reveal>
      </article>

      {others.length > 0 && (
        <section className="border-t rule surface-2 stack">
          <div className="shell">
            <h2 className="text-title">Outras notícias</h2>
            <ul className="mt-8 grid gap-px overflow-hidden rounded-[22px] border rule bg-[var(--rule)] md:grid-cols-3">
              {others.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/noticias/${p.slug}`}
                    className="flex h-full flex-col p-6 transition-colors surface hover:bg-[var(--shell-2)]"
                  >
                    <time className="muted text-[0.8125rem]" dateTime={p.date ?? undefined}>
                      {p.dateLabel}
                    </time>
                    <span className="mt-2 flex-1 font-medium leading-snug">{p.title}</span>
                    <Arrow className="muted mt-4" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
