import "./BlackjackGameOverActions.scss";
import { usePayoutAmount, usePlayer } from "../../services/blackjack/redux/selectors";
import { Vector } from "@client/comps/vector/Vector";
import { SvgDollarSign } from "@client/svgs/common/SvgDollarSign";
import { Intimal } from "@core/services/intimal";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { BlackjackButton } from "./BlackjackButton";
import { useCallback, useEffect } from "react";
import { clearGame } from "#app/services/blackjack/redux/blackjackSlice";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
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
  useEffect(() => {
    setTimeout(() => {
      onClearGame();
    }, 2000);
  }, []);
  if (!cardsDealt) return null;

  return (
    <Div
      className="BlackjackGameOverActions"
      bg="black-overlay"
      borderColor="brown-4"
      width={200}
      py={10}
    >
      <Div
        className="top"
        color="dark-sand"
      >
        {statusTitle && (
          <div className="status-title">
            {/* {t.all(statusTitle.toLowerCase().replace(" ", "_"))} */}
            {statusTitle}
          </div>
        )}

        {!!totalPayout && (
          <Div
            className="payout"
            color="sand"
          >
            <Span>+</Span>
            <Vector
              className="icon"
              as={SvgDollarSign}
              size={14}
            />
            <Span color="sand">{Intimal.toDecimal(totalPayout)}</Span>
          </Div>
        )}
      </Div>
      {/* {!hasPayout && <div className="payout">{lostText}</div>} */}

      {/* <BlackjackButton
        // text={t.gameplay("play_again")}
        icon="repeat"
        text={"Play Again"}
        onClick={onClearGame}
        long
      /> */}
    </Div>
  );
}
