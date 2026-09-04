import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { aec as aecDefaults } from "@/lib/content";
import { getSite } from "@/lib/site";
import { ActivityDetail } from "@/components/ActivityDetail";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return aecDefaults.activities.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { aec } = await getSite();
  const a = aec.activities.find((x) => x.slug === slug);
  if (!a) return {};
  return { title: a.name, description: a.summary };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const { aec } = await getSite();
  const activity = aec.activities.find((a) => a.slug === slug);
  if (!activity) notFound();

  return (
    <ActivityDetail
      activity={activity}
      programme={aec.short}
      programmeHref="/enriquecimento-curricular"
      siblings={aec.activities.filter((a) => a.slug !== slug)}
    />
  );
}
