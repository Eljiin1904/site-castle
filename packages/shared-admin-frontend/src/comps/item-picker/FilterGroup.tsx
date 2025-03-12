import { Button } from "@client/comps/button/Button";
import { Div } from "@client/comps/div/Div";
import { FilterItem } from "./FilterItem";

export const FilterGroup = ({
  className,
  options,
  actives,
  onChange,
}: {
  className?: string;
  options: string[];
  actives: boolean[];
  onChange: (actives: boolean[]) => void;
}) => {
  return (
    <Div
      className={className}
      column
      fx
      fy
      p={16}
      gap={8}
      bg="brown-6"
      border
    >
      {options.map((value, i) => (
        <FilterItem
          key={i}
          label={value}
          active={actives[i]}
          onToggle={(active) => {
            actives[i] = active;
            onChange(actives.slice());
          }}
        />
      ))}
      <Div
        grow
        align="flex-end"
        gap={12}
        mt={8}
      >
        <Button
          kind="secondary"
          size="sm"
          label="Everything"
          fx
          onClick={() => onChange(options.map((x) => true))}
        />
        <Button
          kind="secondary"
          size="sm"
          label="Nothing"
          fx
          onClick={() => onChange(options.map((x) => false))}
        />
      </Div>
    </Div>
  );
};
