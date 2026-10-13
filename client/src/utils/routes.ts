/** "/contact/" -> "/contact"; the router matches both, so treat them as one */
export const trimTrailingSlash = (path: string) =>
  path.length > 1 ? path.replace(/\/+$/, "") : path;

export const normalizePath = (path: string) => {
  const trimmed = trimTrailingSlash(path);
  const normalized = trimmed === "home" ? "/" : trimmed;
  return normalized === "/" ? normalized : `/${normalized}`;
};

/** The page's address search engines index: "https://senshinkan.ro/dojo" */
export const canonicalUrl = (siteUrl: string, path: string) =>
  `${siteUrl}${normalizePath(path)}`;

/** The current address's query parameters; browser only */
export const getSearchParams = () =>
  new URLSearchParams(window.location.search);
