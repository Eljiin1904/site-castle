import "./BlackjackPlacementChip.scss";
import { ChipValue } from "#app/services/blackjack/constants/chipValues";
import { BlackjackChip } from "./BlackjackChip";

export const BlackjackPlacementChip = ({
  value,
  displayVal,
}: {
  value: ChipValue;
  displayVal?: number | null;
}) => {
  return (
    <div className={"BlackjackPlacementChip"}>
      <BlackjackChip
        value={value}
        displayVal={displayVal}
      />
    </div>
  );
};
