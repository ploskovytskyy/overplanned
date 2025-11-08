import { format } from "date-fns";

export const formatDateShort = (date: string) => {
  return format(date, "MMM d");
};

export const formatDateShortWithWeekday = (date: string) => {
  return format(date, "EEE - MMM d");
};
