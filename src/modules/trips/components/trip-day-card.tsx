import { CreateTripItemModal } from "./create-trip-item-modal";

export const TripDayCard = () => {
  return (
    <div className="bg-card border rounded-md p-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-bold">Day 1</h2>
        <span className="opacity-60">Mon - Dec 21</span>
      </div>

      <div className="grid empty:hidden gap-4 mb-3">
        {/* <div className="p-2 border">
          <span className="font-medium">Morning</span>
        </div>*/}
      </div>

      <CreateTripItemModal />
    </div>
  );
};
