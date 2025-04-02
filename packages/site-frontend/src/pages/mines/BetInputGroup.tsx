import { Intimal } from "#core/services/intimal";
import { Div } from "#client/comps/div/Div";
import { Input } from "#client/comps/input/Input";
import { Button } from "#client/comps/button/Button";
import { ModalSection } from "#client/comps/modal/ModalSection";
import { ModalLabel } from "#client/comps/modal/ModalLabel";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { Mines } from "#app/services/mines";


export const BetInputGroup({disabled}: {disabled? : boolean}) => {

  const tokenBalance = useAppSelector((x) => x.user.tokenBalance);
  const betAmount = useAppSelector((x) =>  x.mines.betAmount);
  const dispatch = useAppDispatch()

  const setBetAmount = (x: number | undefined) => {
    dispatch(Mines.setBetAmount(x));
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
          <Button
            kind="secondary"
            size="xs"
            label="Max"
            labelSize={13}
            width={48}
            onClick={() => setBetAmount(Intimal.floor(tokenBalance))}
          />
        </Div>
      </Div>
    </ModalSection>
  );

}