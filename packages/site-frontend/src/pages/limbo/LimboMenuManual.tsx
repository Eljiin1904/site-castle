import { Fragment, useState } from "react";
import { Button } from "@client/comps/button/Button";
import { Conditional } from "@client/comps/conditional/Conditional";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { BetInputGroup } from "./BetInputGroup";
import { ProfitSection } from "./ProfitSection";
import { useManualBet } from "./useManualBet";
import { useProfit } from "./useProfit";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { DemoNotice } from "#app/comps/demo/DemoNotice";

export const LimboMenuManual = () => {
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
      <ActionButton />
    </Fragment>
  );
};

const ActionButton = () => {
  const processing = useAppSelector((x) => x.limbo.processing);
  const betAmount = useAppSelector((x) => x.limbo.betAmount);
  const { overMax } = useProfit();
  const handleBet = useManualBet();
  const { t } = useTranslation();
  const gameLabel = betAmount === 0 ? t('games:playDemo') :t("games\\limbo:placeBet");
  const [displayDelay, setDisplayDelay] = useState(false);

  if (processing) {
    if (!displayDelay) {
      setDisplayDelay(true);

      setTimeout(() => {
        setDisplayDelay(false);
      }, 600);
    }
  }

  return (
    <Fragment>
      <Button
      fx
      kind="primary-green"
      label={overMax ? t("games\\limbo:exceedMaxBet") : gameLabel}
      loading={processing}
      disabled={overMax || processing || displayDelay}
      onClick={handleBet}
    />
    {betAmount === 0 && <DemoNotice />}
    </Fragment>
  );
};

const BaseFields = () => {
  const processing = useAppSelector((x) => x.limbo.processing);

  return (
    <Fragment>
      <BetInputGroup disabled={processing} />
      <ProfitSection />
    </Fragment>
  );
};
