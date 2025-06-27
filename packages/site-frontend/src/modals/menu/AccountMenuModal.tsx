import { Modal } from "@client/comps/modal/Modal";
import { ModalHeader } from "@client/comps/modal/ModalHeader";
import { Dialogs } from "@client/services/dialogs";
import { Div } from "@client/comps/div/Div";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { MenuItem } from "#app/app/menu/panel/MenuItem";
import { Fragment } from "react";
import { MenuSeparator } from "#app/app/menu/panel/MenuSeparator";

export const AccountMenuModal = ({items}: {
  items: {
    label: string;
    icon?: any;
    to: string;
  }[];
}) => {
  
  const { t } = useTranslation(["account"]);

  return (
    <Modal
      width="sm"
      onBackdropClick={() => Dialogs.close("primary")}
    >
      <ModalHeader
        heading={t("title")}
        onCloseClick={() => Dialogs.close("primary")}
      />
      <Div fx column mt={20} onClick={() => Dialogs.close("primary")}>
        {items.map((item) => (<Fragment>
          <MenuItem
            icon={item.icon}
            label={item.label}
            key={item.label}
            to={item.to}
            showLabel={true}
            type="nav"
            end={true}
          />
          <MenuSeparator />
        </Fragment>))}
        </Div>
    </Modal>
  );
};
