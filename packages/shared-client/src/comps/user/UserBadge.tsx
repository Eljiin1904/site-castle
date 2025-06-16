import { FC } from "react";
import { Users } from "#client/services/users";
import { Div } from "../div/Div";
import { Span } from "../span/Span";
import { StyledLayoutProps } from "../styled/Styled";
import { Vector } from "../vector/Vector";

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
  const icon = Users.getLevelIcon(level);
  const color = Users.getLevelColor(level);

  return (
    <Div
      center
      hover="none"
      {...forwardProps}
      gap={4}
    >
      {icon && <Vector as={icon} size={16} color={color} />}
      <Span
        size={fontSize}
        color={color}
      >
        {level}
      </Span>
    </Div>
  );
};
