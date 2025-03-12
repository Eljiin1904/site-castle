import { SiteSettingObject } from "@core/types/site/SiteSettingDocument";
import { Div } from "@client/comps/div/Div";
import { EditOptions } from "#app/modals/setting-edit/SettingEditModal";
import { GeneralCard } from "./cards/GeneralCard";
import { CryptoCard } from "./cards/CryptoCard";
import { XpCard } from "./cards/XpCard";
import { TogglesCard } from "./cards/TogglesCard";
import { ThresholdCard } from "./cards/ThresholdCard";
import { RainCard } from "./cards/RainCard";
import { SkinCard } from "./cards/SkinCard";

export const FieldGrid = (props: {
  settings: SiteSettingObject;
  onEdit: (data: EditOptions) => void;
}) => {
  return (
    <Div
      fx
      gap={16}
    >
      <Div
        fx
        column
        gap={16}
      >
        <GeneralCard {...props} />
        <XpCard {...props} />
        <ThresholdCard {...props} />
      </Div>
      <Div
        fx
        column
        gap={16}
      >
        <CryptoCard {...props} />
        <SkinCard {...props} />
        <RainCard {...props} />
      </Div>
      <Div
        fx
        column
        gap={16}
      >
        <TogglesCard {...props} />
      </Div>
    </Div>
  );
};
