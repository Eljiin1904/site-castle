import { Button } from "@client/comps/button/Button";
import { Div } from "@client/comps/div/Div";
import { Dropdown } from "@client/comps/dropdown/Dropdown";
import { Dialogs } from "@client/services/dialogs";
import { SvgCoin } from "@client/svgs/common/SvgCoin";
import { SvgCoinStack } from "@client/svgs/common/SvgCoinStack";
import { ChatEarnModal } from "#app/modals/chat/ChatEarnModal";
import { TipModal } from "#app/modals/economy/TipModal";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { Chat } from "#app/services/chat";
import { ChatFooterField } from "./ChatFooterField";
import "./ChatFooter.scss";

export const ChatFooter = () => {
  const channel = useAppSelector((x) => x.chat.channel);
  const dispatch = useAppDispatch();

  return (
    <Div
      className="ChatFooter"
      column
      p={12}
      gap={8}
      borderTop
    >
      <ChatFooterField />
      <Div
        className="footer-buttons"
        fx
        gap={6}
      >
        <Button
          kind="secondary"
          size="sm"
          icon={SvgCoin}
          label="Earn"
          onClick={() => Dialogs.open("primary", <ChatEarnModal />)}
        />
        <Button
          kind="secondary"
          size="sm"
          icon={SvgCoinStack}
          label="Tip"
          onClick={() => Dialogs.open("primary", <TipModal />)}
        />
        <Dropdown
          type="select"
          buttonKind="secondary"
          fx
          options={Chat.channels.map(Chat.getChannelInfo)}
          value={Chat.channels.indexOf(channel)}
          onChange={(x, i) => dispatch(Chat.setChannel(Chat.channels[i]))}
        />
      </Div>
    </Div>
  );
};
