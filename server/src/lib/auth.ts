import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { Role } from "../generated/prisma/enums.js";
import { ALLOWED_ORIGINS, env } from "../env.js";
import { prisma } from "./prisma.js";
import { ApiRoutes } from "./routes.js";

export const auth = betterAuth({
  basePath: ApiRoutes.authBase,
  secret: env.BETTER_AUTH_SECRET,
  trustedOrigins: ALLOWED_ORIGINS,
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  rateLimit: {
    enabled: env.NODE_ENV === "production",
    window: 60,
    max: 20,
    storage: "memory",
  },
  emailAndPassword: {
    enabled: true,
    disableSignUp: true,
  },
  advanced: {
    cookiePrefix: "hakko",
    defaultCookieAttributes: {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    },
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: Role.student,
        input: false,
      },
    },
  },
});
