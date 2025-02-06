import { Intimal } from "@core/services/intimal";
import { Card } from "@client/comps/cards/Card";
import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { Tokens } from "@client/comps/tokens/Tokens";
import { Vector } from "@client/comps/vector/Vector";
import { SvgTeam } from "@client/svgs/common/SvgTeam";
import { Button } from "@client/comps/button/Button";
import { Link } from "@client/comps/link/Link";
import { useAppSelector } from "#app/hooks/store/useAppSelector";

export const StatCards = ({
  loading,
  onClaimClick,
}: {
  loading: boolean;
  onClaimClick: () => void;
}) => {
  const commissionBalance = useAppSelector(
    (x) => x.user.affiliate.commissionBalance,
  );
  const commissionTotal = useAppSelector(
    (x) => x.user.affiliate.commissionTotal,
  );
  const referralCount = useAppSelector((x) => x.user.affiliate.referralCount);
  const layout = useAppSelector((x) => x.style.mainLayout);
  const small = layout === "mobile";

  return (
    <Div
      gap={16}
      flow={small ? "row-wrap" : undefined}
    >
      <Card
        fx
        column
        center
        p={16}
        gap={16}
      >
        <Span>{"Unclaimed Earnings"}</Span>
        <Tokens
          value={commissionBalance}
          fontSize={20}
        />
        <Button
          fx
          kind="primary"
          label="Claim Now"
          disabled={loading || Intimal.toDecimal(commissionBalance) < 0.01}
          onClick={onClaimClick}
        />
      </Card>
      <Card
        fx
        column
        center
        p={16}
        gap={16}
      >
        <Span>{"Total Earned"}</Span>
        <Tokens
          value={commissionTotal}
          fontSize={20}
        />
        <Link
          fx
          type="router"
          to="/affiliate/referrals"
          hover="none"
        >
          <Button
            fx
            kind="secondary"
            label="View Stats"
          />
        </Link>
      </Card>
      <Card
        fx
        column
        center
        p={16}
        gap={16}
      >
        <Span>{"Total Referrals"}</Span>
        <Div
          align="center"
          gap={4}
        >
          <Vector
            as={SvgTeam}
            size={20}
            color="gold"
          />
          <Span
            family="title"
            weight="bold"
            color="white"
            size={20}
          >
            {referralCount}
          </Span>
        </Div>
        <Link
          fx
          type="router"
          to="/affiliate/referrals"
          hover="none"
        >
          <Button
            fx
            kind="secondary"
            label="View Referrals"
          />
        </Link>
      </Card>
    </Div>
  );
};
