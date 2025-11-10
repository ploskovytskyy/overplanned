import { SquarePen } from "lucide-react";
import CreateTripItemForm from "./create-trip-item-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const CreateTripItemModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="ghost">
          <SquarePen className="size-4" />
          Add new item
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined} className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <SquarePen className="size-5" />
            New item
          </DialogTitle>
        </DialogHeader>
        <CreateTripItemForm />
      </DialogContent>
    </Dialog>
  );
};
