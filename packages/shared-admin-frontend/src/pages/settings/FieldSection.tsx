import {
  SiteSettingId,
  SiteSettingObject,
  SiteSettingValue,
} from "@core/types/site/SiteSettingDocument";
import { CardSection } from "@client/comps/cards/CardSection";
import { Span } from "@client/comps/span/Span";
import {
  EditInputType,
  EditOptions,
} from "#app/modals/setting-edit/SettingEditModal";
import "./FieldSection.scss";

export const FieldSection = ({
  settings,
  id,
  label,
  inputType,
  onEdit,
}: {
  settings: SiteSettingObject;
  id: SiteSettingId;
  label: string;
  inputType: EditInputType;
  onEdit: (data: EditOptions) => void;
}) => {
  const value = settings[id] as SiteSettingValue;

  let color: Color;

  if (value === undefined) {
    color = "light-gray";
  } else if (value === "") {
    color = "light-gray";
  } else if (typeof value === "boolean") {
    color = value ? "light-green" : "light-red";
  } else {
    color = "light-blue";
  }

  let field: string | number;

  if (value === undefined) {
    field = "Undefined";
  } else if (value === "") {
    field = "None";
  } else if (typeof value === "number") {
    if (inputType === "decimal") {
      field = value.toLocaleString("en-US", {
        minimumFractionDigits: 2,
      });
    } else {
      field = value.toString();
    }
  } else if (typeof value === "boolean") {
    field = value ? "Enabled" : "Disabled";
  } else {
    field = value;
  }

  return (
    <CardSection
      className="FieldSection"
      onClick={() => onEdit({ label, id, value, inputType })}
    >
      <Span
        flexGrow
        weight="medium"
        color="white"
      >
        {label}
      </Span>
      <Span
        color={color}
        weight="semi-bold"
      >
        {field}
      </Span>
    </CardSection>
  );
};
