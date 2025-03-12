import { SiteSettingObject } from "@core/types/site/SiteSettingDocument";
import { SvgFilter } from "@client/svgs/common/SvgFilter";
import { EditOptions } from "#app/modals/setting-edit/SettingEditModal";
import { FieldCard } from "../FieldCard";
import { FieldSection } from "../FieldSection";

export const ThresholdCard = ({
  settings,
  onEdit,
}: {
  settings: SiteSettingObject;
  onEdit: (data: EditOptions) => void;
}) => {
  return (
    <FieldCard
      icon={SvgFilter}
      heading="Thresholds"
    >
      <FieldSection
        settings={settings}
        id="activityThreshold"
        label="Activity Threshold"
        inputType="decimal"
        onEdit={onEdit}
      />
      <FieldSection
        settings={settings}
        id="betHighrollerThreshold"
        label="Bet Highroller Tokens"
        inputType="decimal"
        onEdit={onEdit}
      />
      <FieldSection
        settings={settings}
        id="chatGeneralRequirement"
        label="Chat General Deposit Tokens"
        inputType="decimal"
        onEdit={onEdit}
      />
      <FieldSection
        settings={settings}
        id="chatHighrollerRequirement"
        label="Chat Highroller Level"
        inputType="integer"
        onEdit={onEdit}
      />
    </FieldCard>
  );
};
