import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

// Nombrado "proxy" (no "middleware"): Next.js 16 renombró el archivo de
// convención de middleware.ts a proxy.ts (mismo comportamiento, ver
// node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/proxy.md).
export const proxy = createMiddleware(routing);

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
