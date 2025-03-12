import { Dispatch, SetStateAction } from "react";
import { HolidayChest } from "@core/types/rewards/HolidayChest";
import { Div } from "@client/comps/div/Div";
import { Dialogs } from "@client/services/dialogs";
import { ChestPickerModal } from "#app/modals/chest-picker/ChestPickerModal";
import { Chests } from "#app/services/chests";
import { CaseAddCard } from "./CaseAddCard";
import { CreateCaseCard } from "./CreateCaseCard";
import "./CreateCaseGrid.scss";

export const CreateCaseGrid = ({
  chests,
  setChests,
}: {
  chests: HolidayChest[];
  setChests: Dispatch<SetStateAction<HolidayChest[]>>;
}) => {
  return (
    <Div
      className="CreateCaseGrid"
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
          <CreateCaseCard
            key={chest.id}
            chest={chest}
            onRemoveClick={() => {
              const newChests = chests.slice();
              newChests.splice(i, 1);
              newChests.sort((a, b) => a.openCost - b.openCost);
              setChests(newChests);
            }}
            onCostChange={(newCost) => {
              chest.holidayCost = newCost;
              setChests(chests.slice());
            }}
          />
        ))}
        <CaseAddCard
          onClick={() =>
            Dialogs.open(
              "primary",
              <ChestPickerModal
                kind="holiday-case"
                chests={chests}
                onChestClick={(chest) => {
                  setChests((chests) => {
                    const newChests = chests.slice();
                    newChests.push({
                      ...Chests.getBasicChest(chest),
                      holidayCost: 0,
                    });
                    newChests.sort((a, b) => a.openCost - b.openCost);
                    return newChests;
                  });
                }}
              />,
            )
          }
        />
      </Div>
    </Div>
  );
};
