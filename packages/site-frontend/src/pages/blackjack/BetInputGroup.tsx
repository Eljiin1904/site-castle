import { Intimal } from "@core/services/intimal";
import { Div } from "@client/comps/div/Div";
import { Input } from "@client/comps/input/Input";
import { Button } from "@client/comps/button/Button";
import { ModalSection } from "@client/comps/modal/ModalSection";
import { ModalLabel } from "@client/comps/modal/ModalLabel";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { Blackjack } from "#app/services/blackjack";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { Dialogs } from "@client/services/dialogs";
import { LoginModal } from "#app/modals/login/LoginModal";

export const BetInputGroup = ({ disabled }: { disabled?: boolean }) => {
  const authenticated = useAppSelector((x) => x.user.authenticated);
  const tokenBalance = useAppSelector((x) => x.user.tokenBalance);
  const betAmount = useAppSelector((x) => x.blackjack.betAmount);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const setBetAmount = (x: number | undefined) => {
    if (!authenticated) {
      return Dialogs.open("primary", <LoginModal />);
    }
    dispatch(Blackjack.setBetAmount(x));
  };

  const handleMath = (f: (x: number) => number) => {
    if (!authenticated) {
      return Dialogs.open("primary", <LoginModal />);
    }
    let value = f(betAmount || 0);

    value = Math.min(tokenBalance, value);
    value = Math.max(Intimal.fromDecimal(0.01), value);
    value = Intimal.floor(value);

    setBetAmount(value);
  };

  return (
    <ModalSection>
      {/* <ModalLabel>{t("fields:bets.amount")}</ModalLabel> */}
      <Div
        align="center"
        justify="space-between"
        gap={8}
      >
        <Input
          type="currency"
          placeholder={t("fields:bets.amountPlaceholder")}
          value={betAmount}
          disabled={disabled}
          onChange={(x) => setBetAmount(x)}
        />
        <Div>
          <Button
            kind="tertiary-grey"
            label="1/2"
            width={40}
            disabled={disabled}
            onClick={() => handleMath((x) => x / 2)}
            size="xssso"
          />
          <Button
            kind="tertiary-grey"
            label="2X"
            width={40}
            disabled={disabled}
            onClick={() => handleMath((x) => x * 2)}
            size="xssso"
          />
          <Button
            kind="tertiary-grey"
            label="MAX"
            width={40}
            disabled={disabled}
            onClick={() => setBetAmount(tokenBalance)}
            size="xssso"
          />
        </Div>
      </Div>
    </ModalSection>
  );
};
