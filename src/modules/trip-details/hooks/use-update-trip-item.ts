import { useConvexMutation } from "@convex-dev/react-query";
import { useMutation } from "@tanstack/react-query";
import { api } from "convex/_generated/api";
import { toast } from "sonner";
import { useParams } from "@tanstack/react-router";
import { format, setHours, setMinutes } from "date-fns";
import type { UpdateTripItemFormSchema } from "../utils/schema";

export const useUpdateTripItem = ({ onUpdate }: { onUpdate: () => void }) => {
  const { tripId } = useParams({ from: "/_authed/trips/$tripId" });

  const { mutate, isPending: isUpdating } = useMutation({
    mutationFn: useConvexMutation(api.tripItems.updateTripItem),
    onError: (error) => {
      toast.error("Could not update trip item!", {
        description: error.message,
      });
    },
    onSuccess: onUpdate,
  });

  const updateTripItem = ({
    payload,
    day,
    tripItemId,
  }: {
    payload: UpdateTripItemFormSchema;
    day: string;
    tripItemId: string;
  }) => {
    const [startHours, startMinutes] = payload.time.startTime.split(":");
    const [endHours, endMinutes] = payload.time.endTime.split(":");

    const startDate = format(
      setMinutes(setHours(day, Number(startHours)), Number(startMinutes)),
      "yyyy-MM-dd:HH:mm",
    );

    const endDate = format(
      setMinutes(setHours(day, Number(endHours)), Number(endMinutes)),
      "yyyy-MM-dd:HH:mm",
    );

    mutate({
      tripId,
      tripItemId,
      payload: {
        title: payload.title,
        startDate,
        endDate,
        url: payload.url,
      },
    });
  };

  return {
    updateTripItem,
    isUpdating,
  };
};
