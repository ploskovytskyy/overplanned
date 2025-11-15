import { createFileRoute } from "@tanstack/react-router";
import { TripDays } from "@/modules/trip-details/components/trip-days";
import { TripDetailsHeader } from "@/modules/trip-details/components/trip-details-header";
import { TripDayItemRemoveAlert } from "@/modules/trip-details/components/trip-day-item-remove-alert";
import { TripDayItemEditDialog } from "@/modules/trip-details/components/trip-day-item-edit-dialog";

export const Route = createFileRoute("/_authed/trips/$tripId")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="container max-w-3xl py-8">
      <TripDetailsHeader />
      <TripDays />
      <TripDayItemRemoveAlert />
      <TripDayItemEditDialog />
    </div>
  );
}
