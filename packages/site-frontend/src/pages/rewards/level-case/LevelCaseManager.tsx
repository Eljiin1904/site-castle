import { ChestDocument } from "@core/types/chests/ChestDocument";
import { Span } from "@client/comps/span/Span";
import { Div } from "@client/comps/div/Div";
import { Vector } from "@client/comps/vector/Vector";
import { SvgKey } from "@client/svgs/common/SvgKey";
import { ChestPlayer } from "#app/comps/chest-player/ChestPlayer";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { useOpen } from "./useOpen";

export const LevelCaseManager = ({ chest }: { chest: ChestDocument }) => {
  const layout = useAppSelector((x) => x.style.mainLayout);
  const keys = useAppSelector((x) => x.user.chestKeys);
  const keyCount = keys[chest._id] || 0;

  const handleOpen = useOpen(chest);

  return (
    <ChestPlayer
      chest={chest}
      backTo="/rewards/cases"
      fairnessTo="/fairness/cases/level"
      onOpen={handleOpen}
      descripton={
        <Span
          size={13}
          color="gray"
        >
          {"Level Up Case"}
        </Span>
      }
      cost={(openCount) => (
        <Div
          fx={layout === "mobile"}
          align="center"
          justify="flex-end"
          gap={4}
        >
          <Span>{"Keys: "}</Span>
          <Div
            align="center"
            gap={4}
          >
            <Vector
              as={SvgKey}
              size={14}
              color="gold"
            />
            <Span
              family="title"
              weight="bold"
              color="white"
            >
              {keyCount}
            </Span>
          </Div>
        </Div>
      )}
    />
  );
};
