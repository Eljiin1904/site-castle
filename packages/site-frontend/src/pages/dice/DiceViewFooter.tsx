import { Div } from "@client/comps/div/Div";
import { ModalSection } from "@client/comps/modal/ModalSection";
import { Input } from "@client/comps/input/Input";
import { ModalLabel } from "@client/comps/modal/ModalLabel";
import { SvgPercent } from "@client/svgs/common/SvgPercent";
import { SvgTimes } from "@client/svgs/common/SvgTimes";
import { SvgRedo } from "@client/svgs/common/SvgRedo";
import { Dice } from "#app/services/dice";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { useAppSelector } from "#app/hooks/store/useAppSelector";

export const DiceViewFooter = () => {
  const layout = useAppSelector((x) => x.style.mainLayout);
  const targetKind = useAppSelector((x) => x.dice.targetKind);
  const targetValue = useAppSelector((x) => x.dice.targetValue);
  const processing = useAppSelector((x) => x.dice.processing);
  const autoPlaying = useAppSelector((x) => x.dice.autoPlaying);
  const sm = layout === "mobile";
  const dispatch = useAppDispatch();

  return (
    <Div
      fx
      px={sm ? 20 : 16}
      py={sm ? 16 : 16}
      gap={sm ? 8 : 12}
      bg="brown-6"
    >
      <ModalSection>
        <ModalLabel>{"Multiplier"}</ModalLabel>
        <Input
          type="decimal"
          decimals={4}
          iconRight={SvgTimes}
          iconColor="dark-sand"
          placeholder="Enter multiplier..."
          value={Dice.getMultiplier({ targetValue, targetKind })}
          disabled={processing || autoPlaying}
          onChange={(x) => {
            const multiplier = x || 0;
            dispatch(
              Dice.setTargetValue(
                targetKind === "over"
                  ? Math.round(
                      Dice.maxValue -
                        (Dice.maxValue * (1 - Dice.edgeRate)) / multiplier,
                    )
                  : Math.round(
                      (Dice.maxValue * (1 - Dice.edgeRate)) / multiplier,
                    ),
              ),
            );
          }}
        />
      </ModalSection>
      <ModalSection>
        <ModalLabel>
          {targetKind === "over" ? "Roll Over" : "Roll Under"}
        </ModalLabel>
        <Input
          type="decimal"
          decimals={2}
          iconRight={SvgRedo}
          iconColor="dark-sand"
          placeholder="Enter target..."
          value={targetValue / 100}
          disabled={processing || autoPlaying}
          onChange={(x) => {
            dispatch(Dice.setTargetValue((x || 0) * 100));
          }}
          onIconRightClick={() => {
            dispatch(
              Dice.setTargetKind(targetKind === "over" ? "under" : "over"),
            );
            dispatch(Dice.setTargetValue(Dice.maxValue - targetValue));
          }}
        />
      </ModalSection>
      <ModalSection>
        <ModalLabel>{"Win Chance"}</ModalLabel>
        <Input
          type="decimal"
          decimals={2}
          iconRight={SvgPercent}
          iconColor="dark-sand"
          placeholder="Enter win chance..."
          value={Dice.getWinChance({ targetValue, targetKind })}
          disabled={processing || autoPlaying}
          onChange={(x) => {
            const winChance = x || 0;
            dispatch(
              Dice.setTargetValue(
                targetKind === "over"
                  ? Math.round((100 - winChance) * 100)
                  : Math.round(winChance * 100),
              ),
            );
          }}
        />
      </ModalSection>
    </Div>
  );
};
