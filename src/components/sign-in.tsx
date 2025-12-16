import { useAuthActions } from "@convex-dev/auth/react";
import { useConvexAuth } from "convex/react";
import { useNavigate } from "@tanstack/react-router";
import { Image } from "@unpic/react";
import { Button } from "@/components/ui/button";
import githubLogo from "@/assets/github-mark.svg";

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
      <Image src={githubLogo} width={12} height={12} className="invert" />
      Sign in
    </Button>
  );
};
