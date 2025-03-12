import { SendEmailRequest } from "customerio-node";
import { addMinutes } from "date-fns";
import { UserDocument } from "@core/types/users/UserDocument";
import { Security } from "#server/services/security";
import { Ids } from "#server/services/ids";
import config from "#server/config";
import { api } from "./api";

export async function sendExclusionConfirm(user: UserDocument) {
  const token = await Security.createToken({
    kind: "exclude-confirm",
    token: Ids.long(),
    expires: addMinutes(Date.now(), 60),
    userId: user._id,
  });

  const link = `${config.siteURL}/confirm-exclusion/${token}`;

  const request = new SendEmailRequest({
    to: user.email,
    transactional_message_id: "exclude_confirm",
    message_data: {
      username: user.username,
      link,
    },
    identifiers: {
      id: user._id,
    },
  });

  return await api().sendEmail(request);
}
