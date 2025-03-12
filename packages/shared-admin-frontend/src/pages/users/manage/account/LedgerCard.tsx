import { UserDocument } from "@core/types/users/UserDocument";
import { Affiliates } from "@core/services/affiliates";
import { Card } from "@client/comps/cards/Card";
import { Intimal } from "@core/services/intimal";
import { CardSection } from "@client/comps/cards/CardSection";
import { Heading } from "@client/comps/heading/Heading";
import { Dialogs } from "@client/services/dialogs";
import { Div } from "@client/comps/div/Div";
import { UserTokenModal } from "#app/modals/user/UserTokenModal";
import { Rewards } from "#app/services/rewards";
import { AffiliateTierModal } from "#app/modals/affiliates/AffiliateTierModal";
import { AccountSection } from "./AccountSection";

export const LedgerCard = ({ user }: { user: UserDocument }) => {
  const gemValue = user.gemBalance * Rewards.gemToTokenRate;
  const levelKeyValue = user.meta.levelCaseBalance || 0;
  const affiliateTier = Affiliates.getTier(user.affiliate.referralXp);

  return (
    <Card column>
      <CardSection position="header">
        <Heading>{"Ledger"}</Heading>
      </CardSection>
      <CardSection
        column
        gap={16}
      >
        <Div gap={16}>
          <AccountSection
            heading="Token Balance"
            value={Intimal.toLocaleString(user.tokenBalance)}
            onEditClick={() =>
              Dialogs.open("primary", <UserTokenModal user={user} />)
            }
          />
          <AccountSection
            heading="Vault Balance"
            value={Intimal.toLocaleString(user.vaultBalance || 0)}
          />
          <AccountSection
            heading="Holiday Balance"
            value={Intimal.toLocaleString(user.holidayBalance || 0)}
          />
        </Div>
        <Div gap={16}>
          <AccountSection
            heading="Deposits"
            value={Intimal.toLocaleString(user.stats.depositAmount || 0)}
          />
          <AccountSection
            heading="Withdraws"
            value={Intimal.toLocaleString(user.stats.withdrawAmount || 0)}
          />
          <AccountSection
            heading="Profit Loss"
            value={Intimal.toLocaleString(user.stats.profitLoss || 0)}
          />
        </Div>
        <Div gap={16}>
          <AccountSection
            heading="Affiliate Tier"
            value={
              user.affiliate.baseTier
                ? `${affiliateTier} (${user.affiliate.baseTier}B)`
                : affiliateTier
            }
            onEditClick={() =>
              Dialogs.open("primary", <AffiliateTierModal user={user} />)
            }
          />
          <AccountSection
            heading="Affiliate Balance"
            value={Intimal.toLocaleString(user.affiliate.commissionBalance)}
          />
          <AccountSection
            heading="Affiliate Total"
            value={Intimal.toLocaleString(user.affiliate.commissionTotal)}
          />
        </Div>
        <Div gap={16}>
          <AccountSection
            heading="Total Wagered"
            value={Intimal.toLocaleString(user.stats.wagerAmount || 0)}
          />
          <AccountSection
            heading="Total Promotions"
            value={Intimal.toLocaleString(user.stats.promotionAmount || 0)}
          />
          <AccountSection
            heading="Total Rewards"
            value={Intimal.toLocaleString(user.stats.rewardAmount || 0)}
          />
        </Div>
        <Div gap={16}>
          <AccountSection
            heading="Gem Balance (Value)"
            value={`${Intimal.toLocaleString(user.gemBalance, 0)} (${Intimal.toLocaleString(gemValue)})`}
          />
          <AccountSection
            heading="Unused Level Key Value"
            value={Intimal.toLocaleString(levelKeyValue)}
          />
          <AccountSection
            heading="Rewards Balance"
            value={Intimal.toLocaleString(gemValue + levelKeyValue)}
          />
        </Div>
      </CardSection>
    </Card>
  );
};
