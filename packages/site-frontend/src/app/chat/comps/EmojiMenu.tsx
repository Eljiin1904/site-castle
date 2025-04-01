import { useState } from "react";
import { Dropdown } from "@client/comps/dropdown/Dropdown";
import { DropdownBody } from "@client/comps/dropdown/DropdownBody";
import { Span } from "@client/comps/span/Span";
import { Vector } from "@client/comps/vector/Vector";
import { SvgEmoji } from "@client/svgs/common/SvgEmoji";
import { Chat } from "#app/services/chat";
import { Div } from "@client/comps/div/Div";
import { SvgTimes } from "@client/svgs/common/SvgTimes";
import { Img } from "@client/comps/img/Img";
import { EmoteProps } from "#app/services/chat/Chat";


export const EmojiMenu = ({
  onEmojiClick,
}: {
  onEmojiClick: (x: string) => void;
}) => {

  const [open, setOpen] = useState(false);

  const handleEmojiClick = (x: string) => {
    setOpen(false);
    onEmojiClick(x);
  };
  return (<Dropdown
    type="custom"
    menuWidth="280px"
    open={open}
    onToggle={setOpen}
    button={<Vector
      as={SvgEmoji}
      hover="highlight"
    />}
    body={<EmojiMenuOptions onClick={handleEmojiClick} onClose={() => setOpen(false)}/>}
    />)
};

export const EmojiMenuOld = ({
  onEmojiClick,
}: {
  onEmojiClick: (x: string) => void;
}) => {
  const [open, setOpen] = useState(false);

  const handleEmojiClick = (x: string) => {
    setOpen(false);
    onEmojiClick(x);
  };

  return (
    <Dropdown
      type="custom"
      menuWidth="288px"
      open={open}
      onToggle={setOpen}
      button={
        <Vector
          as={SvgEmoji}
          size={16}
          hover="highlight"
        />
      }
      body={
        <DropdownBody
          flexFlow="row-wrap"
          gap={8}
          p={8}
        >
          {Chat.emojis.map((x, i) => (
            <EmojiButton
              key={i}
              emoji={x}
              onClick={handleEmojiClick}
            />
          ))}
        </DropdownBody>
      }
    />
  );
};

const EmojiMenuOptions = ({onClick, onClose}: {
  onClick: (x: string) => void;
  onClose: () => void;
}) => {

  const [currentTab, setCurrentTab] = useState("emotes");
  return (<Div 
          fx
          px={16}
          py={16}
          bg="brown-4"
          column
          >
          <Div fx gap={16} px={8}>
            <EmojiMenuOption selected={currentTab === 'emotes'} label="Emotes" onClick={() => setCurrentTab("emotes")} />
            <EmojiMenuOption selected={currentTab === 'emoji'} label="Emoji" onClick={() => setCurrentTab("emoji")} />
            <Vector
                as={SvgTimes}
                size={16}
                color={'dark-sand'}
                position="absolute"
                right={0}
                top={0}
                hover="highlight"
                onClick={onClose}
              />
          </Div>  
    {currentTab === "emotes" && <Emotes onClick={onClick} />}
    {currentTab === "emoji" && <Emojis  onClick={onClick}/>}
  </Div>)
};

const EmojiMenuOption = ({selected, label, onClick}: {
  selected: boolean;
  label: string;
  onClick: () => void;
}) => {

  return (<Span cursor="pointer" size={12} color={selected ? 'sand' : 'dark-sand'} fontWeight="semi-bold" onClick={onClick} textTransform="uppercase">{label}</Span>)
}

const Emojis = ({onClick}: {
  onClick: (x: string) => void;
}) => {

  return (<Div
    fx
    flexFlow="row-wrap"
    gap={4}
    mt={12}
    >
    {Chat.emojis.map((x, i) => (
            <EmojiButton
              key={i}
              emoji={x}
              onClick={onClick}
            />
          ))}
  </Div>)
};

const Emotes = ({onClick}: {
  onClick: (x: string) => void;
}) => {

  return (<Div
    fx
    flexFlow="row-wrap"
    gap={4}
    mt={12}
    >
    {Chat.emotes.map((x, i) => (
            <EmoteButton
              key={x.id}
              emote={x}
              onClick={onClick}
            />
          ))}
  </Div>)
};


const EmojiButton = ({
  emoji,
  onClick,
}: {
  emoji: string;
  onClick: (x: string) => void;
}) => {
  return (
    <Span
      size={20}
      hover="bg-darken"
      py={6}
      px={8}
      onClick={() => onClick(emoji)}
    >
      {emoji}
    </Span>
  );
};

const EmoteButton = ({
  emote,
  onClick,
}: {
  emote: EmoteProps;
  onClick: (x: string) => void;
}) => {
  return (
    <Span
      size={20}
      hover="bg-darken"
      py={6}
      px={8}
      onClick={() => onClick(` ${emote.id}`)}
    >
      <Img path={emote.src} height="32px" width="32px" type="png" alt={emote.name} />
    </Span>
  );
};