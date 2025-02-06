import { ChatMessageDocument } from "@core/types/chat/ChatMessageDocument";
import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { UserIcon } from "#app/comps/user-icon/UserIcon";
import { Users } from "#app/services/users";
import "./MessageReply.scss";

export const MessageReply = ({ message }: { message: ChatMessageDocument }) => {
  if (message.kind !== "text" || !message.reply) {
    return;
  }

  const reply = message.reply;
  const roleInfo = Users.getRoleInfo(reply.user.role);

  return (
    <Div
      className="MessageReply"
      fx
      align="center"
      mb={8}
    >
      <Div width={40}>
        <Div
          className="reply-connector"
          position="absolute"
          borderLeft
          borderTop
          borderColor="brown-4"
        />
      </Div>
      <UserIcon
        avatarIndex={reply.user.avatarIndex}
        avatarId={reply.user.avatarId}
        width="18px"
        ml={8}
      />
      <Span
        color={roleInfo?.color || "white"}
        size={12}
        ml={6}
      >
        {reply.user.name}
      </Span>
      <Span
        className="text"
        size={12}
        textOverflow="ellipsis"
        ml={4}
      >
        {reply.text}
      </Span>
    </Div>
  );
};
