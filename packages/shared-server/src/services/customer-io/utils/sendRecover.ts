import { SendEmailRequest } from "customerio-node";
import { addMinutes } from "date-fns";
import { UserDocument } from "@core/types/users/UserDocument";
import { Security } from "#server/services/security";
import { Ids } from "#server/services/ids";
import config from "#server/config";
import { api } from "./api";

export async function sendRecover(user: UserDocument, location: string) {
  const token = await Security.createToken({
    kind: "password-recover",
    token: Ids.long(),
    expires: addMinutes(Date.now(), 15),
    userId: user._id,
  });

  const link = `${config.siteURL}/reset-password/${token}`;

  const request = new SendEmailRequest({
    to: user.email,
    transactional_message_id: "forgot_password",
    message_data: {
      username: user.username,
      link,
      location,
    },
    identifiers: {
      id: user._id,
    },
  });

  return await api().sendEmail(request);
}
