import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import type { Doc } from "convex/_generated/dataModel";

export const UserAvatar = ({
  user,
  className,
}: {
  user: Pick<Doc<"users">, "image" | "name">;
  className?: string;
}) => {
  const currentUserInitials = user.name?.charAt(0) || "-";
  const currentUserImage = user.image;
  return (
    <Avatar className={className}>
      <AvatarImage src={currentUserImage} />
      <AvatarFallback>{currentUserInitials}</AvatarFallback>
    </Avatar>
  );
};
