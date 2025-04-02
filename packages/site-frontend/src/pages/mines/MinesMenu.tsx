import { MinesMode } from "#core/types/mines/MinesMode";
import { ButtonNav } from "#client/comps/button/ButtonNav";
import { Div } from "#client/comps/div/Div";
import { Conditional } from "#client/comps/conditional/Conditional";
import { Mines } from "#app/services/mines";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { MinesMenuAuto } from "./MinesMenuAuto";
import { MinesMenuManual } from "./MinesMenuManual";
import { usePlaying } from "./usePlaying";

export const MinesMenu = () => {
  const layout = useAppSelector((x) => x.style.mainLayout);
  const mode = useAppSelector((x) => x.mines.mode);
  const sm = layout === "mobile";

  return (
    <Div
      column
      p={16}
      gap={12}
      bg="gray-6"
      border
      style={
        sm
          ? undefined
          : {
              minWidth: "320px",
              maxWidth: "320px",
              minHeight: "608px",
              maxHeight: "608px",
            }
      }
    >
      {!sm && <ModeMenu />}
      <Conditional
        value={mode}
        manual={<MinesMenuManual />}
        auto={<MinesMenuAuto />}
      />
      {sm && <ModeMenu />}
    </Div>
  );
};

const ModeMenu = () => {
  const mode = useAppSelector((x) => x.mines.mode);
  const processing = useAppSelector((x) => x.mines.processing);
  const playing = usePlaying();
  const autoPlaying = useAppSelector((x) => x.mines.autoPlaying);
  const dispatch = useAppDispatch();

  const modeHandler = (x: MinesMode) => {
    return () => dispatch(Mines.setMode(x));
  };

  return (
    <ButtonNav
      disabled={processing || autoPlaying || playing}
      options={[
        {
          label: "Manual",
          active: mode === "manual",
          onClick: modeHandler("manual"),
        },
        {
          label: "Auto",
          active: mode === "auto",
          onClick: modeHandler("auto"),
        },
      ]}
    />
  );
};
