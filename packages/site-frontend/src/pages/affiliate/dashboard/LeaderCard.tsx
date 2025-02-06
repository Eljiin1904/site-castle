import { AffiliateLeader } from "@core/types/affiliates/AffiliateLeader";
import { Card } from "@client/comps/cards/Card";
import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { Tokens } from "@client/comps/tokens/Tokens";
import { UserBadge } from "@client/comps/user/UserBadge";
import { Placeholder } from "@client/comps/placeholder/Placeholder";
import { UserIcon } from "#app/comps/user-icon/UserIcon";
import "./LeaderCard.scss";

export const LeaderCardPlaceholder = () => {
  return <Placeholder className="LeaderCard" />;
};

export const LeaderCard = ({ leader }: { leader: AffiliateLeader }) => {
  const { user, affiliate } = leader;

  return (
    <Card
      className="LeaderCard"
      fx
      column
      center
      p={16}
    >
      <UserIcon
        width="100px"
        avatarIndex={user.avatarIndex}
        avatarId={user.avatarId}
      />
      <Div
        align="center"
        gap={4}
        mt={12}
      >
        <UserBadge
          xp={user.xp}
          fontSize={13}
        />
        <Span
          size={13}
          weight="medium"
          color="white"
        >
          {user.name}
        </Span>
      </Div>
      <Tokens
        value={affiliate.commissionTotal}
        fontSize={16}
        mt={16}
        decimals={0}
      />
    </Card>
  );
};
