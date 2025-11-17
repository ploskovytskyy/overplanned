import { useConvexMutation } from "@convex-dev/react-query";
import { useMutation } from "@tanstack/react-query";
import { api } from "convex/_generated/api";

export const useMutateTripHighlights = () => {
  const { mutate: createHighlight } = useMutation({
    mutationFn: useConvexMutation(api.highlights.createHighlight),
  });

  const { mutate: deleteHighlight } = useMutation({
    mutationFn: useConvexMutation(api.highlights.deleteHighlight),
  });

  return {
    createHighlight,
    deleteHighlight,
  };
};
