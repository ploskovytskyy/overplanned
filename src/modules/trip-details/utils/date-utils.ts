import {
  format,
  formatDuration as formatDurationLib,
  intervalToDuration,
} from "date-fns";

export const formatDateShort = (date: string | Date) => {
  return format(date, "MMM d");
};

export const formatDateShortWithWeekday = (date: string | Date) => {
  return format(date, "EEEE - MMM d");
};

export const formatDateWeekday = (date: string | Date) => {
  return format(date, "EEEE");
};

export const formatDayKey = (date: string | Date) => {
  return format(date, "yyyy-MM-dd");
};

export const formatDayItemTime = (date: string | Date) => {
  return format(date, "h:mm a");
};

export const formatDuration = (start: string | Date, end: string | Date) => {
  return formatDurationLib(intervalToDuration({ start, end }));
};
