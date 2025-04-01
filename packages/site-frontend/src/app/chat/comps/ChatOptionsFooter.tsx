import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { SvgBets } from "#app/svgs/common/SvgBets";
import { Button } from "@client/comps/button/Button";
import { Div } from "@client/comps/div/Div";
import { SvgMoney } from "@client/svgs/common/SvgMoney";
import { Chat } from "#app/services/chat";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Dropdown } from "@client/comps/dropdown/Dropdown";
import { DropdownBody } from "@client/comps/dropdown/DropdownBody";
import { DropdownItem } from "@client/comps/dropdown/DropdownItem";
import { Dialogs } from "@client/services/dialogs";
import { TipModal } from "#app/modals/economy/TipModal";
import { ChatEarnModal } from "#app/modals/chat/ChatEarnModal";
import { useTranslation } from "@core/services/internationalization/internationalization";

export const ChatOptionsFooter = () =>  {

  const {t} = useTranslation();

  return(<Div fx gap={8}>
      <Button size="xssso" label={t('chat.earn')} kind="tertiary-grey" iconLeft={SvgMoney} onClick={() => Dialogs.open("primary", <TipModal />)} />
      <Button size="xssso" flexGrow label={t('chat.tip')} kind="tertiary-grey" iconLeft={SvgBets} onClick={() => Dialogs.open("primary", <ChatEarnModal />)} />
      <ChatDrowdown />
  </Div>);
};

const ChatDrowdown = () => {

  const [open, setOpen] = useState(false);
  const channel = useAppSelector((x) => x.chat.channel);
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const options = Chat.channels.map(Chat.getChannelInfo);
  const value = Chat.channels.indexOf(channel);
  const onChange = (x: string, i: number) => {

    dispatch(Chat.setChannel(Chat.channels[i]))
    setOpen(false);
  };

  return (<Dropdown
        className="chat-dropdown"
        type="custom"
        forceAlign="right"
        open={open}
        onToggle={setOpen}
        button={
          <Button
          gap={8}
          size="xssso"
          kind="tertiary-grey"
          label={t(`chat.${options[value].label.toLocaleLowerCase()}`)}
          iconLeft={options[value].icon}
        >
        </Button>
        }
        body={
          <DropdownBody>
            {options.map((x, i) => {
              return (
                <DropdownItem
                  key={i}
                  type="action"
                  label={x.label}
                  iconLeft={x.icon}
                  active={value === i}
                  onClick={() => onChange(x.label, i)}
                />
              );
            })}      
          </DropdownBody>
        }
      />)
};