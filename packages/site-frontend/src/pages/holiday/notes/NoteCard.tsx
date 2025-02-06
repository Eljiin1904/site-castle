import { Card } from "@client/comps/cards/Card";
import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { Vector } from "@client/comps/vector/Vector";
import "./NoteCard.scss";

export const NoteCard = ({
  heading,
  description,
  icon,
}: {
  heading: string;
  description: string;
  icon: Svg;
}) => {
  return (
    <Card
      className="NoteCard"
      px={16}
      py={12}
      gap={12}
      align="center"
      hover="border"
    >
      <Vector
        as={icon}
        size={32}
        color="light-green"
      />
      <Div
        fx
        column
        gap={4}
      >
        <Span
          weight="semi-bold"
          color="white"
        >
          {heading}
        </Span>
        <Span size={12}>{description}</Span>
      </Div>
    </Card>
  );
};
