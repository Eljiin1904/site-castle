import { PageLoading } from "@client/comps/page/PageLoading";
import { Conditional } from "@client/comps/conditional/Conditional";
import { Div } from "@client/comps/div/Div";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { BetBoard } from "#app/comps/bet-board/BetBoard";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { CrashMenu } from "./CrashMenu";
import { CrashView } from "./CrashView";
import { Fragment } from "react/jsx-runtime";

export const CrashContent = () => {
  const initialized = useAppSelector((x) => x.crash.initialized);
  const layout = useAppSelector((x) => x.style.mainLayout);

  if (!initialized) {
    return <PageLoading />;
  } else {
    return (
      <Conditional
        value={layout}
        mobile={<MobileContent />}
        tablet={<MobileContent />}
        laptop={<NotMobileContent />}
        desktop={<NotMobileContent />}
      />
    );
  }
};

const MobileContent = () => {
  const { t } = useTranslation(["games\\crash"]);
  return (
    <Div
      fx
      column
      gap={16}
    >
      <CrashView />
      <CrashMenu />
      <BetBoard
        px={20}
        mt={40}
        mb={40}
        title={t("betBoardHeader")}
      />
    </Div>
  );
};

const NotMobileContent = () => {
  const { t } = useTranslation(["games\\crash"]);
  return (<Fragment>
    <Div
      fx
      gap={24}
    >
      <CrashMenu />
      <CrashView />
    </Div>
    <BetBoard
      mt={56}
      mb={56}
      title={t("bets.recentBets")}
    />
  </Fragment>);
};
