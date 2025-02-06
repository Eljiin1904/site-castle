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

export const ChatMessageCard = ({
  message,
  disableMenu,
}: {
  message: ChatMessageDocument;
  disableMenu?: boolean;
}) => {
  const [hovered, setHovered] = useState(false);
  const highlight = useHighlight(message);

  return (
    <Div
      className={classNames("ChatMessageCard", {
        highlight,
      })}
      fx
      py={8}
      px={12}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      column
      position="relative"
    >
      <MessageReply message={message} />
      <Div>
        <MessageImage message={message} />
        <Div
          column
          fx
          ml={10}
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
