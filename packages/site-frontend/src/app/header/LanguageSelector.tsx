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
        <Span color={open ? `sand`: `dark-sand`} textTransform="uppercase">{i18n.language}</Span>
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