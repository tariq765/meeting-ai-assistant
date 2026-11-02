import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { db } from "@/lib/db";

export const auth = betterAuth({
  // Database
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),

  // Email & Password login
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, // dev mein false rakhein
  },

  // Social logins (optional - baad mein add kar sakte hain)
  // socialProviders: {
  //   google: {
  //     clientId: process.env.GOOGLE_CLIENT_ID!,
  //     clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  //   },
  // },

  // Session settings
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 din
    updateAge: 60 * 60 * 24,      // har din refresh
  },

  // App info
  appName: "MeetingAI",
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  secret: process.env.BETTER_AUTH_SECRET!,
});

export type Session = typeof auth.$Infer.Session;
