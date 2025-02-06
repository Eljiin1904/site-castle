import { Intimal } from "@core/services/intimal";
import { Button } from "@client/comps/button/Button";
import { Div } from "@client/comps/div/Div";
import { Input } from "@client/comps/input/Input";
import { ModalLabel } from "@client/comps/modal/ModalLabel";
import { ModalSection } from "@client/comps/modal/ModalSection";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { Limbo } from "#app/services/limbo";

export const BetInputGroup = ({ disabled }: { disabled?: boolean }) => {
  const betAmount = useAppSelector((x) => x.limbo.betAmount);
  const tokenBalance = useAppSelector((x) => x.user.tokenBalance);
  const dispatch = useAppDispatch();

  const setBetAmount = (x: number | undefined) => {
    dispatch(Limbo.setBetAmount(x));
  };

  const handleMath = (f: (x: number) => number) => {
    let value = f(betAmount || 0);

    value = Math.min(tokenBalance, value);
    value = Math.max(Intimal.fromDecimal(0.01), value);
    value = Intimal.floor(value);

    setBetAmount(value);
  };

  return (
    <ModalSection>
      <ModalLabel>{"Bet Amount"}</ModalLabel>
      <Div align="center">
        <Input
          type="currency"
          placeholder="Enter bet amount..."
          value={betAmount}
          disabled={disabled}
          onChange={(x) => setBetAmount(x)}
        />
        <Div
          position="absolute"
          right={4}
          gap={4}
        >
          <Button
            kind="secondary"
            size="xs"
            label="1/2"
            labelSize={13}
            width={48}
            disabled={disabled}
            onClick={() => handleMath((x) => x / 2)}
          />
          <Button
            kind="secondary"
            size="xs"
            label="2x"
            labelSize={13}
            width={48}
            disabled={disabled}
            onClick={() => handleMath((x) => x * 2)}
          />
        </Div>
      </Div>
    </ModalSection>
  );
};
