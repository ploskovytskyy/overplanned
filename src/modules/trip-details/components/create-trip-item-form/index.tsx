import { useForm } from "@tanstack/react-form";
import { Check } from "lucide-react";
import { useCreateTripItem } from "../../hooks/use-create-trip-item";
import { createTripItemFormSchema } from "../../utils/schema";
import { TypeToggleGroup } from "./type-toggle-group";
import { Title } from "./title";
import { Time } from "./time";
import { Url } from "./url";

import { Separator } from "@/components/ui/separator";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function CreateTripItemForm({
  day,
  onCreate,
}: {
  day: string;
  onCreate: () => void;
}) {
  const { createTrip, isCreating } = useCreateTripItem({ onCreate });

  const form = useForm({
    defaultValues: {
      type: "activity",
      title: "",
      time: {
        startTime: "10:30",
        endTime: "10:30",
      },
      url: "",
    },
    validators: { onSubmit: createTripItemFormSchema },
    onSubmit: ({ value }) => {
      createTrip({ payload: value, day });
    },
  });

  const handleSubmit = () => {
    form.handleSubmit();
  };

  return (
    <>
      <div className="grid gap-6 my-6">
        <form.Field
          name="type"
          children={(field) => (
            <TypeToggleGroup
              selectedType={field.state.value}
              onTypeChange={field.handleChange}
            />
          )}
        />

        <Separator />

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
      </div>

      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline" disabled={isCreating}>
            Cancel
          </Button>
        </DialogClose>
        <Button onClick={handleSubmit} disabled={isCreating}>
          <Check className="size-4" />
          Add item
        </Button>
      </DialogFooter>
    </>
  );
}
