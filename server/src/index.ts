import { createApp } from "./createApp.js";
import { env } from "./env.js";
import { initSentry } from "./lib/sentry.js";

// Must be called before any other code
initSentry();

const app = createApp();

app.listen(env.PORT, () => {
  console.log(`Server running at ${env.HOST}:${env.PORT}`);
});
