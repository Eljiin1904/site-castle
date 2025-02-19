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
import { Users } from "#app/services/users";
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


export const UserMenu = () => {
  const [open, setOpen] = useState(false);
  const username = useAppSelector((x) => x.user.username);
  const avatarIndex = useAppSelector((x) => x.user.avatarIndex);
  const avatarId = useAppSelector((x) => x.user.avatarId);
  const reloadsEnabled = useAppSelector((x) => x.user.meta.reloadsEnabled);
  const { level, levelProgress, levelGoal } = useUserLevel();

  return (
    <Dropdown
      className="user-dropdown"
      type="custom"
      menuWidth="142px"
      forceAlign="right"
      open={open}
      onToggle={setOpen}
      button={
        <UserIcon
          avatarIndex={avatarIndex}
          avatarId={avatarId}
          width="36px"
          hover="highlight"
        />
      }
      body={
        <DropdownBody pb={6}>
          <Div
            column
            p={16}
            gap={16}
          >
            <Div>
              <UserIcon
                avatarIndex={avatarIndex}
                avatarId={avatarId}
                width="46px"
              />
              <Div
                column
                ml={16}
              >
                <Span
                  family="title"
                  weight="bold"
                  size={16}
                  color="white"
                >
                  {username}
                </Span>
                <Div
                  align="center"
                  mt={4}
                >
                  <Img
                    type="png"
                    path={Users.getLevelBadge(level)}
                    width="20px"
                  />
                  <Span
                    size={12}
                    weight="medium"
                    color="gray"
                    ml={6}
                  >
                    {`Level ${level}`}
                  </Span>
                </Div>
              </Div>
            </Div>
            <ProgressBar
              height={4}
              progress={levelProgress / levelGoal}
            />
          </Div>
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
            type="action"
            iconLeft={SvgBets}
            label="Bets"
            onClick={() => {
              Dialogs.open("primary", <WalletModal initialAction="withdraw" />);
              setOpen(false);
            }}
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
