
import { Modal } from "@client/comps/modal/Modal";
import { ModalHeader } from "@client/comps/modal/ModalHeader";
import { Dialogs } from "@client/services/dialogs";
import { Div } from "@client/comps/div/Div";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { SvgUser } from "@client/svgs/common/SvgUser";
import { MenuItem } from "#app/app/menu/panel/MenuItem";
import { MenuSeparator } from "#app/app/menu/panel/MenuSeparator";
import { SvgLogout } from "#app/svgs/common/SvgLogout";
import { SvgBets } from "#app/svgs/common/SvgBets";
import { SvgAvatar } from "#app/svgs/common/SvgAvatar";
import { SvgTransaction } from "@client/svgs/common/SvgTransaction";
import { SvgWithdraw } from "@client/svgs/common/SvgWithdraw";
import { SvgDeposit } from "@client/svgs/common/SvgDeposit";
import { UserLogoutModal } from "../user/UserLogoutModal";
import { SvgGlobe } from "@client/svgs/common/SvgGlobe";
import { LanguageModal } from "./LanguageModal";
import { WalletModal } from "../wallet/WalletModal";
import { useAppSelector } from "#app/hooks/store/useAppSelector";

export const UserMenuModal = () => {
  
  const auth = useAppSelector((x) => x.user.authenticated);
  const {t, i18n} = useTranslation();
  if (!auth) {
    return null;
  }
  return (
    <Modal
      width="sm"
      onBackdropClick={() => Dialogs.close("primary")}
    >
      <ModalHeader
        heading={t("menu.account.title")}
        onCloseClick={() => Dialogs.close("primary")}
      />
      <Div fx column mt={20} onClick={() => Dialogs.close("primary")}>
        <MenuItem
          icon={SvgUser}
          label={t("menu.account.profile")}
          to="/account"
          showLabel={true}
          type="nav"
        />
        <MenuSeparator />
        <MenuItem
          icon={SvgDeposit}
          label={t("menu.account.deposit")}
          onClick={(e:any) =>  {Dialogs.open("primary",  <WalletModal initialAction="withdraw" />); e.stopPropagation();}}
          showLabel={true}
          type="action"
        />
        <MenuSeparator />
        <MenuItem
          icon={SvgWithdraw}
          label={t("menu.account.withdraw")}
          onClick={(e:any) =>  {Dialogs.open("primary",  <WalletModal initialAction="withdraw" />); e.stopPropagation();}}
          showLabel={true}
          type="action"
        />
        <MenuSeparator />
        <MenuItem
          icon={SvgTransaction}
          label={t("menu.account.transactions")}
          to="/transactions"
          showLabel={true}
          type="nav"
        />
         <MenuSeparator />
        <MenuItem
          icon={SvgAvatar}
          label={t("menu.account.avatar")}
          to="/withdraw"
          showLabel={true}
          type="nav"
        />
        <MenuSeparator />
        <MenuItem
          icon={SvgBets}
          label={t("menu.account.bets")}
          to="/bets"
          showLabel={true}
          type="nav"
        />
        <MenuSeparator />
        <MenuItem
          icon={SvgGlobe}
          label={i18n.language?.toUpperCase()}
          onClick={(e:any) =>  {Dialogs.open("secondary", <LanguageModal />); e.stopPropagation();}}
          showLabel={true}
          type="action"
        />
        <MenuSeparator />
        <MenuItem
          icon={SvgLogout}
          label={t("menu.account.logout")}
          onClick={(e:any) =>  {Dialogs.open("secondary", <UserLogoutModal />); e.stopPropagation();}}
          showLabel={true}
          type="action"
        />
        </Div>
    </Modal>
  );
};
