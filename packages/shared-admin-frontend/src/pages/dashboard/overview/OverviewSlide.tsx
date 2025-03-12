import { CardSection } from "@client/comps/cards/CardSection";
import { Span } from "@client/comps/span/Span";

export const OverviewSlide = ({
  label,
  value,
  color = "gray",
}: {
  label: string;
  value: string | number;
  color?: Color;
}) => {
  return (
    <CardSection
      py={10}
      borderColor="brown-4"
    >
      <Span
        flexGrow
        color={color}
      >
        {label}
      </Span>
      <Span color={color}>{value}</Span>
    </CardSection>
  );
};
