import { RewardClaimDocument } from "@core/types/rewards/RewardClaimDocument";
import { Table } from "@client/comps/table/Table";
import { Span } from "@client/comps/span/Span";
import { Tokens } from "@client/comps/tokens/Tokens";
import { Div } from "@client/comps/div/Div";
import { Button } from "@client/comps/button/Button";
import { SvgFlag } from "@client/svgs/common/SvgFlag";
import { SvgTicket } from "@client/svgs/common/SvgTicket";
import { Vector } from "@client/comps/vector/Vector";
import { useAppSelector } from "#app/hooks/store/useAppSelector";

export const ClaimsTable = ({
  claims,
  isLoading,
  onClaim,
}: {
  claims: RewardClaimDocument[];
  isLoading: boolean;
  onClaim: (payoutId: string) => void;
}) => {
  const layout = useAppSelector((x) => x.style.mainLayout);

  return (
    <Table
      data={claims}
      loading={isLoading}
      emptyMessage="No reward claims found."
      onRowProps={(x) => ({
        type: "action",
        onClick: () => !x.claimed && onClaim(x._id),
      })}
      columns={[
        {
          heading: "Reward",
          grow: 2,
          justify: "flex-start",
          hidden: layout !== "mobile",
          rowRenderer: (x) => (
            <Div
              column
              align="flex-start"
              gap={2}
            >
              <Div gap={4}>
                <Vector
                  as={getRewardIcon(x)}
                  size={10}
                />
                <Span size={10}>{getRewardString(x)}</Span>
              </Div>
              <Tokens value={x.tokenAmount} />
            </Div>
          ),
        },
        {
          heading: "Reward",
          grow: 3,
          justify: "flex-start",
          hidden: layout === "mobile",
          rowRenderer: (x) => (
            <Div
              align="center"
              gap={8}
            >
              <Vector
                size={18}
                as={getRewardIcon(x)}
              />
              <Span color="white">{getRewardString(x)}</Span>
            </Div>
          ),
        },
        {
          heading: "ID",
          grow: 2,
          justify: "flex-start",
          hidden: layout === "mobile",
          rowRenderer: (x) => (
            <Div
              align="center"
              gap={6}
            >
              <Span color="white">{x._id}</Span>
            </Div>
          ),
        },
        {
          heading: "Tokens",
          grow: 2,
          justify: "flex-end",
          hidden: layout === "mobile",
          rowRenderer: (x) => <Tokens value={x.tokenAmount} />,
        },
        {
          heading: "Claim",
          grow: 1,
          justify: "flex-end",
          rowRenderer: (x) =>
            x.claimed ? (
              <Div
                border
                borderColor="dark-gray"
                bg="brown-7"
                p={8}
                width={80}
                center
              >
                <Span color="dark-gray">{"Claimed"}</Span>
              </Div>
            ) : (
              <Button
                kind="primary"
                size="xs"
                width={80}
                label="Claim"
              />
            ),
        },
      ]}
    />
  );
};

function getRewardIcon(claim: RewardClaimDocument): Svg {
  switch (claim.kind) {
    case "race-payout": {
      return SvgFlag;
    }
    case "raffle-payout": {
      return SvgTicket;
    }
  }
}

function getRewardString(claim: RewardClaimDocument): string {
  switch (claim.kind) {
    case "race-payout": {
      return `${claim.race.displayName} - Rank ${claim.rank}`;
    }
    case "raffle-payout": {
      return `Raffle #${claim.raffleId} - Round ${claim.round + 1}`;
    }
  }
}
