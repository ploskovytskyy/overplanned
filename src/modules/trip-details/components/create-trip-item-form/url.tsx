import { Link } from "lucide-react";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

export const Url = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  return (
    <Field className="">
      <FieldLabel htmlFor="title">Url (optional)</FieldLabel>
      <InputGroup>
        <InputGroupInput
          id="title"
          placeholder="Trip item title"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <InputGroupAddon>
          <Link />
        </InputGroupAddon>
      </InputGroup>
      <FieldDescription>
        Add a link for a quick access on the item card
      </FieldDescription>
    </Field>
  );
};
