import { ChestDocument } from "@core/types/chests/ChestDocument";
import { Intimal } from "@core/services/intimal";
import { Span } from "@client/comps/span/Span";
import { SvgSiteHoliday } from "@client/svgs/site/SvgSiteHoliday";
import { Vector } from "@client/comps/vector/Vector";
import { Div } from "@client/comps/div/Div";
import { ChestPlayer } from "#app/comps/chest-player/ChestPlayer";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { useOpen } from "./useOpen";

export const HolidayCaseManager = ({
  chest,
  holidayCost,
}: {
  chest: ChestDocument;
  holidayCost: number;
}) => {
  const layout = useAppSelector((x) => x.style.mainLayout);

  const handleOpen = useOpen({ chest, holidayCost });

  return (
    <ChestPlayer
      chest={chest}
      backTo="/holiday"
      fairnessTo="/fairness/cases/holiday"
      onOpen={handleOpen}
      descripton={
        <Div
          align="center"
          gap={4}
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
            {Intimal.toLocaleString(holidayCost, 0)}
          </Span>
        </Div>
      }
      cost={(openCount) => (
        <Div
          fx={layout === "mobile"}
          align="center"
          justify="flex-end"
          gap={4}
        >
          {layout === "mobile" && <Span size={13}>{"Total Cost: "}</Span>}
          <Vector
            as={SvgSiteHoliday}
            size={14}
          />
          <Span
            family="title"
            weight="bold"
            color="white"
          >
            {Intimal.toLocaleString(holidayCost * openCount, 0)}
          </Span>
        </Div>
      )}
    />
  );
};
