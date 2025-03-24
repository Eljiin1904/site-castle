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
import { DoubleFeed } from "./DoubleFeed";

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
  return (
    <Div
      fx
      column
    >
      <Div column>
        <DoubleReelOverlay
          path="/graphics/double-tile-overlay"
          px={20}
          py={16}
        >
          <DoubleHeader />
          <Span>
            <DoubleView />
          </Span>
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
        <Div column gap={8} mt={28}>
          <LastRounds />
          <RecentRounds />
        </Div>
      </Div>
      <Div mt={64}>
        <BetBoard />
      </Div>
    </Div>
  );
};

const NotMobileContent = () => {
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
          >
            <Div column gap={8}>
              <LastRounds />
              <RecentRounds />
            </Div>
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
      <Div mt={56}>
        <DoubleFeed />
      </Div>
    </Div>
  );
};

{/* <DoubleFairness /> */}