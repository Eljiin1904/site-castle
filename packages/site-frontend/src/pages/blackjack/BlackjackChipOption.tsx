import "./BlackjackChipOption.scss";
import { useCallback } from "react";
import { setSelectedValue } from "../../services/blackjack/redux/blackjackSlice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { ChipValue } from "#app/services/blackjack/constants/chipValues";
import classNames from "classnames";
import { BlackjackChip } from "./BlackjackChip";

export const BlackjackChipOption = ({ value }: { value: ChipValue }) => {
  const selectedValue = useAppSelector((state) => state.blackjack.betting.selectedValue);
  const dispatch = useDispatch();

  const className = classNames("BlackjackChipOption", {
    active: value == selectedValue,
  });

  const onSelect = useCallback(() => {
    dispatch(setSelectedValue(value));
  }, [value, setSelectedValue]);

  return (
    <div
      className={className}
      onClick={onSelect}
    >
      <BlackjackChip value={value} />
    </div>
  );
};
