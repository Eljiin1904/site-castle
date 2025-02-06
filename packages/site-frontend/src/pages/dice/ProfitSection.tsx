import { ModalSection } from "@client/comps/modal/ModalSection";
import { ModalLabel } from "@client/comps/modal/ModalLabel";
import { ModalField } from "@client/comps/modal/ModalField";
import { Tokens } from "@client/comps/tokens/Tokens";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { Dice } from "#app/services/dice";

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
    <ModalSection>
      <ModalLabel>{"Profit on Win"}</ModalLabel>
      <ModalField>
        <Tokens value={profit} />
      </ModalField>
    </ModalSection>
  );
};
