import { createMiddleware } from "@tanstack/react-start";
import { redirect } from "@tanstack/react-router";
import { getCookie } from "@tanstack/react-start/server";
import { authCookieFlagName } from "@/integrations/convex/auth-storage";

export const authMiddleware = createMiddleware().server(async ({ next }) => {
  const isAuthenticated = !!getCookie(authCookieFlagName);

  if (!isAuthenticated) {
    throw redirect({ to: "/login" });
  }

  return next();
});
