import { useParams } from "@tanstack/react-router";
import { api } from "convex/_generated/api";
import { useQuery } from "convex/react";

export const useTripHighlights = () => {
  const { tripId } = useParams({ from: "/_authed/trips/$tripId" });

  const highlights = useQuery(api.highlights.getHighlights, { tripId });
  const members = useQuery(api.trips.members, { tripId });

  const highlightsWithMembersData = highlights?.flatMap((highlight) => {
    const member = members?.find(
      (memberData) => memberData.membershipId === highlight.membership,
    );

    if (!member || !member.color) return [];

    return {
      ...highlight,
      color: member.color,
      name: member.name ?? member.email ?? "Unknown",
    };
  });

  return highlightsWithMembersData;
};
