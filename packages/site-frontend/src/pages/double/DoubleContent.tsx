import { PageLoading } from "@client/comps/page/PageLoading";
import { Conditional } from "@client/comps/conditional/Conditional";
import { Div } from "@client/comps/div/Div";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { DoubleHeader } from "./DoubleHeader";
import { BetInputGroup } from "./BetInputGroup";
import { BetBoardGrid } from "./BetBoardGrid";
import { DoubleView } from "./DoubleView";
import { LastRounds } from "./LastRounds";
import { RecentRounds } from "./RecentRounds";
import { Span } from "@client/comps/span/Span";
import { DoubleReelOverlay } from "./DoubleReelOverlay";
import { BetBoard } from "#app/comps/bet-board/BetBoard";
import { useTranslation } from "@core/services/internationalization/internationalization";
import {DoubleSandJackpot} from "./DoubleSandJackpot";
import { DoubleFairness } from "./DoubleFairness";

export const DoubleContent = () => {
  const initialized = useAppSelector((x) => x.double.initialized);
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
  const {t} = useTranslation(["games\\double"]);
  return (
    <Div
      fx
      column
    >
      <Div column  px={20}>
        <DoubleReelOverlay
          path="/graphics/double-tile-overlay"
         
          py={16}
          gap={16}
        >
          <DoubleHeader />
          <Span>
            <DoubleView />
          </Span>
          <DoubleSandJackpot />
        </DoubleReelOverlay>
      </Div>
      <Div
        column
        px={20}
        py={16}
        gap={16}
        bg="brown-6"
        borderTop
        borderColor="brown-4"
      >
        <BetInputGroup />
        <BetBoardGrid />
        <Div column gap={8} mt={24} mb={24}>
          <LastRounds />
          <RecentRounds />
        </Div>
      </Div>
      <Div
        column
        px={24}
        >
          <DoubleFairness />
          <BetBoard mt={40} mb={40} title={t("bets.recentBets")}/>
        </Div>
    </Div>
  );
};

const NotMobileContent = () => {
   const {t} = useTranslation(["games\\double"])
   return (
    <Div
      fx
      column
    >
      <DoubleReelOverlay
          path="/graphics/double-tile-overlay"
          p={24}
          gap={24}
        >
          <DoubleHeader />
          <DoubleView />
          <Div
            fx
            justify="space-between"
            alignItems="flex-end"
          >
            <Div column gap={8}>
              <LastRounds />
              <RecentRounds />
            </Div>
            <DoubleSandJackpot />
          </Div>
      </DoubleReelOverlay>
      <Div
        column
        p={24}
        gap={24}
        bg="brown-6"
      >
        <BetInputGroup />
        <BetBoardGrid />
      </Div>
      <DoubleFairness />
      <BetBoard mt={40} mb={40} title={t("bets.recentBets")} />
    </Div>
  );
};