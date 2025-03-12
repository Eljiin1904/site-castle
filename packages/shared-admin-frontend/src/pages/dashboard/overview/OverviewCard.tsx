import { Card } from "@client/comps/cards/Card";
import { CardSection } from "@client/comps/cards/CardSection";
import { Heading } from "@client/comps/heading/Heading";
import { Vector } from "@client/comps/vector/Vector";

export function OverviewCard({
  icon,
  heading,
  children,
}: {
  icon: Svg;
  heading: string;
  children: any;
}) {
  return (
    <Card column>
      <CardSection
        position="header"
        py={12}
        gap={8}
      >
        <Vector
          as={icon}
          size={16}
        />
        <Heading size={15}>{heading}</Heading>
      </CardSection>
      {children}
    </Card>
  );
}
