import { RaceLeader } from "@core/types/rewards/RaceLeader";
import { Card } from "@client/comps/cards/Card";
import { Span } from "@client/comps/span/Span";
import { Tokens } from "@client/comps/tokens/Tokens";
import { Div } from "@client/comps/div/Div";
import { UserBadge } from "@client/comps/user/UserBadge";
import { Vector } from "@client/comps/vector/Vector";
import { SvgChicken } from "@client/svgs/common/SvgChicken";
import { UserIcon } from "#app/comps/user-icon/UserIcon";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { useHiddenInfo } from "#app/hooks/users/useHiddenInfo";
import "./LeaderCard.scss";

export const LeaderCardHeader = () => {
  return (
    <Div
      className="LeaderCard"
      bg="brown-8"
      px={16}
      py={12}
    >
      <Div className="rank">
        <Span>{"Rank"}</Span>
      </Div>
      <Div className="user">
        <Span>{"Player"}</Span>
      </Div>
      <Div className="wager">
        <Span>{"Wagered"}</Span>
      </Div>
      <Div
        className="prize"
        grow
        justify="flex-end"
      >
        <Span>{"Prize"}</Span>
      </Div>
    </Div>
  );
};

export const LeaderCard = ({
  leader,
  local,
}: {
  leader: RaceLeader;
  local: boolean;
}) => {
  const layout = useAppSelector((x) => x.style.mainLayout);
  const small = layout === "mobile";
  const { username, xp, hideInfo } = useHiddenInfo(leader.user);

  return (
    <Card
      className="LeaderCard"
      px={small ? 12 : 16}
      py={8}
      borderColor={local ? "light-blue" : "brown-5"}
    >
      <Div className="rank">
        <Div
          center
          width={32}
        >
          <Vector
            className={`rank-icon-${leader.rank}`}
            as={SvgChicken}
            size={36}
            color="dark-gray"
            position="absolute"
          />
          <Span
            family="title"
            weight="bold"
            color="brown-8"
            size={small ? 13 : 14}
            top={2}
          >
            {leader.rank}
          </Span>
        </Div>
      </Div>
      <Div
        className="user"
        align="center"
        gap={6}
      >
        <UserIcon
          width={small ? "28px" : "36px"}
          avatarIndex={leader.user.avatarIndex}
          avatarId={leader.user.avatarId}
          hidden={hideInfo}
        />
        {!small && !hideInfo && <UserBadge xp={xp} />}
        <Span
          weight="medium"
          color={hideInfo ? "gray" : "white"}
          size={small ? 13 : 14}
          textOverflow="ellipsis"
        >
          {username}
        </Span>
      </Div>
      <Div className="wager">
        <Tokens
          value={leader.wagerAmount}
          fontSize={small ? 13 : 14}
          decimals={small ? 0 : 2}
        />
      </Div>
      <Div
        className="prize"
        grow
        justify="flex-end"
      >
        <Tokens
          value={leader.prizeAmount}
          fontSize={small ? 13 : 14}
          decimals={small ? 0 : 2}
        />
      </Div>
    </Card>
  );
};
