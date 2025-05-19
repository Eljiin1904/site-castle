import "./BlackjackChip.scss";
import { ChipValue } from "#app/services/blackjack/constants/chipValues";
import { getChipImage } from "./utils/getChipImage";
import { BlackjackPicture } from "./BlackjackPicture";
import classNames from "classnames";

export const BlackjackChip = ({
  value,
  displayVal,
}: {
  value: ChipValue;
  displayVal?: number | null;
}) => {
  const src = getChipImage(value);

  let displayStr = displayVal ? displayVal.toString() : value.toString();
  if (!displayVal && value === 1000) displayStr = "1K";
  const valLen = displayStr.length;

  const className = classNames(
    "BlackjackChip",
    "chip-" + value.toString().replace(".", "-"),
    "char-len-" + valLen,
  );

  return (
    <div className={className}>
      <BlackjackPicture
        src={src}
        alt={`Chip ${value}`}
      />
      {displayVal !== null && <div className="text">{displayStr}</div>}
    </div>
  );
};
