import { CacheProvider, EmotionCache } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import { IntlProvider } from "react-intl";

import useLangStore from "@store/useLangStore";
import { messages } from "../i18n/messages";
import theme from "../style/theme";
import { type ServerResponse, ServerResponseContext } from "./ServerResponse";

interface Props {
  cache: EmotionCache;
  /** Server renders only: collects the HTTP status the pages ask for */
  response?: ServerResponse;
}

const queryClient = new QueryClient();

const Providers = ({ children, cache, response }: PropsWithChildren<Props>) => {
  const lang = useLangStore((state) => state.lang);

  return (
    <ServerResponseContext.Provider value={response ?? null}>
      <CacheProvider value={cache}>
        <IntlProvider locale={lang} messages={messages[lang]}>
          <QueryClientProvider client={queryClient}>
            <MuiThemeProvider theme={theme}>
              <CssBaseline />
              {children}
            </MuiThemeProvider>
          </QueryClientProvider>
        </IntlProvider>
      </CacheProvider>
    </ServerResponseContext.Provider>
  );
};

export default Providers;
