import { Div } from "@client/comps/div/Div";
import { ModalSection } from "@client/comps/modal/ModalSection";
import { Input } from "@client/comps/input/Input";
import { ModalLabel } from "@client/comps/modal/ModalLabel";
import { SvgPercent } from "@client/svgs/common/SvgPercent";
import { SvgTimes } from "@client/svgs/common/SvgTimes";
import { Limbo } from "#app/services/limbo";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { useTranslation } from "@core/services/internationalization/internationalization";

export const LimboViewFooter = () => {
  const layout = useAppSelector((x) => x.style.mainLayout);
  const targetValue = useAppSelector((x) => x.limbo.targetValue);
  const processing = useAppSelector((x) => x.limbo.processing);
  const autoPlaying = useAppSelector((x) => x.limbo.autoPlaying);
  const sm = layout === "mobile";
  const dispatch = useAppDispatch();
  const {t} = useTranslation();

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
          value={Limbo.getMultiplier({ targetValue })}
          disabled={processing || autoPlaying}
          onChange={(x) =>
            dispatch(
              Limbo.setTargetValue(Limbo.getTargetFromMultiplier(x || 0)),
            )
          }
        />
      </ModalSection>
      <ModalSection justifyContent="space-between">
        <ModalLabel>{t("fields:bets.winChance")}</ModalLabel>
        <Input
          type="decimal"
          decimals={6}
          iconRight={SvgPercent}
          placeholder={t("fields:bets.winChancePlaceholder")}
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
