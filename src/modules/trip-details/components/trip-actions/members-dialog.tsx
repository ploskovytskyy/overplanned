import { useQuery } from "convex/react";
import { api } from "convex/_generated/api";
import { useParams } from "@tanstack/react-router";
import { useTripData } from "../../hooks/use-trip-data";
import { MembersInviteLink } from "./members-invite-link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UserAvatar } from "@/components/user-avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";

export const MembersDialog = ({ trigger }: { trigger: React.ReactNode }) => {
  const { tripId } = useParams({ from: "/_authed/trips/$tripId" });
  const tripData = useTripData();
  const currentUser = useQuery(api.users.currentUser);
  const members = useQuery(api.trips.members, { tripId });

  if (!members || !tripData || !currentUser) return null;

  const canManageMembers =
    tripData.role === "admin" || tripData.role === "owner";

  return (
    <Dialog>
      <DialogTrigger
        asChild
        className="cursor-pointer hover:scale-95 transition-transform"
      >
        {trigger}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[640px]">
        <DialogHeader className="mb-6">
          <DialogTitle>
            {canManageMembers ? "Manage members" : "Trip members"}
          </DialogTitle>
          <DialogDescription>
            {canManageMembers
              ? "Here you can invite and remove trip members"
              : "Here you can check all trip members"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {canManageMembers && (
            <>
              <div className="space-y-3">
                <Label>Invite via link</Label>
                <MembersInviteLink />
              </div>
              <Separator />
            </>
          )}

          <Label>Members</Label>

          <div className="space-y-4">
            {members.map((member) => (
              <div key={member.id} className="flex gap-4 items-center">
                <UserAvatar user={member} className="size-10" />

                <div className="grid">
                  <span className="text-sm font-medium">
                    {member.name ?? "No name"} ({member.role})
                  </span>
                  <span className="text-sm opacity-50">
                    {member.email ?? "-"}
                  </span>
                </div>

                {canManageMembers &&
                  member.id !== currentUser._id &&
                  member.role !== "owner" && (
                    <>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="ml-auto"
                      >
                        Remove
                      </Button>
                    </>
                  )}
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
