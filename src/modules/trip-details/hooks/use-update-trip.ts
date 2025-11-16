import { useConvexMutation } from "@convex-dev/react-query";
import { useMutation } from "@tanstack/react-query";
import { api } from "convex/_generated/api";
import { toast } from "sonner";
import { useParams } from "@tanstack/react-router";
import { formatDayKey } from "../utils/date-utils";
import type { EditTripFormSchema } from "../utils/schema";

export const useUpdateTrip = ({ onUpdate }: { onUpdate: () => void }) => {
  const { tripId } = useParams({ from: "/_authed/trips/$tripId" });

  const { mutate, isPending: isUpdating } = useMutation({
    mutationFn: useConvexMutation(api.trips.updateTrip),
    onError: (error) => {
      toast.error("Could not update trip!", {
        description: error.message,
      });
    },
    onSuccess: onUpdate,
  });

  const updateTrip = ({ payload }: { payload: EditTripFormSchema }) => {
    mutate({
      tripId,
      payload: {
        name: payload.name,
        startDate: formatDayKey(payload.dates.from),
        endDate: formatDayKey(payload.dates.to),
      },
    });
  };
  return {
    updateTrip,
    isUpdating,
  };
};
