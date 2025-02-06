import { Vector } from "@client/comps/vector/Vector";
import { SvgChicken } from "@client/svgs/common/SvgChicken";
import { Div } from "@client/comps/div/Div";
import { UserIcon } from "#app/comps/user-icon/UserIcon";
import { Users } from "#app/services/users";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { BattleViewBox } from "./BattleViewBox";

export const BattleViewSeats = () => {
  const layout = useAppSelector((x) => x.style.mainLayout);
  const small = layout === "mobile";
  const players = useAppSelector((x) => x.battlePlayer.players);
  const role = useAppSelector((x) => x.user.role);

  return (
    <BattleViewBox>
      {players.map((player, seat) => (
        <Div
          key={seat}
          fx
          center
        >
          {player ? (
            <UserIcon
              avatarId={player.bot ? undefined : player.avatarId}
              avatarIndex={player.avatarIndex}
              width={small ? "40px" : "80px"}
              hidden={Users.getHiddenInfo({ role, player }).hideInfo}
            />
          ) : (
            <Vector
              as={SvgChicken}
              size={small ? 40 : 80}
              color="brown-4"
            />
          )}
        </Div>
      ))}
    </BattleViewBox>
  );
};
