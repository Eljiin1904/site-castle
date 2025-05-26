import { Span } from "@client/comps/span/Span";
import { Div } from "@client/comps/div/Div";
import { Tokens } from "@client/comps/tokens/Tokens";
import { UserBadge } from "@client/comps/user/UserBadge";
import { UserIcon } from "#app/comps/user-icon/UserIcon";
import { useHiddenInfo } from "#app/hooks/users/useHiddenInfo";
import { CrashTicketDocument } from "@core/types/crash/CrashTicketDocument";
import { Crash } from "@core/services/crash";

export const BetBoardTicketCard = ({ticket}: {
  ticket: CrashTicketDocument;
}) => {
  
  const { username, xp, hideInfo } = useHiddenInfo(ticket.user)
  const multiplier  = ticket.multiplierCrashed ?? ticket.targetMultiplier ?? 1;
  const cashout = ticket.cashoutTriggered;
  const processed = ticket.processed;
  const amount = cashout ? Crash.getProfit({betAmount:ticket.betAmount, multiplier}): ticket.betAmount;
  
  return (
    <Div
      className="BetBoardTicketCard"
      fx
    >
      <Div
        className="inner-content"
        fx
        justify="flex-end"
        // align="center"
        alignItems="flex-end"
        gap={24}
      >
        <Div
          gap={8}
          align="center"
          flexGrow
        >
          <UserIcon
            width="16px"
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
        {<Span color={cashout ? "bright-green" : "light-sand"} textAlign="right">
          {multiplier}X
        </Span>}
        <Tokens
          value={amount}
          accent={(cashout ? "positive" : (processed ? "negative" : undefined))}
        />
      </Div>
    </Div>
  );
};