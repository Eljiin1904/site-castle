import { SiteSettingObject } from "@core/types/site/SiteSettingDocument";
import { SvgStar } from "@client/svgs/common/SvgStar";
import { EditOptions } from "#app/modals/setting-edit/SettingEditModal";
import { FieldCard } from "../FieldCard";
import { FieldSection } from "../FieldSection";

export const XpCard = ({
  settings,
  onEdit,
}: {
  settings: SiteSettingObject;
  onEdit: (data: EditOptions) => void;
}) => {
  return (
    <FieldCard
      icon={SvgStar}
      heading="XP"
    >
      <FieldSection
        settings={settings}
        id="gemRate"
        label="Gem Rate"
        inputType="decimal"
        onEdit={onEdit}
      />
      <FieldSection
        settings={settings}
        id="caseBattlesXpRate"
        label="Battles"
        inputType="decimal"
        onEdit={onEdit}
      />
      <FieldSection
        settings={settings}
        id="casesXpRate"
        label="Cases"
        inputType="decimal"
        onEdit={onEdit}
      />
      <FieldSection
        settings={settings}
        id="doubleXpRate"
        label="Double"
        inputType="decimal"
        onEdit={onEdit}
      />
      <FieldSection
        settings={settings}
        id="diceXpRate"
        label="Dice"
        inputType="decimal"
        onEdit={onEdit}
      />
      <FieldSection
        settings={settings}
        id="limboXpRate"
        label="Limbo"
        inputType="decimal"
        onEdit={onEdit}
      />
      <FieldSection
        settings={settings}
        id="minesXpRate"
        label="Mines"
        inputType="decimal"
        onEdit={onEdit}
      />
    </FieldCard>
  );
};
