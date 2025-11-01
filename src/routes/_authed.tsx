import { Navigate, Outlet, createFileRoute } from "@tanstack/react-router";
import { useConvexAuth } from "convex/react";
import { authMiddleware } from "@/lib/auth-middleware";

export const Route = createFileRoute("/_authed")({
  server: { middleware: [authMiddleware] },
  component: RouteLayout,
});

function RouteLayout() {
  const { isLoading, isAuthenticated } = useConvexAuth();

  if (!isLoading && !isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}
