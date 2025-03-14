import classNames from "classnames";
import { Div } from "@client/comps/div/Div";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { ChatRoom } from "./comps/ChatRoom";
import { ChatFooter } from "./comps/ChatFooter";
import { ChatHeader } from "./comps/ChatHeader";
import { ChatLog } from "./comps/ChatLog";
import { ChatRain } from "./comps/ChatRain";
import { SupportToggle } from "./comps/SupportToggle";
import "./AppChatPanel.scss";

export const AppChatPanel = () => {
  const layout = useAppSelector((x) => x.style.bodyLayout);

  if (["mobile", "tablet"].includes(layout)) {
    return null;
  }

  return <PanelContent />;
};

const PanelContent = () => {
  const collapsed = useAppSelector((x) => x.chat.panelCollapsed);
  const animate = useAppSelector((x) => x.chat.panelCollapsedChanged);

  return (
    <Div
      className={classNames("AppChat AppChatPanel", {
        animate,
        opened: !collapsed,
        closed: collapsed,
      })}
      align="flex-end"
    >
      <Div
        className="chat-inner"
        position="absolute"
        left={0}
        fy
        column
        bg="black-hover"
        border
        borderColor="brown-4"
      >
        <ChatRoom />
        <ChatHeader />
        <ChatRain />
        <ChatLog />
        <ChatFooter />
      </Div>
      <SupportToggle />
    </Div>
  );
};
