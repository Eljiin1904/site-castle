import { Intimal } from "@core/services/intimal";
import { Div } from "@client/comps/div/Div";
import { Input } from "@client/comps/input/Input";
import { Button } from "@client/comps/button/Button";
import { Conditional } from "@client/comps/conditional/Conditional";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { Double } from "#app/services/double";
import { Span } from "@client/comps/span/Span";

export const BetInputGroup = () => {
  const layout = useAppSelector((x) => x.style.mainLayout);

  return (
    <Conditional
      value={layout}
      mobile={<MobileContent />}
      tablet={<TabletContent />}
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
          iconColor={"brown-10"}
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

const TabletContent = () => {
  const { tokenBalance, betAmount, handleMath, setBetAmount } = useBetHandler();

  return (
    <Div fx>
      <Input
        type="currency"
        height={32}
        placeholder="Enter bet amount..."
        value={betAmount}
        onChange={(x) => setBetAmount(x)}
        iconColor={"brown-10"}
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
        <Button
          kind="primary"
          size="xs"
          label="+1"
          labelSize={13}
          width={48}
          onClick={() => handleMath((x) => x + Intimal.fromDecimal(1))}
        />
        <Button
          kind="primary"
          size="xs"
          label="+10"
          labelSize={13}
          width={48}
          onClick={() => handleMath((x) => x + Intimal.fromDecimal(10))}
        />
        <Button
          kind="primary"
          size="xs"
          label="+100"
          labelSize={13}
          width={48}
          onClick={() => handleMath((x) => x + Intimal.fromDecimal(100))}
        />
        <Button
          kind="primary"
          size="xs"
          label="1/2"
          labelSize={13}
          width={48}
          onClick={() => handleMath((x) => x / 2)}
        />
        <Button
          kind="primary"
          size="xs"
          label="2x"
          labelSize={13}
          width={48}
          onClick={() => handleMath((x) => x * 2)}
        />
        <Button
          kind="primary"
          size="xs"
          label="Max"
          labelSize={13}
          width={48}
          onClick={() => setBetAmount(tokenBalance)}
        />
      </Div>
    </Div>
  );
};

const LaptopDesktopContent = () => {
  const { tokenBalance, betAmount, handleMath, setBetAmount } = useBetHandler();

  return (
    <Div column>
      <Span
        color="dark-sand"
        mb={15}
      >
        Amount
      </Span>
      <Div fx>
        <Input
          type="currency"
          height={32}
          placeholder="Enter bet amount..."
          value={betAmount}
          onChange={(x) => setBetAmount(x)}
          iconColor={"brown-10"}
        />
        <Div
          position="absolute"
          right={0}
          bottom={0}

          // top={8}
          // gap={6}
        >
          <Button
            kind="primary"
            size="xs"
            label="Clear"
            labelSize={13}
            onClick={() => setBetAmount(undefined)}
          />
          <Button
            kind="primary"
            size="xs"
            label="+1"
            labelSize={13}
            width={48}
            onClick={() => handleMath((x) => x + Intimal.fromDecimal(1))}
          />
          <Button
            kind="primary"
            size="xs"
            label="+10"
            labelSize={13}
            width={48}
            onClick={() => handleMath((x) => x + Intimal.fromDecimal(10))}
          />
          <Button
            kind="primary"
            size="xs"
            label="+100"
            labelSize={13}
            width={48}
            onClick={() => handleMath((x) => x + Intimal.fromDecimal(100))}
          />
          <Button
            kind="primary"
            size="xs"
            label="1/2"
            labelSize={13}
            width={48}
            onClick={() => handleMath((x) => x / 2)}
          />
          <Button
            kind="primary"
            size="xs"
            label="2x"
            labelSize={13}
            width={48}
            onClick={() => handleMath((x) => x * 2)}
          />
          <Button
            kind="primary"
            size="xs"
            label="Max"
            labelSize={13}
            width={48}
            onClick={() => setBetAmount(tokenBalance)}
          />
        </Div>
      </Div>
    </Div>
  );
};
