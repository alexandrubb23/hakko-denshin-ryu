export const normalizePath = (path: string) => {
  const normalized = path === 'home' ? '/' : path;
  return normalized === '/' ? normalized : `/${normalized}`;
};
