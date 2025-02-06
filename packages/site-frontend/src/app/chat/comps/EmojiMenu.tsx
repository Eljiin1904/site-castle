import { useState } from "react";
import { Dropdown } from "@client/comps/dropdown/Dropdown";
import { DropdownBody } from "@client/comps/dropdown/DropdownBody";
import { Span } from "@client/comps/span/Span";
import { Vector } from "@client/comps/vector/Vector";
import { SvgEmoji } from "@client/svgs/common/SvgEmoji";
import { Chat } from "#app/services/chat";

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

  return (
    <Dropdown
      type="custom"
      menuWidth="224px"
      open={open}
      onToggle={setOpen}
      button={
        <Vector
          as={SvgEmoji}
          size={16}
          color="gray"
          p={4}
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
      hover="highlight"
      onClick={() => onClick(emoji)}
    >
      {emoji}
    </Span>
  );
};
