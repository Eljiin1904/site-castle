import { DoubleTicketDocument } from "@core/types/double/DoubleTicketDocument";
import { Span } from "@client/comps/span/Span";
import { Div } from "@client/comps/div/Div";
import { Tokens, TokensProps } from "@client/comps/tokens/Tokens";
import { UserBadge } from "@client/comps/user/UserBadge";
import { Conditional } from "@client/comps/conditional/Conditional";
import { UserIcon } from "#app/comps/user-icon/UserIcon";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { useHiddenInfo } from "#app/hooks/users/useHiddenInfo";
import "./BetBoardTicketCard.scss";

export const BetBoardTicketCard = (props: {
  ticket: DoubleTicketDocument;
  accent: TokensProps["accent"];
  multiplier: number;
}) => {
  const layout = useAppSelector((x) => x.style.mainLayout);

  return (
    <Div
      className="BetBoardTicketCard"
      fx
      borderTop
      borderColor="brown-4"
    >
      <Conditional
        value={layout}
        mobile={<LaptopDesktopContent {...props} />}
        tablet={<LaptopDesktopContent {...props} />}
        laptop={<LaptopDesktopContent {...props} />}
        desktop={<LaptopDesktopContent {...props} />}
      />
    </Div>
  );
};

const MobileContent = ({
  ticket,
  accent,
  multiplier,
}: {
  ticket: DoubleTicketDocument;
  accent: TokensProps["accent"];
  multiplier: number;
}) => {
  const { username, xp, hideInfo } = useHiddenInfo(ticket.user);

  return (
    <Div
      className="inner-content"
      fx
      px={12}
      py={12}
      justify="space-between"
      align="center"
    >
      <Div
        gap={6}
        align="center"
      >
        <UserIcon
          width="24px"
          avatarIndex={ticket.user.avatarIndex}
          avatarId={ticket.user.avatarId}
          hidden={hideInfo}
        />
        {!hideInfo && <UserBadge xp={xp} />}
        <Span
          color={hideInfo ? "gray" : "white"}
          textOverflow="ellipsis"
        >
          {username}
        </Span>
      </Div>
      <Tokens
        value={ticket.betAmount * multiplier}
        accent={accent}
        hideIcon
      />
    </Div>
  );
};

const LaptopDesktopContent = ({
  ticket,
  accent,
  multiplier,
}: {
  ticket: DoubleTicketDocument;
  accent: TokensProps["accent"];
  multiplier: number;
}) => {
  const { username, xp, hideInfo } = useHiddenInfo(ticket.user);

  return (
    <Div
      className="inner-content"
      fx
      px={16}
      py={8}
      justify="space-between"
      align="center"
    >
      <Div
        gap={8}
        align="center"
      >
        <UserIcon
          width="24px"
          avatarIndex={ticket.user.avatarIndex}
          avatarId={ticket.user.avatarId}
          hidden={hideInfo}
        />
        {/* {!hideInfo && <UserBadge xp={xp} />} */}
        <Span
          color={hideInfo ? "gray" : "light-sand"}
          textOverflow="ellipsis"
          weight="medium"
        >
          {username}
        </Span>
      </Div>
      <Tokens
        value={ticket.betAmount * multiplier}
        accent={accent}
      />
    </Div>
  );
};
