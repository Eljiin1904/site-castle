import { HolidayChest } from "@core/types/rewards/HolidayChest";
import { Intimal } from "@core/services/intimal";
import { ChestCard } from "@client/comps/chests/ChestCard";
import { Div } from "@client/comps/div/Div";
import { SvgSiteHoliday } from "@client/svgs/site/SvgSiteHoliday";
import { Vector } from "@client/comps/vector/Vector";
import { Span } from "@client/comps/span/Span";

export const InfoCaseCard = ({ chest }: { chest: HolidayChest }) => {
  return (
    <ChestCard
      chest={chest}
      hover="border"
    >
      <Div
        align="center"
        gap={4}
        mt={6}
      >
        <Vector
          as={SvgSiteHoliday}
          size={14}
        />
        <Span
          family="title"
          weight="bold"
          color="white"
        >
          {Intimal.toLocaleString(chest.holidayCost, 0)}
        </Span>
      </Div>
    </ChestCard>
  );
};
