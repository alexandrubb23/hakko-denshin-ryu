import createEmotionServer from "@emotion/server/create-instance";
import { renderToString } from "react-dom/server";
import { createIntl } from "react-intl";
import { StaticRouter } from "react-router";

import { DOJO_NAME } from "@constants/brand";
import Providers from "@providers/Providers";
import type { ServerResponse } from "@providers/ServerResponse";
import useLangStore from "@store/useLangStore";
import { prefetch } from "@utils/api-requests";
import { normalizePath } from "@utils/routes";
import { escapeHtml } from "@utils/string";
import { AppRoutes } from "./AppRoutes";
import createEmotionCache from "./createEmotionCache";
import { messages } from "./i18n/messages";
import {
  NOT_FOUND_PAGE,
  type PageMeta,
  findPage,
  getPageDescription,
  getPageTitle,
} from "./pages";

// Public origin used for canonical and social preview URLs
const SITE_URL = (process.env.SITE_URL ?? "https://senshinkan.ro").replace(
  /\/$/,
  ""
);
const DEFAULT_OG_IMAGE = "/og/home.jpg";

export async function render(url: string) {
  const cache = createEmotionCache();
  const { extractCriticalToChunks, constructStyleTagsFromChunks } =
    createEmotionServer(cache);

  // url arrives without a leading slash (e.g. "students/abc?tab=attendance")
  // Split pathname and search before normalizing
  const [rawPathname, rawSearch] = url.split("?");
  const normalizedPathname = normalizePath(rawPathname);
  const search = rawSearch ? `?${rawSearch}` : "";

  const loaderData = await prefetch(normalizedPathname);

  // The rendered pages set the status, e.g. the not-found page's 404
  const response: ServerResponse = { status: 200 };
  const html = renderToString(
    <Providers cache={cache} response={response}>
      <StaticRouter location={`${normalizedPathname}${search}`}>
        <AppRoutes initialLoaderData={loaderData} />
      </StaticRouter>
    </Providers>
  );

  // The router, not the path, decides a page is missing
  const meta: PageMeta | undefined =
    response.status === 404 ? NOT_FOUND_PAGE : findPage(normalizedPathname);
  // The language preference lives in localStorage, so the server always
  // renders with the store's default language (the client updates the title
  // after hydration if the user picked another language).
  const lang = useLangStore.getState().lang;
  const intl = createIntl({ locale: lang, messages: messages[lang] });

  const pageTitle = escapeHtml(meta ? getPageTitle(meta, intl) : DOJO_NAME);
  const noIndex = meta?.protected || meta?.noIndex;
  const description = escapeHtml(getPageDescription(meta, intl));
  const pageUrl = `${SITE_URL}${normalizedPathname}`;
  const image = `${SITE_URL}${meta?.ogImage ?? DEFAULT_OG_IMAGE}`;

  const emotionChunks = extractCriticalToChunks(html);
  const styles = constructStyleTagsFromChunks(emotionChunks);
  const head = `
    <title>${pageTitle}</title>
    <meta name="description" content="${description}">
    ${noIndex ? '<meta name="robots" content="noindex, nofollow">' : `<link rel="canonical" href="${pageUrl}">`}
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="${DOJO_NAME}">
    <meta property="og:title" content="${pageTitle}">
    <meta property="og:description" content="${description}">
    <meta property="og:url" content="${pageUrl}">
    <meta property="og:image" content="${image}">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:image:type" content="image/jpeg">
    <meta property="og:locale" content="ro_RO">
    <meta property="og:locale:alternate" content="en_US">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${pageTitle}">
    <meta name="twitter:description" content="${description}">
    <meta name="twitter:image" content="${image}">
    <script>
     window.__INITIAL_DATA__ = ${JSON.stringify(loaderData)}
    </script>
    ${styles}
  `;

  return { html, head, status: response.status };
}
