import { Div } from "@client/comps/div/Div";
import { Conditional } from "@client/comps/conditional/Conditional";
import { Span } from "@client/comps/span/Span";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { DoubleIcon } from "./DoubleIcon";

export const RecentRounds = () => {
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
  const history = useAppSelector((x) => x.double.history);

  return (
    <Div
      gap={12}
      column
    >
      <Span>{"Recent Rolls"}</Span>
      <Div gap={6}>
        {history.slice(0, 8).map((x, i) => (
          <DoubleIcon
            key={i}
            color={x.color}
            bait={x.bait}
          />
        ))}
      </Div>
    </Div>
  );
};

const TabletContent = () => {
  const history = useAppSelector((x) => x.double.history);

  return (
    <Div
      gap={12}
      column
      data-tooltip-id="app-tooltip"
      data-tooltip-content="Recent Rolls"
      cursor="pointer"
    >
      <Div gap={6}>
        {history.slice(0, 8).map((x, i) => (
          <DoubleIcon
            key={i}
            color={x.color}
            bait={x.bait}
          />
        ))}
      </Div>
    </Div>
  );
};

const LaptopDesktopContent = () => {
  const history = useAppSelector((x) => x.double.history);

  return (
    <Div
      gap={12}
      column
      data-tooltip-id="app-tooltip"
      data-tooltip-content="Recent Rolls"
      cursor="pointer"
    >
      <Div gap={8}>
        {history.slice(0, 10).map((x, i) => (
          <DoubleIcon
            key={i}
            color={x.color}
            bait={x.bait}
          />
        ))}
      </Div>
    </Div>
  );
};
