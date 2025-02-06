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
      gap={20}
    >
      <DoubleHeader />
      <DoubleView />
      <BetInputGroup />
      <BetBoardGrid />
      <RecentRounds />
      <LastRounds />
      <DoubleFairness />
    </Div>
  );
};

const NotMobileContent = () => {
  return (
    <Div
      fx
      column
      gap={24}
    >
      <DoubleHeader />
      <DoubleView />
      <Div
        fx
        justify="space-between"
      >
        <RecentRounds />
        <LastRounds />
      </Div>
      <BetInputGroup />
      <BetBoardGrid />
      <DoubleFairness />
    </Div>
  );
};
