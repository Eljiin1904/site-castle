import { CaseBattleDocument } from "@core/types/case-battles/CaseBattleDocument";
import { Div } from "@client/comps/div/Div";
import { Button } from "@client/comps/button/Button";
import { Span } from "@client/comps/span/Span";

export const BattleStatusBox = ({ battle }: { battle: CaseBattleDocument }) => {
  return (
    <Div
      column
      align="flex-end"
      gap={12}
    >
      <Span weight="medium">
        {battle.status === "waiting"
          ? `${battle.roundCount} Rounds`
          : battle.status === "pending"
            ? "Starting"
            : `Round ${battle.roundIndex + 1}/${battle.roundCount}`}
      </Span>
      {battle.status === "waiting" ? (
        <Button
          kind="primary"
          label="Join Battle"
        />
      ) : (
        <Button
          kind="secondary"
          label="View Battle"
        />
      )}
    </Div>
  );
};
