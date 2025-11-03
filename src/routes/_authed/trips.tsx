import { createFileRoute } from "@tanstack/react-router";

import { useQuery } from "convex/react";
import { api } from "convex/_generated/api";

export const Route = createFileRoute("/_authed/trips")({
  component: RouteComponent,
  ssr: true,
});

function RouteComponent() {
  const user = useQuery(api.users.currentUser);

  return <div className="container">Hello {user?.name}!</div>;
}
