import { useOpenTripItemRemoveAlert } from "../hooks/use-open-trip-item-remove-alert";
import { useRemoveTripItem } from "../hooks/use-remove-trip-item";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export const TripDayItemRemoveAlert = () => {
  const { tripItemId, closeTripItemRemoveAlert } = useOpenTripItemRemoveAlert();

  const { removeTripItem, isRemoving } = useRemoveTripItem({
    onRemove: closeTripItemRemoveAlert,
  });

  return (
    <AlertDialog
      open={!!tripItemId}
      onOpenChange={(open) => {
        if (open) return;
        closeTripItemRemoveAlert();
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this trip
            item.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isRemoving}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={isRemoving}
            onClick={() => removeTripItem(tripItemId)}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
