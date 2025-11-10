import { Field, FieldError, FieldLabel } from "@/components/ui/field";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

export const Title = ({
  value,
  onChange,
  errors,
}: {
  value: string;
  onChange: (value: string) => void;
  errors?: Array<{ message?: string } | undefined>;
}) => {
  return (
    <Field className="">
      <FieldLabel htmlFor="title">Title</FieldLabel>
      <InputGroup>
        <InputGroupInput
          id="title"
          placeholder="Trip item title"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <InputGroupAddon>#</InputGroupAddon>
      </InputGroup>
      <FieldError errors={errors} />
    </Field>
  );
};
