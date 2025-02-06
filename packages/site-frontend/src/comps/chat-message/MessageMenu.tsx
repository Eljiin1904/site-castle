import { ChatMessageDocument } from "@core/types/chat/ChatMessageDocument";
import { Div } from "@client/comps/div/Div";
import { Vector } from "@client/comps/vector/Vector";
import { Dialogs } from "@client/services/dialogs";
import { SvgShield } from "@client/svgs/common/SvgShield";
import { SvgMention } from "@client/svgs/common/SvgMention";
import { SvgBlock } from "@client/svgs/common/SvgBlock";
import { SvgReply } from "@client/svgs/common/SvgReply";
import { Chat } from "#app/services/chat";
import { Users } from "#app/services/users";
import { ChatAdminModal } from "#app/modals/chat/ChatAdminModal";
import { UserBlockModal } from "#app/modals/user/UserBlockModal";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";

export const MessageMenu = ({ message }: { message: ChatMessageDocument }) => {
  const userId = useAppSelector((x) => x.user._id);
  const role = useAppSelector((x) => x.user.role);
  const text = useAppSelector((x) => x.chat.input);
  const dispatch = useAppDispatch();

  const isAdmin = Users.getPermissions(role).manageChat;

  if (message.agent !== "user") {
    return null;
  }

  if (message.user.id === userId) {
    return null;
  }

  return (
    <Div
      position="absolute"
      px={6}
      py={4}
      bg="brown-5"
      style={{ right: "16px", top: "-20px" }}
    >
      {isAdmin && (
        <Vector
          as={SvgShield}
          size={18}
          p={4}
          color="orange"
          hover="highlight"
          data-tooltip-id="app-tooltip"
          data-tooltip-content="Moderate"
          onClick={() =>
            Dialogs.open("primary", <ChatAdminModal message={message} />)
          }
        />
      )}
      <Vector
        as={SvgMention}
        size={18}
        p={4}
        color="gray"
        hover="highlight"
        data-tooltip-id="app-tooltip"
        data-tooltip-content="Mention"
        onClick={() => {
          dispatch(Chat.setInput(text + `@${message.user.name} `));
          document.getElementById("chat-input")?.focus();
        }}
      />
      <Vector
        as={SvgReply}
        size={18}
        p={4}
        color="gray"
        hover="highlight"
        data-tooltip-id="app-tooltip"
        data-tooltip-content="Reply"
        onClick={() => {
          dispatch(Chat.setReplyMessage(message));
          document.getElementById("chat-input")?.focus();
        }}
      />
      <Vector
        as={SvgBlock}
        size={18}
        p={4}
        color="red"
        hover="highlight"
        data-tooltip-id="app-tooltip"
        data-tooltip-content="Block"
        onClick={() =>
          Dialogs.open("secondary", <UserBlockModal user={message.user} />)
        }
      />
    </Div>
  );
};
