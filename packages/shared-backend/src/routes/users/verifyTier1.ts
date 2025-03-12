import { Validation } from "@core/services/validation";
import { Utility } from "@core/services/utility";
import { Database } from "@server/services/database";
import { HandledError } from "@server/services/errors";
import { Http } from "#app/services/http";

export default Http.createApiRoute({
  type: "post",
  path: "/verify-tier-1",
  restricted: true,
  secure: true,
  body: Validation.object({
    firstName: Validation.string().max(32).required("First name is required."),
    lastName: Validation.string().max(32).required("Last name is required."),
    dob: Validation.dob(),
    address: Validation.string().max(256).required("Address is required."),
    city: Validation.string().max(32).required("City is required."),
    state: Validation.string().max(32).required("State is required."),
    countryIndex: Validation.integer("Country index"),
    zipCode: Validation.string().max(16).required("Zip Code is required."),
    occupation: Validation.string().max(32).required("Occupation is required."),
  }),
  callback: async (req, res) => {
    const { firstName, lastName, dob } = req.body;
    const { address, city, state } = req.body;
    const { countryIndex, zipCode, occupation } = req.body;
    const country = Utility.supportedCountries[countryIndex];
    const user = req.user;

    if (!country) {
      throw new HandledError("Invalid country index.");
    }
    if (user.kyc.tier >= 1) {
      throw new HandledError("You already passed this verification tier.");
    }

    await Database.collection("users").updateOne(
      { _id: user._id },
      {
        $set: {
          "kyc.tier": 1,
          "kyc.firstName": firstName,
          "kyc.lastName": lastName,
          "kyc.dob": dob,
          "kyc.address": address,
          "kyc.city": city,
          "kyc.state": state,
          "kyc.country": country,
          "kyc.zipCode": zipCode,
          "kyc.occupation": occupation,
        },
      },
    );

    res.json({});
  },
});
