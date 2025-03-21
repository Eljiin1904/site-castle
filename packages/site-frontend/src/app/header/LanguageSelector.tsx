import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { Div } from "@client/comps/div/Div";
import { Dropdown } from "@client/comps/dropdown/Dropdown";
import { DropdownBody } from "@client/comps/dropdown/DropdownBody";
import { DropdownItem } from "@client/comps/dropdown/DropdownItem";
import { Span } from "@client/comps/span/Span";
import { Vector } from "@client/comps/vector/Vector";
import { SvgGlobe } from "@client/svgs/common/SvgGlobe";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { useState } from "react";

export const LanguageSelector = () => {

  const layout = useAppSelector((x) => x.style.bodyLayout);
  const [open, setOpen] = useState(false);
  const {t, i18n} = useTranslation();

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    setOpen(false);
  };

  if (["mobile"].includes(layout)) {
    return null;
  }

  return (<Dropdown
    className="LanguageDropdown"
    type="custom"
    menuWidth="102px"
    forceAlign="right"
    open={open}
    onToggle={setOpen}
    button={<Div 
      gap={8}
      flexCenter
      cursor="pointer"
      >
        <Vector as={SvgGlobe} size={16} color={open ? `sand`: `dark-sand`} />
        <Span color={open ? `sand`: `dark-sand`} fontWeight="medium" textTransform="uppercase">{i18n.language}</Span>
      </Div>}
    body={
      <DropdownBody>
        <DropdownItem
          type="action"
          label="English"
          active={i18n.language === 'en'}
          onClick={() => changeLanguage('en')}
        />
        <DropdownItem
          type="action"
          label="Español"
          active={i18n.language === 'es'}
          onClick={() => changeLanguage('es')}
        />
      </DropdownBody>
    }
  />);
};



//   return (
//     <Dropdown
//       className="user-dropdown"
//       type="custom"
//       menuWidth="142px"
//       forceAlign="right"
//       open={open}
//       onToggle={setOpen}
//       button={
//         <Div
//         gap={8}
//         flexCenter
//       >
//         <Div
//           bg="black-hover"
//           borderRadius={"full"}
//           borderColor={open ? "sand": "black-hover"}
//           borderWidth={1}
//           border={!small}
//           p={small ? 0 : 4}
//         >
//           <UserIcon
//             avatarIndex={avatarIndex}
//             avatarId={avatarId}
//             width={small ? "32px" : "46px"}
//           />
//         </Div>
//         {!small && <Vector
//             className="icon left"
//             as={open ? SvgArrowRight: SvgArrowRight}
//             size={12}
//             style={{transform: open ? "rotate(180deg)" : "rotate(0deg)"}}
//             color="dark-sand"
//           />}
//       </Div>
//       }
//       body={
//         <DropdownBody>
//           <DropdownItem
//             type="nav"
//             to="/account"
//             end
//             iconLeft={SvgWallet}
//             label="Wallet"
//             onClick={() => setOpen(false)}
//           />
//           <DropdownItem
//             type="nav"
//             to="/account"
//             end
//             iconLeft={SvgProfile}
//             label="Profile"
//             onClick={() => setOpen(false)}
//           />
//           <DropdownItem
//             type="action"
//             iconLeft={SvgAvatar}
//             label="Avatar"
//             onClick={() => {
//               Dialogs.open("primary", <WalletModal initialAction="deposit" />);
//               setOpen(false);
//             }}
//           />
//           <DropdownItem
//             type="nav"
//             iconLeft={SvgBets}
//             label="Bets"
//             to="/bets"
//             onClick={() => setOpen(false)}
//           />
//           <DropdownItem
//             type="action"
//             iconLeft={SvgVIP}
//             label="VIP"
//             onClick={() => {
//               Dialogs.open("primary", <VaultModal />);
//               setOpen(false);
//             }}
//           />
//           {reloadsEnabled && (
//             <DropdownItem
//               type="action"
//               iconLeft={SvgSupport}
//               label="Support"
//               onClick={async () => {
//                 Dialogs.open("primary", <AffiliateReloadModal />);
//                 setOpen(false);
//               }}
//             />
//           )}
//           <DropdownItem
//             type="nav"
//             to="/account/transactions"
//             iconLeft={SvgFAQs}
//             label="FAQ's"
//             onClick={() => setOpen(false)}
//           />
//           <DropdownItem
//             type="action"
//             iconLeft={SvgLogout}
//             label="Logout"
//             onClick={() => {
//               Dialogs.open("secondary", <UserLogoutModal />);
//               setOpen(false);
//             }}
//           />
//         </DropdownBody>
//       }
//     />
//   );

{/* <Button size="sm" kind="primary-yellow" onClick={() => i18n.changeLanguage('en')} label="en"></Button>
      <Button size="sm" kind="primary-yellow" onClick={() => i18n.changeLanguage('es')} label="es"></Button> */}
      