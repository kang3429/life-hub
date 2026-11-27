import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import { calculators } from "@/lib/calculators";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${site.siteUrl}/`, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${site.siteUrl}/calc`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${site.siteUrl}/posts`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${site.siteUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${site.siteUrl}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  const calcRoutes: MetadataRoute.Sitemap = calculators
    .filter((calc) => calc.status === "live")
    .map((calc) => ({
      url: `${site.siteUrl}${calc.href}`,
      lastModified: new Date(calc.updated),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));

  const postRoutes: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${site.siteUrl}/posts/${post.slug}`,
    lastModified: new Date(post.updated ?? post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...calcRoutes, ...postRoutes];
}
