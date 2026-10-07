import { inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

import { API_URL } from "@api/http";

export const authClient = createAuthClient({
  baseURL: API_URL,
  plugins: [
    inferAdditionalFields({
      user: {
        role: {
          type: "string",
          required: true,
        },
      },
    }),
  ],
});
