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

  return (
    <Dialog
      open={!!tripItem}
      onOpenChange={(open) => {
        if (open) return;
        closeTripItemEditDialog();
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
          onUpdate={closeTripItemEditDialog}
        />
      </DialogContent>
    </Dialog>
  );
};
