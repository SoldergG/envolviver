import type { Metadata } from "next";
import { getSite } from "@/lib/site";
import { ProgrammePage } from "@/components/ProgrammePage";

export async function generateMetadata(): Promise<Metadata> {
  const { aec } = await getSite();
  return { title: aec.title, description: aec.lead };
}

export default async function Page() {
  const { aec } = await getSite();
  return (
    <ProgrammePage
      eyebrow="AEC"
      title={aec.title}
      lead={aec.lead}
      body={aec.body}
      activities={aec.activities}
      base="/enriquecimento-curricular"
    />
  );
}
