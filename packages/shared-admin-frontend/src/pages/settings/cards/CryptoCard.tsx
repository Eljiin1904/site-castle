import { SiteSettingObject } from "@core/types/site/SiteSettingDocument";
import { SvgCrypto } from "@client/svgs/common/SvgCrypto";
import { EditOptions } from "#app/modals/setting-edit/SettingEditModal";
import { FieldCard } from "../FieldCard";
import { FieldSection } from "../FieldSection";

export const CryptoCard = ({
  settings,
  onEdit,
}: {
  settings: SiteSettingObject;
  onEdit: (data: EditOptions) => void;
}) => {
  return (
    <FieldCard
      icon={SvgCrypto}
      heading="Crypto"
    >
      <FieldSection
        settings={settings}
        id="manualCryptoWithdraw"
        label="Force Manual Withdraw"
        inputType="toggle"
        onEdit={onEdit}
      />
      <FieldSection
        settings={settings}
        id="cryptoWithdrawSingleMax"
        label="Auto Withdraw Single Max"
        inputType="decimal"
        onEdit={onEdit}
      />
      <FieldSection
        settings={settings}
        id="cryptoWithdrawDailyMax"
        label="Auto Withdraw Daily Max"
        inputType="decimal"
        onEdit={onEdit}
      />
    </FieldCard>
  );
};
