import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: App,
  ssr: true,
});

function App() {
  return (
    <section className="container">
      <h1>Home page</h1>
    </section>
  );
}
