import { Navigate, Outlet, createFileRoute } from "@tanstack/react-router";
import { useConvexAuth } from "convex/react";
import { ErrorBoundary } from "react-error-boundary";
import { authMiddleware } from "@/lib/auth-middleware";
import { ErrorPage } from "@/components/error";

export const Route = createFileRoute("/_authed")({
  server: { middleware: [authMiddleware] },
  component: RouteLayout,
});

function RouteLayout() {
  const { isLoading, isAuthenticated } = useConvexAuth();

  if (!isLoading && !isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <ErrorBoundary fallbackRender={ErrorPage}>
      <Outlet />
    </ErrorBoundary>
  );
}
