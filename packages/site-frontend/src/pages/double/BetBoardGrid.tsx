import { DoubleBetKind } from "@core/types/double/DoubleBetKind";
import { Div } from "@client/comps/div/Div";
import { Conditional } from "@client/comps/conditional/Conditional";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { BetBoardButton } from "./BetBoardButton";
import { BetBoardTicketGrid } from "./BetBoardTicketGrid";

export const BetBoardGrid = () => {
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
  const kinds: DoubleBetKind[] = ["green", "red", "bait", "black"];

  return (
    <Div
      column
      gap={16}
    >
      <Div
        fx
        gap={8}
      >
        {kinds.map((betKind) => (
          <BetBoardButton
            key={betKind}
            betKind={betKind}
          />
        ))}
      </Div>
      <Div
        column
        gap={12}
      >
        {kinds.map((betKind) => (
          <BetBoardTicketGrid
            key={betKind}
            betKind={betKind}
          />
        ))}
      </Div>
    </Div>
  );
};

const TabletContent = () => {
  const kinds: DoubleBetKind[] = ["green", "red", "bait", "black"];

  return (
    <Div
      fx
      gap={8}
      style={{ minHeight: "300px" }}
    >
      {kinds.map((betKind) => (
        <Div
          key={betKind}
          fx
          column
        >
          <BetBoardButton betKind={betKind} />
          <BetBoardTicketGrid betKind={betKind} />
        </Div>
      ))}
    </Div>
  );
};

const LaptopDesktopContent = () => {
  const kinds: DoubleBetKind[] = ["green", "black", "bait", "red"];

  return (
    <Div
      fx
      gap={16}     
    >
      {kinds.map((betKind) => (
        <Div
          key={betKind}
          fx
          column
        >
          <BetBoardButton betKind={betKind} />
          <BetBoardTicketGrid betKind={betKind} />
        </Div>
      ))}
    </Div>
  );
};
