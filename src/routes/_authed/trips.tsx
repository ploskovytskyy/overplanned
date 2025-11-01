import { createFileRoute, useNavigate } from "@tanstack/react-router";

import { useAuthActions } from "@convex-dev/auth/react";
import { useConvexAuth, useQuery } from "convex/react";
import { api } from "convex/_generated/api";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authed/trips")({
  component: RouteComponent,
  ssr: true,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { signOut } = useAuthActions();
  const { isLoading } = useConvexAuth();

  const user = useQuery(api.users.currentUser);

  const handleSignOut = async () => {
    navigate({ to: "/" });
    await signOut();
  };

  return (
    <div>
      Hello {user?.name}!
      <Button disabled={isLoading} onClick={handleSignOut}>
        Sign out
      </Button>
    </div>
  );
}
