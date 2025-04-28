import { string } from "yup";

const regex = /^[a-z0-9]+$/i;
const minLength = 5;
const maxLength = 25;

export const campaignId = (name: string = "campaignId") => {
  return string()
    .trim()
    .required({
      key: "validations.campaignId.required",
      value: name,
    })
    .min(minLength, {
      key: "validations.campaignId.min",
      value: { label: name, min: minLength },
    })
    .max(maxLength, {
      key: "validations.campaignId.max",
      value: { label: name, max: maxLength },
    })
    .matches(regex, {
      key: "validations.campaignId.matches",
      value: name,
    });
};
