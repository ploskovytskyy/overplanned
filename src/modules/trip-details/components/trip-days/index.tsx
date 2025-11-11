import { useDaysWithItems } from "../../hooks/use-days-with-items";
import { TripDayCard } from "./trip-day-card";

export const TripDays = () => {
  const days = useDaysWithItems();

  if (!days) return null;

  return (
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
  );
};
