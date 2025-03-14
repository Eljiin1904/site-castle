import { useState } from "react";
import { Div } from "@client/comps/div/Div";
import { Dropdown } from "@client/comps/dropdown/Dropdown";
import { DropdownBody } from "@client/comps/dropdown/DropdownBody";
import { DropdownItem } from "@client/comps/dropdown/DropdownItem";
import { ProgressBar } from "@client/comps/progress-bar/ProgressBar";
import { Img } from "@client/comps/img/Img";
import { Span } from "@client/comps/span/Span";
import { Dialogs } from "@client/services/dialogs";
import { UserIcon } from "#app/comps/user-icon/UserIcon";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { useUserLevel } from "#app/hooks/users/useUserLevel";
import { UserLogoutModal } from "#app/modals/user/UserLogoutModal";
import { WalletModal } from "#app/modals/wallet/WalletModal";

import { VaultModal } from "#app/modals/vault/VaultModal";
import { AffiliateReloadModal } from "#app/modals/affiliate/AffiliateReloadModal";
import { SvgWallet } from "#app/svgs/common/SvgWallet";
import { SvgProfile } from "#app/svgs/common/SvgProfile";
import { SvgAvatar } from "#app/svgs/common/SvgAvatar";
import { SvgBets } from "#app/svgs/common/SvgBets";
import { SvgVIP } from "#app/svgs/common/SvgVIP";
import { SvgSupport } from "#app/svgs/common/SvgSupport";
import { SvgFAQs } from "#app/svgs/common/SvgFAQs";
import { SvgLogout } from "#app/svgs/common/SvgLogout";
import { Vector } from "@client/comps/vector/Vector";
import { SvgArrowRight } from "@client/svgs/common/SvgArrowRight";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";


export const UserMenu = () => {
  const [open, setOpen] = useState(false);
  const avatarIndex = useAppSelector((x) => x.user.avatarIndex);
  const avatarId = useAppSelector((x) => x.user.avatarId);
  const reloadsEnabled = useAppSelector((x) => x.user.meta.reloadsEnabled);
  const small = useIsMobileLayout();

  return (
    <Dropdown
      className="user-dropdown"
      type="custom"
      menuWidth="142px"
      forceAlign="right"
      open={open}
      onToggle={setOpen}
      button={
        <Div
        gap={8}
        flexCenter
      >
        <Div
          bg="black-hover"
          borderRadius={"full"}
          borderColor={open ? "sand": "black-hover"}
          borderWidth={1}
          border={!small}
          p={small ? 0 : 4}
        >
          <UserIcon
            avatarIndex={avatarIndex}
            avatarId={avatarId}
            width={small ? "32px" : "46px"}
          />
        </Div>
        {!small && <Vector
            className="icon left"
            as={open ? SvgArrowRight: SvgArrowRight}
            size={12}
            style={{transform: open ? "rotate(180deg)" : "rotate(0deg)"}}
            color="dark-sand"
          />}
      </Div>
      }
      body={
        <DropdownBody>
          <DropdownItem
            type="nav"
            to="/account"
            end
            iconLeft={SvgWallet}
            label="Wallet"
            onClick={() => setOpen(false)}
          />
          <DropdownItem
            type="nav"
            to="/account"
            end
            iconLeft={SvgProfile}
            label="Profile"
            onClick={() => setOpen(false)}
          />
          <DropdownItem
            type="action"
            iconLeft={SvgAvatar}
            label="Avatar"
            onClick={() => {
              Dialogs.open("primary", <WalletModal initialAction="deposit" />);
              setOpen(false);
            }}
          />
          <DropdownItem
            type="nav"
            iconLeft={SvgBets}
            label="Bets"
            to="/bets"
            onClick={() => setOpen(false)}
          />
          <DropdownItem
            type="action"
            iconLeft={SvgVIP}
            label="VIP"
            onClick={() => {
              Dialogs.open("primary", <VaultModal />);
              setOpen(false);
            }}
          />
          {reloadsEnabled && (
            <DropdownItem
              type="action"
              iconLeft={SvgSupport}
              label="Support"
              onClick={async () => {
                Dialogs.open("primary", <AffiliateReloadModal />);
                setOpen(false);
              }}
            />
          )}
          <DropdownItem
            type="nav"
            to="/account/transactions"
            iconLeft={SvgFAQs}
            label="FAQ's"
            onClick={() => setOpen(false)}
          />
          <DropdownItem
            type="action"
            iconLeft={SvgLogout}
            label="Logout"
            onClick={() => {
              Dialogs.open("secondary", <UserLogoutModal />);
              setOpen(false);
            }}
          />
        </DropdownBody>
      }
    />
  );
};