import { PageLoading } from "@client/comps/page/PageLoading";
import { Conditional } from "@client/comps/conditional/Conditional";
import { Div } from "@client/comps/div/Div";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { DoubleHeader } from "./DoubleHeader";
import { BetInputGroup } from "./BetInputGroup";
import { BetBoardGrid } from "./BetBoardGrid";
import { DoubleView } from "./DoubleView";
import { DoubleFairness } from "./DoubleFairness";
import { LastRounds } from "./LastRounds";
import { RecentRounds } from "./RecentRounds";
import { Span } from "@client/comps/span/Span";
import { DoubleReelOverlay } from "./DoubleReelOverlay";
import { BetBoard } from "#app/comps/bet-board/BetBoard";

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
          p={15}
        >
          <DoubleHeader />
          <Span>
            <DoubleView />
          </Span>
        </DoubleReelOverlay>
      </Div>
      <Div
        column
        p={10}
        gap={20}
        bg="brown-6"
      >
        <BetInputGroup />
        <BetBoardGrid />
        <BetBoard />
      </Div>
      <DoubleFairness />
    </Div>
  );
};

const NotMobileContent = () => {
  return (
    <Div
      fx
      column
    >
      <Div
        pb={20}
        pt={20}
        column
      >
        <DoubleReelOverlay
          path="/graphics/double-tile-overlay"
          p={20}
        >
          <DoubleHeader />
          <Span mt={10}>
            <DoubleView />
          </Span>
          <Div
            fx
            justify="space-between"
          >
            <RecentRounds />
            <LastRounds />
          </Div>
        </DoubleReelOverlay>
      </Div>
      <Div
        column
        p={20}
        gap={20}
        bg="brown-6"
      >
        <BetInputGroup />
        <BetBoardGrid />
      </Div>
      <Div mt={20}>
        <BetBoard />
      </Div>
      <DoubleFairness />
    </Div>
  );
};
