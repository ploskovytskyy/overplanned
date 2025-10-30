import { createFileRoute } from "@tanstack/react-router";
import { useAuthActions } from "@convex-dev/auth/react";
import {
  AuthLoading,
  Authenticated,
  Unauthenticated,
  useQuery,
} from "convex/react";
import { api } from "convex/_generated/api";

export const Route = createFileRoute("/")({
  component: App,
  ssr: true,
});

function App() {
  const user = useQuery(api.users.currentUser);
  const { signIn, signOut } = useAuthActions();

  return (
    <>
      <h1>Overplanned App</h1>

      <AuthLoading>
        <p>Loading...</p>
      </AuthLoading>

      <Authenticated>
        <p>Welcome! {user?.name}</p>
        <button onClick={() => void signOut()}>Sign out</button>
      </Authenticated>

      <Unauthenticated>
        <button onClick={() => void signIn("github")}>
          Sign in with GitHub
        </button>
      </Unauthenticated>
    </>
  );
}
