import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { caf as cafDefaults } from "@/lib/content";
import { getSite } from "@/lib/site";
import { ActivityDetail } from "@/components/ActivityDetail";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return cafDefaults.activities.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { caf } = await getSite();
  const a = caf.activities.find((x) => x.slug === slug);
  if (!a) return {};
  return { title: a.name, description: a.summary };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const { caf } = await getSite();
  const activity = caf.activities.find((a) => a.slug === slug);
  if (!activity) notFound();

  return (
    <ActivityDetail
      activity={activity}
      programme={caf.short}
      programmeHref="/apoio-a-familia"
      siblings={caf.activities.filter((a) => a.slug !== slug)}
    />
  );
}
