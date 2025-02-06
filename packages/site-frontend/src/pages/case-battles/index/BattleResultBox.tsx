import { CaseBattleDocument } from "@core/types/case-battles/CaseBattleDocument";
import { Div } from "@client/comps/div/Div";
import { Tokens } from "@client/comps/tokens/Tokens";
import { Span } from "@client/comps/span/Span";
import { Users } from "#app/services/users";
import { UserIcon } from "#app/comps/user-icon/UserIcon";
import { useAppSelector } from "#app/hooks/store/useAppSelector";

export const BattleResultBox = ({
  battle,
}: {
  battle: CaseBattleDocument & { status: "completed" };
}) => {
  const userId = useAppSelector((x) => x.user._id);
  const role = useAppSelector((x) => x.user.role);

  return (
    <Div
      column
      align="flex-end"
      gap={12}
    >
      <Div>
        <Span
          weight="medium"
          color="light-green"
        >
          {"Winners"}
        </Span>
        <Tokens
          value={battle.totalWon}
          ml={8}
        />
      </Div>
      <Div gap={8}>
        {battle.players
          .filter((x) => x.won)
          .map((player, i) => (
            <Div
              key={i}
              border
              data-tooltip-id="app-tooltip"
              data-tooltip-content={
                Users.getHiddenInfo({ userId, role, player }).username
              }
            >
              <UserIcon
                width="40px"
                avatarIndex={player.avatarIndex}
                avatarId={player.bot ? undefined : player.avatarId}
                hidden={Users.getHiddenInfo({ role, player }).hideInfo}
              />
            </Div>
          ))}
      </Div>
    </Div>
  );
};
