import "./BlackjackInsuranceActions.scss";
import { useCallback } from "react";
import { useMainBet } from "../../services/blackjack/redux/selectors";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { Intimal } from "#core/services/intimal";
import { getInsuranceBetAmount } from "#app/services/blackjack/Blackjack";
import { useSubmitAction } from "#app/services/blackjack/hooks/useSubmitAction";
import { Vector } from "#client/comps/vector/Vector";
import { SvgSiteToken } from "#client/svgs/site/SvgSiteToken";
import { BlackjackButton } from "./BlackjackButton";

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
    <div className="BlackjackInsuranceActions">
      <div className="title">
        <div className="desc">Buy insurance for</div>
        <div className="amount">
          <Vector
            className="icon"
            as={SvgSiteToken}
            size={14}
          />
          <div className="gold">
            {Intimal.toDecimal(getInsuranceBetAmount(mainBet))}
          </div>
        </div>
        <div className="desc">?</div>
      </div>
      <div className="buttons">
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
      </div>
    </div>
  );
};
