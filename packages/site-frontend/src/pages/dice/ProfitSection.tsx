import { ModalLabel } from "@client/comps/modal/ModalLabel";
import { Tokens } from "@client/comps/tokens/Tokens";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { Dice } from "#app/services/dice";
import { Div } from "@client/comps/div/Div";

export const ProfitSection = () => {
  const betAmount = useAppSelector((x) => x.dice.betAmount || 0);
  const targetKind = useAppSelector((x) => x.dice.targetKind);
  const targetValue = useAppSelector((x) => x.dice.targetValue);

  const profit = Dice.getProfit({
    betAmount,
    targetKind,
    targetValue,
  });

  return (
    <Div
      fx
      wrap
      gap={8}
      justify="space-between"
    >
      <ModalLabel>{"Profit on Win"}</ModalLabel>
      <Tokens
        value={profit}
        fontSize={12}
        vectorColor="white"
      />
    </Div>
  );
};
