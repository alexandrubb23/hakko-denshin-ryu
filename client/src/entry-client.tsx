import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";

import { initSentry, Sentry } from "@lib/sentry";
import Providers from "@providers/Providers";
import { AppRoutes } from "./AppRoutes";
import createEmotionCache from "./createEmotionCache";

// Must run before the app renders
initSentry();

const cache = createEmotionCache();

const initialLoaderData = window.__INITIAL_DATA__ || [];

const Main = () => {
  return (
    <StrictMode>
      <Sentry.ErrorBoundary fallback={<></>}>
        <Providers cache={cache}>
          <BrowserRouter>
            <AppRoutes initialLoaderData={initialLoaderData} />
          </BrowserRouter>
        </Providers>
      </Sentry.ErrorBoundary>
    </StrictMode>
  );
};

hydrateRoot(document.getElementById("root") as HTMLElement, <Main />);
