import { FC } from "react";
import classNames from "classnames";
import { Img, ImgProps } from "@client/comps/img/Img";

export type UserIconProps = Omit<ImgProps, "type" | "path"> & {
  avatarIndex: number;
  avatarId: string | undefined;
  hidden?: boolean;
};

export const UserIcon: FC<UserIconProps> = ({
  className,
  avatarIndex,
  avatarId,
  hidden,
  ...forwardProps
}) => {
  return (
    <Img
      className={classNames("UserIcon", className)}
      type="jpg"
      path={
        hidden
          ? "/avatars-default/999"
          : avatarId
            ? `/avatars/${avatarId}`
            : `/avatars-default/${avatarIndex.toString().padStart(3, "0")}`
      }
      {...forwardProps}
    />
  );
};
