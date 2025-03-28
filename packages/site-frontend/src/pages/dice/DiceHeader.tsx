import { Button } from "@client/comps/button/Button";
import { Div } from "@client/comps/div/Div";
import { SvgCheckCircle } from "@client/svgs/common/SvgCheckCircle";
import { SvgInfoCircle } from "@client/svgs/common/SvgInfoCircle";
import { Dialogs } from "@client/services/dialogs";
import { VolumeDropdown } from "#app/comps/sounds/VolumeDropdown";
import { DiceInfoModal } from "#app/modals/dice/DiceInfoModal";
import { FairnessSeedModal } from "#app/modals/fairness/FairnessSeedModal";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { useTranslation } from "@core/services/internationalization/internationalization";

export const DiceHeader = () => {
  const {t} = useTranslation();
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
    >
      <Div
        fx
        align="flex-start"
        justify="flex-end"
        gap={8}
      >
        <Button
          kind="tertiary-black-overlay"
          icon={SvgCheckCircle}
          label={t("menu.fairness")}
          onClick={() => Dialogs.open("primary", <FairnessSeedModal historyTo="/fairness/dice" />)}
        />
        <Button
           kind="tertiary-black-overlay"
          icon={SvgInfoCircle}
          onClick={() => Dialogs.open("primary", <DiceInfoModal />)}
        />
        <VolumeDropdown prefix="dice" />
      </Div>
    </Div>
  );
};
