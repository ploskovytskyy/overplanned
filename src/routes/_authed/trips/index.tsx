import { Link, createFileRoute } from "@tanstack/react-router";
import { useQuery } from "convex/react";
import { api } from "convex/_generated/api";
import { Image } from "@unpic/react";
import { Plus } from "lucide-react";
import { EmptyTrips } from "@/modules/trips/components/emtpy-trips";
import { TripCard } from "@/modules/trips/components/trip-card";
import activityIcon from "@/assets/activity-2.png";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authed/trips/")({
  component: RouteComponent,
});

function RouteComponent() {
  const trips = useQuery(api.trips.myTrips);

  if (!trips) return null;

  if (!trips.length) return <EmptyTrips />;

  return (
    <div className="container max-w-3xl py-10">
      <div className="flex items-center justify-between mb-10">
        <h1 className="flex items-center gap-3 font-bold text-3xl">
          <Image
            src={activityIcon}
            width={60}
            height={60}
            className="mix-blend-darken"
          />
          My Trips
        </h1>
        <Button variant="outline" asChild>
          <Link to="/create">
            <Plus /> Add new trip
          </Link>
        </Button>
      </div>
      <div className="grid gap-5">
        {trips.map((trip) => (
          <TripCard key={trip._id} trip={trip} />
        ))}
      </div>
    </div>
  );
}
