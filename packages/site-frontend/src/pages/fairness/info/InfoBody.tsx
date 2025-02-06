import { Div } from "@client/comps/div/Div";
import { Conditional } from "@client/comps/conditional/Conditional";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { InfoBanner } from "./InfoBanner";
import { InfoGuide } from "./InfoGuide";

export const InfoBody = () => {
  const layout = useAppSelector((x) => x.style.mainLayout);

  return (
    <Conditional
      value={layout}
      mobile={<MobileContent />}
      tablet={<TabletContent />}
      laptop={<LaptopDesktopContent />}
      desktop={<LaptopDesktopContent />}
    />
  );
};

const MobileContent = () => {
  return (
    <Div
      column
      gap={24}
    >
      <InfoBanner />
      <Div
        fx
        column
        gap={24}
      >
        <InfoGuide />
      </Div>
    </Div>
  );
};

const TabletContent = () => {
  return (
    <Div
      column
      gap={32}
    >
      <Div gap={32}>
        <Div
          fx
          column
          gap={24}
        >
          <InfoGuide />
        </Div>
        <InfoBanner />
      </Div>
    </Div>
  );
};

const LaptopDesktopContent = () => {
  return (
    <Div gap={32}>
      <Div
        fx
        column
        gap={24}
      >
        <InfoGuide />
      </Div>
      <InfoBanner />
    </Div>
  );
};
