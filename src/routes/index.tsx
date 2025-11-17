import { Link, createFileRoute } from "@tanstack/react-router";
import { Image } from "@unpic/react";

import { PlaneTakeoff } from "lucide-react";
import doorImage from "@/assets/door-3.png";
import planeImage from "@/assets/plane.png";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  component: App,
  ssr: true,
});

function App() {
  return (
    <section className="relative container min-h-page grid content-center justify-items-center">
      <h1 className="text-5xl font-bold mb-6">overplanned</h1>

      <div className="max-w-lg text-center text-lg mb-5">
        Simplify your trip planning, invite friends, and build your plans with
        ease.
      </div>

      <Button asChild>
        <Link to="/trips">
          Get Started
          <PlaneTakeoff />
        </Link>
      </Button>

      <Image
        src={doorImage}
        width={340}
        height={340}
        className="mix-blend-darken mx-auto blur absolute bottom-0 right-0 opacity-30"
      />

      <Image
        src={planeImage}
        width={340}
        height={340}
        className="mix-blend-darken mx-auto blur absolute top-0 left-0 opacity-30"
      />
    </section>
  );
}
