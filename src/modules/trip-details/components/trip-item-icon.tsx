import { Image } from "@unpic/react";
import { typeGroups } from "../utils/trip-type-utils";
import type { TripType } from "../utils/trip-type-utils";

const tripTypeToImage = new Map(
  Object.entries(typeGroups).flatMap(([_group, { types }]) =>
    Object.entries(types),
  ),
);

export const TripItemIcon = ({ icon }: { icon: TripType }) => {
  const image = tripTypeToImage.get(icon);
  return (
    <div className="size-10 md:size-12 mr-4 ml-1.5 grid justify-center items-center shrink-0">
      {image ? (
        <Image
          src={image.icon}
          width={48}
          height={48}
          className="scale-125 mix-blend-darken"
          draggable={false}
        />
      ) : null}
    </div>
  );
};
