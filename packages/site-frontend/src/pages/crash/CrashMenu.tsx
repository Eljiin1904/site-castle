import { Conditional } from "@client/comps/conditional/Conditional";
import { Div } from "@client/comps/div/Div";
import { ButtonNav } from "@client/comps/button/ButtonNav";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { Crash } from "#app/services/crash";

import { useTranslation } from "@core/services/internationalization/internationalization";
import { CrashMenuManual } from "./CrashMenuManual";
import { CrashMode } from "@core/types/crash/CrashMode";
import { BetBoardTicketGrid } from "./BetBoardTicketGrid";
import { CrashMenuAuto } from "./CrashMenuAuto";
import { useProcessingTicket } from "./useProcessingTicket";

export const CrashMenu = () => {
  const layout = useAppSelector((x) => x.style.mainLayout);
  const mode = useAppSelector((x) => x.crash.mode);
  const sm = layout === "mobile" || layout === "tablet";
  const bgColor = 'brown-6';

  return (
    <Div
      wrap
      column
      bg={mode === "auto" ? bgColor : undefined}
      style={
        sm
          ? undefined
          : {
              minWidth: "320px",
              maxWidth: "320px",
              minHeight: "650px",
              maxHeight: "753px",
              overflowY: "auto",
            }
      }
    >
      <ModeMenu />
      <Div
        column
        px={sm ? 20 : 24}
        py={sm ? 16 : 24}
        borderColor="brown-4"
        borderTop
        bg={bgColor}
        fx
      >
        <Conditional
          value={mode}
          manual={<CrashMenuManual />}
          auto={<CrashMenuAuto />}
        />
      </Div>
      {mode === 'manual' && <BetBoardTicketGrid />}
    </Div>
  );
};
/**
 * Select mode for crash game, (Manual and Auto), prevent user from changing mode when bet in current round, is auto playing or betting next round
 * @returns 
 */
const ModeMenu = () => {
  const mode = useAppSelector((x) => x.crash.mode);
  const autoPlaying = useAppSelector((x) => x.crash.autoPlaying);
  const betNextRound = useAppSelector((x) => x.crash.betNextRound);
  const isProcessing = useProcessingTicket();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  
  const modeHandler = (x: CrashMode) => {
    return () => dispatch(Crash.setMode(x));
  };

  return (
    <ButtonNav
      disabled={isProcessing || autoPlaying || betNextRound}
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
