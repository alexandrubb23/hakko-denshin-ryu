/** "/contact/" -> "/contact"; the router matches both, so treat them as one */
export const trimTrailingSlash = (path: string) =>
  path.length > 1 ? path.replace(/\/+$/, "") : path;

export const normalizePath = (path: string) => {
  const trimmed = trimTrailingSlash(path);
  const normalized = trimmed === "home" ? "/" : trimmed;
  return normalized === "/" ? normalized : `/${normalized}`;
};
