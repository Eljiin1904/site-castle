import { HolidayChest } from "@core/types/rewards/HolidayChest";
import { Div } from "@client/comps/div/Div";
import { InfoCaseCard } from "./InfoCaseCard";
import "./InfoCaseGrid.scss";

export const InfoCaseGrid = ({ chests }: { chests: HolidayChest[] }) => {
  return (
    <Div
      className="InfoCaseGrid"
      fx
      column
      gap={16}
    >
      <Div
        className="case-list"
        gap={12}
        flow="row-wrap"
      >
        {chests.map((chest, i) => (
          <InfoCaseCard
            key={chest.id}
            chest={chest}
          />
        ))}
      </Div>
    </Div>
  );
};
