import { Span } from "@client/comps/span/Span";
import { Div } from "@client/comps/div/Div";
import { Tokens } from "@client/comps/tokens/Tokens";
import { UserBadge } from "@client/comps/user/UserBadge";
import { Conditional } from "@client/comps/conditional/Conditional";
import { UserIcon } from "#app/comps/user-icon/UserIcon";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { useHiddenInfo } from "#app/hooks/users/useHiddenInfo";
import { CrashTicketDocument } from "@core/types/crash/CrashTicketDocument";

export const BetBoardTicketCard = (props: {
  ticket: CrashTicketDocument;
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


const LaptopDesktopContent = ({
  ticket,
}: {
  ticket: CrashTicketDocument;
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
      {ticket.cashoutTriggered && <Span color="bright-green">
        {ticket.multiplierCrashed?.toFixed(2) ?? 0}X
      </Span>}
      <Tokens
        value={ticket.won ? (ticket.wonAmount ?? 0) : ticket.betAmount}
        accent={ticket.processed ? (ticket.won ? "positive" : "negative") : undefined}
      />
    </Div>
  );
};
