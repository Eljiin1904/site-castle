import { Conditional } from "@client/comps/conditional/Conditional";
import { Div } from "@client/comps/div/Div";
import { PageLoading } from "@client/comps/page/PageLoading";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { MinesHeader } from "./MinesHeader";
import { MinesMenu } from "./MinesMenu";
import { MinesView } from "./MinesView";
import { BetBoard } from "#app/comps/bet-board/BetBoard";
import { useTranslation } from "@core/services/internationalization/internationalization";

export const MinesContent = () => {
  const initialized = useAppSelector((x) => x.mines.initialized);
  const layout = useAppSelector((x) => x.style.mainLayout);

  if (!initialized) {
    return <PageLoading />;
  } else {
    return (
      <Conditional
        value={layout}
        mobile={<MobileContent />}
        tablet={<NotMobileContent />}
        laptop={<NotMobileContent />}
        desktop={<NotMobileContent />}
      />
    );
  }
};
const MobileContent = () => {
  const {t} = useTranslation(["games\\mines"]);
  return (
    <Div
      fx
      column
      gap={20}
    >
      <MinesHeader />
      <MinesView />
      <MinesMenu />
      <BetBoard px={20} mt={40}  mb={40} title={t("betBoardHeader")} game="mines" />
    </Div>
  );
};

const NotMobileContent = () => {
  const {t} = useTranslation(["games\\mines"]);
  return (
    <Div
      fx
      column
    >
      <MinesHeader />
      <Div
        fx
        gap={24}
      >
        <MinesMenu />
        <MinesView />
      </Div>
      <BetBoard mt={56} mb={56} title={t("betBoardHeader")} game="mines" />    
    </Div>
  );
};
