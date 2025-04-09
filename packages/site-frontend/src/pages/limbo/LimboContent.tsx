import { Conditional } from "@client/comps/conditional/Conditional";
import { Div } from "@client/comps/div/Div";
import { PageLoading } from "@client/comps/page/PageLoading";

import { useAppSelector } from "#app/hooks/store/useAppSelector";

import { LimboMenu } from "./LimboMenu";
import { LimboView } from "./LimboView";
import { LimboHeader } from "./LimboHeader";
import { BetBoard } from "#app/comps/bet-board/BetBoard";
import { useTranslation } from "@core/services/internationalization/internationalization";

export const LimboContent = () => {
  const initialized = useAppSelector((x) => x.limbo.initialized);
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
  const { t } = useTranslation(["games\\limbo"]);

  return (
    <Div
      fx
      column
      gap={20}
    >
      <LimboHeader />
      <LimboView />
      <LimboMenu />
      <BetBoard
        px={20}
        mt={40}
        mb={40}
        title={t("games\\limbo:betBoardHeader")}
        game="limbo"
      />
    </Div>
  );
};

const NotMobileContent = () => {
  const { t } = useTranslation(["games\\limbo"]);

  return (
    <Div
      fx
      column
      gap={24}
    >
      <Div
        fx
        gap={24}
      >
        <LimboMenu />
        <LimboView />
      </Div>
      <BetBoard
        px={20}
        mt={40}
        mb={40}
        title={t("games\\limbo:betBoardHeader")}
        game="limbo"
      />
    </Div>
  );
};
