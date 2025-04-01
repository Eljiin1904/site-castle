import { Fragment } from "react";
import { Button } from "@client/comps/button/Button";
import { Div } from "@client/comps/div/Div";
import { Conditional } from "@client/comps/conditional/Conditional";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { BetInputGroup } from "./BetInputGroup";
import { useManualBet } from "./useManualBet";
import { ProfitSection } from "./ProfitSection";
import { useProfit } from "./useProfit";
import { useTranslation } from "@core/services/internationalization/internationalization";

export const DiceMenuManual = () => {
  const layout = useAppSelector((x) => x.style.mainLayout);

  return (
    <Conditional
      value={layout}
      mobile={<MobileContent />}
      tablet={<NotMobileContent />}
      laptop={<NotMobileContent />}
      desktop={<NotMobileContent />}
    />
  );
};

const MobileContent = () => {
  return (
    <Fragment>
      <ActionButton />
      <BaseFields />
    </Fragment>
  );
};

const NotMobileContent = () => {
  return (
    <Fragment>
      <BaseFields />
      <Div
        fx
        borderTop
        pt={16}
      >
        <ActionButton />
      </Div>
    </Fragment>
  );
};

const ActionButton = () => {
  const processing = useAppSelector((x) => x.dice.processing);
  const { overMax } = useProfit();
  const handleBet = useManualBet();
  const {t} = useTranslation();
  return (
    <Button
      fx
      kind="primary-green"
      label={overMax ? t('games\\dice:exceedMaxBet') : t("games\\dice:placeBet")}
      loading={processing}
      disabled={overMax || processing}
      onClick={handleBet}
    />
  );
};

const BaseFields = () => {
  const processing = useAppSelector((x) => x.dice.processing);

  return (
    <Fragment>
      <BetInputGroup disabled={processing} />
      <ProfitSection />
    </Fragment>
  );
};