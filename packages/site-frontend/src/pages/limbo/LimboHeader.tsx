import { Button } from "@client/comps/button/Button";
import { Div } from "@client/comps/div/Div";
import { SvgCheckCircle } from "@client/svgs/common/SvgCheckCircle";
import { SvgInfoCircle } from "@client/svgs/common/SvgInfoCircle";
import { Dropdown } from "@client/comps/dropdown/Dropdown";
import { Dialogs } from "@client/services/dialogs";
import { VolumeDropdown } from "#app/comps/sounds/VolumeDropdown";
import { LimboInfoModal } from "#app/modals/limbo/LimboInfoModal";
import { FairnessSeedModal } from "#app/modals/fairness/FairnessSeedModal";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { SvgEllipsisV } from "@client/svgs/common/SvgEllipsisV";
import { Fragment } from "react/jsx-runtime";
import { LimboStatus } from "./LimboStatus";

export const LimboHeader = () => {
  const { t } = useTranslation();
  const mainLayout = useAppSelector((x) => x.style.mainLayout);
  const small = mainLayout === "mobile";
  return (
    <Div
      position="absolute"
      top={0}
      right={0}
      zIndex={2}
      px={small ? 20 : 16}
      py={16}
      fx
      width={"full"}
    >
      <Div
        fx
        align="flex-start"
        justify="flex-end"
        gap={8}
      >
        {!small && (
          <Fragment>
            <Button
              kind="tertiary-black-overlay"
              icon={SvgCheckCircle}
              label={t("menu.fairness")}
              onClick={() =>
                Dialogs.open("primary", <FairnessSeedModal historyTo="/fairness/limbo" />)
              }
            />
            <Button
              kind="tertiary-black-overlay"
              icon={SvgInfoCircle}
              onClick={() => Dialogs.open("primary", <LimboInfoModal />)}
            />
          </Fragment>
        )}
        <VolumeDropdown prefix="dice" />
        {small && <LimboHeaderMenu />}
      </Div>
    </Div>
  );
  // );
};

const LimboHeaderMenu = () => {
  const { t } = useTranslation();
  return (
    <Dropdown
      type="menu"
      button={
        <Button
          kind="tertiary-black-overlay"
          icon={SvgEllipsisV}
        />
      }
      options={[
        {
          type: "action",
          label: t("menu.fairness"),
          iconLeft: SvgCheckCircle,
          onClick: () => Dialogs.open("primary", <FairnessSeedModal historyTo="/fairness/limbo" />),
        },
        {
          type: "action",
          label: t("common:rules"),
          iconLeft: SvgInfoCircle,
          onClick: () => Dialogs.open("primary", <LimboInfoModal />),
        },
      ]}
    />
  );
};

