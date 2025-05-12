import { Conditional } from "@client/comps/conditional/Conditional";
import { Div } from "@client/comps/div/Div";
import { ButtonNav } from "@client/comps/button/ButtonNav";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { Crash } from "#app/services/crash";
// import { DiceMenuAuto } from "./DiceMenuAuto";

import { useTranslation } from "@core/services/internationalization/internationalization";
import { CrashMenuManual } from "./CrashMenuManual";
import { CrashMode } from "@core/types/crash/CrashMode";
import { BetBoardTicketGrid } from "./BetBoardTicketGrid";

export const CrashMenu = () => {
  const layout = useAppSelector((x) => x.style.mainLayout);
  const mode = useAppSelector((x) => x.crash.mode);
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
          manual={<CrashMenuManual />}
          auto={<CrashMenuManual />}
        />
        <BetBoardTicketGrid />
      </Div>
    </Div>
  );
};

const ModeMenu = () => {
  const mode = useAppSelector((x) => x.crash.mode);
  const processing = useAppSelector((x) => x.crash.processing);
  
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const modeHandler = (x: CrashMode) => {
    return () => dispatch(Crash.setMode(x));
  };

  return (
    <ButtonNav
      disabled={processing}
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
