import { CaseBattlePlayer } from "@core/types/case-battles/CaseBattlePlayer";
import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { UserBadge } from "@client/comps/user/UserBadge";
import { Conditional } from "@client/comps/conditional/Conditional";
import { UserIcon } from "#app/comps/user-icon/UserIcon";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { useHiddenInfo } from "#app/hooks/users/useHiddenInfo";

export const BattlePlayerCard = ({ player }: { player: CaseBattlePlayer }) => {
  const layout = useAppSelector((x) => x.style.mainLayout);

  return (
    <Div
      fx
      bg="brown-6"
    >
      <Conditional
        value={layout}
        mobile={<MobileCard player={player} />}
        tablet={<NotMobileCard player={player} />}
        laptop={<NotMobileCard player={player} />}
        desktop={<NotMobileCard player={player} />}
      />
    </Div>
  );
};

const MobileCard = ({ player }: { player: CaseBattlePlayer }) => {
  const { username, hideInfo } = useHiddenInfo(player);

  return (
    <Div
      fx
      column
      center
      p={12}
      gap={8}
    >
      <UserIcon
        width="32px"
        avatarId={player.bot ? undefined : player.avatarId}
        avatarIndex={player.avatarIndex}
        hidden={hideInfo}
      />
      <Span
        weight="medium"
        fontSize={11}
        textOverflow="ellipsis"
        color={hideInfo ? "gray" : "white"}
      >
        {username}
      </Span>
    </Div>
  );
};

const NotMobileCard = ({ player }: { player: CaseBattlePlayer }) => {
  const { username, xp, hideInfo } = useHiddenInfo(player);

  return (
    <Div
      fx
      align="center"
      p={16}
      gap={12}
    >
      <UserIcon
        width="36px"
        avatarId={player.bot ? undefined : player.avatarId}
        avatarIndex={player.avatarIndex}
        hidden={hideInfo}
      />
      <Div
        align="center"
        gap={6}
      >
        {!player.bot && !hideInfo && <UserBadge xp={xp} />}
        <Span
          weight="semi-bold"
          color={hideInfo ? "gray" : "white"}
          textOverflow="ellipsis"
        >
          {username}
        </Span>
      </Div>
    </Div>
  );
};
