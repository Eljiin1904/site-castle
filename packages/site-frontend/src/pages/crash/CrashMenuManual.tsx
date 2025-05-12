import { Fragment } from "react";
import { Button } from "@client/comps/button/Button";
import { Conditional } from "@client/comps/conditional/Conditional";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { BetInputGroup } from "./BetInputGroup";
import { useManualBet } from "./useManualBet";
import { ProfitSection } from "./ProfitSection";
import { useTranslation } from "@core/services/internationalization/internationalization";

export const CrashMenuManual = () => {
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
      <CashoutButton />
    </Fragment>
  );
};

const ActionButton = () => {
  const processing = useAppSelector((x) => x.crash.processing);
  const roundStatus = useAppSelector((x) => x.crash.round.status);
  const {handleBet} = useManualBet();
  const {t} = useTranslation(["games\\crash"]);
  return (
    <Button
      fx
      kind="primary-green"
      label={ t("placeBet")}
      loading={processing}
      disabled={processing || roundStatus !== 'waiting'}
      onClick={handleBet}
    />
  );
};

const CashoutButton = () => {
  const processing = useAppSelector((x) => x.crash.processing);
  const roundTiket = useAppSelector((x) => x.crash.tickets.find((x) => x.user.id === x.user.id));
  const roundStatus = useAppSelector((x) => x.crash.round.status);
  const {handleCashout} = useManualBet();
  const {t} = useTranslation(["games\\crash"]);

  if(!roundTiket) return null;
  return (
    <Button
      fx
      kind="primary-green"
      label={ t("cashout")}
      loading={processing}
      disabled={roundTiket.processed || roundTiket.cashoutTriggered || roundStatus !== 'simulating'}
      onClick={handleCashout}
    />
  );
};

const BaseFields = () => {
  const processing = useAppSelector((x) => x.crash.processing);
  const roundStatus = useAppSelector((x) => x.crash.round.status);
  return (
    <Fragment>
      <BetInputGroup disabled={processing || roundStatus !== 'waiting'} />
      <ProfitSection />
    </Fragment>
  );
};