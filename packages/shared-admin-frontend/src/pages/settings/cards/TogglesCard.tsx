import { SiteSettingObject } from "@core/types/site/SiteSettingDocument";
import { SvgToggleOn } from "@client/svgs/common/SvgToggleOn";
import { EditOptions } from "#app/modals/setting-edit/SettingEditModal";
import { FieldCard } from "../FieldCard";
import { FieldSection } from "../FieldSection";

export const TogglesCard = ({
  settings,
  onEdit,
}: {
  settings: SiteSettingObject;
  onEdit: (data: EditOptions) => void;
}) => {
  return (
    <FieldCard
      icon={SvgToggleOn}
      heading="Feature Toggles"
    >
      <FieldSection
        settings={settings}
        id="cryptoWithdrawsEnabled"
        label="Crypto Withdraws"
        inputType="toggle"
        onEdit={onEdit}
      />
      <FieldSection
        settings={settings}
        id="skinDepositsEnabled"
        label="Skin Deposits"
        inputType="toggle"
        onEdit={onEdit}
      />
      <FieldSection
        settings={settings}
        id="skinWithdrawsEnabled"
        label="Skin Withdraws"
        inputType="toggle"
        onEdit={onEdit}
      />
      <FieldSection
        settings={settings}
        id="tippingEnabled"
        label="Tipping"
        inputType="toggle"
        onEdit={onEdit}
      />
      <FieldSection
        settings={settings}
        id="affiliatesEnabled"
        label="Affiliates"
        inputType="toggle"
        onEdit={onEdit}
      />
      <FieldSection
        settings={settings}
        id="rewardsEnabled"
        label="Rewards"
        inputType="toggle"
        onEdit={onEdit}
      />
      <FieldSection
        settings={settings}
        id="rainEnabled"
        label="Rain"
        inputType="toggle"
        onEdit={onEdit}
      />
      <FieldSection
        settings={settings}
        id="chatEnabled"
        label="Chat"
        inputType="toggle"
        onEdit={onEdit}
      />
      <FieldSection
        settings={settings}
        id="caseBattlesEnabled"
        label="Battles"
        inputType="toggle"
        onEdit={onEdit}
      />
      <FieldSection
        settings={settings}
        id="casesEnabled"
        label="Cases"
        inputType="toggle"
        onEdit={onEdit}
      />
      <FieldSection
        settings={settings}
        id="doubleEnabled"
        label="Double"
        inputType="toggle"
        onEdit={onEdit}
      />
      <FieldSection
        settings={settings}
        id="diceEnabled"
        label="Dice"
        inputType="toggle"
        onEdit={onEdit}
      />
      <FieldSection
        settings={settings}
        id="limboEnabled"
        label="Limbo"
        inputType="toggle"
        onEdit={onEdit}
      />
      <FieldSection
        settings={settings}
        id="minesEnabled"
        label="Mines"
        inputType="toggle"
        onEdit={onEdit}
      />
      <FieldSection
        settings={settings}
        id="blackjackEnabled"
        label="Blackjack"
        inputType="toggle"
        onEdit={onEdit}
      />
      <FieldSection
        settings={settings}
        id="blackjackLuckyLadiesEnabled"
        label="Lucky Ladies"
        inputType="toggle"
        onEdit={onEdit}
      />
      <FieldSection
        settings={settings}
        id="blackjackPerfectPairsEnabled"
        label="Perfect Pairs"
        inputType="toggle"
        onEdit={onEdit}
      />
      <FieldSection
        settings={settings}
        id="blackjackBlackjack15xEnabled"
        label="Blackjack 15x"
        inputType="toggle"
        onEdit={onEdit}
      />
      <FieldSection
        settings={settings}
        id="blackjack213Enabled"
        label="21+3"
        inputType="toggle"
        onEdit={onEdit}
      />
    </FieldCard>
  );
};
