import { MinesMode } from "@core/types/mines/MinesMode";
import { ButtonNav } from "@client/comps/button/ButtonNav";
import { Div } from "@client/comps/div/Div";
import { Conditional } from "@client/comps/conditional/Conditional";
import { Mines } from "#app/services/mines";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { MinesMenuAuto } from "./MinesMenuAuto";
import { MinesMenuManual } from "./MinesMenuManual";
import { usePlaying } from "./usePlaying";
import { useTranslation } from "@core/services/internationalization/internationalization";


export const MinesMenu = () => {
  const layout = useAppSelector((x) => x.style.mainLayout);
  const mode = useAppSelector((x) => x.mines.mode);
  const sm = layout === "mobile";

  return (<Div wrap style={
    sm
      ? undefined
      : {
          minWidth: "320px",
          maxWidth: "320px",
        }
  }>
   <ModeMenu />
   <Div
      column
      px={sm? 20 : 24}
      py={sm? 16 : 24}
      gap={16}
      bg="brown-6"
      borderColor="brown-4"
      borderTop
      fx
      style={
        sm
          ? undefined
          : {
              minHeight: "608px"
            }
      }
    >
      <Conditional
        value={mode}
        manual={<MinesMenuManual />}
        auto={<MinesMenuAuto />}
      />
    </Div>
   </Div>
  );
};

const ModeMenu = () => {
  const mode = useAppSelector((x) => x.mines.mode);
  const processing = useAppSelector((x) => x.mines.processing);
  const playing = usePlaying();
  const autoPlaying = useAppSelector((x) => x.mines.autoPlaying);
  const dispatch = useAppDispatch();
  const {t} = useTranslation();
  const modeHandler = (x: MinesMode) => {
    return () => dispatch(Mines.setMode(x));
  };

  return (
    <ButtonNav
      disabled={processing || autoPlaying || playing}
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
