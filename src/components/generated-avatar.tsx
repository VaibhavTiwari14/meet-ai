import { botttsNeutral, initials } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface GeneratedAvatarProps {
  seed: string;
  className?: string;
  varient: "botttsNeutral" | "initials";
}

export const GenerateAvatar = ({
  seed,
  className,
  varient,
}: GeneratedAvatarProps) => {
  const avatar =
    varient === "botttsNeutral"
      ? createAvatar(botttsNeutral, { seed })
      : createAvatar(initials, {
          seed,
          fontWeight: 500,
          fontSize: 42,
        });

  return (
    <Avatar className={cn(className)}>
      <AvatarImage src={avatar.toDataUri()} alt="Avatar" />
      <AvatarFallback> {seed.charAt(0).toUpperCase()}</AvatarFallback>
    </Avatar>
  );
};
