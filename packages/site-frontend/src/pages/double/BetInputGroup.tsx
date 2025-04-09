import { Intimal } from "@core/services/intimal";
import { Div } from "@client/comps/div/Div";
import { Input } from "@client/comps/input/Input";
import { Button } from "@client/comps/button/Button";
import { Conditional } from "@client/comps/conditional/Conditional";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { Double } from "#app/services/double";
import { Span } from "@client/comps/span/Span";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { Dialogs } from "@client/services/dialogs";
import { LoginModal } from "#app/modals/login/LoginModal";

export const BetInputGroup = () => {
  const layout = useAppSelector((x) => x.style.mainLayout);

  return (
    <Conditional
      value={layout}
      mobile={<MobileContent />}
      tablet={<LaptopDesktopContent />}
      laptop={<LaptopDesktopContent />}
      desktop={<LaptopDesktopContent />}
    />
  );
};

const useBetHandler = () => {
  const authenticated = useAppSelector((x) => x.user.authenticated);
  const tokenBalance = useAppSelector((x) => x.user.tokenBalance);
  const betAmount = useAppSelector((x) => x.double.betAmount);
  const dispatch = useAppDispatch();

  const setBetAmount = (x: number | undefined) => {
    
    if (!authenticated) {
      return Dialogs.open("primary", <LoginModal />);
    }
    dispatch(Double.setBetAmount(x));
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

  return { tokenBalance, betAmount, handleMath, setBetAmount };
};

const MobileContent = () => {
  const { tokenBalance, betAmount, handleMath, setBetAmount } = useBetHandler();
  const {t} = useTranslation(["common"]);
  return (
    <Div
      fx
      column
      gap={8}
    >
      <Div fx>
        <Input
          type="currency"
          height={40}
          placeholder={t("common:enterBetAmount")}
          value={betAmount}
          onChange={(x) => setBetAmount(x)}
          flexGrow={1}
        />
        <Button
          kind="tertiary-grey"
          label={t("common:clear")}
          onClick={() => setBetAmount(undefined)}
          flexGrow={1}
          size="xssso"
        />
      </Div>
      <Div fx>
        <Button
            kind="tertiary-grey"
            label="+1"
            onClick={() => handleMath((x) => x + Intimal.fromDecimal(1))}
            flexGrow={1}
            size="xssso"
          />
          <Button
            kind="tertiary-grey"
            label="+10"
            onClick={() => handleMath((x) => x + Intimal.fromDecimal(10))}
            flexGrow={1}
            size="xssso"
          />
          <Button
            kind="tertiary-grey"
            label="+100"
            onClick={() => handleMath((x) => x + Intimal.fromDecimal(100))}
            flexGrow={1}
            size="xssso"
          />
          <Button
            kind="tertiary-grey"
            label="1/2"
            onClick={() => handleMath((x) => x / 2)}
            flexGrow={1}
            size="xssso"
          />
          <Button
            kind="tertiary-grey"
            label="2X"
            onClick={() => handleMath((x) => x * 2)}
            flexGrow={1}
            size="xssso"
          />
          <Button
            kind="tertiary-grey"
            label="Max"
            onClick={() => setBetAmount(tokenBalance)}
             flexGrow={1}
             size="xssso"
          />
      </Div>
    </Div>
  );
};

const LaptopDesktopContent = () => {
  const { tokenBalance, betAmount, handleMath, setBetAmount } = useBetHandler();
  const {t} = useTranslation(["common"]);
  return (
    <Div column gap={8}>
      <Span size={12}>{t("common:amount")}</Span>
      <Div>
        <Input
          type="currency"
          height={40}
          placeholder={t("common:enterBetAmount")}
          value={betAmount}
          onChange={(x) => setBetAmount(x)}
        />
        <Div
        >
          <Button
            kind="tertiary-grey"
            label={t("common:clear")}
            onClick={() => setBetAmount(undefined)}
            size="xssso"
          />         
          <Button
            kind="tertiary-grey"
            label="+1"
            width={48}
            onClick={() => handleMath((x) => x + Intimal.fromDecimal(1))}
            size="xssso"
          />
          <Button
            kind="tertiary-grey"
            label="+10"
            width={48}
            onClick={() => handleMath((x) => x + Intimal.fromDecimal(10))}
            size="xssso"
          />
          <Button
            kind="tertiary-grey"
            label="+100"
            width={48}
            onClick={() => handleMath((x) => x + Intimal.fromDecimal(100))}
            size="xssso"
          />
          <Button
            kind="tertiary-grey"
            label="1/2"
            width={48}
            onClick={() => handleMath((x) => x / 2)}
            size="xssso"
          />
          <Button
            kind="tertiary-grey"
            label="2X"
            width={48}
            onClick={() => handleMath((x) => x * 2)}
            size="xssso"
          />
          <Button
            kind="tertiary-grey"
            label="Max"
            width={48}
            onClick={() => setBetAmount(tokenBalance)}
            size="xssso"
          />
        </Div>
      </Div>
    </Div>
  );
};