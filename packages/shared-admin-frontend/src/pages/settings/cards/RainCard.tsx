import { SiteSettingObject } from "@core/types/site/SiteSettingDocument";
import { SvgRain } from "@client/svgs/common/SvgRain";
import { EditOptions } from "#app/modals/setting-edit/SettingEditModal";
import { FieldCard } from "../FieldCard";
import { FieldSection } from "../FieldSection";

export const RainCard = ({
  settings,
  onEdit,
}: {
  settings: SiteSettingObject;
  onEdit: (data: EditOptions) => void;
}) => {
  return (
    <FieldCard
      icon={SvgRain}
      heading="Rain"
    >
      <FieldSection
        settings={settings}
        id="rainTaxRate"
        label="Tax Rate"
        inputType="decimal-4"
        onEdit={onEdit}
      />
      <FieldSection
        settings={settings}
        id="rainBaseAmount"
        label="Base Amount"
        inputType="decimal"
        onEdit={onEdit}
      />
      <FieldSection
        settings={settings}
        id="rainMinInterval"
        label="Min Interval"
        inputType="integer"
        onEdit={onEdit}
      />
      <FieldSection
        settings={settings}
        id="rainMaxInterval"
        label="Max Interval"
        inputType="integer"
        onEdit={onEdit}
      />
      <FieldSection
        settings={settings}
        id="rainDuration"
        label="Duration"
        inputType="integer"
        onEdit={onEdit}
      />
      <FieldSection
        settings={settings}
        id="rainWagerRequirement"
        label="Wager Requirement"
        inputType="integer"
        onEdit={onEdit}
      />
    </FieldCard>
  );
};
