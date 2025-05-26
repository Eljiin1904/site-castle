import { Div } from "@client/comps/div/Div";
import { Input } from "@client/comps/input/Input";
import { Button } from "@client/comps/button/Button";
import { ModalSection } from "@client/comps/modal/ModalSection";
import { ModalLabel } from "@client/comps/modal/ModalLabel";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { Dialogs } from "@client/services/dialogs";
import { LoginModal } from "#app/modals/login/LoginModal";
import { Crash } from "#app/services/crash";

export const CashoutInputGroup = ({ disabled }: { disabled?: boolean }) => {
  const authenticated = useAppSelector((x) => x.user.authenticated);
  const targetMultiplier = useAppSelector((x) => x.crash.targetMultiplier);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const setCashoutAt = (x: number | undefined) => {
    if (!authenticated) {
      return Dialogs.open("primary", <LoginModal />);
    }
    dispatch(Crash.seTargetMultiplier(x));
  };

  const handleMath = (f: (x: number) => number) => {
    if (!authenticated) {
      return Dialogs.open("primary", <LoginModal />);
    }
    let value = f(targetMultiplier ?? 1);    

    value = Math.max(1, value);
    setCashoutAt(value);
  };

  return (
    <ModalSection>
      <ModalLabel>{t("fields:bets.cashoutAt")}</ModalLabel>
      <Div
        align="center"
        justify="space-between"
        gap={8}
      >
        <Input
          type="decimal"
          placeholder={t("fields:bets.cashoutAtPlaceholder")}
          value={targetMultiplier}
          disabled={disabled}
          onChange={(x) => setCashoutAt(x)}
        />
        <Div>
          <Button
            kind="tertiary-grey"
            label="+"
            width={40}
            disabled={disabled}
            onClick={() => handleMath((x) => x + 1)}
            size="md"
          />
          <Button
            kind="tertiary-grey"
            label="-"
            width={40}
            disabled={disabled}
            onClick={() => handleMath((x) => x - 1)}
            size="md"
          />
        </Div>
      </Div>
    </ModalSection>
  );
};
