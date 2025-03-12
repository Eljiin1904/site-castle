import { SendEmailRequest } from "customerio-node";
import { UserDocument } from "@core/types/users/UserDocument";
import config from "#server/config";
import { api } from "./api";

export async function sendExclusionFollowUp(user: UserDocument) {
  const link = `${config.siteURL}/extend-exclusion`;

  const request = new SendEmailRequest({
    to: user.email,
    transactional_message_id: "exclude_follow_up",
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
