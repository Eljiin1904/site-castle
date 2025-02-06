import classNames from "classnames";
import { CaseBattleModifier } from "@core/types/case-battles/CaseBattleModifier";
import { CaseBattleMode } from "@core/types/case-battles/CaseBattleMode";
import { Card } from "@client/comps/cards/Card";
import { Div } from "@client/comps/div/Div";
import { Heading } from "@client/comps/heading/Heading";
import { Span } from "@client/comps/span/Span";
import { Toggle } from "@client/comps/toggle/Toggle";
import { Vector } from "@client/comps/vector/Vector";
import { CaseBattles } from "#app/services/case-battles";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import "./ModifierCard.scss";

export const ModifierCard = ({
  mode,
  enabled,
  modifier,
  onEnable,
  onDisable,
}: {
  mode: CaseBattleMode | undefined;
  enabled: boolean;
  modifier: CaseBattleModifier;
  onEnable: () => void;
  onDisable: () => void;
}) => {
  const layout = useAppSelector((x) => x.style.mainLayout);
  const modifiers = useAppSelector((x) => x.battleCreate.modifiers);
  const small = layout === "mobile" || layout === "tablet";
  const info = CaseBattles.getModifierInfo(modifier);
  const icon = CaseBattles.getModifierIcon(modifier);

  const isDisabled =
    (modifier === "first-draw" && modifiers.includes("final-draw")) ||
    (modifier === "final-draw" && modifiers.includes("first-draw"));

  return (
    <Card
      className={classNames("ModifierCard", modifier, { enabled })}
      p={small ? 12 : 16}
      gap={small ? 12 : 16}
    >
      <Vector
        className="icon"
        as={icon}
        size={small ? 28 : 32}
      />
      <Div
        grow
        column
        gap={8}
      >
        <Heading
          className="title"
          size={small ? 13 : 15}
        >
          {info.label}
        </Heading>
        <Span size={small ? 12 : 13}>{info.description}</Span>
      </Div>
      <Div center>
        <Toggle
          className="toggle"
          value={enabled}
          disabled={!mode || !info.modes.includes(mode) || isDisabled}
          onChange={(x) => (x ? onEnable() : onDisable())}
        />
      </Div>
    </Card>
  );
};
