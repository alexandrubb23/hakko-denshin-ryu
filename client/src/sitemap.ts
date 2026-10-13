import { escapeHtml } from "@utils/string";
import { canonicalUrl } from "@utils/routes";

import { indexedPages } from "./pages";

/** The XML sitemap of the indexed pages, at their canonical `siteUrl` addresses */
export const renderSitemap = (siteUrl: string) => {
  const urls = indexedPages
    .map(
      ({ path }) =>
        `  <url><loc>${escapeHtml(canonicalUrl(siteUrl, path))}</loc></url>`
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
};
