import { TransactionDocument } from "@core/types/transactions/TransactionDocument";
import { finalizeCampaignReferral } from "./finalizeCampaignReferral";
import { creditCampaignCommission } from "./creditCampaignCommission";
import { reportCampaignTransaction } from "./reportCampaignTransaction";

export async function afterCampaignTransaction(tx: TransactionDocument) {
  await finalizeCampaignReferral(tx);
  await creditCampaignCommission(tx);
  await reportCampaignTransaction(tx);
}
