import { ModalLabel } from "@client/comps/modal/ModalLabel";
import { Tokens } from "@client/comps/tokens/Tokens";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { Div } from "@client/comps/div/Div";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { Crash } from "@core/services/crash";

export const ProfitSection = () => {
  const betAmount = useAppSelector((x) => x.crash.betAmount || 0);
  const multiplier = useAppSelector((x) => x.crash.targetMultiplier || 1);
  const {t} = useTranslation(["games\\crash"]);

  const profit = Crash.getProfit({betAmount, multiplier});
  
  return (
    <Div fx wrap gap={8} justify="space-between">
      <ModalLabel mb={0}>{t("profitOnWin")}</ModalLabel>
      <Tokens value={profit} fontSize={12} vectorColor="light-sand" />
    </Div>
  );
};