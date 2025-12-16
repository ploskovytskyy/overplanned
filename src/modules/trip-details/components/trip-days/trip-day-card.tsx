import { useDroppable } from "@dnd-kit/core";
import { ArrowDownFromLine } from "lucide-react";
import { CreateTripItemModal } from "../create-trip-item-modal";

import { useTripHighlights } from "../../hooks/use-trip-highlights";
import { TripDayItem } from "./trip-day-item";
import type { TripItem } from "../../hooks/use-days-with-items";
import {
  formatDateShort,
  formatDateWeekday,
} from "@/modules/trip-details/utils/date-utils";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Highlight } from "@/components/highlight";

export const TripDayCard = ({
  dayKey,
  index,
  isFirst,
  isLast,
  isOutside,
  items,
}: {
  dayKey: string;
  index: number;
  isFirst: boolean;
  isLast: boolean;
  isOutside?: boolean;
  items: Array<TripItem>;
}) => {
  const highlights = useTripHighlights();

  const thisDayHighlights = highlights?.filter((h) => h.dayKey === dayKey);

  const dayHighlight = thisDayHighlights?.length
    ? {
        name: thisDayHighlights.map((h) => h.name).join(", "),
        color: thisDayHighlights[0].color,
      }
    : undefined;

  const { isOver, setNodeRef, active } = useDroppable({
    id: `trip-day-${dayKey}`,
    data: { dayKey },
  });

  const formattedDay = formatDateShort(dayKey);
  const weekday = formatDateWeekday(dayKey);

  const dayIndexLabel = isFirst
    ? "First day"
    : isLast
      ? "Last day"
      : `Day ${index}`;

  const isOverNewDay = isOver && active?.data.current?.originalDay !== dayKey;

  return (
    <div
      ref={setNodeRef}
      className="relative bg-card transition-transform shadow-xl rounded-xl p-4"
    >
      <Highlight data={dayHighlight} rounded="xl" />

      {isOutside && (
        <Badge variant="warning" className="mb-4 font-semibold">
          Day outside your trip dates
        </Badge>
      )}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg md:text-xl font-bold flex items-center gap-2.5">
          {weekday} <Badge variant="secondary">{formattedDay}</Badge>
        </h2>
        <span className="opacity-60 text-xs md:text-sm">{dayIndexLabel}</span>
      </div>

      <div
        className={cn("relative grid gap-4 transition-transform", {
          "scale-[0.99] outline outline-green-800 rounded overflow-hidden":
            isOverNewDay,
          "mb-3": !!items.length,
        })}
      >
        {items.map((item) => {
          const dayItemHighlights = highlights?.filter(
            (h) => h.dayItem === item._id,
          );

          const dayItemHighlight = dayItemHighlights?.length
            ? {
                name: dayItemHighlights.map((h) => h.name).join(", "),
                color: dayItemHighlights[0].color,
              }
            : undefined;

          return (
            <TripDayItem
              key={item._id}
              day={dayKey}
              item={item}
              highlight={dayItemHighlight}
            />
          );
        })}

        <div
          className={cn(
            "absolute inset-0 grid place-content-center transition-opacity",
            "bg-green-50/80 invisible opacity-0",
            {
              "visible opacity-100": isOverNewDay,
            },
          )}
        >
          <div className="flex items-center gap-3 font-semibold">
            <ArrowDownFromLine className="size-4" />
            Move here
          </div>
        </div>
      </div>

      <CreateTripItemModal day={dayKey} />
    </div>
  );
};
