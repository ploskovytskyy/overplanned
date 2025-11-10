import { useForm } from "@tanstack/react-form";
import { Check } from "lucide-react";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useConvexMutation } from "@convex-dev/react-query";
import { api } from "convex/_generated/api";
import { toast } from "sonner";
import { TypeToggleGroup } from "./type-toggle-group";
import { Title } from "./title";
import { Time } from "./time";
import { Url } from "./url";

import { Separator } from "@/components/ui/separator";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  type: z.string(),
  title: z.string().min(3, {
    error: "Title must be at least 3 characters long",
  }),
  time: z
    .object({
      startTime: z.string(),
      endTime: z.string(),
    })
    .refine(
      (data) => {
        if (data.startTime === data.endTime) return true;

        const startTime = new Date(`2025-01-01T${data.startTime}:00`);
        const endTime = new Date(`2025-01-01T${data.endTime}:00`);

        return startTime < endTime;
      },
      {
        error: "End time must be later than start time",
      },
    ),
  url: z.string(),
});

export default function CreateTripItemForm() {
  const { mutateAsync: createTrip, isPending: isCreating } = useMutation({
    mutationFn: useConvexMutation(api.tripItems.createTripItem),
    onError: (error) => {
      toast.error("Could not create trip item!", {
        description: error.message,
      });
    },
  });

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
    validators: { onSubmit: formSchema },
    onSubmit: ({ value }) => {
      console.log("Submit", value);
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
