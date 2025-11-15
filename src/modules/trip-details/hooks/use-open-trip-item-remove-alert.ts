import { create } from "zustand";
import type { TripItem } from "./use-days-with-items";

type UseOpenTripItemRemoveAlert = {
  tripItemId: TripItem["_id"] | null;
  openTripItemRemoveAlert: (item: TripItem["_id"]) => void;
  closeTripItemRemoveAlert: () => void;
};

export const useOpenTripItemRemoveAlert = create<UseOpenTripItemRemoveAlert>(
  (set) => ({
    tripItemId: null,
    openTripItemRemoveAlert: (tripItemId) => set({ tripItemId }),
    closeTripItemRemoveAlert: () => set({ tripItemId: null }),
  }),
);
