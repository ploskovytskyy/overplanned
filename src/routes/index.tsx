import { createFileRoute } from "@tanstack/react-router";
import { getTestSSRData } from "@/lib/get-test-ssr-data";

export const Route = createFileRoute("/")({
  component: App,
  ssr: true,
  loader: async () => getTestSSRData(),
});

function App() {
  const data = Route.useLoaderData();
  return (
    <>
      <h1>{data.title}</h1>
    </>
  );
}
