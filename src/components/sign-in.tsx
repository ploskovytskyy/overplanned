import { useAuthActions } from "@convex-dev/auth/react";
import { useConvexAuth } from "convex/react";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export const SignIn = () => {
  const navigate = useNavigate();
  const { signIn, signOut } = useAuthActions();
  const { isLoading, isAuthenticated } = useConvexAuth();

  const handleSignOut = async () => {
    navigate({ to: "/" });
    await signOut();
  };

  if (isAuthenticated) {
    return (
      <Button disabled={isLoading} onClick={handleSignOut}>
        Sign out
      </Button>
    );
  }

  return (
    <Button disabled={isLoading} onClick={() => signIn("github")}>
      Sign in with GitHub
    </Button>
  );
};
