import { useMutateTripHighlights } from "../hooks/use-mutate-trip-highlights";
import { useOpenTripItemEditDialog } from "../hooks/use-open-trip-item-edit-dialog";
import { UpdateTripItemForm } from "./update-trip-item-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const TripDayItemEditDialog = () => {
  const { tripItem, closeTripItemEditDialog } = useOpenTripItemEditDialog();

  const { deleteHighlight } = useMutateTripHighlights();

  const handleCloseDialog = () => {
    closeTripItemEditDialog();
    if (!tripItem) return;
    deleteHighlight({
      tripId: tripItem.trip,
      payload: { dayItem: tripItem._id },
    });
  };

  return (
    <Dialog
      open={!!tripItem}
      onOpenChange={(open) => {
        if (open) return;
        handleCloseDialog();
      }}
    >
      <DialogContent className="sm:max-w-[620px]">
        <DialogHeader>
          <DialogTitle>Edit trip item</DialogTitle>
          <DialogDescription>
            Make changes to your trip item. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        <UpdateTripItemForm
          initialTripItemData={tripItem}
          onUpdate={handleCloseDialog}
        />
      </DialogContent>
    </Dialog>
  );
};
