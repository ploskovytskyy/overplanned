import { Calendar, Users } from "lucide-react";
import { useTripData } from "../hooks/use-trip-data";
import { formatDateShort } from "../utils/date-utils";

export const TripDetailsHeader = () => {
  const data = useTripData();

  if (!data) return null;

  const dateLabel =
    data.startDate === data.endDate
      ? formatDateShort(data.startDate)
      : `${formatDateShort(data.startDate)} - ${formatDateShort(data.endDate)}`;

  const amountOfPeople =
    data.minPeople === data.maxPeople
      ? data.minPeople
      : `${data.minPeople}-${data.maxPeople} people`;

  return (
    <div className="grid mb-8">
      <h1 className="text-3xl font-bold mb-4">{data.name}</h1>
      <div className="flex gap-10 opacity-60 font-medium">
        <span className="flex items-center gap-2">
          <Calendar className="size-5" />
          {dateLabel}
        </span>
        <span className="flex items-center gap-2">
          <Users className="size-5" />
          {amountOfPeople}
        </span>
      </div>
    </div>
  );
};
