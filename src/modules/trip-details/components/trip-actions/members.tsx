import { api } from "convex/_generated/api";
import { useQuery } from "convex/react";
import { MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export const Members = () => {
  const currentUser = useQuery(api.users.currentUser);

  if (!currentUser) return null;

  const currentUserInitials = currentUser.name?.charAt(0) || "-";
  const currentUserImage = currentUser.image;

  return (
    <div className="flex items-center gap-2">
      <Avatar>
        <AvatarImage src={currentUserImage} />
        <AvatarFallback>{currentUserInitials}</AvatarFallback>
      </Avatar>
      <Button
        variant="outline"
        size="icon-sm"
        className="-ml-4 rounded-full relative ring-background ring-2"
      >
        <MoreHorizontal />
      </Button>
    </div>
  );
};
