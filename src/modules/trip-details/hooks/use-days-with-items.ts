import { eachDayOfInterval } from "date-fns";
import { useMemo } from "react";
import { formatDayKey } from "../utils/date-utils";
import { useTripData } from "./use-trip-data";
import type { Doc } from "convex/_generated/dataModel";

export type TripItem = Doc<"tripItems">;

type DayData = {
  items: Array<TripItem>;
  isOutside: boolean;
};

export const useDaysWithItems = () => {
  const data = useTripData();

  const daysWithItems = useMemo(() => {
    if (!data) return null;

    const daysMap = new Map<string, DayData>(
      eachDayOfInterval({
        start: data.startDate,
        end: data.endDate,
      }).map((day) => {
        const dayKey = formatDayKey(day);
        return [dayKey, { items: [], isOutside: false }];
      }),
    );

    for (const item of data.items) {
      const itemDayKey = item.startDate.split(":")[0];

      const tripDay = daysMap.get(itemDayKey);

      if (!tripDay || tripDay.isOutside) {
        daysMap.set(itemDayKey, {
          items: tripDay ? [...tripDay.items, item] : [item],
          isOutside: true,
        });
        continue;
      }

      daysMap.set(itemDayKey, {
        items: [...tripDay.items, item],
        isOutside: false,
      });
    }

    const days = Array.from(daysMap, ([day, value]) => ({
      day,
      items: value.items.sort((a, b) => a.startDate.localeCompare(b.startDate)),
      isOutside: value.isOutside,
    })).sort((a, b) => a.day.localeCompare(b.day));

    return days;
  }, [data]);

  return daysWithItems;
};
