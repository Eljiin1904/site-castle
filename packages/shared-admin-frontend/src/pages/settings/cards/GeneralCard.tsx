import { SiteSettingObject } from "@core/types/site/SiteSettingDocument";
import { SvgInfoCircle } from "@client/svgs/common/SvgInfoCircle";
import { EditOptions } from "#app/modals/setting-edit/SettingEditModal";
import { FieldCard } from "../FieldCard";
import { FieldSection } from "../FieldSection";

export const GeneralCard = ({
  settings,
  onEdit,
}: {
  settings: SiteSettingObject;
  onEdit: (data: EditOptions) => void;
}) => {
  return (
    <FieldCard
      icon={SvgInfoCircle}
      heading="General"
    >
      <FieldSection
        settings={settings}
        id="version"
        label="Version"
        inputType="text"
        onEdit={onEdit}
      />
      <FieldSection
        settings={settings}
        id="maintenance"
        label="Maintenance"
        inputType="toggle"
        onEdit={onEdit}
      />
      <FieldSection
        settings={settings}
        id="announcement"
        label="Announcement"
        inputType="textarea"
        onEdit={onEdit}
      />
    </FieldCard>
  );
};
