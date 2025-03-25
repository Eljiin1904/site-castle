import { useMemo } from "react";
import { DoubleBetKind } from "@core/types/double/DoubleBetKind";
import { Span } from "@client/comps/span/Span";
import { Div } from "@client/comps/div/Div";
import { Tokens, TokensProps } from "@client/comps/tokens/Tokens";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { Double } from "#app/services/double";
import { BetBoardTicketCard } from "./BetBoardTicketCard";
import { DoubleBetIcon } from "./DoubleBetIcon";
import { useTranslation } from "@core/services/internationalization/internationalization";

export const BetBoardTicketGrid = ({ betKind }: { betKind: DoubleBetKind }) => {
  const tickets = useAppSelector((x) => x.double.tickets);
  const round = useAppSelector((x) => x.double.round);
  const layout = useAppSelector((x) => x.style.mainLayout);
  const {t} = useTranslation(["games\\double"]);
  const small = layout === "mobile";

  const { accent, multiplier } = useMemo(() => {
    let accent: TokensProps["accent"];
    let multiplier = 1;

    if (round.status === "completed") {
      if (Double.isWinningBet(betKind, round.roll.value)) {
        accent = "positive";
        multiplier = Double.getMultiplierFromBetKind(betKind);
      } else {
        accent = "negative";
      }
    }

    return { accent, multiplier };
  }, [round, betKind]);

  const { filtered, betCount, betAmount } = useMemo(() => {
    const filtered = tickets.filter((x) => x.betKind === betKind);
    filtered.sort((a, b) => b.betAmount - a.betAmount);
    return {
      filtered,
      betCount: filtered.length,
      betAmount: filtered.reduce((acc, x) => (acc += x.betAmount), 0),
    };
  }, [tickets, betKind]);

  const ItemsMemo = useMemo(
    () =>
      filtered.slice(0, 10).map((ticket) => (
        <BetBoardTicketCard
          key={ticket._id}
          ticket={ticket}
          accent={accent}
          multiplier={multiplier}
        />
      )),
    [filtered, multiplier, accent],
  );

  return (
    <Div
      fx
      column
      border
      borderColor="brown-4"
      style={{ opacity: accent === "negative" ? 0.6 : 1 }}
    >
      <Div
        justify="space-between"
        px={16}
        py={small ? 8 : 12}       
      >
        <Div gap={12}  center>
          {small && <DoubleBetIcon betKind={betKind} />}
          <Span color="dark-sand" weight="medium">{ t("games\\double:bet",{count: betCount})}</Span>
        </Div>
        <Tokens
          value={betAmount * multiplier}
          accent={accent}
        />
      </Div>
      <Div column>{ItemsMemo}</Div>
    </Div>
  );
};
