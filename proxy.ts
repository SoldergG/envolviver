import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

/** Só /admin e a API de administração exigem sessão. O site é público. */
const isProtected = createRouteMatcher(["/admin(.*)", "/api/admin(.*)"]);
const isSignIn = createRouteMatcher(["/admin/entrar(.*)"]);

export default clerkMiddleware(async (auth, request) => {
  if (isProtected(request) && !isSignIn(request)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest|pdf)).*)",
    "/(api|trpc)(.*)",
  ],
};
