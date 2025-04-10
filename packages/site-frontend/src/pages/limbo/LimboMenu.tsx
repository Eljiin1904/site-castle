import { ButtonNav } from "@client/comps/button/ButtonNav";
import { Conditional } from "@client/comps/conditional/Conditional";
import { Div } from "@client/comps/div/Div";

import { LimboMode } from "@core/types/limbo/LimboMode";

import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { useAppSelector } from "#app/hooks/store/useAppSelector";

import { Limbo } from "#app/services/limbo";

import { LimboMenuAuto } from "./LimboMenuAuto";
import { LimboMenuManual } from "./LimboMenuManual";
import { useTranslation } from "@core/services/internationalization/internationalization";

export const LimboMenu = () => {
  const layout = useAppSelector((x) => x.style.mainLayout);
  const mode = useAppSelector((x) => x.limbo.mode);
  const sm = layout === "mobile";
  const md = layout === "tablet";

  return (
    <Div
      wrap
      style={
        sm || md
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
          manual={<LimboMenuManual />}
          auto={<LimboMenuAuto />}
        />
      </Div>
    </Div>
  );
};

const ModeMenu = () => {
  const autoPlaying = useAppSelector((x) => x.limbo.autoPlaying);
  const mode = useAppSelector((x) => x.limbo.mode);
  const processing = useAppSelector((x) => x.limbo.processing);

  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const modeHandler = (x: LimboMode) => {
    return () => dispatch(Limbo.setMode(x));
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
