import { useParams } from "@tanstack/react-router";
import { api } from "convex/_generated/api";
import { useQuery } from "convex/react";

export const useTripData = () => {
  const { tripId } = useParams({ from: "/_authed/trips/$tripId" });
  return useQuery(api.trips.getTripById, { tripId });
};
