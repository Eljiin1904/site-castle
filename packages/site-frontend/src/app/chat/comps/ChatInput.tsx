import { useRef, useState } from "react";
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
import "./ChatInput.scss";
import { Button } from "@client/comps/button/Button";
import { SvgQuestionCircle } from "@client/svgs/common/SvgQuestionCircle";
import { Dropdown } from "@client/comps/dropdown/Dropdown";
import { SvgTimes } from "@client/svgs/common/SvgTimes";

export const ChatInput = ({disabled, message}: {
  disabled?: boolean;
  message?: string | JSX.Element;
}) => {
  const text = useAppSelector((x) => x.chat.input);
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const dispatch = useAppDispatch();
  const {t} = useTranslation()
  const sendMessage = useSendMessage();

  return (
    <Div fx gap={8} position="relative">
      <Div fx>
        <TextArea
          id="chat-input"
          className="ChatInput"
          forwardRef={textAreaRef}
          placeholder={disabled ? t("chat.unable"): t("chat.message")}
          value={text}
          onChange={(x) => dispatch(Chat.setInput(x))}
          onSubmit={sendMessage}
          disabled={disabled}
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
          mr={16}
          bottom={12}
        >
          {disabled ? 
            <ChatDisabledMessage message={message ?? ''} /> : <EmojiMenu
            onEmojiClick={(emoji) => {
              dispatch(Chat.setInput(text + emoji));
              document.getElementById("chat-input")?.focus();
            }}
          />
          }
        </Div>
      </Div>
      <Button kind="primary-yellow" iconLeft={SvgSend} onClick={sendMessage} disabled={disabled} />
    </Div>
  );
};


const ChatDisabledMessage = ({message}: {message: string | JSX.Element}) => {

  const [open, setOpen] = useState(false);
  return (<Dropdown
      className="ChatMessageDropdown"
      type="custom"
      menuWidth="290px"
      open={open}
      onToggle={setOpen}
      button={
        <Vector
        as={SvgQuestionCircle}
        cursor="pointer"
        hover="highlight"
      /> 
      }
      body={<Div 
          fx
          px={16}
          py={16}
          bg="brown-4"
          column
          >
          <Div fx gap={16} px={8}>
            <Vector
                as={SvgTimes}
                size={16}
                color={'dark-sand'}
                position="absolute"
                right={0}
                top={0}
                hover="highlight"
                onClick={() => setOpen(false)}
              />
          </Div>
          <Div
          fx
          flexFlow="row-wrap"
          gap={4}
          mt={12}
          color="light-sand"
          >{message}</Div> 
      </Div>}
    />);
};