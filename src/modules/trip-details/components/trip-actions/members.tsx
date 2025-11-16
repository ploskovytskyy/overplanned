import { api } from "convex/_generated/api";
import { useQuery } from "convex/react";
import { useParams } from "@tanstack/react-router";
import { MoreHorizontal } from "lucide-react";
import { useTripData } from "../../hooks/use-trip-data";
import { MembersDialog } from "./members-dialog";
import { UserAvatar } from "@/components/user-avatar";

export const Members = () => {
  const { tripId } = useParams({ from: "/_authed/trips/$tripId" });
  const currentUser = useQuery(api.users.currentUser);
  const tripData = useTripData();
  const members = useQuery(api.trips.members, { tripId });

  if (!currentUser || !tripData || !members) return null;

  return (
    <MembersDialog
      trigger={
        <div className="relative flex -space-x-2">
          <UserAvatar className="ring-2 ring-background" user={currentUser} />
          {members
            .filter((member) => member.id !== currentUser._id)
            .slice(0, 2)
            .map((member) => (
              <UserAvatar
                className="ring-2 ring-background"
                key={member.id}
                user={member}
              />
            ))}
          <div className="relative size-8 shrink-0 grid bg-card place-content-center rounded-full border text-xs font-medium ring-2 ring-white">
            {members.length > 3 ? (
              `+${members.length - 2}`
            ) : (
              <MoreHorizontal className="size-4" />
            )}
          </div>
        </div>
      }
    />
  );
};
