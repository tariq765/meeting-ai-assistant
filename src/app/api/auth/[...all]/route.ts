import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

// Better Auth ka main API route
// Yeh handle karta hai:
// POST /api/auth/sign-in
// POST /api/auth/sign-up
// POST /api/auth/sign-out
// GET  /api/auth/session
// aur bhi bahut kuch...

export const { GET, POST } = toNextJsHandler(auth);
