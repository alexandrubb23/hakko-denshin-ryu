import createEmotionServer from '@emotion/server/create-instance';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';

import Providers from '@providers/Providers';
import { prefetch } from '@utils/api-requests';
import { AppRoutes } from './AppRoutes';
import createEmotionCache from './createEmotionCache';
import { pages } from './pages';
import { normalizePath } from '@utils/routes';

export async function render(url: string) {
  const cache = createEmotionCache();
  const { extractCriticalToChunks, constructStyleTagsFromChunks } =
    createEmotionServer(cache);

  const normalizedUrl = normalizePath(url);

  const title =
    pages.find(route => normalizePath(route.path) === normalizedUrl)?.title ||
    'Default Title';

  const loaderData = await prefetch(normalizedUrl);

  const html = renderToString(
    <Providers cache={cache}>
      <StaticRouter
        location={{
          pathname: normalizedUrl,
        }}
      >
        <AppRoutes initialLoaderData={loaderData} />
      </StaticRouter>
    </Providers>
  );

  const emotionChunks = extractCriticalToChunks(html);
  const styles = constructStyleTagsFromChunks(emotionChunks);
  const head = `
    <title>${title}</title>
    <script>
     window.__INITIAL_DATA__ = ${JSON.stringify(loaderData)}
    </script>
    ${styles}
  `;

  return { html, head, title };
}
