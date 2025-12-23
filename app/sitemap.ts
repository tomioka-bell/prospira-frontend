import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://prospira.com";
  const languages = ["th", "en"];

  const staticPages = [
    "",
    "/about",
    "/history",
    "/vision",
    "/team",
    "/products",
    "/recruitment",
    "/contact",
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Add all language variants
  languages.forEach((lang) => {
    staticPages.forEach((page) => {
      sitemapEntries.push({
        url: `${baseUrl}/${lang}${page}`,
        lastModified: new Date(),
        changeFrequency: page === "" ? "daily" : "weekly",
        priority: page === "" ? 1 : 0.8,
      });
    });
  });

  return sitemapEntries;
}
