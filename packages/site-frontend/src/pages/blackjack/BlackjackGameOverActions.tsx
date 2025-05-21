import "./BlackjackGameOverActions.scss";
import { usePayoutAmount, usePlayer } from "../../services/blackjack/redux/selectors";
import { Vector } from "#client/comps/vector/Vector";
import { SvgSiteToken } from "#client/svgs/site/SvgSiteToken";
import { Intimal } from "#core/services/intimal";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { BlackjackButton } from "./BlackjackButton";
import { useCallback } from "react";
import { clearGame } from "#app/services/blackjack/redux/blackjackSlice";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
// import { useTranslation } from "#client/hooks/localization/useTranslation";

export default function BlackjackGameOverActions() {
  // const { t } = useTranslation();
  const player = usePlayer();
  const { mainPayout, totalPayout, statusTitle } = player;
  // could probably safely remove undefined here
  const cardsDealt = useAppSelector((state) => state.blackjack.cardsDealt);
  const dispatch = useAppDispatch();

  const onClearGame = useCallback(() => {
    dispatch(clearGame({ resetBetting: false }));
  }, [dispatch, clearGame]);

  if (!cardsDealt) return null;

  return (
    <div className="BlackjackGameOverActions">
      <div className="top">
        {statusTitle && (
          <div className="status-title">
            {/* {t.all(statusTitle.toLowerCase().replace(" ", "_"))} */}
            {statusTitle.toLowerCase().replace(" ", "_")}
          </div>
        )}

        {!!totalPayout && (
          <div className="payout">
            <span>+</span>
            <Vector
              className="icon"
              as={SvgSiteToken}
              size={14}
            />
            <span>{Intimal.toDecimal(totalPayout)}</span>
          </div>
        )}
      </div>
      {/* {!hasPayout && <div className="payout">{lostText}</div>} */}

      <BlackjackButton
        // text={t.gameplay("play_again")}
        text={"Play Again"}
        onClick={onClearGame}
        long
      />
    </div>
  );
}
