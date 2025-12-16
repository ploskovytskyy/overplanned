import { useParams } from "@tanstack/react-router";
import { api } from "convex/_generated/api";
import { useQuery } from "convex/react";
import { Check, Link, UserPlus, X } from "lucide-react";
import { useConvexMutation } from "@convex-dev/react-query";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const APP_URL = import.meta.env.VITE_APP_URL;

export const MembersInviteLink = () => {
  const [copied, setCopied] = useState(false);
  const { tripId } = useParams({ from: "/_authed/trips/$tripId" });
  const invites = useQuery(api.invites.getTripInvites, { tripId });

  const { mutate: createInviteUrl, isPending: isCreatingInvite } = useMutation({
    mutationFn: useConvexMutation(api.invites.createUrlInvite),
  });

  const { mutate: revokeInvite, isPending: isRevokingInvite } = useMutation({
    mutationFn: useConvexMutation(api.invites.revokeInvite),
  });

  if (!invites) return null;

  const firstLink = invites.find((invite) => !invite.user);

  if (!firstLink) {
    return (
      <Button
        variant="outline"
        onClick={() => createInviteUrl({ tripId })}
        disabled={isCreatingInvite}
      >
        <UserPlus /> Generate invite link
      </Button>
    );
  }

  const invoteUrl = `${APP_URL}/invite/${firstLink._id}`;

  return (
    <div className="grid md:flex items-center gap-2">
      <Input readOnly value={invoteUrl} />
      <Button
        size="sm"
        variant="outline"
        onClick={() => {
          navigator.clipboard.writeText(invoteUrl);
          setCopied(true);
        }}
        disabled={isRevokingInvite}
      >
        {copied ? (
          <>
            <Check /> Copied!
          </>
        ) : (
          <>
            <Link /> Copy link
          </>
        )}
      </Button>

      <Button
        size="sm"
        variant="destructive"
        onClick={() => revokeInvite({ tripId, inviteUrl: firstLink._id })}
        disabled={isRevokingInvite}
      >
        <X /> Revoke
      </Button>
    </div>
  );
};
