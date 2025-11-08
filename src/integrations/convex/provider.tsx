import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { ConvexQueryClient } from "@convex-dev/react-query";
import { authStorage } from "./auth-storage";
import type { ConvexReactClient } from "convex/react";

const CONVEX_URL = (import.meta as any).env.VITE_CONVEX_URL;
if (!CONVEX_URL) {
  console.error("missing envar CONVEX_URL");
}

export function getContext() {
  const convexQueryClient = new ConvexQueryClient(CONVEX_URL);
  return convexQueryClient;
}

export function Provider({
  children,
  convexClient,
}: {
  children: React.ReactNode;
  convexClient: ConvexReactClient;
}) {
  return (
    <ConvexAuthProvider client={convexClient} storage={authStorage}>
      {children}
    </ConvexAuthProvider>
  );
}
