import { BasicUser } from "../users/BasicUser";

export interface ChatMessageReply {
  user: BasicUser;
  text: string;
}
