import { Div } from "@client/comps/div/Div";
import { Vector } from "@client/comps/vector/Vector";
import { Span } from "@client/comps/span/Span";
import { SvgTimesCirlce } from "@client/svgs/common/SvgTimesCircle";
import { SvgReply } from "@client/svgs/common/SvgReply";
import { UserIcon } from "#app/comps/user-icon/UserIcon";
import { Chat } from "#app/services/chat";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";

export const ReplyPopout = () => {
  const message = useAppSelector((x) => x.chat.replyMessage);
  const dispatch = useAppDispatch();

  if (!message || message.agent !== "user" || message.kind !== "text") {
    return null;
  }

  return (
    <Div
      fx
      align="center"
      p={8}
      bg="brown-7"
      border
    >
      <Vector
        as={SvgReply}
        size={14}
        color="gray"
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
        color="light-orange"
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
        {message.text}
      </Span>
      <Div
        grow
        justify="flex-end"
      >
        <Vector
          as={SvgTimesCirlce}
          size={14}
          p={4}
          color="gray"
          hover="highlight"
          onClick={() => dispatch(Chat.setReplyMessage(undefined))}
        />
      </Div>
    </Div>
  );
};
