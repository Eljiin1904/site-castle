import { FC } from "react";
import { Strings } from "@core/services/strings";
import { Users } from "#client/services/users";
import { Div } from "../div/Div";
import { Img } from "../img/Img";
import { Span } from "../span/Span";
import { StyledLayoutProps } from "../styled/Styled";

export type UserBadgeProps = StyledLayoutProps & {
  xp: number;
  fontSize?: Unit;
};

export const UserBadge: FC<UserBadgeProps> = ({
  xp,
  fontSize = 12,
  ...forwardProps
}) => {
  const level = Users.getLevel(xp);
  const badge = Users.getLevelBadge(level);
  const tooltip = Strings.kebabToTitle(badge.replace("/badges/", ""));

  return (
    <Div
      center
      hover="none"
      data-tooltip-id="app-tooltip"
      data-tooltip-content={tooltip}
      {...forwardProps}
    >
      <Img
        type="png"
        path={badge}
        width={`${fontSize + 3}px`}
      />
      <Span
        size={fontSize}
        family="title"
        weight="bold"
        color="gray"
        ml={3}
      >
        {level}
      </Span>
    </Div>
  );
};
