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
import { useTranslation } from "@core/services/internationalization/internationalization";

export const DiceViewFooter = () => {
  const layout = useAppSelector((x) => x.style.mainLayout);
  const targetKind = useAppSelector((x) => x.dice.targetKind);
  const targetValue = useAppSelector((x) => x.dice.targetValue);
  const processing = useAppSelector((x) => x.dice.processing);
  const autoPlaying = useAppSelector((x) => x.dice.autoPlaying);
  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const sm = layout === "mobile";

  return (
    <Div
      fx
      px={sm ? 20 : 24}
      py={sm ? 16 : 24}
      gap={sm ? 8 : 12}
      bg="brown-6"
    >
      <ModalSection justifyContent="space-between">
        <ModalLabel>{t("fields:bets.multiplier")}</ModalLabel>
        <Input
          type="decimal"
          decimals={2}
          iconRight={SvgTimes}
          placeholder={t("fields:bets.multiplierPlaceholder")}
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
      <ModalSection justifyContent="space-between">
        <ModalLabel>
          {targetKind === "over" ? t("fields:bets.rollOver") :t("fields:bets.rollUnder")}
        </ModalLabel>
        <Input
          type="decimal"
          decimals={2}
          iconRight={SvgRedo}
          iconColor="dark-sand"
          placeholder={t("fields:bets.rollTargetPlaceholder")}
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
      <ModalSection justifyContent="space-between">
        <ModalLabel>{t("fields:bets.winChance")}</ModalLabel>
        <Input
          type="decimal"
          decimals={2}
          iconRight={SvgPercent}
          iconColor="dark-sand"
          placeholder={t("fields:bets.winChancePlaceholder")}
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
