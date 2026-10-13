import { describe, expect, it } from "vitest";

import { renderSitemap } from "./sitemap";

describe("renderSitemap", () => {
  const xml = renderSitemap("https://senshinkan.ro");
  const locs = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(([, loc]) => loc);

  it("lists the public pages at their canonical addresses", () => {
    expect(locs).toEqual([
      "https://senshinkan.ro/",
      "https://senshinkan.ro/hakko-denshin-ryu",
      "https://senshinkan.ro/senshinkan",
      "https://senshinkan.ro/dojo",
      "https://senshinkan.ro/schedule",
      "https://senshinkan.ro/contact",
      "https://senshinkan.ro/events",
    ]);
  });

  it("is a sitemaps.org urlset", () => {
    expect(xml).toMatch(
      /^<\?xml version="1.0" encoding="UTF-8"\?>\n<urlset xmlns="http:\/\/www.sitemaps.org\/schemas\/sitemap\/0.9">/
    );
  });
});
