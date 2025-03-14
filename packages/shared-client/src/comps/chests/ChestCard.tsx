import { FC } from "react";
import { ChestDocument } from "@core/types/chests/ChestDocument";
import { BasicChest } from "@core/types/chests/BasicChest";
import { Card } from "../cards/Card";
import { Div, DivProps } from "../div/Div";
import { Img } from "../img/Img";
import { Span } from "../span/Span";
import { Tokens } from "../tokens/Tokens";
import "./ChestCard.scss";

export type ChestCardProps = DivProps & {
  chest: BasicChest | ChestDocument;
};

export const ChestCard: FC<ChestCardProps> = ({
  chest,
  children,
  ...forwardProps
}) => {
  
  const chestImageId = chest.imageId;
  return (
    <Card
      className="ChestCard"
      column
      align="center"
      fx={undefined}
      {...forwardProps}
    >
      <Div
        className="image-ctn"
        center
      >
        <Img
          type="png"
          path={`/chests/${chestImageId}`}
          width="100%"
          alt={`${chest.displayName} Thumbnail`}
        />
      </Div>
      <Span
        weight="semi-bold"
        textOverflow="ellipsis"
        color="light-sand"
        fontSize={16}
        mt={32}
      >
        {chest.displayName}
      </Span>
      <Tokens
        value={chest.openCost}
        mt={8}
        color="dark-sand"
      />
      {children}
    </Card>
  );
};
