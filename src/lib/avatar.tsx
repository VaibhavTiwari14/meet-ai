import { botttsNeutral, initials } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";

interface Props {
  seed: string;
  variant: "bottsNeutral" | "initials";
}

export const generateAvatarURI = ({ seed, variant }: Props) : string => {
  const avatar =
    variant === "bottsNeutral"
      ? createAvatar(botttsNeutral, { seed })
      : createAvatar(initials, { seed, fontWeight: 500, fontSize: 42 });

    return avatar.toDataUri();
};
