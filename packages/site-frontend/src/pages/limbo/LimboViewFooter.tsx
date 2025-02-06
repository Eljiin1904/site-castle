import { Div } from "@client/comps/div/Div";
import { ModalSection } from "@client/comps/modal/ModalSection";
import { Input } from "@client/comps/input/Input";
import { ModalLabel } from "@client/comps/modal/ModalLabel";
import { SvgPercent } from "@client/svgs/common/SvgPercent";
import { SvgTimes } from "@client/svgs/common/SvgTimes";
import { Limbo } from "#app/services/limbo";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { useAppSelector } from "#app/hooks/store/useAppSelector";

export const LimboViewFooter = () => {
  const layout = useAppSelector((x) => x.style.mainLayout);
  const targetValue = useAppSelector((x) => x.limbo.targetValue);
  const processing = useAppSelector((x) => x.limbo.processing);
  const autoPlaying = useAppSelector((x) => x.limbo.autoPlaying);
  const sm = layout === "mobile";
  const dispatch = useAppDispatch();

  return (
    <Div
      fx
      px={sm ? 10 : 16}
      py={sm ? 12 : 16}
      gap={sm ? 6 : 12}
      bg="brown-6"
    >
      <ModalSection>
        <ModalLabel>{"Multiplier"}</ModalLabel>
        <Div align="center">
          <Input
            type="decimal"
            decimals={2}
            iconRight={SvgTimes}
            placeholder="Enter multiplier..."
            value={Limbo.getMultiplier({ targetValue })}
            disabled={processing || autoPlaying}
            onChange={(x) =>
              dispatch(
                Limbo.setTargetValue(Limbo.getTargetFromMultiplier(x || 0)),
              )
            }
          />
        </Div>
      </ModalSection>
      <ModalSection>
        <ModalLabel>{"Win Chance"}</ModalLabel>
        <Input
          type="decimal"
          decimals={6}
          iconRight={SvgPercent}
          placeholder="Enter win chance..."
          value={Limbo.getWinChance({ targetValue })}
          disabled={processing || autoPlaying}
          onChange={(x) =>
            dispatch(
              Limbo.setTargetValue(Limbo.getTargetValueFromWinChance(x || 0)),
            )
          }
        />
      </ModalSection>
    </Div>
  );
};
