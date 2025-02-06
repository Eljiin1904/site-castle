import { ModalField } from "@client/comps/modal/ModalField";
import { ModalLabel } from "@client/comps/modal/ModalLabel";
import { ModalSection } from "@client/comps/modal/ModalSection";
import { Tokens } from "@client/comps/tokens/Tokens";

import { useAppSelector } from "#app/hooks/store/useAppSelector";

import { Limbo } from "#app/services/limbo";

export const ProfitSection = () => {
  const betAmount = useAppSelector((x) => x.limbo.betAmount || 0);
  const targetValue = useAppSelector((x) => x.limbo.targetValue);

  const profit = Limbo.getProfit({
    betAmount,
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
