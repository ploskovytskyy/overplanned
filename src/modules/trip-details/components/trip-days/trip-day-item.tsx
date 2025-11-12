import { ExternalLink, GripVertical, MoreHorizontalIcon } from "lucide-react";
import { useDraggable } from "@dnd-kit/core";
import { TripItemIcon } from "../trip-item-icon";
import { formatDayItemTime, formatDuration } from "../../utils/date-utils";
import type { TripItem } from "../../hooks/use-days-with-items";
import { ButtonGroup } from "@/components/ui/button-group";
import { Button } from "@/components/ui/button";

export const TripDayItem = ({ item, day }: { item: TripItem; day: string }) => {
  const { attributes, listeners, setNodeRef, transform, setActivatorNodeRef } =
    useDraggable({
      id: `trip-item-${item._id}`,
      data: {
        originalDay: day,
        itemId: item._id,
        startDate: item.startDate,
        endDate: item.endDate,
      },
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
      className="flex bg-card items-center px-2 py-2.5 shadow rounded"
    >
      <span ref={setActivatorNodeRef} {...listeners} className="shrink-0">
        <GripVertical className="size-5 opacity-30 hover:opacity-80 transition-opacity cursor-grab" />
      </span>

      <TripItemIcon icon={item.type} />

      <div className="grid gap-0.5 mr-2">
        <span className="text-sm">{timeLabel}</span>
        <span className="font-medium text-sm">{item.title}</span>
      </div>

      <ButtonGroup className="ml-auto">
        <Button variant="outline" size="sm">
          <ExternalLink />
        </Button>
        <Button variant="outline" size="icon-sm" aria-label="More Options">
          <MoreHorizontalIcon />
        </Button>
      </ButtonGroup>
    </div>
  );
};
