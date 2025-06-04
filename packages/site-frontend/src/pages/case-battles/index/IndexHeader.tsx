import { Div } from "@client/comps/div/Div";
import { Dropdown } from "@client/comps/dropdown/Dropdown";
import { Button } from "@client/comps/button/Button";
import { Span } from "@client/comps/span/Span";
import { Tokens } from "@client/comps/tokens/Tokens";
import { Vector } from "@client/comps/vector/Vector";
import { SvgCircle } from "@client/svgs/common/SvgCircle";
import { SvgSort } from "@client/svgs/common/SvgSort";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { CaseBattles } from "#app/services/case-battles";
import { useCreate } from "./useCreate";

export const IndexHeader = () => {
  const limitOptions = [5, 10, 25, 50];

  const limit = useAppSelector((x) => x.battleIndex.limit);
  const count = useAppSelector((x) => x.battleIndex.count);
  const value = useAppSelector((x) => x.battleIndex.value);
  const layout = useAppSelector((x) => x.style.mainLayout);
  const dispatch = useAppDispatch();

  const small = layout === "mobile";

  const handleCreate = useCreate();

  return (
    <Div
      fx
      align="flex-end"
      flow={small ? "row-wrap" : undefined}
      gap={12}
    >
      <Div
        grow
        gap={12}
      >
        <Div gap={6}>
          <Span>{"Active Games:"}</Span>
          <Div gap={3}>
            <Vector
              as={SvgCircle}
              size={5}
              color="green"
            />
            <Span
              family="title"
              weight="bold"
              color="green"
            >
              {count}
            </Span>
          </Div>
        </Div>
        <Div borderLeft />
        <Div gap={6}>
          <Span>{"Total Value:"}</Span>
          <Tokens value={value} />
        </Div>
      </Div>
      <Dropdown
        type="select"
        fx={small}
        icon={SvgSort}
        options={limitOptions.map((x) => `${x} Battles`)}
        value={limitOptions.indexOf(limit)}
        onChange={(x, i) => dispatch(CaseBattles.setIndexLimit(limitOptions[i]))}
      />
      <Button
        kind="primary"
        label="Create Battle"
        fx={small}
        onClick={handleCreate}
      />
    </Div>
  );
};
