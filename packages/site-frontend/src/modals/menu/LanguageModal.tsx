import { Modal } from "@client/comps/modal/Modal";
import { ModalHeader } from "@client/comps/modal/ModalHeader";
import { Dialogs } from "@client/services/dialogs";
import { Div } from "@client/comps/div/Div";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { MenuItem } from "#app/app/menu/panel/MenuItem";
import { MenuSeparator } from "#app/app/menu/panel/MenuSeparator";

export const LanguageModal = () => {
  
  const {t, i18n} = useTranslation();

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    Dialogs.close("secondary");
  };

  return (
    <Modal
      width="sm"
      onBackdropClick={() => Dialogs.close("secondary")}
    >
      <ModalHeader
        heading={t("menu.language")}
        onCloseClick={() => Dialogs.close("secondary")}
      />
      <Div fx column mt={20}>
        <MenuItem
          label={`English`}
          onClick={() => changeLanguage("en")}
          showLabel={true}
          type="action"
        />
        <MenuSeparator />
        <MenuItem
          label={`Español`}
          onClick={() => changeLanguage("es")}
          showLabel={true}
          type="action"
        />
        </Div>
    </Modal>
  );
};
