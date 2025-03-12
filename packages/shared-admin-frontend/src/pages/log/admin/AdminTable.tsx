import { Fragment } from "react";
import { Strings } from "@core/services/strings";
import { AdminLogDocument } from "@core/types/admin/AdminLogDocument";
import { Dates } from "@core/services/dates";
import { Intimal } from "@core/services/intimal";
import { Span } from "@client/comps/span/Span";
import { Table } from "@client/comps/table/Table";
import { SvgUser } from "@client/svgs/common/SvgUser";
import { Vector } from "@client/comps/vector/Vector";
import { Users } from "#app/services/users";

export const AdminTable = ({
  log,
  isLoading,
}: {
  log: AdminLogDocument[];
  isLoading: boolean;
}) => {
  return (
    <Table
      data={log}
      loading={isLoading}
      emptyMessage="No entries found."
      columns={[
        {
          heading: "Admin",
          grow: 1,
          justify: "flex-start",
          rowRenderer: (x) => {
            const role = Users.getRoleInfo(x.admin.role);
            return (
              <Fragment>
                <Vector
                  as={role?.icon || SvgUser}
                  size={16}
                  color={role?.color || "gray"}
                  mr={8}
                />
                <Span
                  weight="medium"
                  color="white"
                >
                  {x.admin.name}
                </Span>
              </Fragment>
            );
          },
        },
        {
          heading: "Timestamp",
          grow: 1,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Span
              weight="medium"
              color="white"
            >
              {Dates.toTimestamp(x.timestamp)}
            </Span>
          ),
        },
        {
          heading: "Message",
          grow: 5,
          justify: "flex-start",
          rowRenderer: (x) => <Span color="light-gray">{getMessage(x)}</Span>,
        },
      ]}
    />
  );
};

function getMessage(x: AdminLogDocument): string {
  switch (x.kind) {
    case "affiliate-base-tier":
      return x.baseTier
        ? `Changed ${x.user.name}'s base affiliate tier to ${x.baseTier}.`
        : `Removed ${x.user.name}'s base affiliate tier.`;
    case "affiliate-key-create":
      return `Created affiliate key ${x.keyId}.`;
    case "affiliate-key-disable":
      return `Disabled affiliate key ${x.keyId}.`;
    case "affiliate-reload-create":
      return `Created reload for ${x.reload.user.name}.`;
    case "affiliate-reload-edit":
      return `Edited reload for ${x.reload.user.name}.`;
    case "chat-delete":
      return `Deleted a chat message sent by ${x.message.agent === "user" ? x.message.user.name : "the system."}.`;
    case "chest-create":
      return `Created the ${x.chest.displayName} chest.`;
    case "chest-disable":
      return `Disabled the ${x.chest.displayName} chest.`;
    case "chest-enable":
      return `Enabled the ${x.chest.displayName} chest.`;
    case "chest-update":
      return `Updated the ${x.chest.displayName} chest.`;
    case "crypto-deposit-confirm":
      return `Confirmed crypto deposit #${x.transactionId}.`;
    case "crypto-withdraw-approve":
      return `Approved crypto withdraw #${x.transactionId}.`;
    case "crypto-withdraw-cancel":
      return `Cancelled crypto withdraw #${x.transactionId}.`;
    case "gift-batch-create":
      return `Created the ${x.batch._id} gift card batch.`;
    case "holiday-create":
      return `Created the ${x.holiday._id} holiday event.`;
    case "promotion-code-cancel":
      return `Cancelled the ${x.promotionId} promotion.`;
    case "promotion-code-create":
      return `Created the ${x.promotion._id} promotion.`;
    case "race-create":
      return `Created race ${x.race._id}.`;
    case "raffle-create":
      return `Created raffle #${x.raffle._id}.`;
    case "reward-boost-event-create":
      return `Created reward boost event ${x.event._id}.`;
    case "reward-boost-event-edit":
      return `Updated reward boost event ${x.eventId}.`;
    case "reward-product-create":
      return `Created reward product ${x.product._id}.`;
    case "reward-product-edit":
      return `Updated reward product ${x.productId}.`;
    case "setting-edit":
      return `Changed the ${x.settingId} setting to ${x.settingValue.toString()}.`;
    case "skin-withdraw-approve":
      return `Approved skin withdraw #${x.transactionId}.`;
    case "skin-withdraw-cancel":
      return `Cancelled skin withdraw #${x.transactionId}.`;
    case "token-credit":
      return `Credited ${x.user.name} ${Intimal.toLocaleString(x.amount)} tokens.`;
    case "token-debit":
      return `Debited ${x.user.name} ${Intimal.toLocaleString(x.amount)} tokens.`;
    case "user-authenticator-disable":
      return `Cleared ${x.user.name}'s authenticator.`;
    case "user-ban":
      return x.reason
        ? `Banned ${x.user.name} for ${Strings.kebabToTitle(x.reason)}.`
        : `Unbanned ${x.user.name}.`;
    case "user-email":
      return `Changed ${x.user.name}'s email to ${x.newEmail}.`;
    case "user-mute":
      return x.reason
        ? `Muted ${x.user.name} for ${Strings.kebabToTitle(x.reason)} until ${Dates.toTimestamp(x.endDate!)}.`
        : `Unmuted ${x.user.name}.`;
    case "user-name":
      return `Changed ${x.user.name}'s username to ${x.newName}.`;
    case "user-referral":
      return `Changed ${x.user.name}'s referral to ${x.newReferral?.name || "None"}.`;
    case "user-role":
      return `Changed ${x.user.name}'s role to ${x.newRole}.`;
    case "user-suspension":
      return x.reason
        ? `Suspended ${x.user.name} for ${Strings.kebabToTitle(x.reason)} until ${Dates.toTimestamp(x.endDate!)}.`
        : `Unsuspended ${x.user.name}.`;
    case "user-tags":
      return `Changed ${x.user.name}'s tags to ${x.newTags.map((x) => Strings.kebabToTitle(x)).join(", ") || "None"}.`;
    case "user-tip-limit":
      return `Changed ${x.user.name}'s tip limit to ${x.tipLimit ? Intimal.toLocaleString(x.tipLimit) : "None"}.`;
  }
}
