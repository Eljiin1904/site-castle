import "./BlackjackChipOptions.scss";
import { chipValues } from "#app/services/blackjack/constants/chipValues";
import { BlackjackChipOption } from "./BlackjackChipOption";

export const BlackjackChipOptions = ({}: {}) => {
  return (
    <div className="BlackjackChipOptions">
      {chipValues.map((chipValue) => (
        <BlackjackChipOption
          key={chipValue}
          value={chipValue}
        />
      ))}
    </div>
  );
};
