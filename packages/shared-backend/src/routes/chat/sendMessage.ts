import { differenceInSeconds, isFuture } from "date-fns";
import { Validation } from "@core/services/validation";
import { CaseBattles } from "@core/services/case-battles";
import { ChatMessageReply } from "@core/types/chat/ChatMessageReply";
import { Chat } from "@server/services/chat";
import { HandledError } from "@server/services/errors";
import { Database } from "@server/services/database";
import { Http } from "#app/services/http";
import { Site } from "#app/services/site";
import { Users } from "#app/services/users";

export default Http.createApiRoute({
  type: "post",
  path: "/send-message",
  restricted: true,
  secure: true,
  body: Validation.object({
    channel: Validation.string().oneOf(Chat.channels).required("Channel is required."),
    text: Validation.message(),
    replyMessageId: Validation.string(),
  }),
  callback: async (req, res) => {
    const { channel, text, replyMessageId } = req.body;
    const user = req.user;
    const mute = user.mute;
    const lastMessageDate = user.meta.lastMessageDate;

    await Site.validateToggle("chatEnabled");
    await Site.validateSuspension(user);

    const settings = await Site.settings.cache();

    if (!Users.getPermissions(user.role).manageChat) {
      if (channel.startsWith("general")) {
        await Site.validateDepositAmount(user, settings.chatGeneralRequirement);
      } else if (channel === "highroller") {
        await Site.validateLevel(user, settings.chatHighrollerRequirement);
      }
    }

    if (mute.endDate && isFuture(mute.endDate)) {
      throw new HandledError("You are muted and cannot send messages.");
    }

    if (lastMessageDate && differenceInSeconds(Date.now(), lastMessageDate) < 2) {
      throw new HandledError("You need to wait at least 2 seconds between messages.");
    }

    const battle = await extractCaseBattle(text);

    if (battle) {
      await Chat.createMessage({
        agent: "user",
        kind: "case-battle-link",
        channel,
        user: Users.getBasicUser(user),
        battle: CaseBattles.getBasicBattle(battle),
      });
    } else {
      const reply = await getReply(replyMessageId);

      await Chat.createMessage({
        agent: "user",
        kind: "text",
        channel,
        user: Users.getBasicUser(user),
        text,
        reply,
      });
    }

    await Database.collection("users").updateOne(
      { _id: user._id },
      { $set: { "meta.lastMessageDate": new Date() } },
    );

    res.json({});
  },
});

async function getReply(replyMessageId: string | undefined) {
  let reply: ChatMessageReply | undefined;

  if (replyMessageId) {
    const replyMessage = await Database.collection("chat-messages").findOne({
      _id: replyMessageId,
    });

    if (replyMessage && replyMessage.agent === "user" && replyMessage.kind === "text") {
      reply = {
        user: replyMessage.user,
        text: replyMessage.text,
      };
    }
  }

  return reply;
}

async function extractCaseBattle(text: string) {
  const regex = /\/case-battles\/(\w+)/;
  const match = text.match(regex);

  if (!match) {
    return;
  }

  const battleId = match[1];

  const battle = await Database.collection("case-battles").findOne(
    { _id: battleId },
    { projection: { mode: 1, modifiers: 1, entryCost: 1 } },
  );

  return battle;
}
