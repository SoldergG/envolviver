import type { Metadata } from "next";
import { getSite } from "@/lib/site";
import { ProgrammePage } from "@/components/ProgrammePage";

export async function generateMetadata(): Promise<Metadata> {
  const { caf } = await getSite();
  return { title: caf.title, description: caf.lead };
}

export default async function Page() {
  const { caf } = await getSite();
  return (
    <ProgrammePage
      eyebrow="CAF"
      title={caf.title}
      lead={caf.lead}
      body={caf.body}
      activities={caf.activities}
      base="/apoio-a-familia"
    />
  );
}
