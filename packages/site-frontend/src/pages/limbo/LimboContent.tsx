import { Conditional } from "@client/comps/conditional/Conditional";
import { Div } from "@client/comps/div/Div";
import { PageLoading } from "@client/comps/page/PageLoading";

import { useAppSelector } from "#app/hooks/store/useAppSelector";

import { LimboFeed } from "./LimboFeed";
import { LimboMenu } from "./LimboMenu";
import { LimboView } from "./LimboView";
import { LimboHeader } from "./LimboHeader";

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
      <LimboHeader />
      <LimboView />
      <LimboMenu />
      <LimboFeed />
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
      <LimboHeader />
      <Div
        fx
        gap={24}
      >
        <LimboMenu />
        <LimboView />
      </Div>
      <LimboFeed />
    </Div>
  );
};
