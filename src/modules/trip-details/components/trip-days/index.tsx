import { DndContext } from "@dnd-kit/core";
import { useDaysWithItems } from "../../hooks/use-days-with-items";
import { useUpdateItemDayOnDragEnd } from "../../hooks/use-update-item-day-on-drag-end";
import { TripDayCard } from "./trip-day-card";

export const TripDays = () => {
  const days = useDaysWithItems();
  const { updateDayForItemOnDragEnd } = useUpdateItemDayOnDragEnd();

  if (!days) return null;

  return (
    <DndContext onDragEnd={updateDayForItemOnDragEnd}>
      <div className="grid gap-4">
        {days.map(({ day, isOutside, items }, index) => (
          <TripDayCard
            key={day}
            dayKey={day}
            isOutside={isOutside}
            items={items}
            index={index + 1}
            isFirst={index === 0}
            isLast={index === days.length - 1}
          />
        ))}
      </div>
    </DndContext>
  );
};
