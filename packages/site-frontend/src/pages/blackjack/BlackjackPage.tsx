import { SitePage } from "#app/comps/site-page/SitePage";
import { BlackjackManager } from "./BlackjackManager";
import { BlackjackView } from "./BlackjackView";
// import { useTranslation } from "@client/hooks/localization/useTranslation";
import { BetBoard } from "#app/comps/bet-board/BetBoard";
import { useTranslation } from "@core/services/internationalization/internationalization";

export const BlackjackPage = () => {
  const { t } = useTranslation(["games\\blackjack"]);

  return (
    <SitePage
      className="BlackjackPage"
      title={"Blackjack"}
    >
      <BlackjackManager />
      <BlackjackView />
      <BetBoard
        px={20}
        mt={40}
        mb={40}
        title={t("games\\blackjack:betBoardHeader")}
        game="blackjack"
      />
    </SitePage>
  );
};
