import { useForm } from "@tanstack/react-form";
import { useTripData } from "../../hooks/use-trip-data";
import { editTripFormSchema } from "../../utils/schema";
import { useUpdateTrip } from "../../hooks/use-update-trip";
import type { DateRange } from "react-day-picker";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";

export const EditTripForm = ({ onEdit }: { onEdit: () => void }) => {
  const { updateTrip, isUpdating } = useUpdateTrip({ onUpdate: onEdit });
  const tripData = useTripData();

  const initialDates: DateRange | undefined =
    tripData?.startDate && tripData.endDate
      ? { from: new Date(tripData.startDate), to: new Date(tripData.endDate) }
      : undefined;

  const form = useForm({
    defaultValues: {
      name: tripData?.name ?? "",
      dates: initialDates,
    },
    validators: { onChange: editTripFormSchema },
    onSubmit: ({ value }) => {
      const parsedValue = editTripFormSchema.parse(value);
      updateTrip({ payload: parsedValue });
    },
  });

  const handleSubmit = () => {
    form.handleSubmit();
  };

  return (
    <>
      <form
        id="update-trip"
        className="my-6 grid gap-6"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <form.Field
          name="name"
          children={(field) => (
            <Field>
              <FieldLabel htmlFor="name">Trip name</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="name"
                  placeholder="Summer madness on Mallorca"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <InputGroupAddon>#</InputGroupAddon>
              </InputGroup>
              <FieldError errors={field.state.meta.errors} />
            </Field>
          )}
        />

        <form.Field
          name="dates"
          children={(field) => (
            <Field>
              <FieldLabel>Trip dates</FieldLabel>
              <Calendar
                mode="range"
                numberOfMonths={2}
                className="w-full border-input rounded-md border shadow-xs mb-4"
                selected={field.state.value}
                onSelect={field.handleChange}
              />
            </Field>
          )}
        />
      </form>

      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline" disabled={isUpdating}>
            Cancel
          </Button>
        </DialogClose>
        <Button type="submit" form="update-trip" disabled={isUpdating}>
          Save changes
        </Button>
      </DialogFooter>
    </>
  );
};
