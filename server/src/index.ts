import { createApp } from "./createApp.js";
import { env } from "./env.js";

const app = createApp();

app.listen(env.PORT, () => {
  console.log(`Server running at ${env.HOST}:${env.PORT}`);
});
