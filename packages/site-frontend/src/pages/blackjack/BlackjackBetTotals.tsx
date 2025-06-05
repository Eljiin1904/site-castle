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
import { useState } from "react";

export const BlackjackBetTotals = () => {
  const layout = useAppSelector((x) => x.style.mainLayout);

  return (
    <Div
      className="BlackjackBetTotals"
      gap={10}
    >
      <Div>
        <MainBetTotals />
      </Div>
      <Div width={"full"}>
        <BlackjackSidebetTotals />
      </Div>
    </Div>
  );
};

function MainBetTotals() {
  const mainLayout = useLibrarySelector((x) => x.style.mainLayout);

  // const { t } = useTranslation();
  const betAmounts = useDisplayBetAmounts();
  const mainBet = betAmounts["main-bet"];
  const sideBets = entries(betAmounts).reduce((acc, [key, val]) => {
    if (key === "main-bet") return acc;
    return acc + val;
  }, 0);
  const total = mainBet + sideBets;
  const [showMenu, setShowMenu] = useState(false);

  return (
    <Div>
      {mainLayout == "desktop" || mainLayout == "laptop" ? (
        <Div
          borderColor={"brown-4"}
          border
          borderWidth={1}
          fx
        >
          <Span
            className="MainBetTotals"
            fx
            gap={16}
            width={200}
            bg={"black-overlay"}
          >
            <Item
              label={"Main Bet"}
              value={Intimal.toDecimal(mainBet)}
            />

            <Divider
              as={"div"}
              borderColor={"brown-4"}
            />

            <Item
              label={"Side Bets"}
              value={Intimal.toDecimal(sideBets)}
            />
            <Divider
              as={"div"}
              borderColor={"brown-4"}
            />
            <Item
              label={"Total Bet"}
              value={Intimal.toDecimal(total)}
            />
          </Span>
        </Div>
      ) : (
        <Div
          column
          width={"full"}
          onClick={() => setShowMenu((prev) => !prev)}
        >
          <Div
            bg={showMenu ? "brown-4" : "black-overlay"}
            width={140}
            px={10}
            py={10}
            border
            borderColor={"brown-4"}
          >
            <Div
              width={"full"}
              justify="space-between"
            >
              <Div color={showMenu ? "sand" : "white"}>Total: </Div>
              <Div color="white">
                {" "}
                <Vector
                  className="icon"
                  as={SvgDollarSign}
                  size={16}
                  color={"light-sand"}
                />
                {Intimal.toDecimal(total)}
              </Div>
            </Div>
          </Div>
          <Div width={"full"}>
            {showMenu ? (
              <Div
                zIndex={15}
                width={280}
                mt={5}
              >
                <MenuDropdown
                  mainBet={Intimal.toDecimal(mainBet)}
                  sideBets={Intimal.toDecimal(sideBets)}
                  total={Intimal.toDecimal(total)}
                />
              </Div>
            ) : null}
          </Div>
        </Div>
      )}
    </Div>
  );
}

const MenuDropdown = ({
  mainBet,
  sideBets,
  total,
}: {
  mainBet: number;
  sideBets: number;
  total: number;
}) => {
  return (
    <Div
      bg="brown-4"
      column
      zIndex={15}
      py={20}
      px={10}
      width={280}
      gap={10}
      border
      borderColor="brown-4"
    >
      <Item
        label={"Main Bet"}
        value={mainBet}
        color="dark-sand"
      />

      <Divider
        as={"div"}
        borderColor={"dark-brown-hover"}
        color="dark-sand"
      />

      <Item
        label={"Side Bets"}
        value={sideBets}
        color="dark-sand"
      />
      <Divider
        as={"div"}
        borderColor={"dark-brown-hover"}
      />
      <Item
        label={"Total Bet"}
        value={total}
        color="dark-sand"
      />
    </Div>
  );
};
function Item({ label, value, color }: { label: string; value: number; color?: Color }) {
  return (
    <Div
      className="Item"
      justifyContent="space-between"
    >
      <Div
        className="label"
        color={"dark-sand"}
      >
        {label}
      </Div>
      <Div
        className="value"
        align="center"
        justify="center"
      >
        <Vector
          className="icon"
          as={SvgDollarSign}
          size={14}
          color={"white"}
        />
        <Span
          className="text"
          color={"white"}
        >
          {value}
          {/* {Intimal.toDecimal(value)}
           */}
        </Span>
      </Div>
    </Div>
  );
}
