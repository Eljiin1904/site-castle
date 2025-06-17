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
import { BlackjackInputGroup } from "./BlackjackInputGroup";
// import { useTranslation } from "#client/hooks/localization/useTranslation";

export default function BlackjackGameOverActions() {
  // const { t } = useTranslation();

  return (
    <Div
      className="BlackjackGameOverActions"
      justify="center"
    >
      <BlackjackInputGroup />
    </Div>
  );
}
