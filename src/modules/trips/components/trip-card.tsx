import { Link } from "@tanstack/react-router";
import { Calendar, MoreHorizontal } from "lucide-react";
import type { Doc } from "convex/_generated/dataModel";
import { formatDateShort } from "@/modules/trip-details/utils/date-utils";
import { Button } from "@/components/ui/button";

export const TripCard = ({ trip }: { trip: Doc<"trips"> }) => {
  const dateLabel =
    trip.startDate === trip.endDate
      ? formatDateShort(trip.startDate)
      : `${formatDateShort(trip.startDate)} - ${formatDateShort(trip.endDate)}`;

  return (
    <Link
      to="/trips/$tripId"
      params={{ tripId: trip._id }}
      className="shadow-xl bg-card rounded-lg p-4 flex items-center justify-between hover:scale-[0.99] hover:shadow-lg transition-all"
    >
      <div>
        <span className="flex items-center gap-2 opacity-50 mb-1 text-sm">
          <Calendar className="size-4" />
          {dateLabel}
        </span>
        <span className="font-semibold">{trip.name}</span>
      </div>

      <Button variant="outline" size="icon-sm" disabled>
        <MoreHorizontal className="size-4" />
      </Button>
    </Link>
  );
};
