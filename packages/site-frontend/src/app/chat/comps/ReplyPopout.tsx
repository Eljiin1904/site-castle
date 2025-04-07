import { Div } from "@client/comps/div/Div";
import { Vector } from "@client/comps/vector/Vector";
import { Span } from "@client/comps/span/Span";
import { SvgTimesCirlce } from "@client/svgs/common/SvgTimesCircle";
import { SvgReply } from "@client/svgs/common/SvgReply";
import { UserIcon } from "#app/comps/user-icon/UserIcon";
import { Chat } from "#app/services/chat";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { TextContent } from "#app/comps/chat-message/content/TextContent";
import { ChatModalBottom } from "./ChatModalBottom";

export const ReplyPopout = () => {
  const message = useAppSelector((x) => x.chat.replyMessage);
  const dispatch = useAppDispatch();

  if (!message || message.agent !== "user" || message.kind !== "text") {
    return null;
  }

  return (<ChatModalBottom py={16}>
    <Vector
        as={SvgReply}
        size={14}
        hover="highlight"
        onClick={() => dispatch(Chat.setReplyMessage(message))}
      />
      <UserIcon
        avatarIndex={message.user.avatarIndex}
        avatarId={message.user.avatarId}
        width="18px"
        ml={8}
      />
      <Span
        color="sand"
        size={12}
        ml={6}
      >
        {message.user.name}
      </Span>
      <Span
        size={12}
        textOverflow="ellipsis"
        ml={4}
        style={{ maxWidth: "140px" }}
      >
        <TextContent text={message.text} isReply={true} />
      </Span>
      <Div
        grow
        justify="flex-end"
      >
        <Vector
          as={SvgTimesCirlce}
          size={14}
          p={4}
          hover="highlight"
          onClick={() => dispatch(Chat.setReplyMessage(undefined))}
        />
      </Div>
  </ChatModalBottom>);
};
