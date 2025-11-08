import { Link, createFileRoute } from "@tanstack/react-router";

import { useQuery } from "convex/react";
import { api } from "convex/_generated/api";
import { EmptyTrips } from "@/modules/trips/components/emtpy-trips";

export const Route = createFileRoute("/_authed/trips/")({
  component: RouteComponent,
});

function RouteComponent() {
  const trips = useQuery(api.trips.myTrips);

  if (!trips) return null;

  return (
    <div className="container py-10">
      {!trips.length ? (
        <EmptyTrips />
      ) : (
        <div>
          {trips.map((trip) => (
            <div key={trip._id}>
              <Link to="/trips/$tripId" params={{ tripId: trip._id }}>
                {trip.name}
              </Link>
            </div>
          ))}
        </div>
      )}
      <div></div>
    </div>
  );
}
