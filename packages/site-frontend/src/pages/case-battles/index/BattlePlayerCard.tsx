import { CaseBattlePlayer } from "@core/types/case-battles/CaseBattlePlayer";
import { Div } from "@client/comps/div/Div";
import { UserIcon } from "#app/comps/user-icon/UserIcon";
import { useHiddenInfo } from "#app/hooks/users/useHiddenInfo";

export const BattlePlayerCard = ({ player }: { player: CaseBattlePlayer }) => {
  const { username, hideInfo } = useHiddenInfo(player);

  return (
    <Div
      border
      data-tooltip-id="app-tooltip"
      data-tooltip-content={username}
    >
      <UserIcon
        width="38px"
        avatarIndex={player.avatarIndex}
        avatarId={player.bot ? undefined : player.avatarId}
        hidden={hideInfo}
      />
    </Div>
  );
};
