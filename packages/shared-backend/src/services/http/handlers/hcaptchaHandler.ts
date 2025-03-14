import axios from "axios";
import { Http } from "@server/services/http";
import { Validation } from "@core/services/validation";
import { HandledError } from "@server/services/errors";
import { HcaptchaResponse } from "#app/types/http/HcaptchaResponse";
import config from "#app/config";

const schema = Validation.object({
  captchaToken: Validation.string().required("Captcha token is required."),
});

export const hcaptchaHandler = Http.createHandler(async (req, res, next) => {
  const { hcaptchaSecret } = config;
  const { captchaToken } = await schema.validate(req.body);
  
  const {
    data: { success },
  } = await axios.get<HcaptchaResponse>("https://api.hcaptcha.com/siteverify", {
    params: {
      secret: hcaptchaSecret,
      response: captchaToken,
      remoteip: req.socket.remoteAddress,
    },
  });

  if (!success) {
    throw new HandledError("errors.invalidCaptcha");
  }

  next();
});
