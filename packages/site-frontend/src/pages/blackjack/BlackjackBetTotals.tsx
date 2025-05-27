import "./BlackjackBetTotals.scss";
import { entries } from "@client/services/utility/Utility";
import { useLibrarySelector } from "@client/hooks/store/useLibrarySelector";
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
import { Dropdown } from "@client/comps/dropdown/Dropdown";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";
import { useState } from "react";

export const BlackjackBetTotals = () => {
  const layout = useAppSelector((x) => x.style.mainLayout);

  return (
    <Div
      className="BlackjackBetTotals"
      zIndex={10}
    >
      <MainBetTotals />
      <BlackjackSidebetTotals />
    </Div>
  );
};

function MainBetTotals() {
  const collapse = useIsMobileLayout();
  const [sortIndex, setSortIndex] = useState(0);
  const mainLayout = useLibrarySelector((x) => x.style.mainLayout);

  // const { t } = useTranslation();
  const betAmounts = useDisplayBetAmounts();

  const mainBet = betAmounts["main-bet"];
  const sideBets = entries(betAmounts).reduce((acc, [key, val]) => {
    if (key === "main-bet") return acc;
    return acc + val;
  }, 0);
  const total = mainBet + sideBets;

  return (
    <Div fx>
      {mainLayout == "desktop" || mainLayout == "laptop" ? (
        <Span
          className="MainBetTotals"
          fx
          gap={16}
          width={200}
          bg={"black-overlay"}
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
      ) : (
        <Div
          fx
          width={200}
        >
          <Dropdown
            type="display"
            fx
            size="md"
            // placeholder={`Total Bet: ${total}`}
            options={[
              { label: `Total Bet: $${total}` },
              { label: `Side Bet: $${sideBets}` },
              { label: `Main Bet: $${mainBet}` },
            ]}
            value={0}
            collapse={collapse}
          />
        </Div>
      )}
    </Div>
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
