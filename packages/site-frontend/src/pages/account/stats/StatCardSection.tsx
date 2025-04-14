import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";
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
  borderBottom = true,
}: {
  label: string;
  icon: Svg;
  tokens?: number;
  count?: number;
  borderBottom?: boolean;
}) => {
  const small = useIsMobileLayout();
  return (
    <CardSection px={small ? 20 : 24} py={0} position="none">
      <Div fx py={16} borderBottom={borderBottom} borderColor="brown-4">
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
      </Div>
    </CardSection>
  );
};
