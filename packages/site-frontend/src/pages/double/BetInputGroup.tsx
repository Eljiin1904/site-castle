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
  const tokenBalance = useAppSelector((x) => x.user.tokenBalance);
  const betAmount = useAppSelector((x) => x.double.betAmount);
  const dispatch = useAppDispatch();

  const setBetAmount = (x: number | undefined) => {
    dispatch(Double.setBetAmount(x));
  };

  const handleMath = (f: (x: number) => number) => {
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

  return (
    <Div
      fx
      column
      gap={8}
    >
      <Div fx>
        <Input
          type="currency"
          height={32}
          placeholder="Enter bet amount..."
          value={betAmount}
          onChange={(x) => setBetAmount(x)}
          iconColor={"dark-sand"}
        />
        <Div
          position="absolute"
          right={0}
          bottom={0}
        >
          <Button
            kind="primary"
            size="xs"
            label="Clear"
            labelSize={13}
            onClick={() => setBetAmount(undefined)}
          />
        </Div>
      </Div>
      <Div fx>
        <Button
          kind="primary"
          size="sm"
          label="+10"
          labelSize={13}
          fx
          onClick={() => handleMath((x) => x + Intimal.fromDecimal(10))}
        />
        <Button
          kind="primary"
          size="sm"
          label="+100"
          labelSize={13}
          fx
          onClick={() => handleMath((x) => x + Intimal.fromDecimal(100))}
        />
        <Button
          kind="primary"
          size="sm"
          label="1/2"
          labelSize={13}
          fx
          onClick={() => handleMath((x) => x / 2)}
        />
        <Button
          kind="primary"
          size="sm"
          label="2x"
          labelSize={13}
          fx
          onClick={() => handleMath((x) => x * 2)}
        />
        <Button
          kind="primary"
          size="sm"
          label="Max"
          labelSize={13}
          fx
          onClick={() => setBetAmount(Intimal.floor(tokenBalance))}
        />
      </Div>
    </Div>
  );
};

const LaptopDesktopContent = () => {
  const { tokenBalance, betAmount, handleMath, setBetAmount } = useBetHandler();
  const {t} = useTranslation(["common"])
  return (
    <Div column gap={8}>
      <Span size={12} color="dark-sand" lineHeight={20} fontWeight="medium">{t("common:amount")}</Span>
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
          />         
          <Button
            kind="tertiary-grey"
            label="+1"
            width={48}
            onClick={() => handleMath((x) => x + Intimal.fromDecimal(1))}
          />
          <Button
            kind="tertiary-grey"
            label="+10"
            width={48}
            onClick={() => handleMath((x) => x + Intimal.fromDecimal(10))}
          />
          <Button
            kind="tertiary-grey"
            label="+100"
            width={48}
            onClick={() => handleMath((x) => x + Intimal.fromDecimal(100))}
          />
          <Button
            kind="tertiary-grey"
            label="1/2"
            width={48}
            onClick={() => handleMath((x) => x / 2)}
          />
          <Button
            kind="tertiary-grey"
            label="2X"
            width={48}
            onClick={() => handleMath((x) => x * 2)}
          />
          <Button
            kind="tertiary-grey"
            label="Max"
            width={48}
            onClick={() => setBetAmount(tokenBalance)}
          />
        </Div>
      </Div>
    </Div>
  );
};