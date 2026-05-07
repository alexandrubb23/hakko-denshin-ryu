import createEmotionServer from "@emotion/server/create-instance";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";

import Providers from "@providers/Providers";
import { prefetch } from "@utils/api-requests";
import { normalizePath } from "@utils/routes";
import { AppRoutes } from "./AppRoutes";
import createEmotionCache from "./createEmotionCache";
import { pages } from "./pages";

export async function render(url: string) {
  const cache = createEmotionCache();
  const { extractCriticalToChunks, constructStyleTagsFromChunks } =
    createEmotionServer(cache);

  // url arrives without a leading slash (e.g. "students/abc?tab=attendance")
  // Split pathname and search before normalizing
  const [rawPathname, rawSearch] = url.split("?");
  const normalizedPathname = normalizePath(rawPathname);
  const search = rawSearch ? `?${rawSearch}` : "";

  const page = pages.find(
    (route) => normalizePath(route.path) === normalizedPathname,
  );
  const title = page?.title || "Default Title";
  const noIndex = page?.protected || page?.standalone;

  const loaderData = await prefetch(normalizedPathname);

  const html = renderToString(
    <Providers cache={cache}>
      <StaticRouter location={`${normalizedPathname}${search}`}>
        <AppRoutes initialLoaderData={loaderData} />
      </StaticRouter>
    </Providers>,
  );

  const emotionChunks = extractCriticalToChunks(html);
  const styles = constructStyleTagsFromChunks(emotionChunks);
  const head = `
    <title>${title}</title>
    ${noIndex ? '<meta name="robots" content="noindex, nofollow">' : ""}
    <script>
     window.__INITIAL_DATA__ = ${JSON.stringify(loaderData)}
    </script>
    ${styles}
  `;

  return { html, head, title };
}
