import { useAuthActions } from "@convex-dev/auth/react";
import { Navigate, createFileRoute } from "@tanstack/react-router";
import { useConvexAuth } from "convex/react";

import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
  ssr: true,
});

function RouteComponent() {
  const { signIn } = useAuthActions();
  const { isLoading, isAuthenticated } = useConvexAuth();

  if (isAuthenticated) {
    return <Navigate to="/trips" />;
  }

  return (
    <div className="container grid min-h-page place-content-center">
      <Button disabled={isLoading} onClick={() => signIn("github")}>
        Sign in with GitHub
      </Button>
    </div>
  );
}
