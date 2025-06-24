import { Fragment, useRef, useState } from "react";
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
import { useTranslation } from "@core/services/internationalization/internationalization";
import { Button } from "@client/comps/button/Button";
import { SvgQuestionCircle } from "@client/svgs/common/SvgQuestionCircle";
import { SvgTimes } from "@client/svgs/common/SvgTimes";
import { SvgEmoji } from "@client/svgs/common/SvgEmoji";
import { ChatModalBottom } from "./ChatModalBottom";
import "./ChatInput.scss";

export const ChatInput = ({disabled, message}: {
  disabled?: boolean;
  message?: string | JSX.Element;
}) => {
  
  const [open, setOpen] = useState(false);
  const text = useAppSelector((x) => x.chat.input);
  const dispatch = useAppDispatch();
  const sendMessage = useSendMessage();

  return (<Fragment>
    <Div className="ChatFooterModalContainer">
      <ReplyPopout />
      <MentionPopout
        text={text}
        onMentionClick={(newText) => {
          dispatch(Chat.setInput(newText));
          document.getElementById("chat-input")?.focus();
        }}
      />
      {open && disabled && <ChatDisabledMessage onClick={() => setOpen(false)} message={message ?? ''} />}
      {open && !disabled && <EmojiMenu onClick={() => setOpen(false)} />}
    </Div>
    <Div fx gap={8}>
      <ChatInputTextArea disabled={disabled} setOpen={setOpen} />
      <Button kind="primary-yellow" iconLeft={SvgSend} onClick={sendMessage} disabled={disabled} />
    </Div>
  </Fragment>);
};

const ChatInputTextArea = ({disabled, setOpen}: {
  disabled?: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  
  const text = useAppSelector((x) => x.chat.input);
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const sendMessage = useSendMessage();
  const dispatch = useAppDispatch();
  const {t} = useTranslation(['chat']);

  return (<Div fx>
    <TextArea
      id="chat-input"
      className="ChatInput"
      forwardRef={textAreaRef}
      placeholder={disabled ? t("unable"): t("message")}
      value={text}
      onChange={(x) => dispatch(Chat.setInput(x))}
      onSubmit={sendMessage}
      disabled={disabled}
    />
    <Vector
      position="absolute"
      right={0}
      center
      mr={16}
      bottom={12}
      as={disabled ? SvgQuestionCircle: SvgEmoji}
      cursor="pointer"
      hover="highlight"
      onClick={() => setOpen(currentOpen => !currentOpen)}
    />
  </Div>
  );
};

const ChatDisabledMessage = ({message, onClick}: {
  message: string | JSX.Element,
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}) => {

  return (<ChatModalBottom   
    py={16}
    color="light-sand"
    >
      <Vector
        as={SvgTimes}
        size={16}
        color={'dark-sand'}
        position="absolute"
        right={20}
        top={12}
        hover="highlight"
        onClick={onClick}
      />
      {message}
    </ChatModalBottom>);
};