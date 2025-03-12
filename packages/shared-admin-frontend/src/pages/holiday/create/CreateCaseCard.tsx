import { useState } from "react";
import { HolidayChest } from "@core/types/rewards/HolidayChest";
import { ChestCard } from "@client/comps/chests/ChestCard";
import { Input } from "@client/comps/input/Input";
import { SvgStar } from "@client/svgs/common/SvgStar";
import { Div } from "@client/comps/div/Div";
import { Vector } from "@client/comps/vector/Vector";
import { SvgTimesCirlce } from "@client/svgs/common/SvgTimesCircle";

export const CreateCaseCard = ({
  chest,
  onRemoveClick,
  onCostChange,
}: {
  chest: HolidayChest;
  onRemoveClick: (x: HolidayChest) => void;
  onCostChange: (x: number) => void;
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <ChestCard
      chest={chest}
      hover="border"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Div mt={8}>
        <Input
          type="currency"
          placeholder="Enter cost..."
          iconLeft={SvgStar}
          value={chest.holidayCost}
          onChange={(x) => onCostChange(x || 0)}
        />
      </Div>
      {hovered && (
        <Div
          position="absolute"
          top={4}
          right={4}
        >
          <Vector
            as={SvgTimesCirlce}
            color="light-red"
            hover="highlight"
            onClick={() => onRemoveClick(chest)}
          />
        </Div>
      )}
    </ChestCard>
  );
};
