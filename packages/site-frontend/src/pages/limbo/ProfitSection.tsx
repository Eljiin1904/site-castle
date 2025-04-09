import { ModalField } from "@client/comps/modal/ModalField";
import { ModalLabel } from "@client/comps/modal/ModalLabel";
import { ModalSection } from "@client/comps/modal/ModalSection";
import { Tokens } from "@client/comps/tokens/Tokens";

import { useAppSelector } from "#app/hooks/store/useAppSelector";

import { Limbo } from "#app/services/limbo";
import { Div } from "@client/comps/div/Div";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";
import { useTranslation } from "@core/services/internationalization/internationalization";

export const ProfitSection = () => {
  const betAmount = useAppSelector((x) => x.limbo.betAmount || 0);
  const targetValue = useAppSelector((x) => x.limbo.targetValue);
  const small = useIsMobileLayout();
  const { t } = useTranslation();

  const profit = Limbo.getProfit({
    betAmount,
    targetValue,
  });

  return (
    <Div
      fx
      wrap
      gap={8}
      justify="space-between"
    >
      <ModalLabel mb={small ? 0 : 8}>{t("games\\limbo:profitOnWin")}</ModalLabel>
      <Tokens
        value={profit}
        fontSize={12}
        vectorColor="light-sand"
      />
    </Div>
  );
};
