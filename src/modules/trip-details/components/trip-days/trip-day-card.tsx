import { ExternalLink, GripVertical, MoreHorizontalIcon } from "lucide-react";
import { CreateTripItemModal } from "../create-trip-item-modal";

import { TripItemIcon } from "../trip-item-icon";
import type { TripItem } from "../../hooks/use-days-with-items";
import {
  formatDateShort,
  formatDateWeekday,
  formatDayItemTime,
  formatDuration,
} from "@/modules/trip-details/utils/date-utils";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";

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
  const formattedDay = formatDateShort(dayKey);
  const weekday = formatDateWeekday(dayKey);

  const dayIndexLabel = isFirst
    ? "First day"
    : isLast
      ? "Last day"
      : `Day ${index}`;

  return (
    <div className={cn("bg-card shadow-xl rounded-xl p-4")}>
      {isOutside && (
        <Badge variant="warning" className="mb-4 font-semibold">
          Day outside your trip dates
        </Badge>
      )}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-bold flex items-center gap-2.5">
          {weekday} <Badge variant="secondary">{formattedDay}</Badge>
        </h2>
        <span className="opacity-60 text-sm">{dayIndexLabel}</span>
      </div>

      <div className="grid empty:hidden gap-4 mb-3">
        {items.map((item) => {
          const timeLabel =
            item.startDate === item.endDate
              ? formatDayItemTime(item.startDate)
              : `${formatDayItemTime(item.startDate)} - ${formatDayItemTime(item.endDate)} [${formatDuration(item.startDate, item.endDate)}]`;

          return (
            <div
              key={item._id}
              className="flex items-center px-2 py-2.5 shadow rounded"
            >
              <GripVertical className="size-5 opacity-30 shrink-0" />

              <TripItemIcon icon={item.type} />

              <div className="grid gap-0.5 mr-2">
                <span className="text-sm">{timeLabel}</span>
                <span className="font-medium text-sm">{item.title}</span>
              </div>

              <ButtonGroup className="ml-auto">
                <Button variant="outline" size="sm">
                  <ExternalLink />
                </Button>
                <Button
                  variant="outline"
                  size="icon-sm"
                  aria-label="More Options"
                >
                  <MoreHorizontalIcon />
                </Button>
              </ButtonGroup>
            </div>
          );
        })}
      </div>

      <CreateTripItemModal day={dayKey} />
    </div>
  );
};
