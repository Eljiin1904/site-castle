import { FC } from "react";
import classNames from "classnames";
import { Items } from "@core/services/items";
import { ItemRarity } from "@core/types/items/ItemRarity";
import { SvgChicken } from "#client/svgs/common/SvgChicken";
import { Div } from "../div/Div";
import { Img, ImgProps } from "../img/Img";
import { Vector } from "../vector/Vector";
import { StyledLayoutProps } from "../styled/Styled";
import "./ItemIcon.scss";

export type ItemIconProps = Omit<StyledLayoutProps, "width" | "height"> & {
  imageType: ImgProps["type"];
  imagePath: string;
  size: string;
  rarity: ItemRarity;
  glow?: boolean;
};

export const ItemIcon: FC<ItemIconProps> = ({
  className,
  imageType,
  imagePath,
  size,
  rarity,
  glow,
  ...forwardProps
}) => {
  const rarityIndex = Items.rarities.indexOf(rarity);

  return (
    <Div
      className={classNames("ItemIcon", className, {
        [`rarity-${rarityIndex}`]: rarityIndex !== undefined,
      })}
      center
      style={{ width: size, height: size }}
      {...forwardProps}
    >
      {glow && <Div className="glow" />}
      <Vector
        className="shadow"
        as={SvgChicken}
        color="brown-8"
      />
      <Img
        type={imageType}
        path={imagePath}
        width="auto"
        height="100%"
      />
    </Div>
  );
};
