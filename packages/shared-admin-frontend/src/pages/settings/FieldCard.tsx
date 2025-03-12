import { Card } from "@client/comps/cards/Card";
import { CardSection } from "@client/comps/cards/CardSection";
import { Heading } from "@client/comps/heading/Heading";
import { Vector } from "@client/comps/vector/Vector";

export const FieldCard = ({
  heading,
  icon,
  children,
}: {
  heading: string;
  icon: Svg;
  children: any;
}) => {
  return (
    <Card column>
      <CardSection
        position="header"
        gap={8}
      >
        <Vector
          as={icon}
          size={16}
        />
        <Heading>{heading}</Heading>
      </CardSection>
      {children}
    </Card>
  );
};
