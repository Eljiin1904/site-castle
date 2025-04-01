import { Div } from "@client/comps/div/Div";
import { Dropdown } from "@client/comps/dropdown/Dropdown";
import { Span } from "@client/comps/span/Span";
import { Vector } from "@client/comps/vector/Vector";
import { Dialogs } from "@client/services/dialogs";
import { SvgEllipsisV } from "@client/svgs/common/SvgEllipsisV";
import { SvgTimes } from "@client/svgs/common/SvgTimes";
import { SvgCoin } from "@client/svgs/common/SvgCoin";
import { SvgCoinStack } from "@client/svgs/common/SvgCoinStack";
import { SvgBlock } from "@client/svgs/common/SvgBlock";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { ChatRulesModal } from "#app/modals/chat/ChatRulesModal";
import { ChatEarnModal } from "#app/modals/chat/ChatEarnModal";
import { UserManageBlockModal } from "#app/modals/user/UserManageBlockModal";
import { TipModal } from "#app/modals/economy/TipModal";
import { useChatToggle } from "#app/hooks/chat/useChatToggle";
import { useDispatch } from "react-redux";
import { Chat } from "#app/services/chat";
import { SvgRules } from "@client/svgs/common/SvgRules";
import { SvgOnlineUser } from "@client/svgs/common/SvgOnlineUser";
import classNames from "classnames";
import { DropdownBody } from "@client/comps/dropdown/DropdownBody";
import { DropdownItem } from "@client/comps/dropdown/DropdownItem";
import { SvgArrowRight } from "@client/svgs/common/SvgArrowRight";
import { useState } from "react";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";
import "./ChatHeader.scss";

export const ChatHeader = () => {
  
  const activeCount = useAppSelector((x) => x.site.meta.activeCount || 0);
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
          label: "Tip Player",
          iconLeft: SvgCoinStack,
          onClick: () => Dialogs.open("primary", <TipModal />),
        },
        {
          type: "action",
          label: "Earn",
          iconLeft: SvgCoin,
          onClick: () => Dialogs.open("primary", <ChatEarnModal />),
        },
        {
          type: "action",
          label: "Blocked Users",
          iconLeft: SvgBlock,
          onClick: () => Dialogs.open("primary", <UserManageBlockModal />),
        },
      ]}
    />
        <Vector
          as={SvgOnlineUser}
          size={16}
          color="green"
        />
        <Span
          size={14}
          weight="medium"
          color="green"
        >
          {activeCount}
        </Span>
      </Div>
      <Vector
        as={SvgRules}
        size={16}
        hover="highlight"
        onClick={() => Dialogs.open("primary", <ChatRulesModal />)}
      />
      <Vector
        as={SvgTimes}
        size={16}
        hover="highlight"
        onClick={() => toggleChat()}
      />
    </Div>
  </Div>);
};