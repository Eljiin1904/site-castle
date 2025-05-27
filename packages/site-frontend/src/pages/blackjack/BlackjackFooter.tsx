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
import { BetInputGroup } from "./BetInputGroup";
import { Button } from "@client/comps/button/Button";
import { useCreateGame } from "#app/services/blackjack/hooks/useCreateGame";
import { useProcessing } from "#app/services/blackjack/redux/selectors";
import { useCallback } from "react";
import { SvgDollarSign } from "@client/svgs/common/SvgDollarSign";

// import { Div } from "@client/comps/div/Div";

export const BlackjackFooter = () => {
  const layout = useAppSelector((x) => x.style.mainLayout);
  // const targetKind = useAppSelector((x) => x.dice.targetKind);
  // const targetValue = useAppSelector((x) => x.dice.targetValue);
  // const processing = useAppSelector((x) => x.dice.processing);
  // const autoPlaying = useAppSelector((x) => x.dice.autoPlaying);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const sm = layout === "mobile";
  const createGame = useCreateGame();
  const processing = useProcessing();

  const onClick = useCallback(() => {
    if (processing) return;
    createGame();
  }, []);
  return (
    <Div
      fx
      px={sm ? 20 : 24}
      py={sm ? 16 : 24}
      gap={sm ? 8 : 12}
      bg="brown-6"
      zIndex={15}
    >
      <ModalSection justifyContent="space-between">
        <ModalLabel>Main Bet</ModalLabel>
        <BetInputGroup />
      </ModalSection>
      <ModalSection justifyContent="space-between">
        <ModalLabel>
          {/* {t("fields:bets.multiplier")} */}
          21+3 Bet
        </ModalLabel>
        <Input
          type="decimal"
          decimals={2}
          iconLeft={SvgDollarSign}
          placeholder={t("fields:bets.multiplierPlaceholder")}
          value={0}
          // disabled={processing || autoPlaying}
          onChange={(x) => {
            const multiplier = x || 0;
            // dispatch(
            //   Dice.setTargetValue(
            //     targetKind === "over"
            //       ? Math.round(
            //           Dice.maxValue -
            //             (Dice.maxValue * (1 - Dice.edgeRate)) / multiplier,
            //         )
            //       : Math.round(
            //           (Dice.maxValue * (1 - Dice.edgeRate)) / multiplier,
            //         ),
            //   ),
            // );
          }}
        />
      </ModalSection>
      <ModalSection justifyContent="space-between">
        <ModalLabel>
          {/* {targetKind === "over" ? t("fields:bets.rollOver") : t("fields:bets.rollUnder")} */}
          Perfect Pair
        </ModalLabel>
        <Input
          type="decimal"
          decimals={2}
          iconLeft={SvgDollarSign}
          iconColor="dark-sand"
          placeholder={t("fields:bets.rollTargetPlaceholder")}
          value={0}
          disabled={processing}
          onChange={(x) => {
            // dispatch(Dice.setTargetValue((x || 0) * 100));
          }}
          onIconRightClick={() => {
            // dispatch(
            //   Dice.setTargetKind(targetKind === "over" ? "under" : "over"),
            // );
            // dispatch(Dice.setTargetValue(Dice.maxValue - targetValue));
          }}
        />
      </ModalSection>
      <ModalSection justifyContent="space-between">
        <ModalLabel>
          {/* {t("fields:bets.winChance")} */}
          Lucky Ladies
        </ModalLabel>
        <Input
          type="decimal"
          decimals={2}
          iconLeft={SvgDollarSign}
          iconColor="dark-sand"
          placeholder={t("fields:bets.winChancePlaceholder")}
          value={0}
          disabled={processing}
          onChange={(x) => {
            const winChance = x || 0;
            // dispatch(
            //   Dice.setTargetValue(
            //     targetKind === "over"
            //       ? Math.round((100 - winChance) * 100)
            //       : Math.round(winChance * 100),
            //   ),
            // );
          }}
        />
      </ModalSection>

      <ModalSection justifyContent="space-between">
        <ModalLabel>
          {/* {t("fields:bets.winChance")} */}
          Blackjack
        </ModalLabel>
        <Input
          type="decimal"
          decimals={2}
          iconLeft={SvgDollarSign}
          iconColor="dark-sand"
          placeholder={t("fields:bets.winChancePlaceholder")}
          value={0}
          disabled={processing}
          onChange={(x) => {
            const winChance = x || 0;
            // dispatch(
            //   Dice.setTargetValue(
            //     targetKind === "over"
            //       ? Math.round((100 - winChance) * 100)
            //       : Math.round(winChance * 100),
            //   ),
            // );
          }}
        />
      </ModalSection>
      <ModalSection>
        <Div
          grow
          mt={20}
          justify={"center"}
          align={"center"}
        >
          <Button
            kind="secondary"
            size="sm"
            label="Place Bet"
            disabled={processing}
            fx
            onClick={() => createGame()}
          />
        </Div>
      </ModalSection>
    </Div>
  );
};
