import { SitePage } from "#app/comps/site-page/SitePage";
import { BlackjackManager } from "./BlackjackManager";
import { BlackjackView } from "./BlackjackView";
// import { useTranslation } from "@client/hooks/localization/useTranslation";
import { BetBoard } from "#app/comps/bet-board/BetBoard";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { useEffect } from "react";
import { getGameToken } from "#app/services/hubEight/api/getGameToken";

export const BlackjackPage = () => {
  const { t } = useTranslation(["games\\blackjack"]);
  useEffect(() => {
    getGameToken()
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  }, []);
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
        title={t("bets.recentBets")}
      />
    </SitePage>
  );
};
