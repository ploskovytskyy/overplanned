import { GripVertical } from "lucide-react";
import { useDraggable } from "@dnd-kit/core";
import { TripItemIcon } from "../trip-item-icon";
import { formatDayItemTime, formatDuration } from "../../utils/date-utils";
import { TripDayItemActions } from "./trip-day-item-actions";
import type { TripItem } from "../../hooks/use-days-with-items";
import { Highlight } from "@/components/highlight";
import { cn } from "@/lib/utils";

export const TripDayItem = ({
  item,
  day,
  highlight,
}: {
  item: TripItem;
  day: string;
  highlight?: { color: string; name: string };
}) => {
  const { attributes, listeners, setNodeRef, transform, setActivatorNodeRef } =
    useDraggable({
      id: `trip-item-${item._id}`,
      data: {
        originalDay: day,
        itemId: item._id,
        startDate: item.startDate,
        endDate: item.endDate,
      },
      disabled: !!highlight,
    });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: 50,
      }
    : undefined;

  const timeLabel =
    item.startDate === item.endDate
      ? formatDayItemTime(item.startDate)
      : `${formatDayItemTime(item.startDate)} - ${formatDayItemTime(item.endDate)} [${formatDuration(item.startDate, item.endDate)}]`;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="relative flex bg-card items-center px-2 py-2.5 shadow rounded"
    >
      <Highlight data={highlight} />

      <span
        ref={setActivatorNodeRef}
        {...listeners}
        className={cn("shrink-0", {
          "opacity-30 pointer-events-none": !!highlight,
        })}
      >
        <GripVertical className="size-5 opacity-30 hover:opacity-80 transition-opacity cursor-grab" />
      </span>

      <TripItemIcon icon={item.type} />

      <div className="grid gap-0.5 mr-2">
        <span className="text-xs md:text-sm">{timeLabel}</span>
        <span className="font-medium text-sm">{item.title}</span>
      </div>

      <TripDayItemActions disabled={!!highlight} itemData={item} />
    </div>
  );
};
