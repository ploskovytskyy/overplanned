import { useTripData } from "../../hooks/use-trip-data";
import { EditTripDialog } from "./edit-trip-dialog";
import { Members } from "./members";
import { Separator } from "@/components/ui/separator";

export const TripActions = () => {
  const tripData = useTripData();

  if (!tripData) return null;

  const canEdit = tripData.role === "admin" || tripData.role === "owner";

  return (
    <div className="flex items-center gap-2">
      {canEdit && (
        <>
          <EditTripDialog />
          <Separator orientation="vertical" className="h-5! mr-2" />
        </>
      )}
      <Members />
    </div>
  );
};
