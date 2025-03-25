import { FC } from "react";
import classNames from "classnames";
import { Img, ImgProps } from "@client/comps/img/Img";

export type UserIconProps = Omit<ImgProps, "type" | "path"> & {
  avatarIndex: number;
  avatarId: string | undefined;
  hidden?: boolean;
};
/**
 * Temporarily displaying default avatar for testing purposes
 * @param param0 
 * @returns 
 */
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
      type="png"
      path={
        hidden
          ? "/avatars/temp-avatar"
          : avatarId
            ? `/avatars/${avatarId}`
            : `/avatars/avatars-default/${avatarIndex?.toString()?.padStart(3, "0")}`
      }
      {...forwardProps}
      style={{overflow: "hidden"}}
    />
  );
};
