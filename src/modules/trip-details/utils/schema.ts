import z from "zod";

export const createTripItemFormSchema = z.object({
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

export type CreateTripItemFormSchema = z.infer<typeof createTripItemFormSchema>;
