import "./BlackjackBetTotals.scss";
import { entries } from "@client/services/utility/Utility";
import { Vector } from "@client/comps/vector/Vector";
import { Intimal } from "@core/services/intimal";
import { BlackjackSidebetTotals } from "./BlackjackSidebetTotals";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { useDisplayBetAmounts } from "./useDisplayBetAmounts";
import { SvgDollarSign } from "@client/svgs/common/SvgDollarSign";
import { Span } from "@client/comps/span/Span";
import { Divider } from "@client/comps/divider/Divider";

// import { useTranslation } from "#client/hooks/localization/useTranslation";
import { Div } from "@client/comps/div/Div";

export const BlackjackBetTotals = ({}: {}) => {
  return (
    <div className="BlackjackBetTotals">
      <MainBetTotals />
      <BlackjackSidebetTotals />
    </div>
  );
};

function MainBetTotals() {
  // const { t } = useTranslation();
  const betAmounts = useDisplayBetAmounts();

  const mainBet = betAmounts["main-bet"];
  const sideBets = entries(betAmounts).reduce((acc, [key, val]) => {
    if (key === "main-bet") return acc;
    return acc + val;
  }, 0);
  const total = mainBet + sideBets;

  return (
    <Span
      className="MainBetTotals"
      fx
      gap={16}
      width={200}
      bg={"tertiary-black-overlay"}
      align={"center"}
    >
      <Item
        label={"Side Bets"}
        value={sideBets}
      />
      <Divider
        as={"div"}
        borderColor={"brown-6"}
      />
      <Item
        label={"Main Bet"}
        value={mainBet}
      />

      <Divider
        as={"div"}
        borderColor={"brown-6"}
      />
      <Item
        label={"Total Bet"}
        value={total}
      />
    </Span>
  );
}

function Item({ label, value }: { label: string; value: number }) {
  return (
    <Div
      className="Item"
      justifyContent="space-between"
    >
      <Span
        className="label"
        color={"dark-sand"}
      >
        {label}
      </Span>
      <div className="value">
        <Vector
          className="icon"
          as={SvgDollarSign}
          size={14}
          color={"light-sand"}
        />
        <Span
          className="text"
          color={"light-sand"}
        >
          {Intimal.toDecimal(value)}
        </Span>
      </div>
    </Div>
  );
}
