import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { api } from "convex/_generated/api";
import { useQuery } from "convex/react";
import { ExternalLink } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useConvexMutation } from "@convex-dev/react-query";
import type { Id } from "convex/_generated/dataModel";

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authed/invite/$inviteId")({
  component: RouteComponent,
});

function RouteComponent() {
  const params = Route.useParams();
  const inviteId = params.inviteId as Id<"invites">;

  const navigate = useNavigate();

  const invite = useQuery(api.invites.getInviteData, { inviteId });

  const { mutate: acceptInvite, isPending: isAcceptingInvite } = useMutation({
    mutationFn: useConvexMutation(api.invites.acceptInvite),
    onSuccess: () => {
      if (!invite) return;
      navigate({
        to: "/trips/$tripId",
        params: { tripId: invite.tripData._id },
      });
    },
  });

  if (!invite) return null;

  if (invite.accepted) {
    return (
      <Empty className="min-h-page">
        <EmptyHeader>
          <EmptyMedia variant="icon">✅</EmptyMedia>
          <EmptyTitle>
            You already joined the "{invite.tripData.name}" trip
          </EmptyTitle>
          <EmptyDescription>
            You can safely close this page and go prepare for your trip.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent className="mb-20">
          <Button asChild variant="outline">
            <Link
              to={"/trips/$tripId"}
              params={{ tripId: invite.tripData._id }}
            >
              Go to trip <ExternalLink />
            </Link>
          </Button>
        </EmptyContent>
      </Empty>
    );
  }

  return (
    <Empty className="min-h-page">
      <EmptyHeader>
        <EmptyMedia variant="icon">📩</EmptyMedia>
        <EmptyTitle>
          You've been invited to the "{invite.tripData.name}" trip
        </EmptyTitle>
        <EmptyDescription>
          Accept this invite if you want to join the trip. Otherwise, you can
          just ignore it.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="mb-20">
        <Button
          disabled={isAcceptingInvite}
          onClick={() => acceptInvite({ inviteId })}
        >
          Accept invite 🔥
        </Button>
      </EmptyContent>
    </Empty>
  );
}
