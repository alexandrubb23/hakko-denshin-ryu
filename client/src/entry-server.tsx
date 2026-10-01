import createEmotionServer from "@emotion/server/create-instance";
import { renderToString } from "react-dom/server";
import { createIntl } from "react-intl";
import { StaticRouter } from "react-router";

import Providers from "@providers/Providers";
import useLangStore from "@store/useLangStore";
import { prefetch } from "@utils/api-requests";
import { normalizePath } from "@utils/routes";
import { AppRoutes } from "./AppRoutes";
import createEmotionCache from "./createEmotionCache";
import { messages } from "./i18n/messages";
import { findPage, getPageTitle } from "./pages";

export async function render(url: string) {
  const cache = createEmotionCache();
  const { extractCriticalToChunks, constructStyleTagsFromChunks } =
    createEmotionServer(cache);

  // url arrives without a leading slash (e.g. "students/abc?tab=attendance")
  // Split pathname and search before normalizing
  const [rawPathname, rawSearch] = url.split("?");
  const normalizedPathname = normalizePath(rawPathname);
  const search = rawSearch ? `?${rawSearch}` : "";

  const page = findPage(normalizedPathname);
  // The language preference lives in localStorage, so the server always
  // renders with the store's default language (the client updates the title
  // after hydration if the user picked another language).
  const lang = useLangStore.getState().lang;
  const intl = createIntl({ locale: lang, messages: messages[lang] });
  const title = page ? getPageTitle(page, intl) : "Default Title";
  const noIndex = page?.protected || page?.standalone;

  const loaderData = await prefetch(normalizedPathname);

  const html = renderToString(
    <Providers cache={cache}>
      <StaticRouter location={`${normalizedPathname}${search}`}>
        <AppRoutes initialLoaderData={loaderData} />
      </StaticRouter>
    </Providers>
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
