import { createFileRoute, useNavigate } from "@tanstack/react-router";

import { ArrowLeft, ArrowRight, Check, User, Users } from "lucide-react";
import { useState } from "react";

import { api } from "convex/_generated/api";
import { toast } from "sonner";
import { useConvexMutation } from "@convex-dev/react-query";
import { useMutation } from "@tanstack/react-query";
import { format } from "date-fns";
import type { DateRange } from "react-day-picker";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { formatDayKey } from "@/modules/trip-details/utils/date-utils";

export const Route = createFileRoute("/_authed/create")({
  component: RouteComponent,
});

type Step = "name" | "people" | "date";

const descriptions = {
  name: "Create a memorable name, make sure it feels good...",
  people: "Who will join you on this adventure?",
  date: "When will you go?",
};

function RouteComponent() {
  const navigate = useNavigate();

  const { mutateAsync: createTrip, isPending: isCreating } = useMutation({
    mutationFn: useConvexMutation(api.trips.createTrip),
    onError: (error) => {
      toast.error("Could not create trip!", { description: error.message });
    },
  });

  const [step, setStep] = useState<Step>("name");
  const [name, setName] = useState("");
  const [people, setPeople] = useState<string | { min: string; max: string }>(
    "",
  );
  const [date, setDate] = useState<DateRange | undefined>(undefined);

  const togglePeopleValueType = () => {
    if (typeof people === "string") {
      setPeople({ min: people, max: people });
    } else {
      setPeople(people.min);
    }
  };

  const isPeopleFieldValid = (() => {
    if (typeof people === "string") {
      return Number(people) > 0;
    } else {
      const min = Number(people.min);
      const max = Number(people.max);
      return min > 0 && max > min;
    }
  })();

  const isDateValid = !!date && date.from && date.to;

  const handleCreateTrip = async () => {
    if (!name || !isPeopleFieldValid || !date?.from || !date.to) {
      toast.error("Failed to create a trip, data is invalid");
      return;
    }

    const minPeople =
      typeof people === "string" ? Number(people) : Number(people.min);

    const maxPeople =
      typeof people === "string" ? Number(people) : Number(people.max);

    const startDate = formatDayKey(date.from);
    const endDate = formatDayKey(date.to);

    const res = await createTrip({
      name,
      minPeople,
      maxPeople,
      startDate,
      endDate,
    });

    navigate({
      to: "/trips/$tripId",
      params: { tripId: res },
    });
  };

  return (
    <div className="container max-w-xl py-22">
      <div className="text-center mb-12">
        <h1 className="text-2xl font-bold mb-2">Start you trip today 🌴</h1>
        <p className="text-sm opacity-50">{descriptions[step]}</p>
      </div>

      {step === "name" && (
        <>
          <Field className="mb-6">
            <FieldLabel htmlFor="name">Name your trip</FieldLabel>
            <InputGroup>
              <InputGroupInput
                id="name"
                placeholder="Summer madness on Mallorca"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <InputGroupAddon>#</InputGroupAddon>
            </InputGroup>
          </Field>

          <div className="flex justify-end">
            <Button disabled={!name} onClick={() => setStep("people")}>
              Next <ArrowRight />
            </Button>
          </div>
        </>
      )}

      {step === "people" && (
        <>
          <Field className="mb-4">
            <FieldLabel>How many people?</FieldLabel>
            {typeof people === "string" ? (
              <InputGroup>
                <InputGroupInput
                  value={people}
                  onChange={(e) => setPeople(e.target.value)}
                  type="number"
                  placeholder="0"
                />
                <InputGroupAddon>
                  <Users />
                </InputGroupAddon>
              </InputGroup>
            ) : (
              <div className="flex items-center gap-4">
                <InputGroup>
                  <InputGroupInput
                    value={people.min}
                    onChange={(e) =>
                      setPeople({ ...people, min: e.target.value })
                    }
                    type="number"
                    placeholder="From"
                  />
                  <InputGroupAddon>
                    <User />
                  </InputGroupAddon>
                </InputGroup>

                <InputGroup>
                  <InputGroupInput
                    value={people.max}
                    onChange={(e) =>
                      setPeople({ ...people, max: e.target.value })
                    }
                    type="number"
                    placeholder="To"
                  />
                  <InputGroupAddon>
                    <Users />
                  </InputGroupAddon>
                </InputGroup>
              </div>
            )}
          </Field>

          <div className="mb-6 flex gap-2">
            <Checkbox
              id="not-sure"
              className="size-5"
              checked={typeof people !== "string"}
              onCheckedChange={togglePeopleValueType}
            />
            <Label htmlFor="not-sure">I want to select range</Label>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setStep("name")}>
              <ArrowLeft /> Change name
            </Button>
            <Button
              disabled={!isPeopleFieldValid}
              onClick={() => setStep("date")}
            >
              Next <ArrowRight />
            </Button>
          </div>
        </>
      )}

      {step === "date" && (
        <>
          <Calendar
            mode="range"
            numberOfMonths={2}
            className="w-full border-input rounded-md border shadow-xs mb-4"
            selected={date}
            onSelect={setDate}
          />

          <div className="flex justify-end gap-2">
            <Button
              disabled={isCreating}
              variant="ghost"
              onClick={() => setStep("people")}
            >
              <ArrowLeft /> Back to people
            </Button>
            <Button
              disabled={!isDateValid || isCreating}
              onClick={handleCreateTrip}
            >
              Create <Check />
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
