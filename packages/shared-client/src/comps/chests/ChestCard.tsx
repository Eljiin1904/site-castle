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
  return (
    <Card
      className="ChestCard"
      column
      align="center"
      p={16}
      fx={undefined}
      {...forwardProps}
    >
      <Div
        className="image-ctn"
        center
      >
        <Img
          type="png"
          path={`/chests/${chest.imageId}`}
          width="136px"
        />
      </Div>
      <Span
        weight="semi-bold"
        textOverflow="ellipsis"
        mt={12}
      >
        {chest.displayName}
      </Span>
      <Tokens
        value={chest.openCost}
        mt={12}
      />
      {children}
    </Card>
  );
};
