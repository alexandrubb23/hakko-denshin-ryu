import { createApp } from "./createApp.js";
import { env } from "./env.js";
import { initSentry } from "./lib/sentry.js";

// Must be called before any other code
initSentry();

const app = createApp();

const port = new URL(env.SERVER_URL).port || "3000";

app.listen(Number(port), () => {
  console.log(`Server running at ${env.SERVER_URL}`);
});
