import { useConvexMutation } from "@convex-dev/react-query";
import { useMutation } from "@tanstack/react-query";
import { api } from "convex/_generated/api";
import { toast } from "sonner";
import { useParams } from "@tanstack/react-router";

export const useRemoveTripItem = ({ onRemove }: { onRemove: () => void }) => {
  const { tripId } = useParams({ from: "/_authed/trips/$tripId" });

  const { mutate, isPending: isRemoving } = useMutation({
    mutationFn: useConvexMutation(api.tripItems.removeTripItem),
    onError: (error) => {
      toast.error("Could not remove trip item!", {
        description: error.message,
      });
    },
    onSuccess: onRemove,
  });

  const removeTripItem = (tripItemId: string | null) => {
    if (!tripItemId) return;
    mutate({ tripId, tripItemId });
  };

  return {
    removeTripItem,
    isRemoving,
  };
};
