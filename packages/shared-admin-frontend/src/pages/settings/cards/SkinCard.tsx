import { SiteSettingObject } from "@core/types/site/SiteSettingDocument";
import { SvgRifle } from "@client/svgs/common/SvgRifle";
import { EditOptions } from "#app/modals/setting-edit/SettingEditModal";
import { FieldCard } from "../FieldCard";
import { FieldSection } from "../FieldSection";

export const SkinCard = ({
  settings,
  onEdit,
}: {
  settings: SiteSettingObject;
  onEdit: (data: EditOptions) => void;
}) => {
  return (
    <FieldCard
      icon={SvgRifle}
      heading="Skins"
    >
      <FieldSection
        settings={settings}
        id="manualSkinWithdraw"
        label="Force Manual Withdraw"
        inputType="toggle"
        onEdit={onEdit}
      />
      <FieldSection
        settings={settings}
        id="skinWithdrawSingleMax"
        label="Auto Withdraw Single Max"
        inputType="decimal"
        onEdit={onEdit}
      />
      <FieldSection
        settings={settings}
        id="skinWithdrawDailyMax"
        label="Auto Withdraw Daily Max"
        inputType="decimal"
        onEdit={onEdit}
      />
    </FieldCard>
  );
};
