import { Div } from "@client/comps/div/Div";
import { Dropdown } from "@client/comps/dropdown/Dropdown";
import { Link } from "@client/comps/link/Link";
import { Span } from "@client/comps/span/Span";
import { Vector } from "@client/comps/vector/Vector";
import { Dialogs } from "@client/services/dialogs";
import { SvgDiscord } from "@client/svgs/brands/SvgDiscord";
import { SvgTwitter } from "@client/svgs/brands/SvgTwitter";
import { SvgTelegram } from "@client/svgs/brands/SvgTelegram";
import { SvgCircle } from "@client/svgs/common/SvgCircle";
import { SvgEllipsisV } from "@client/svgs/common/SvgEllipsisV";
import { SvgTimes } from "@client/svgs/common/SvgTimes";
import { SvgCoin } from "@client/svgs/common/SvgCoin";
import { SvgBook } from "@client/svgs/common/SvgBook";
import { SvgCoinStack } from "@client/svgs/common/SvgCoinStack";
import { SvgBlock } from "@client/svgs/common/SvgBlock";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { ChatRulesModal } from "#app/modals/chat/ChatRulesModal";
import { ChatEarnModal } from "#app/modals/chat/ChatEarnModal";
import { UserManageBlockModal } from "#app/modals/user/UserManageBlockModal";
import { TipModal } from "#app/modals/economy/TipModal";
import { useChatToggle } from "#app/hooks/chat/useChatToggle";
import config from "#app/config";
import "./ChatHeader.scss";

export const ChatHeader = () => {
  const activeCount = useAppSelector((x) => x.site.meta.activeCount || 0);
  const toggleChat = useChatToggle();

  return (
    <Div
      className="ChatHeader"
      px={12}
      py={10}
      gap={12}
      borderBottom
    >
      <Div gap={6}>
        <SocialButton
          href={config.twitterURL}
          icon={SvgTwitter}
        />
        <SocialButton
          href={config.discordURL}
          icon={SvgDiscord}
        />
        <SocialButton
          href={config.telegramURL}
          icon={SvgTelegram}
        />
      </Div>
      <Div
        grow
        center
        gap={4}
      >
        <Vector
          as={SvgCircle}
          size={10}
          color="green"
          top={1}
        />
        <Span
          size={14}
          weight="semi-bold"
          color="white"
        >
          {activeCount}
        </Span>
      </Div>
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
            iconLeft: SvgBook,
            onClick: () => Dialogs.open("primary", <ChatRulesModal />),
          },
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
        as={SvgTimes}
        size={16}
        hover="highlight"
        onClick={() => toggleChat()}
      />
    </Div>
  );
};

const SocialButton = ({ icon, href }: { icon: Svg; href: string }) => {
  return (
    <Link
      type="a"
      href={href}
      flexCenter
      p={2}
    >
      <Vector
        as={icon}
        size={16}
      />
    </Link>
  );
};
