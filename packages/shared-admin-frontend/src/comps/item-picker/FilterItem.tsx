import { Checkbox } from "@client/comps/checkbox/Checkbox";

export const FilterItem = ({
  label,
  active,
  onToggle,
}: {
  label: string;
  active: boolean;
  onToggle: (x: boolean) => void;
}) => {
  return (
    <Checkbox
      label={label}
      value={active}
      onChange={onToggle}
    />
  );
};
