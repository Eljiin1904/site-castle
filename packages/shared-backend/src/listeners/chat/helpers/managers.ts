import { Chat } from "@core/services/chat";
import { ChannelManager } from "./ChannelManager";

export const managers = Chat.channels.map((x) => new ChannelManager(x));
