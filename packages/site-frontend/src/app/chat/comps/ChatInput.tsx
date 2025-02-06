import { useRef } from "react";
import { Div } from "@client/comps/div/Div";
import { TextArea } from "@client/comps/text-area/TextArea";
import { Vector } from "@client/comps/vector/Vector";
import { SvgSend } from "@client/svgs/common/SvgSend";
import { Chat } from "#app/services/chat";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { useSendMessage } from "../hooks/useSendMessage";
import { EmojiMenu } from "./EmojiMenu";
import { MentionPopout } from "./MentionPopout";
import { ReplyPopout } from "./ReplyPopout";
import "./ChatInput.scss";

export const ChatInput = () => {
  const text = useAppSelector((x) => x.chat.input);
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const dispatch = useAppDispatch();

  const sendMessage = useSendMessage();

  return (
    <Div column>
      <TextArea
        id="chat-input"
        className="ChatInput"
        forwardRef={textAreaRef}
        placeholder="Say to all..."
        value={text}
        onChange={(x) => dispatch(Chat.setInput(x))}
        onSubmit={sendMessage}
      />
      <Div
        fx
        position="absolute"
        style={{ bottom: "calc(100% + 4px)" }}
      >
        <ReplyPopout />
      </Div>
      <Div
        fx
        position="absolute"
        style={{ bottom: "calc(100% + 4px)" }}
      >
        <MentionPopout
          text={text}
          onMentionClick={(newText) => {
            dispatch(Chat.setInput(newText));
            document.getElementById("chat-input")?.focus();
          }}
        />
      </Div>
      <Div
        position="absolute"
        right={0}
        center
        mr={8}
        bottom={9}
      >
        <EmojiMenu
          onEmojiClick={(emoji) => {
            dispatch(Chat.setInput(text + emoji));
            document.getElementById("chat-input")?.focus();
          }}
        />
        <Vector
          as={SvgSend}
          size={16}
          color="yellow"
          p={4}
          hover="highlight"
          onClick={sendMessage}
        />
      </Div>
    </Div>
  );
};
