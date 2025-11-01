import { Link, createFileRoute } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  component: App,
  ssr: true,
});

function App() {
  return (
    <section className="container py-10">
      <h1>Overplanned App</h1>
      <Button asChild>
        <Link to="/trips">Go to my trips</Link>
      </Button>
    </section>
  );
}
