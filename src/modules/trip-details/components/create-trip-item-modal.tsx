import { SquarePen } from "lucide-react";
import { useState } from "react";
import { useParams } from "@tanstack/react-router";
import { useMutateTripHighlights } from "../hooks/use-mutate-trip-highlights";
import CreateTripItemForm from "./create-trip-item-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const CreateTripItemModal = ({ day }: { day: string }) => {
  const { tripId } = useParams({ from: "/_authed/trips/$tripId" });

  const [open, setOpen] = useState(false);

  const { createHighlight, deleteHighlight } = useMutateTripHighlights();

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);

    if (isOpen) {
      createHighlight({
        tripId,
        payload: { element: "day_card", dayKey: day },
      });
    } else {
      deleteHighlight({
        tripId,
        payload: { dayKey: day },
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button size="sm" variant="ghost">
          <SquarePen className="size-4" />
          Add new item
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined} className="sm:max-w-[620px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <SquarePen className="size-5" />
            New item
          </DialogTitle>
        </DialogHeader>
        <CreateTripItemForm
          day={day}
          onCreate={() => handleOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
};
