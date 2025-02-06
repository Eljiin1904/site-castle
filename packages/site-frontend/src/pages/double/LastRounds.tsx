import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { Conditional } from "@client/comps/conditional/Conditional";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { LastRoundCounter } from "#app/pages/double/LastRoundCounter";

export const LastRounds = () => {
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
      gap={12}
      column
    >
      <Span>{"Last 100 Rolls"}</Span>
      <Div gap={8}>
        <LastRoundCounter
          color="green"
          bait={false}
        />
        <LastRoundCounter
          color="red"
          bait={false}
        />
        <LastRoundCounter
          color="black"
          bait={false}
        />
        <LastRoundCounter
          color="red"
          bait={true}
        />
        <LastRoundCounter
          color="black"
          bait={true}
        />
      </Div>
    </Div>
  );
};

const TabletContent = () => {
  return (
    <Div
      gap={12}
      column
      align="flex-end"
      data-tooltip-id="app-tooltip"
      data-tooltip-content="Last 100 Rolls"
      cursor="pointer"
    >
      <Div gap={8}>
        <LastRoundCounter
          color="green"
          bait={false}
        />
        <LastRoundCounter
          color="red"
          bait={false}
        />
        <LastRoundCounter
          color="black"
          bait={false}
        />
        <LastRoundCounter
          color="red"
          bait={true}
        />
        <LastRoundCounter
          color="black"
          bait={true}
        />
      </Div>
    </Div>
  );
};

const LaptopDesktopContent = () => {
  return (
    <Div
      gap={12}
      column
      align="flex-end"
      data-tooltip-id="app-tooltip"
      data-tooltip-content="Last 100 Rolls"
      cursor="pointer"
    >
      <Div gap={12}>
        <LastRoundCounter
          color="green"
          bait={false}
        />
        <LastRoundCounter
          color="red"
          bait={false}
        />
        <LastRoundCounter
          color="black"
          bait={false}
        />
        <LastRoundCounter
          color="red"
          bait={true}
        />
        <LastRoundCounter
          color="black"
          bait={true}
        />
      </Div>
    </Div>
  );
};
