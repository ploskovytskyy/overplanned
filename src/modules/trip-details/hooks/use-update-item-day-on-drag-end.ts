import { useConvexMutation } from "@convex-dev/react-query";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { api } from "convex/_generated/api";
import { useCallback } from "react";
import { toast } from "sonner";
import type { DragEndEvent } from "@dnd-kit/core";

export const useUpdateItemDayOnDragEnd = () => {
  const { tripId } = useParams({ from: "/_authed/trips/$tripId" });

  const apiMutation = useConvexMutation(
    api.tripItems.updateTripItemDay,
  ).withOptimisticUpdate((localStore, args) => {
    const currentValue = localStore.getQuery(api.trips.getTripById, {
      tripId: args.tripId,
    });

    if (!currentValue) return;

    const changedTripItem = currentValue.items.find(
      (item) => item._id === args.tripItemId,
    );

    if (!changedTripItem) return;

    localStore.setQuery(
      api.trips.getTripById,
      { tripId: args.tripId },
      {
        ...currentValue,
        items: [
          ...currentValue.items.filter((item) => item._id !== args.tripItemId),
          {
            ...changedTripItem,
            startDate: args.newStartTime,
            endDate: args.newEndTime,
          },
        ],
      },
    );
  });

  const { mutate } = useMutation({
    mutationFn: apiMutation,
    onError: (error) => {
      toast.error("Could not update trip item day!", {
        description: error.message,
      });
    },
  });

  const updateDayForItemOnDragEnd = useCallback(
    (event: DragEndEvent) => {
      const tripItemId = event.active.data.current?.itemId;
      const currentDay = event.active.data.current?.originalDay;
      const droppedOverDay = event.over?.data.current?.dayKey;
      const currentStartDate = event.active.data.current?.startDate;
      const currentEndDate = event.active.data.current?.endDate;

      if (
        !currentDay ||
        !droppedOverDay ||
        !tripItemId ||
        !currentStartDate ||
        !currentEndDate ||
        currentDay === droppedOverDay
      ) {
        return;
      }

      const [_s, currentStartHour, currentStartMinute] =
        currentStartDate.split(":");

      const [_e, currentEndHour, currentEndMinute] = currentEndDate.split(":");

      const newStartTime = `${droppedOverDay}:${currentStartHour}:${currentStartMinute}`;
      const newEndTime = `${droppedOverDay}:${currentEndHour}:${currentEndMinute}`;

      mutate({ tripId, tripItemId, newStartTime, newEndTime });
    },
    [tripId],
  );

  return { updateDayForItemOnDragEnd };
};
