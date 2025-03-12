import { ChatRainDocument } from "@core/types/chat/ChatRainDocument";
import { UserDocument } from "@core/types/users/UserDocument";
import { UserLocation } from "@core/types/users/UserLocation";
import { ChatRainTicketDocument } from "@core/types/chat/ChatRainTicketDocument";
import { Ids } from "#server/services/ids";
import { Users } from "#server/services/users";
import { Database } from "#server/services/database";
import { aggregateUserRainStats } from "./aggregateUserRainStats";

export async function createRainTicket({
  rain,
  user,
  location,
}: {
  rain: ChatRainDocument;
  user: UserDocument;
  location: UserLocation;
}) {
  const stats = await aggregateUserRainStats({ user });

  const ticket: ChatRainTicketDocument = {
    _id: Ids.object(),
    timestamp: new Date(),
    rainId: rain._id,
    user: Users.getBasicUser(user),
    location,
    stats,
  };

  await Database.collection("chat-rain-tickets").insertOne(ticket);

  return ticket;
}
