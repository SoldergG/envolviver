import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { clerkConfigured } from "@/lib/auth-config";

/** Só /admin e a API de administração exigem sessão. O site é público. */
const isProtected = createRouteMatcher(["/admin(.*)", "/api/admin(.*)"]);
const isSignIn = createRouteMatcher(["/admin/entrar(.*)"]);

const withClerk = clerkMiddleware(async (auth, request) => {
  if (isProtected(request) && !isSignIn(request)) {
    await auth.protect();
  }
});

// Sem Clerk configurado o site público continua a servir normalmente;
// quem barra /admin é a própria página (ver lib/auth-config.ts).
const passthrough = () => NextResponse.next();

export default (clerkConfigured ? withClerk : passthrough) as typeof withClerk;

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest|pdf)).*)",
    "/(api|trpc)(.*)",
  ],
};
