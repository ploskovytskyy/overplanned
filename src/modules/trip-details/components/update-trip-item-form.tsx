import { useForm } from "@tanstack/react-form";
import { updateTripItemFormSchema } from "../utils/schema";
import { useUpdateTripItem } from "../hooks/use-update-trip-item";
import { Title } from "./create-trip-item-form/title";
import { Time } from "./create-trip-item-form/time";
import { Url } from "./create-trip-item-form/url";
import { TypeToggleGroup } from "./create-trip-item-form/type-toggle-group";
import type { TripItem } from "../hooks/use-days-with-items";
import { Separator } from "@/components/ui/separator";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export const UpdateTripItemForm = ({
  initialTripItemData: tripItem,
  onUpdate,
}: {
  initialTripItemData: TripItem | null;
  onUpdate: () => void;
}) => {
  const { updateTripItem, isUpdating } = useUpdateTripItem({ onUpdate });

  const [startday, startHours, startMinutes] =
    tripItem?.startDate.split(":") ?? [];

  const [_endDay, endHours, endMinutes] = tripItem?.endDate.split(":") ?? [];

  const form = useForm({
    defaultValues: {
      type: tripItem?.type ?? "",
      title: tripItem?.title ?? "",
      time: {
        startTime: `${startHours}:${startMinutes}`,
        endTime: `${endHours}:${endMinutes}`,
      },
      url: tripItem?.url ?? "",
    },
    validators: { onSubmit: updateTripItemFormSchema },
    onSubmit: ({ value }) => {
      if (!tripItem) return;
      updateTripItem({
        tripItemId: tripItem._id,
        day: startday,
        payload: value,
      });
    },
  });

  return (
    <>
      <form
        id="update-trip-item"
        className="grid gap-6 my-6"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <form.Field
          name="type"
          children={(field) => (
            <TypeToggleGroup
              selectedType={field.state.value}
              onTypeChange={field.handleChange}
            />
          )}
        />

        <form.Field
          name="title"
          children={(field) => (
            <Title
              value={field.state.value}
              onChange={field.handleChange}
              errors={field.state.meta.errors}
            />
          )}
        />

        <form.Field
          name="time"
          children={(field) => (
            <Time
              value={field.state.value}
              onChange={field.handleChange}
              errors={field.state.meta.errors}
            />
          )}
        />

        <Separator />

        <form.Field
          name="url"
          children={(field) => (
            <Url value={field.state.value} onChange={field.handleChange} />
          )}
        />
      </form>

      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline" disabled={isUpdating}>
            Cancel
          </Button>
        </DialogClose>
        <Button type="submit" form="update-trip-item" disabled={isUpdating}>
          Save changes
        </Button>
      </DialogFooter>
    </>
  );
};
