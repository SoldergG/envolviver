import "server-only";
import { list } from "@vercel/blob";
import { unstable_cache } from "next/cache";
import {
  aec, caf, about, contacts, ferias, posts, services, brand,
} from "./content";

/**
 * Conteúdo do site: os valores de `lib/content.ts` são o ponto de
 * partida, e o painel /admin escreve um documento em Vercel Blob que
 * sobrepõe o que foi editado. Se o Blob falhar ou ainda não existir,
 * o site serve os valores originais — nunca fica em branco.
 */

export const CONTENT_KEY = "content.json";
export const CONTENT_TAG = "site-content";

export type SiteContent = {
  hero: {
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    lead: string;
    ctaPrimary: string;
    ctaSecondary: string;
    image: string;
  };
  servicesHeading: string;
  services: typeof services;
  about: typeof about;
  aec: typeof aec;
  caf: typeof caf;
  ferias: typeof ferias;
  posts: typeof posts;
  contacts: typeof contacts;
  brand: typeof brand;
};

export const defaults: SiteContent = {
  hero: {
    eyebrow: "Associação de animação e tempos livres · Algés",
    titleLine1: "Tempo livre",
    titleLine2: "com propósito.",
    lead: "Atividades pedagógicas e apoio à família para escolas e jardins de infância — do enriquecimento curricular ao acolhimento matinal.",
    ctaPrimary: "Peça uma proposta",
    ctaSecondary: "Conhecer a Envolviver",
    image: "/fotos/escola.jpg",
  },
  servicesHeading: "Três respostas para o tempo que fica fora da aula.",
  services,
  about,
  aec,
  caf,
  ferias,
  posts,
  contacts,
  brand,
};

/** Fusão superficial por secção — o admin grava sempre secções inteiras. */
function merge(base: SiteContent, patch: Partial<SiteContent>): SiteContent {
  return {
    ...base,
    ...patch,
    hero: { ...base.hero, ...(patch.hero ?? {}) },
  };
}

async function read(): Promise<SiteContent> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return defaults;
  try {
    const { blobs } = await list({ prefix: CONTENT_KEY, limit: 10 });
    const found = blobs.find((b) => b.pathname === CONTENT_KEY);
    if (!found) return defaults;

    const res = await fetch(found.url, { cache: "no-store" });
    if (!res.ok) return defaults;

    return merge(defaults, (await res.json()) as Partial<SiteContent>);
  } catch (err) {
    console.error("[site] falha a ler o conteúdo do Blob:", err);
    return defaults;
  }
}

/** Conteúdo do site, em cache até o admin gravar (revalidateTag). */
export const getSite = unstable_cache(read, ["site-content"], {
  tags: [CONTENT_TAG],
});
