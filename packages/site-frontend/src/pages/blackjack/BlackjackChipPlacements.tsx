import { useTranslation } from "#client/hooks/localization/useTranslation";
import "./BlackjackChipPlacements.scss";
import { BlackjackPlacement } from "./BlackjackPlacement";

export const BlackjackChipPlacements = ({}: {}) => {
  const { t } = useTranslation();
  let i = 0;

  return (
    <div className="BlackjackChipPlacements">
      <div className="ChipPlacements_inner">
        <BlackjackPlacement
          index={i++}
          betType="main-bet"
          title={t.gameplay("main_bet")}
          size="large"
        />
        <BlackjackPlacement
          index={i++}
          betType="blackjack-15x"
          title={t.gameplay("blackjack_15x")}
        />
        <BlackjackPlacement
          index={i++}
          betType="lucky-ladies"
          title={t.gameplay("lucky_ladies")}
        />
        <BlackjackPlacement
          index={i++}
          betType="21+3"
          title="21 +3"
        />
        <BlackjackPlacement
          index={i++}
          betType="perfect-pairs"
          title={t.gameplay("perfect_pairs")}
        />
      </div>
    </div>
  );
};
