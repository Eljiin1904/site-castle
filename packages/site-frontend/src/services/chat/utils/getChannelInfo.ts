import { ChatChannel } from "@core/types/chat/ChatChannel";
import { SvgFlagEnglish } from "@client/svgs/flags/SvgFlagEnglish";

export function getChannelInfo(channel: ChatChannel) {
  switch (channel) {
    case "general-english":
      return {
        icon: SvgFlagEnglish,
        label: "English",
      };
    case "highroller":
      return {
        icon: SvgFlagEnglish,
        label: "Highroller",
      };
    default:
      throw new Error(`Unknown channel: ${channel}`);
  }
}
