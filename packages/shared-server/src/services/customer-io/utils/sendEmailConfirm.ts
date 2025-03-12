import { SendEmailRequest } from "customerio-node";
import { addMinutes } from "date-fns";
import { UserDocument } from "@core/types/users/UserDocument";
import { Security } from "#server/services/security";
import { Ids } from "#server/services/ids";
import config from "#server/config";
import { api } from "./api";

export async function sendEmailConfirm(user: UserDocument) {
  const token = await Security.createToken({
    kind: "email-confirm",
    token: Ids.code(),
    expires: addMinutes(Date.now(), 15),
    userId: user._id,
    email: user.email,
  });

  const link = `${config.siteURL}/confirm-email/${token}`;

  const request = new SendEmailRequest({
    to: user.email,
    transactional_message_id: "email_verification",
    message_data: {
      username: user.username,
      token,
      link,
    },
    identifiers: {
      id: user._id,
    },
  });

  return await api().sendEmail(request);
}
