import { useState } from "react";
import classNames from "classnames";
import { ChatMessageDocument } from "@core/types/chat/ChatMessageDocument";
import { Div } from "@client/comps/div/Div";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { MessageContent } from "./MessageContent";
import { MessageTitle } from "./MessageTitle";
import { MessageImage } from "./MessageImage";
import { MessageMenu } from "./MessageMenu";
import { MessageReply } from "./MessageReply";
import "./ChatMessageCard.scss";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";

export const ChatMessageCard = ({
  message,
  disableMenu,
}: {
  message: ChatMessageDocument;
  disableMenu?: boolean;
}) => {
  const [hovered, setHovered] = useState(false);
  const highlight = useHighlight(message);
  const small = useIsMobileLayout();
  return (
    <Div
      className={classNames("ChatMessageCard",  message.agent, {
        highlight,
      })}
      fx
      px={small ? 20: 24}
      py={16}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      column
      position="relative"
    >
      <MessageReply message={message} />
      <Div fx gap={12}>
        <MessageImage message={message} />
        <Div
          column
          fx
          // ml={10}
          gap={2}
          overflow="hidden"
        >
          <MessageTitle message={message} />
          <MessageContent message={message} />
        </Div>
      </Div>
      {hovered && !disableMenu && <MessageMenu message={message} />}
    </Div>
  );
};

function useHighlight(message: ChatMessageDocument) {
  const authenticated = useAppSelector((x) => x.user.authenticated);
  const userId = useAppSelector((x) => x.user._id);
  const username = useAppSelector((x) => x.user.username);

  if (!authenticated) {
    return false;
  }

  if (message.agent !== "user") {
    return false;
  }

  if (message.kind !== "text") {
    return false;
  }

  if (message.text.toLowerCase().includes(`@${username.toLowerCase()}`)) {
    return true;
  }

  if (message.reply?.user.id === userId) {
    return true;
  }

  return false;
}
