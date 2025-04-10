import { DiceMode } from "@core/types/dice/DiceMode";
import { Conditional } from "@client/comps/conditional/Conditional";
import { Div } from "@client/comps/div/Div";
import { ButtonNav } from "@client/comps/button/ButtonNav";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { Dice } from "#app/services/dice";
import { DiceMenuAuto } from "./DiceMenuAuto";
import { DiceMenuManual } from "./DiceMenuManual";
import { useTranslation } from "@core/services/internationalization/internationalization";

export const DiceMenu = () => {
  const layout = useAppSelector((x) => x.style.mainLayout);
  const mode = useAppSelector((x) => x.dice.mode);
  const sm = layout === "mobile";

  return (
    <Div
      wrap
      style={
        sm
          ? undefined
          : {
              minWidth: "320px",
              maxWidth: "320px",
            }
      }
    >
      <ModeMenu />
      <Div
        column
        px={sm ? 20 : 24}
        py={sm ? 16 : 24}
        gap={16}
        bg="brown-6"
        borderColor="brown-4"
        borderTop
        fx
        style={
          sm
            ? undefined
            : {
                minHeight: "608px",
                maxHeight: "608px",
              }
        }
      >
        <Conditional
          value={mode}
          manual={<DiceMenuManual />}
          auto={<DiceMenuAuto />}
        />
      </Div>
    </Div>
  );
};

const ModeMenu = () => {
  const mode = useAppSelector((x) => x.dice.mode);
  const processing = useAppSelector((x) => x.dice.processing);
  const autoPlaying = useAppSelector((x) => x.dice.autoPlaying);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const modeHandler = (x: DiceMode) => {
    return () => dispatch(Dice.setMode(x));
  };

  return (
    <ButtonNav
      disabled={processing || autoPlaying}
      options={[
        {
          label: t("common:manual"),
          active: mode === "manual",
          onClick: modeHandler("manual"),
        },
        {
          label: t("common:auto"),
          active: mode === "auto",
          onClick: modeHandler("auto"),
        },
      ]}
    />
  );
};
