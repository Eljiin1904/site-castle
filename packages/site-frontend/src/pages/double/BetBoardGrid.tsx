import { Fragment } from "react";
import { DoubleBetKind } from "@core/types/double/DoubleBetKind";
import { Div } from "@client/comps/div/Div";
import { Conditional } from "@client/comps/conditional/Conditional";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { BetBoardButton } from "./BetBoardButton";
import { BetBoardTicketGrid } from "./BetBoardTicketGrid";
import { DemoNotice } from "#app/comps/demo/DemoNotice";


export const BetBoardGrid = () => {
  const layout = useAppSelector((x) => x.style.mainLayout);
  const betAmount = useAppSelector((x) => x.double.betAmount);
  return (<Fragment>
    {betAmount === 0 && <DemoNotice />}
    <Conditional
      value={layout}
      mobile={<MobileContent />}
      tablet={<LaptopDesktopContent />}
      laptop={<LaptopDesktopContent />}
      desktop={<LaptopDesktopContent />}
    />    
  </Fragment>);
};

const MobileContent = () => {
  const kinds: DoubleBetKind[] = ["black","green", "red", "bait"];

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
        gap={16}
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

const LaptopDesktopContent = () => {
  const kinds: DoubleBetKind[] = ["black","green", "red", "bait"];

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
