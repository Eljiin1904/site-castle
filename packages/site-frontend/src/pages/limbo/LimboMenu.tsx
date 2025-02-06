import { ButtonNav } from "@client/comps/button/ButtonNav";
import { Conditional } from "@client/comps/conditional/Conditional";
import { Div } from "@client/comps/div/Div";

import { LimboMode } from "@core/types/limbo/LimboMode";

import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { useAppSelector } from "#app/hooks/store/useAppSelector";

import { Limbo } from "#app/services/limbo";

import { LimboMenuAuto } from "./LimboMenuAuto";
import { LimboMenuManual } from "./LimboMenuManual";

export const LimboMenu = () => {
  const layout = useAppSelector((x) => x.style.mainLayout);
  const mode = useAppSelector((x) => x.limbo.mode);
  const sm = layout === "mobile";

  return (
    <Div
      column
      p={16}
      gap={12}
      bg="brown-6"
      border
      style={
        sm
          ? undefined
          : {
              minWidth: "320px",
              maxWidth: "320px",
              minHeight: "608px",
              // maxHeight: "608px", // Button is going off screen on a 14 in screen
            }
      }
    >
      {!sm && <ModeMenu />}
      <Conditional
        value={mode}
        manual={<LimboMenuManual />}
        auto={<LimboMenuAuto />}
      />
      {sm && <ModeMenu />}
    </Div>
  );
};

const ModeMenu = () => {
  const dispatch = useAppDispatch();

  const autoPlaying = useAppSelector((x) => x.limbo.autoPlaying);
  const mode = useAppSelector((x) => x.limbo.mode);
  const processing = useAppSelector((x) => x.limbo.processing);

  const modeHandler = (x: LimboMode) => {
    return () => dispatch(Limbo.setMode(x));
  };

  return (
    <ButtonNav
      disabled={processing || autoPlaying}
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
