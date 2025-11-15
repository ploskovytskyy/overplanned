import { Image } from "@unpic/react";
import { useState } from "react";

import { typeGroups } from "@/modules/trip-details/utils/trip-type-utils";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Label } from "@/components/ui/label";

export const TypeToggleGroup = ({
  selectedType,
  onTypeChange,
}: {
  selectedType: string;
  onTypeChange: (value: string) => void;
}) => {
  const [selectedGroup, setSelectedGroup] = useState("Activity");

  const selectedGroupTypes = typeGroups[selectedGroup].types;

  const handleGroupChange = (value: string) => {
    if (!value) return;
    setSelectedGroup(value);
    onTypeChange(Object.keys(typeGroups[value].types)[0]);
  };

  const handleTypeChange = (value: string) => {
    if (!value) return;
    onTypeChange(value);
  };

  return (
    <>
      <div className="grid gap-4">
        <Label>Type</Label>
        <ToggleGroup
          variant="outline"
          type="single"
          className="w-full "
          value={selectedGroup}
          onValueChange={handleGroupChange}
        >
          {Object.entries(typeGroups).map(([groupKey, group]) => (
            <ToggleGroupItem
              key={groupKey}
              value={groupKey}
              className="h-full grow"
            >
              <Image
                width={50}
                height={50}
                src={group.thumbnail}
                className="mix-blend-darken"
              />
              {groupKey}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>

      <div className="grid gap-4">
        <Label>Icon</Label>
        <ToggleGroup
          variant="outline"
          type="single"
          className="w-full"
          value={selectedType}
          onValueChange={handleTypeChange}
        >
          {Object.entries(selectedGroupTypes).map(([typeKey, type]) => (
            <ToggleGroupItem
              key={typeKey}
              value={typeKey}
              className="h-full grow"
            >
              <Image
                width={50}
                height={50}
                src={type.icon}
                className="mix-blend-darken"
              />
              {type.label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
    </>
  );
};
