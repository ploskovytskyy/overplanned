import { Clock } from "lucide-react";
import { Activity, useRef, useState } from "react";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

type TimeValue = {
  startTime: string;
  endTime: string;
};

export const Time = ({
  value,
  onChange,
  errors,
}: {
  value: TimeValue;
  onChange?: (value: TimeValue) => void;
  errors?: Array<{ message?: string } | undefined>;
}) => {
  const [includeEndTime, setIncludeEndTime] = useState(
    !!value.endTime && value.startTime !== value.endTime,
  );

  const endTimeInputRef = useRef<HTMLInputElement>(null);

  const handleToggleEndTime = (checked: boolean) => {
    setIncludeEndTime(checked);
    if (checked) {
      setTimeout(() => {
        endTimeInputRef.current?.focus();
      }, 0);
    } else {
      onChange?.({
        startTime: value.startTime,
        endTime: value.startTime,
      });
    }
  };

  return (
    <div className="grid gap-2">
      <div className="flex gap-4">
        <Field className="">
          <FieldLabel htmlFor="start-time">Start time</FieldLabel>
          <InputGroup>
            <InputGroupInput
              type="time"
              id="start-time"
              step="0"
              className="bg-transparent appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
              value={value.startTime}
              onChange={(e) => {
                onChange?.({
                  startTime: e.target.value,
                  endTime: includeEndTime ? value.endTime : e.target.value,
                });
              }}
            />
            <InputGroupAddon>
              <Clock className="size-4" />
            </InputGroupAddon>
          </InputGroup>

          <div className="flex gap-2">
            <Checkbox
              checked={includeEndTime}
              onCheckedChange={(checked) => handleToggleEndTime(!!checked)}
              id="include-end-time"
              className="size-4"
            />
            <Label htmlFor="include-end-time">Include end time</Label>
          </div>
        </Field>

        <Activity mode={includeEndTime ? "visible" : "hidden"}>
          <Field className="">
            <FieldLabel htmlFor="end-time">End time</FieldLabel>
            <InputGroup>
              <InputGroupInput
                ref={endTimeInputRef}
                type="time"
                id="end-time"
                step="0"
                min={value.startTime}
                className="bg-transparent appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                value={value.endTime}
                onChange={(e) => {
                  onChange?.({
                    startTime: value.startTime,
                    endTime: e.target.value,
                  });
                }}
              />
              <InputGroupAddon>
                <Clock className="size-4" />
              </InputGroupAddon>
            </InputGroup>
          </Field>
        </Activity>
      </div>
      <FieldError errors={errors} />
    </div>
  );
};
