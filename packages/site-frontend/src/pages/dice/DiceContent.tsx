import { PageLoading } from "@client/comps/page/PageLoading";
import { Conditional } from "@client/comps/conditional/Conditional";
import { Div } from "@client/comps/div/Div";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { DiceHeader } from "./DiceHeader";
import { DiceView } from "./DiceView";
import { DiceFeed } from "./DiceFeed";
import { DiceMenu } from "./DiceMenu";
import { BetBoard } from "#app/comps/bet-board/BetBoard";
import { useTranslation } from "@core/services/internationalization/internationalization";

export const DiceContent = () => {
  const initialized = useAppSelector((x) => x.dice.initialized);
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
  const {t} = useTranslation(["games\\dice"]);
  return (
    <Div
      fx
      column
      gap={16}
    >
      <DiceHeader />
      <DiceView />
      <DiceMenu />
      <BetBoard px={20} mt={40}  mb={40} title={t("games\\dice:betBoardHeader")} game="dice" />
    </Div>
  );
};

const NotMobileContent = () => {
  const {t} = useTranslation(["games\\dice"]);
  return (
    <Div
      fx
      column
    >
      <DiceHeader />
      <Div
        fx
        gap={24}
      >
        <DiceMenu />
        <DiceView />
      </Div>
      <BetBoard mt={56} mb={56} title={t("games\\dice:betBoardHeader")} game="dice" />    
    </Div>
  );
};