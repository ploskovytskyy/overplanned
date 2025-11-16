import { Calendar } from "lucide-react";
import { useTripData } from "../hooks/use-trip-data";
import { formatDateShort } from "../utils/date-utils";
import { TripActions } from "./trip-actions";

export const TripDetailsHeader = () => {
  const data = useTripData();

  if (!data) return null;

  const dateLabel =
    data.startDate === data.endDate
      ? formatDateShort(data.startDate)
      : `${formatDateShort(data.startDate)} - ${formatDateShort(data.endDate)}`;

  // const amountOfPeople =
  //   data.minPeople === data.maxPeople
  //     ? data.minPeople
  //     : `${data.minPeople}-${data.maxPeople} people`;

  return (
    <div className="grid gap-3 mb-8">
      <div className="flex text-sm gap-10 opacity-60 font-medium">
        <span className="flex items-center gap-2">
          <Calendar className="size-4" />
          {dateLabel}
        </span>
        {/* <span className="flex items-center gap-2">
            <Users className="size-5" />
            {amountOfPeople}
          </span>*/}
      </div>

      <div className="flex items-center gap-5 justify-between">
        <h1 className="text-3xl font-bold ">{data.name}</h1>
        <TripActions />
      </div>
    </div>
  );
};
