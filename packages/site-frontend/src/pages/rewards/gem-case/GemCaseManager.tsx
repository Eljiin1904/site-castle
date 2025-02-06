import { ChestDocument } from "@core/types/chests/ChestDocument";
import { Intimal } from "@core/services/intimal";
import { Span } from "@client/comps/span/Span";
import { SvgSiteGem } from "@client/svgs/site/SvgSiteGem";
import { Vector } from "@client/comps/vector/Vector";
import { Div } from "@client/comps/div/Div";
import { ChestPlayer } from "#app/comps/chest-player/ChestPlayer";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { useOpen } from "./useOpen";

export const GemCaseManager = ({
  chest,
  gemCost,
}: {
  chest: ChestDocument;
  gemCost: number;
}) => {
  const layout = useAppSelector((x) => x.style.mainLayout);

  const handleOpen = useOpen({ chest, gemCost });

  return (
    <ChestPlayer
      chest={chest}
      backTo="/rewards/gems"
      fairnessTo="/fairness/cases/gem"
      onOpen={handleOpen}
      descripton={
        <Div
          align="center"
          gap={4}
        >
          <Vector
            as={SvgSiteGem}
            size={14}
          />
          <Span
            family="title"
            weight="bold"
            color="white"
          >
            {Intimal.toLocaleString(gemCost, 0)}
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
            as={SvgSiteGem}
            size={14}
          />
          <Span
            family="title"
            weight="bold"
            color="white"
          >
            {Intimal.toLocaleString(gemCost * openCount, 0)}
          </Span>
        </Div>
      )}
    />
  );
};
