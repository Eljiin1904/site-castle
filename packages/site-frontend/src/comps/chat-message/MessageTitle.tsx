import { ChatMessageDocument } from "@core/types/chat/ChatMessageDocument";
import { PlayerUser } from "@core/types/users/PlayerUser";
import { Users } from "@client/services/users";
import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { UserBadge } from "@client/comps/user/UserBadge";
import { Vector } from "@client/comps/vector/Vector";
import { useHiddenInfo } from "#app/hooks/users/useHiddenInfo";

export const MessageTitle = ({ message }: { message: ChatMessageDocument }) => {
  if (message.agent === "user") {
    const user = message.user as PlayerUser;
    const role = "role" in user ? Users.getRoleInfo(user.role) : undefined;

    return (
      <Div
        align="center"
        gap={8}
      >
        <Span
          size={12}
          fontWeight="medium"
          color={role?.color || "dark-sand"}
        >
          {user.name}
        </Span>
        {"xp" in user && (
          <UserBadge
            xp={user.xp}
            mr={6}
          />
        )}
        {role && (
          <Vector
            className="role-icon"
            as={role.icon}
            color={role.color}
            size={13}
            ml={4}
            data-tooltip-id="app-tooltip"
            data-tooltip-content={role.tooltip}
          />
        )}
      </Div>
    );
  } else if (
    message.kind === "advent-bonus" ||
    message.kind === "blackjack-win" ||
    message.kind === "case-game-win" ||
    message.kind === "double-win" ||
    message.kind === "dice-win" ||
    message.kind === "gem-case-win" ||
    message.kind === "holiday-case-win" ||
    message.kind === "level-case-win" ||
    message.kind === "case-battle-win" ||
    message.kind === "rain-tip" ||
    message.kind === "limbo-win"
  ) {
    const user = message.user as PlayerUser;
    const role = "role" in user ? Users.getRoleInfo(user.role) : undefined;
    const { username, xp, hideInfo } = useHiddenInfo(user);

    return (
      <Div align="center">
        {!hideInfo && "xp" in user && (
          <UserBadge
            xp={xp}
            mr={6}
          />
        )}
        <Span
          size={13}
          fontWeight="medium"
          color={hideInfo ? "white" : role?.color || "white"}
        >
          {username}
        </Span>
        {!hideInfo && role && (
          <Vector
            className="role-icon"
            as={role.icon}
            color={role.color}
            size={13}
            ml={4}
            data-tooltip-id="app-tooltip"
            data-tooltip-content={role.tooltip}
          />
        )}
      </Div>
    );
  } else if (message.kind === "double-streak" || message.kind === "rain-payout") {
    return (
      <Div
        align="center"
        gap={8}
      >
        <Span
          size={12}
          color="sand"
        >
          {"Castle.com"}
        </Span>
        <Span
          size={10}
          color="dark-brown"
          fontWeight="bold"
          bg="chat-system"
          textTransform="uppercase"
          p={4}
        >
          {"Admin"}
        </Span>
      </Div>
    );
  } else {
    return null;
  }
};
