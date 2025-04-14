import { CardSection } from "@client/comps/cards/CardSection";
import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { Tokens } from "@client/comps/tokens/Tokens";
import { Vector } from "@client/comps/vector/Vector";

export const StatCardSection = ({
  label,
  icon,
  tokens,
  count,
}: {
  label: string;
  icon: Svg;
  tokens?: number;
  count?: number;
}) => {
  return (
    <CardSection>
      <Div
        grow
        gap={12}
      >
        <Vector
          as={icon}
        />
        <Span>
          {label}
        </Span>
      </Div>
      {tokens !== undefined && <Tokens value={tokens} />}
      {count !== undefined && (
        <Span color="light-sand">
          {count}
        </Span>
      )}
    </CardSection>
  );
};
