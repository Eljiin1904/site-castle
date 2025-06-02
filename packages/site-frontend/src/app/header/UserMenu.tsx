import { useState } from "react";
import { Div } from "@client/comps/div/Div";
import { Dropdown } from "@client/comps/dropdown/Dropdown";
import { DropdownBody } from "@client/comps/dropdown/DropdownBody";
import { DropdownItem } from "@client/comps/dropdown/DropdownItem";
import { Dialogs } from "@client/services/dialogs";
import { UserIcon } from "#app/comps/user-icon/UserIcon";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { UserLogoutModal } from "#app/modals/user/UserLogoutModal";
import { WalletModal } from "#app/modals/wallet/WalletModal";

import { SvgProfile } from "#app/svgs/common/SvgProfile";
import { SvgAvatar } from "#app/svgs/common/SvgAvatar";
import { SvgBets } from "#app/svgs/common/SvgBets";
import { SvgLogout } from "#app/svgs/common/SvgLogout";
import { Vector } from "@client/comps/vector/Vector";
import { SvgArrowRight } from "@client/svgs/common/SvgArrowRight";
import { Conditional } from "@client/comps/conditional/Conditional";
import { UserMenuModal } from "#app/modals/menu/UserMenuModal";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { SvgDeposit } from "@client/svgs/common/SvgDeposit";
import { SvgWithdraw } from "@client/svgs/common/SvgWithdraw";
import { SvgTransaction } from "@client/svgs/common/SvgTransaction";

export const UserMenu = () => {

  const layout = useAppSelector((x) => x.style.mainLayout);

  return (<Conditional 
    value={layout} 
    mobile={<UserMenuMobile />}
    tablet={<UserMenuDesktop />}
    laptop={<UserMenuDesktop />}
    desktop={<UserMenuDesktop />}
    />);
};

export const UserMenuDesktop = () => {
  const [open, setOpen] = useState(false);
  const avatarIndex = useAppSelector((x) => x.user.avatarIndex);
  const avatarId = useAppSelector((x) => x.user.avatarId);  
  const {t} = useTranslation();

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
          border
          p={4}
          overflow="hidden"
        >
          <UserIcon
            avatarIndex={avatarIndex}
            avatarId={avatarId}
            width={"46px"}
          />
        </Div>
        <Vector
            className="icon left"
            as={open ? SvgArrowRight: SvgArrowRight}
            size={12}
            style={{transform: open ? "rotate(180deg)" : "rotate(0deg)"}}
          />
      </Div>
      }
      body={<DropdownBody>
        <DropdownItem
          type="nav"
          to="/account"
          end
          iconLeft={SvgProfile}
          label={t("menu.account.profile")}
          onClick={() => setOpen(false)}
        />
        <DropdownItem
          type="action"
          iconLeft={SvgDeposit}
          label={t("menu.account.deposit")}
          onClick={() => {
            Dialogs.open("primary", <WalletModal initialAction="deposit" />);
            setOpen(false);
          }}
        />
        <DropdownItem
          type="action"
          iconLeft={SvgWithdraw}
          label={t("menu.account.withdraw")}
          onClick={() => {
            Dialogs.open("primary", <WalletModal initialAction="withdraw" />);
            setOpen(false);
          }}
        />
        <DropdownItem
          type="nav"
          iconLeft={SvgTransaction}
          label={t("menu.account.transactions")}
          to="/account/transactions"
          onClick={() => setOpen(false)}
        />
         <DropdownItem
          type="nav"
          iconLeft={SvgBets}
          label={t("account:gameHistory")}
          to="/account/game-history"
          onClick={() => setOpen(false)}
        />
        <DropdownItem
          type="nav"
          iconLeft={SvgAvatar}
          label={t("menu.account.avatar")}
          to="/avatar"
          onClick={() => setOpen(false)}
        />       
        <DropdownItem
          type="action"
          iconLeft={SvgLogout}
          label={t("menu.account.logout")}
          onClick={() => {
            Dialogs.open("secondary", <UserLogoutModal />);
            setOpen(false);
          }}
        />
      </DropdownBody>}
    />
  );
};

const UserMenuMobile = () => {

  const avatarIndex = useAppSelector((x) => x.user.avatarIndex);
  const avatarId = useAppSelector((x) => x.user.avatarId);

  return (<Div
    gap={4}
    flexCenter
    onClick={() => Dialogs.open("primary", <UserMenuModal />)}
    overflow="hidden"
  >
    <Div
      bg="black-hover"
      borderRadius={"full"}
    >
      <UserIcon
        avatarIndex={avatarIndex}
        avatarId={avatarId}
        width={"32px"}
      />
    </Div>
  </Div>);
};