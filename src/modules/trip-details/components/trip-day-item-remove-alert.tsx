import { useOpenTripItemRemoveAlert } from "../hooks/use-open-trip-item-remove-alert";
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

  const handleRemoveTripItem = () => {
    console.log("Remove trip item with ID:", tripItemId);
  };

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
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleRemoveTripItem}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
