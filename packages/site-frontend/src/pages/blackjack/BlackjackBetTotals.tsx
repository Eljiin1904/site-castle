import "./BlackjackBetTotals.scss";
import { entries } from "#client/services/utility/Utility";
import { Vector } from "#client/comps/vector/Vector";
import { SvgSiteToken } from "#client/svgs/site/SvgSiteToken";
import { Intimal } from "#core/services/intimal";
import { BlackjackSidebetTotals } from "./BlackjackSidebetTotals";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { useDisplayBetAmounts } from "./useDisplayBetAmounts";
// import { useTranslation } from "#client/hooks/localization/useTranslation";

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
    <div className="MainBetTotals">
      <Item
        label={"Side Bets"}
        value={sideBets}
      />
      <div className="sep" />
      <Item
        label={"Main Bet"}
        value={mainBet}
      />
      <div className="sep" />
      <Item
        label={"Total Bet"}
        value={total}
      />
    </div>
  );
}

function Item({ label, value }: { label: string; value: number }) {
  return (
    <div className="Item">
      <div className="label">{label}</div>
      <div className="value">
        <Vector
          className="icon"
          as={SvgSiteToken}
          size={14}
        />
        <div className="text">{Intimal.toDecimal(value)}</div>
      </div>
    </div>
  );
}
