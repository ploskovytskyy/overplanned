import { Pencil } from "lucide-react";
import { useState } from "react";
import { EditTripForm } from "./edit-trip-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const EditTripDialog = () => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  return (
    <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="ghost">
          <Pencil className="size-4" />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[620px]">
        <DialogHeader>
          <DialogTitle>Edit Trip</DialogTitle>
          <DialogDescription>
            Make changes to your trip. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <EditTripForm onEdit={() => setEditDialogOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};
