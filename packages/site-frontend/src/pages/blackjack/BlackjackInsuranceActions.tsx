import "./BlackjackInsuranceActions.scss";
import { useCallback } from "react";
import { useMainBet } from "../../services/blackjack/redux/selectors";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { Intimal } from "@core/services/intimal";
import { getInsuranceBetAmount } from "#app/services/blackjack/Blackjack";
import { useSubmitAction } from "#app/services/blackjack/hooks/useSubmitAction";
import { BlackjackButton } from "./BlackjackButton";
import { Div } from "@client/comps/div/Div";
import { Trans, useTranslation } from "@core/services/internationalization/internationalization";
import { Tokens } from "@client/comps/tokens/Tokens";

export const BlackjackInsuranceActions = () => {
  const mainBet = useMainBet();
  const processing = useAppSelector((state) => state.blackjack.processing);
  const submitAction = useSubmitAction();
  const cardsDealt = useAppSelector((state) => state.blackjack.cardsDealt);
  const {t} = useTranslation('games//blackjack');
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
      <Div>
        
        <Div className="desc" color="light-sand">
          {
            //@ts-ignore
            <Trans
              i18nKey="games\blackjack:insurance"
              values={{ insurance: Intimal.toDecimal(getInsuranceBetAmount(mainBet))}}
              components={[
                <Tokens
                  value={Intimal.toDecimal(getInsuranceBetAmount(mainBet))}
                  fontSize={14}
                  color="light-sand"
                />
              ]}
            />
          }
        </Div>
      </Div>
      <Div className="buttons">
        <BlackjackButton
          text={t('common:yes')}
          enabled={!processing}
          onClick={() => onBuyInsurance(true)}
        />
        <BlackjackButton
          text={t('common:no')}
          enabled={!processing}
          onClick={() => onBuyInsurance(false)}
          secondary
        />
      </Div>
    </Div>
  );
};
