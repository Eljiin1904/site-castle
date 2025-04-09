import { Fragment } from "react";
import { Button } from "@client/comps/button/Button";
import { Div } from "@client/comps/div/Div";
import { SvgCheckCircle } from "@client/svgs/common/SvgCheckCircle";
import { SvgInfoCircle } from "@client/svgs/common/SvgInfoCircle";
import { Dropdown } from "@client/comps/dropdown/Dropdown";
import { Dialogs } from "@client/services/dialogs";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { MinesInfoModal } from "#app/modals/mines/MinesInfoModal";
import { FairnessSeedModal } from "#app/modals/fairness/FairnessSeedModal";
import { VolumeDropdown } from "#app/comps/sounds/VolumeDropdown";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { SvgEllipsisV } from "@client/svgs/common/SvgEllipsisV";


export const MinesHeader = () => {
  const {t} = useTranslation();
  const mainLayout = useAppSelector((x) => x.style.mainLayout);
  const small = mainLayout === "mobile";
  return (
    <Div
      position={small ? "relative" : "absolute"}
      top={0}
      right={0}
      zIndex={2}
      px={small ? 20 : 16}
      pt={small ? 20 : 16}
      pb={small ? 0 : 16}
    >
      <Div
        fx
        align="flex-start"
        justify="flex-end"
        gap={8}
      >
        {!small && <Fragment>
          <Button
            kind="tertiary-white-overlay"
            icon={SvgCheckCircle}
            label={t("menu.fairness")}
            onClick={() => Dialogs.open("primary", <FairnessSeedModal historyTo="/fairness/mines" />)}
          />
          <Button
            kind="tertiary-white-overlay"
            icon={SvgInfoCircle}
            onClick={() => Dialogs.open("primary", <MinesInfoModal />)}
          />
        </Fragment>}
        <VolumeDropdown prefix="mines" kind="tertiary-white-overlay" />
        {small && <MinesHeaderMenu />}
      </Div>
    </Div>
  );
};

const MinesHeaderMenu = () => {
  const {t} = useTranslation();
  return (<Dropdown
        type="menu"
        button={
          <Button
            kind="tertiary-white-overlay"
            icon={SvgEllipsisV}
          />
        }
        options={[
          {
            type: "action",
            label: t("menu.fairness"),
            iconLeft: SvgCheckCircle,
            onClick: () => Dialogs.open("primary", <FairnessSeedModal historyTo="/fairness/mines" />)
          },
          {
            type: "action",
            label: t("common:rules"),
            iconLeft: SvgInfoCircle,
            onClick: () => Dialogs.open("primary", <MinesInfoModal />)
          }
        ]}
      />)
};
