import type { Doc } from "convex/_generated/dataModel";

import busImage from "@/assets/bus.png";
import trainImage from "@/assets/train.png";
import carImage from "@/assets/car.png";
import planeImage from "@/assets/plane.png";

import accomidationImage from "@/assets/door-3.png";
import checkInImage from "@/assets/check-in.png";
import checkOutImage from "@/assets/check-out.png";

import activityImage from "@/assets/activity-2.png";
import sightseeingImage from "@/assets/sightseeing.png";
import foodImage from "@/assets/food.png";

export type TripType = Doc<"tripItems">["type"];

export const typeGroups: Record<
  string,
  {
    thumbnail: string;
    types: Partial<
      Record<
        TripType,
        {
          icon: string;
          label: string;
        }
      >
    >;
  }
> = {
  Activity: {
    thumbnail: activityImage,
    types: {
      ["activity"]: {
        icon: activityImage,
        label: "Default",
      },
      ["sightseeing"]: {
        icon: sightseeingImage,
        label: "Sightseeing",
      },
      ["food"]: {
        icon: foodImage,
        label: "Food",
      },
    },
  },
  Transport: {
    thumbnail: busImage,
    types: {
      ["transportation-bus"]: {
        icon: busImage,
        label: "Bus",
      },
      ["transportation-train"]: {
        icon: trainImage,
        label: "Train",
      },
      ["transportation-plane"]: {
        icon: planeImage,
        label: "Plane",
      },
      ["transportation-car"]: {
        icon: carImage,
        label: "Car",
      },
    },
  },
  Accommodation: {
    thumbnail: accomidationImage,
    types: {
      ["accommodation-check-in"]: {
        icon: checkInImage,
        label: "Check-in",
      },
      ["accommodation-check-out"]: {
        icon: checkOutImage,
        label: "Check-out",
      },
    },
  },
};
