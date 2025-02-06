import { PageLoading } from "@client/comps/page/PageLoading";
import { Conditional } from "@client/comps/conditional/Conditional";
import { Div } from "@client/comps/div/Div";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { DiceHeader } from "./DiceHeader";
import { DiceView } from "./DiceView";
import { DiceFeed } from "./DiceFeed";
import { DiceMenu } from "./DiceMenu";

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
  return (
    <Div
      fx
      column
      gap={20}
    >
      <DiceHeader />
      <DiceView />
      <DiceMenu />
      <DiceFeed />
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
      <DiceHeader />
      <Div
        fx
        gap={24}
      >
        <DiceMenu />
        <DiceView />
      </Div>
      <DiceFeed />
    </Div>
  );
};
