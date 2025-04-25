import bcrypt from "bcrypt";
import { Intimal } from "@core/services/intimal";
import { UserLinkProvider } from "@core/types/users/UserLinkProvider";
import { Users } from "@server/services/users";
import { Affiliates } from "@server/services/affiliates";
import { Transactions } from "@server/services/transactions";
import { CustomerIO } from "@server/services/customer-io";
import { UnauthenticatedRequest } from "#app/types/http/UnauthenticatedRequest";
import config from "#app/config";
import { getReferer } from "./getReferer";
import { loginUser } from "./loginUser";
import { trackAction } from "./trackAction";
import { Database } from "@server/services/database";
import { createCampaign } from "./createCampaign";

export async function registerUser(
  req: UnauthenticatedRequest,
  {
    strategy,
    username,
    email,
    emailConfirmed,
    password,
    steamId,
    googleId,
    discordId,
    twitchId,
    walletAddress,
    referralCode,
  }: {
    strategy: "local" | UserLinkProvider;
    username: string;
    email: string;
    emailConfirmed: boolean;
    password: string;
    steamId?: string;
    googleId?: string;
    discordId?: string;
    twitchId?: string;
    walletAddress?: string;
    referralCode?: string;
  },
) {
  const referer = await getReferer({ referralCode });
  const passwordHash = await bcrypt.hash(password, 8);

  const user = await Users.createUser({
    username,
    email,
    emailConfirmed,
    steamId,
    googleId,
    discordId,
    twitchId,
    walletAddress,
    referer,
    passwordHash,
  });

  if (referer.kind == "campaign") {
    const affiliate = await Database.collection("user-campaigns").findOne({ _id: referer.id });
    if (affiliate) {
      await Affiliates.trackCampaign({
        user,
        affiliate,
      });
    }
  }

  // Create Default Campaign
  await createCampaign(user._id, username, "Refer A Friend");

  await loginUser(req, user);

  await trackAction({
    user,
    kind: "register",
    ip: req.trueIP,
    strategy,
    email: user.email,
    steamId,
    googleId,
    discordId,
    twitchId,
  });

  await CustomerIO.newUser(user);

  if (!emailConfirmed) {
    await CustomerIO.sendEmailConfirm(user);
  }

  if (config.env !== "production") {
    await Transactions.createTransaction({
      user,
      autoComplete: true,
      kind: "admin-token-credit",
      amount: Intimal.fromDecimal(5000),
      adjustment: "rewards",
    });
  }

  return Users.getAuthenticatedUser(user);
}
