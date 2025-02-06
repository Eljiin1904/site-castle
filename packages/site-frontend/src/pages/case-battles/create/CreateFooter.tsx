import { Button } from "@client/comps/button/Button";
import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { Tokens } from "@client/comps/tokens/Tokens";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { useCreate } from "./useCreate";

export const CreateFooter = () => {
  const chests = useAppSelector((x) => x.battleCreate.chests);
  const mode = useAppSelector((x) => x.battleCreate.mode);
  const processing = useAppSelector((x) => x.battleCreate.processing);

  const buttonDisabled = !mode || chests.length === 0 || processing;

  const totalCount = chests.reduce((acc, x) => (acc += x.count), 0);
  const totalValue = chests.reduce(
    (acc, x) => (acc += x.openCost * x.count),
    0,
  );

  const handleCreate = useCreate();

  return (
    <Div
      pt={16}
      gap={16}
      borderTop
    >
      <Div
        grow
        align="center"
        gap={8}
      >
        <Span>{`${totalCount} Cases`}</Span>
        <Tokens
          value={totalValue}
          fontSize={15}
        />
      </Div>
      <Button
        kind="primary"
        label="Create Battle"
        disabled={buttonDisabled}
        onClick={handleCreate}
      />
    </Div>
  );
};
