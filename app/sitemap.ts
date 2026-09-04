import type { MetadataRoute } from "next";
import { aec, caf, posts } from "@/lib/content";

const base = "https://envolviver.pt";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/a-envolviver",
    "/enriquecimento-curricular",
    "/apoio-a-familia",
    "/ferias-e-interrupcoes",
    "/noticias",
    "/contactos",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const activities = [
    ...aec.activities.map((a) => `/enriquecimento-curricular/${a.slug}`),
    ...caf.activities.map((a) => `/apoio-a-familia/${a.slug}`),
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  const news = posts.map((p) => ({
    url: `${base}/noticias/${p.slug}`,
    lastModified: p.date ? new Date(p.date) : new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...activities, ...news];
}
