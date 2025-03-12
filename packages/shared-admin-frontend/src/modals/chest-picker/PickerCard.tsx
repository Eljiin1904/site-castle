import classNames from "classnames";
import { ChestDocument } from "@core/types/chests/ChestDocument";
import { Placeholder } from "@client/comps/placeholder/Placeholder";
import { ChestCard } from "@client/comps/chests/ChestCard";
import "./PickerCard.scss";

export const PickerCardPlaceholder = () => {
  return <Placeholder className="PickerCard" />;
};

export const PickerCard = ({
  chest,
  disabled,
  onClick,
}: {
  chest: ChestDocument;
  disabled: boolean;
  onClick: () => void;
}) => {
  return (
    <ChestCard
      className={classNames("PickerCard", { disabled })}
      chest={chest}
      hover="border"
      onClick={disabled ? undefined : onClick}
    />
  );
};
