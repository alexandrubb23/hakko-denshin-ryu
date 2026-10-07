import createEmotionServer from "@emotion/server/create-instance";
import { renderToString } from "react-dom/server";
import { type IntlShape, createIntl } from "react-intl";
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
  type PageHead,
  type PageMeta,
  findPage,
  getPageDescription,
  getPageTitle,
  matchPage,
} from "./pages";

// Public origin used for canonical and social preview URLs
const SITE_URL = (process.env.SITE_URL ?? "https://senshinkan.ro").replace(
  /\/$/,
  ""
);
const DEFAULT_OG_IMAGE = "/og/home.jpg";

/** The head tags the page at `pathname` takes from what it shows, if any */
const fetchPageHead = async (
  pathname: string,
  locale: string
): Promise<PageHead | null> => {
  const match = matchPage(pathname);
  if (!match?.page.head) return null;
  // Failing that, the page is served with its generic head
  return match.page.head(match.params, locale).catch(() => null);
};

/** The title, description and preview image, escaped for the template */
const resolveHead = (
  meta: PageMeta | undefined,
  pageHead: PageHead | null,
  intl: IntlShape
) => {
  const title =
    pageHead?.title ?? (meta ? getPageTitle(meta, intl) : DOJO_NAME);
  const description = pageHead?.description ?? getPageDescription(meta, intl);
  const image =
    pageHead?.image ?? `${SITE_URL}${meta?.ogImage ?? DEFAULT_OG_IMAGE}`;
  return {
    title: escapeHtml(title),
    description: escapeHtml(description),
    image: escapeHtml(image),
    // The site's own previews are all 1200×630 jpegs; a page's are its own
    imageMeta: pageHead?.image
      ? ""
      : `<meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:image:type" content="image/jpeg">`,
  };
};

export async function render(url: string) {
  const cache = createEmotionCache();
  const { extractCriticalToChunks, constructStyleTagsFromChunks } =
    createEmotionServer(cache);

  // url arrives without a leading slash (e.g. "students/abc?tab=attendance")
  // Split pathname and search before normalizing
  const [rawPathname, rawSearch] = url.split("?");
  const normalizedPathname = normalizePath(rawPathname);
  const search = rawSearch ? `?${rawSearch}` : "";

  // The language preference lives in localStorage, so the server always
  // renders with the store's default language (the client updates the title
  // after hydration if the user picked another language).
  const lang = useLangStore.getState().lang;
  const intl = createIntl({ locale: lang, messages: messages[lang] });

  const [loaderData, pageHead] = await Promise.all([
    prefetch(normalizedPathname),
    fetchPageHead(normalizedPathname, lang),
  ]);

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
  // A page found missing while rendering keeps the generic head
  const {
    title: pageTitle,
    description,
    image,
    imageMeta,
  } = resolveHead(meta, response.status === 200 ? pageHead : null, intl);
  const noIndex = meta?.protected || meta?.noIndex;
  const pageUrl = `${SITE_URL}${normalizedPathname}`;

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
    ${imageMeta}
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
