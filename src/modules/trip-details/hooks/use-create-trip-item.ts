import { useConvexMutation } from "@convex-dev/react-query";
import { useMutation } from "@tanstack/react-query";
import { api } from "convex/_generated/api";
import { toast } from "sonner";
import { useParams } from "@tanstack/react-router";
import { format, setHours, setMinutes } from "date-fns";
import type { TripType } from "../utils/trip-type-utils";
import type { CreateTripItemFormSchema } from "../utils/schema";

export const useCreateTripItem = ({ onCreate }: { onCreate: () => void }) => {
  const { tripId } = useParams({ from: "/_authed/trips/$tripId" });

  const { mutate, isPending: isCreating } = useMutation({
    mutationFn: useConvexMutation(api.tripItems.createTripItem),
    onError: (error) => {
      toast.error("Could not create trip item!", {
        description: error.message,
      });
    },
    onSuccess: onCreate,
  });

  const createTrip = ({
    payload,
    day,
  }: {
    payload: CreateTripItemFormSchema;
    day: string;
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
      payload: {
        title: payload.title,
        startDate,
        endDate,
        type: payload.type as TripType,
      },
    });
  };

  return {
    createTrip,
    isCreating,
  };
};
