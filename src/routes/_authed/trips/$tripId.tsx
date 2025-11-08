import { createFileRoute } from "@tanstack/react-router";
import { api } from "convex/_generated/api";
import { useQuery } from "convex/react";
import { Calendar, Users } from "lucide-react";
import { formatDateShort } from "@/modules/trips/utils/date";
import { TripDayCard } from "@/modules/trips/components/trip-day-card";

export const Route = createFileRoute("/_authed/trips/$tripId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { tripId } = Route.useParams();

  const data = useQuery(api.trips.getTripById, { tripId });

  if (!data) return null;

  const dateLabel =
    data.startDate === data.endDate
      ? formatDateShort(data.startDate)
      : `${formatDateShort(data.startDate)} - ${formatDateShort(data.endDate)}`;

  const amountOfPeople =
    data.minPeople === data.maxPeople
      ? data.minPeople
      : `${data.minPeople}-${data.maxPeople} people`;

  return (
    <div className="container max-w-2xl">
      <div className="grid my-12">
        <h1 className="text-3xl font-bold mb-4">{data.name}</h1>
        <div className="flex gap-10 opacity-60 font-medium">
          <span className="flex items-center gap-2">
            <Calendar className="size-5" />
            {dateLabel}
          </span>
          <span className="flex items-center gap-2">
            <Users className="size-5" />
            {amountOfPeople}
          </span>
        </div>
      </div>

      <div className="grid gap-4">
        <TripDayCard />
        <TripDayCard />
        <TripDayCard />
      </div>
    </div>
  );
}
