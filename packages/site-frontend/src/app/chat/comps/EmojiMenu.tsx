import { useState } from "react";
import { Dropdown } from "@client/comps/dropdown/Dropdown";
import { Span } from "@client/comps/span/Span";
import { Vector } from "@client/comps/vector/Vector";
import { SvgEmoji } from "@client/svgs/common/SvgEmoji";
import { Chat } from "#app/services/chat";
import { Div } from "@client/comps/div/Div";
import { SvgTimes } from "@client/svgs/common/SvgTimes";
import { Img } from "@client/comps/img/Img";
import { EmoteProps, setActiveTab, setSearch } from "#app/services/chat/Chat";
import { Input } from "@client/comps/input/Input";
import { SvgSearch } from "@client/svgs/common/SvgSearch";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { Conditional } from "@client/comps/conditional/Conditional";
import { TenorResults } from "#app/app/tenor/comps/TenorResults";

export const EmojiMenu = () => {

  const [open, setOpen] = useState(false);  
  return (<Dropdown
    className="ChatEmojiModalBottom"
    type="custom"
    menuWidth="338px"
    open={open}
    onToggle={setOpen}
    button={<Vector
      as={SvgEmoji}
      hover="highlight"
    />}
    body={<EmojiMenuOptions onClick={() => setOpen(false)} />}
    />);
};

const EmojiMenuOptions = ({onClick}: {
  onClick: () => void;
}) => {

  const search = useAppSelector((x) => x.chat.search);
  const activeTab = useAppSelector((x) => x.chat.activeTab);
  const dispatch = useAppDispatch();
  const {t} = useTranslation();

  return (<Div 
          fx
          py={16}
          bg="brown-4"
          column
          gap={16}
          wrap
          >
          <Div fx px={16}>
            <Input
                iconLeft={SvgSearch}
                iconRight={SvgTimes}
                kind="chat-background"
                type="text"
                id="game-search"
                placeholder={t('chat.search')}
                value={search}
                onChange={(search) => dispatch(setSearch(search ?? ''))}
                onIconRightClick={() => dispatch(setSearch(''))}
              />
          </Div>
          <Div fx justifyContent="center">
            <EmojiMenuOption label={'emoji'} />
            <EmojiMenuOption label={'gifs'}  />            
          </Div>
          <Div fx px={16} overflow="auto">
            <Conditional value={activeTab}
            emoji={<Emojis onClick={onClick} />}
            gifs={<TenorResults onClick={onClick} />}
            />
          </Div>
  </Div>)
};

const EmojiMenuOption = ({label}: {
  label: "emoji" | "gifs";
}) => {

  const activeTab = useAppSelector((x) => x.chat.activeTab);
  const dispatch = useAppDispatch();
  const {t} = useTranslation();
  const selected = activeTab === label;
  return (<Span cursor="pointer" pb={8} borderWidth={selected ? 2: 1} borderBottom borderColor={selected ? `sand`:`dark-brown-hover`} flexGrow textAlign="center" size={12} color={selected ? 'sand' : 'dark-sand'} fontWeight="semi-bold" onClick={() => dispatch(setActiveTab(label)) } textTransform="uppercase">{t(`chat.${label}`)}</Span>)
};

const Emojis = ({onClick}: {
  onClick: () => void;
}) => {

  const search = useAppSelector((x) => x.chat.search);
  const emotes = Chat.emotes.filter(x => !search || x.name.toLowerCase().includes(search.toLowerCase()));

  return (<Div
    fx
    flexFlow="row-wrap"
    gap={8}
    >
    {emotes.map((x, i) => (
            <EmoteButton
              key={x.id}
              emote={x}
              onClick={onClick}
            />
          ))}
  </Div>)
};

const EmoteButton = ({
  emote,
  onClick,
}: {
  emote: EmoteProps;
  onClick: () => void;
}) => {
  
  const dispatch = useAppDispatch();
  const text = useAppSelector((x) => x.chat.input);
  const onClickEmoji = () => {

    dispatch(Chat.setInput(`${text} [${emote.id}] `));
    onClick();
  };

  return (
    <Span
      hover="bg-darken"
      py={8}
      px={8}
      onClick={onClickEmoji}
    >
      <Img path={emote.src} height="50px" width="50px" type="png" alt={emote.name} />
    </Span>
  );
};