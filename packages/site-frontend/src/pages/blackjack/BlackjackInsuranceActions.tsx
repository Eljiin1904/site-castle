import "./BlackjackInsuranceActions.scss";
import { useCallback } from "react";
import { useMainBet } from "../../services/blackjack/redux/selectors";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { Intimal } from "@core/services/intimal";
import { getInsuranceBetAmount } from "#app/services/blackjack/Blackjack";
import { useSubmitAction } from "#app/services/blackjack/hooks/useSubmitAction";
import { Vector } from "@client/comps/vector/Vector";
import { SvgDollarSign } from "@client/svgs/common/SvgDollarSign";
import { BlackjackButton } from "./BlackjackButton";
import { Div } from "@client/comps/div/Div";

export const BlackjackInsuranceActions = ({}: {}) => {
  const mainBet = useMainBet();
  const processing = useAppSelector((state) => state.blackjack.processing);
  const submitAction = useSubmitAction();
  const cardsDealt = useAppSelector((state) => state.blackjack.cardsDealt);

  const onBuyInsurance = useCallback(
    (buyInsurance: boolean) => {
      if (processing) return;
      submitAction({ action: "insurance", buyInsurance });
    },
    [processing],
  );

  if (!cardsDealt) return null;

  return (
    <Div
      bg="black-overlay"
      py={16}
      px={16}
      width={"full"}
      className="BlackjackInsuranceActions"
    >
      <Div className="title">
        <Div className="desc">Buy insurance for</Div>
        <Div className="amount">
          <Vector
            className="icon"
            as={SvgDollarSign}
            size={14}
          />
          <Div className="gold">{Intimal.toDecimal(getInsuranceBetAmount(mainBet))}</Div>
        </Div>
        <Div className="desc">?</Div>
      </Div>
      <Div className="buttons">
        <BlackjackButton
          text="Yes"
          enabled={!processing}
          onClick={() => onBuyInsurance(true)}
        />
        <BlackjackButton
          text="No"
          enabled={!processing}
          onClick={() => onBuyInsurance(false)}
          secondary
        />
      </Div>
    </Div>
  );
};
