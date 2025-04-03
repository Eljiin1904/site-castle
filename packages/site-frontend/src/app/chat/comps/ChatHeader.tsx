import { Div } from "@client/comps/div/Div";
import { Dropdown } from "@client/comps/dropdown/Dropdown";
import { Span } from "@client/comps/span/Span";
import { Vector } from "@client/comps/vector/Vector";
import { Dialogs } from "@client/services/dialogs";
import { SvgEllipsisV } from "@client/svgs/common/SvgEllipsisV";
import { SvgTimes } from "@client/svgs/common/SvgTimes";
import { SvgCoinStack } from "@client/svgs/common/SvgCoinStack";
import { SvgBlock } from "@client/svgs/common/SvgBlock";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { ChatRulesModal } from "#app/modals/chat/ChatRulesModal";
import { UserManageBlockModal } from "#app/modals/user/UserManageBlockModal";
import { useChatToggle } from "#app/hooks/chat/useChatToggle";
import { SvgRules } from "@client/svgs/common/SvgRules";
import { SvgOnlineUser } from "@client/svgs/common/SvgOnlineUser";
import classNames from "classnames";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";
import "./ChatHeader.scss";
import { ChatRainInfoModal } from "#app/modals/chat/ChatRainInfoModal";
import { SvgInfoCircle } from "@client/svgs/common/SvgInfoCircle";
import { ChatRainTipModal } from "#app/modals/chat/ChatRainTipModal";

export const ChatHeader = () => {
  
  
  const toggleChat = useChatToggle();
  const small = useIsMobileLayout();

  return ( <Div 
    className={classNames("ChatHeader")}
    fx
    gap={8}
    p={small ? 20: 24}
    borderBottom
    borderColor="brown-4"
    justify="space-between"
    >
    <UserLevel />
    <Div
    gap={16}>
      <Div
        grow
        center
        gap={8}
      >
        <Dropdown
      type="menu"
      button={
        <Vector
          as={SvgEllipsisV}
          hover="highlight"
          px={2}
          size={16}
        />
      }
      options={[
        {
          type: "action",
          label: "Chat Rules",
          iconLeft: SvgRules,
          onClick: () => Dialogs.open("primary", <ChatRulesModal />)
        },
        {
          type: "action",
          label: "Chat Rain How it Works",
          iconLeft: SvgInfoCircle,
          onClick: () => Dialogs.open("primary", <ChatRainInfoModal />)
        },
        {
          type: "action",
          label: "Chat Rain",
          iconLeft: SvgCoinStack,
          onClick: () => Dialogs.open("primary", <ChatRainTipModal />),
        },
        {
          type: "action",
          label: "Blocked Users",
          iconLeft: SvgBlock,
          onClick: () => Dialogs.open("primary", <UserManageBlockModal />),
        },
      ]}
    />
        
      </Div>
      
      <Vector
        as={SvgTimes}
        size={16}
        hover="highlight"
        onClick={() => toggleChat()}
      />
    </Div>
  </Div>);
};

const UserLevel = () => {

  const activeCount = useAppSelector((x) => x.site.meta.activeCount || 0);
  
  return (<Div gap={8} alignItems="center">
    <Vector
      as={SvgOnlineUser}
      color="bright-green"
    />
    <Span
      color="bright-green"
    >
      {activeCount}
    </Span>
  </Div>);
};
