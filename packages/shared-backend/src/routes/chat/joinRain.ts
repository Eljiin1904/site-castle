import { isFuture, subDays } from "date-fns";
import { Intimal } from "@core/services/intimal";
import { Validation } from "@core/services/validation";
import { Database } from "@server/services/database";
import { HandledError } from "@server/services/errors";
import { Chat } from "@server/services/chat";
import { Http } from "#app/services/http";
import { Site } from "#app/services/site";
import { Users } from "#app/services/users";

export default Http.createApiRoute({
  type: "post",
  path: "/join-rain",
  restricted: true,
  secure: true,
  transaction: true,
  body: Validation.object({
    rainId: Validation.string().required("Rain ID is required."),
  }),
  callback: async (req, res) => {
    const { rainId } = req.body;
    const user = req.user;

    await Site.validateConfirmed(user);
    await Site.validateSuspension(user);

    if (
      Intimal.toDecimal(user.stats.depositAmount || 0) < 10 &&
      user.kyc.tier < 2 &&
      Users.getLevel(user.xp) < 15
    ) {
      await Site.validateVpn(req.trueIP, "You are unable to join the rain while on a VPN.");
    }

    const rain = await Database.collection("chat-rains").findOne({
      _id: rainId,
    });

    if (!rain) {
      throw new HandledError("Invalid rain id.");
    }
    if (isFuture(rain.openDate)) {
      throw new HandledError("Rain cannot be joined yet.");
    }
    if (rain.endDate.getTime() - Date.now() < 1000) {
      throw new HandledError("Rain is ending, please wait for the next.");
    }

    if (
      await Database.exists("chat-rain-tickets", {
        rainId: rain._id,
        "user.id": user._id,
      })
    ) {
      throw new HandledError("You already joined this rain.");
    }

    if (
      await Database.exists("chat-rain-tickets", {
        rainId: rain._id,
        "location.ip": req.trueIP,
      })
    ) {
      throw new HandledError("Rain already joined by this IP.");
    }

    const settings = await Site.settings.cache();
    const wagerReq = Intimal.fromDecimal(settings.rainWagerRequirement);

    const report = await Users.aggregateReport({
      userId: user._id,
      minDate: subDays(new Date(), 7),
      maxDate: new Date(),
    });

    if (report.wagerAmount < wagerReq) {
      throw new HandledError("You are not eligible to join the rain.");
    }

    const wagerRemainder = (user.meta.nextRainWager || 0) - (user.stats.wagerAmount || 0);

    if (wagerRemainder >= Intimal.fromDecimal(0.01)) {
      throw new HandledError("You have not wagered 1x your last rain payout.");
    }

    const location = await Http.getLocation(req.trueIP);

    await Chat.createRainTicket({ rain, user, location });

    await Database.collection("users").updateOne(
      { _id: user._id },
      {
        $set: {
          "meta.lastRainId": rain._id,
        },
      },
    );

    res.json({});
  },
});
