import { create } from "zustand";
import type { TripItem } from "./use-days-with-items";

type UseOpenTripItemEditDialog = {
  tripItem: TripItem | null;
  openTripItemEditDialog: (item: TripItem) => void;
  closeTripItemEditDialog: () => void;
};

export const useOpenTripItemEditDialog = create<UseOpenTripItemEditDialog>(
  (set) => ({
    tripItem: null,
    openTripItemEditDialog: (tripItem) => set({ tripItem }),
    closeTripItemEditDialog: () => set({ tripItem: null }),
  }),
);
