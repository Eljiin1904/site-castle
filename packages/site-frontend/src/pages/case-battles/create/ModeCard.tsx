import { ButtonGroup } from "@client/comps/button/ButtonGroup";
import { Card } from "@client/comps/cards/Card";
import { Div } from "@client/comps/div/Div";
import { Heading } from "@client/comps/heading/Heading";
import { Vector } from "@client/comps/vector/Vector";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import "./ModeCard.scss";

export const ModeCard = ({
  icon,
  heading,
  options,
  value,
  setValue,
}: {
  icon: Svg;
  heading: string;
  options: string[];
  value: number;
  setValue: (x: number) => void;
}) => {
  const layout = useAppSelector((x) => x.style.mainLayout);
  const small = layout === "mobile" || layout === "tablet";
  const enabled = value !== -1;

  return (
    <Card
      className="ModeCard"
      p={small ? 12 : 16}
      gap={small ? 12 : 16}
      borderColor={enabled ? "yellow" : undefined}
    >
      <Vector
        className="mode-icon"
        as={icon}
        size={small ? 28 : 32}
        color={enabled ? "yellow" : "gray"}
      />
      <Div
        column
        gap={8}
      >
        <Heading
          size={small ? 13 : 15}
          color={enabled ? "yellow" : "white"}
        >
          {heading}
        </Heading>
        <ButtonGroup
          className="button-group"
          size="xs"
          options={options}
          value={value}
          setValue={setValue}
        />
      </Div>
    </Card>
  );
};
