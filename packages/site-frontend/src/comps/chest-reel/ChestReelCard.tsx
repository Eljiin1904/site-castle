import { useMemo } from "react";
import classNames from "classnames";
import { Items } from "@core/services/items";
import { ChestItem } from "@core/types/chests/ChestItem";
import { ChestRoll } from "@core/types/chests/ChestRoll";
import { Div } from "@client/comps/div/Div";
import { ItemIcon } from "@client/comps/item/ItemIcon";
import { Span } from "@client/comps/span/Span";
import { Tokens } from "@client/comps/tokens/Tokens";
import { Img } from "@client/comps/img/Img";
import { Lottie } from "#app/comps/lottie/Lottie";
import "./ChestReelCard.scss";

export const ChestReelCard = ({
  index,
  item,
  roll,
  popout,
  fade,
}: {
  index: number;
  item: ChestItem;
  roll: ChestRoll;
  popout: boolean;
  fade: boolean;
}) => {
  const IconMemo = useMemo(
    () => (
      <ItemIcon
        position="absolute"
        imageType="png"
        imagePath={`/items/${item.slug}`}
        size="100px"
        rarity={Items.getRarity(item.lootValue)}
        glow
      />
    ),
    [item],
  );

  if (index > 8 && item.special && roll?.specialShow) {
    return (
      <Div
        className={classNames("ChestReelCard", { popout, fade })}
        center
        py={8}
        px={12}
      >
        {popout ? (
          <Lottie
            className="special-icon"
            path="/animations/chicken-spin.json"
            height={110}
            width={110}
            speed={2}
            loop={false}
            play
          />
        ) : (
          <Img
            className="special-icon"
            type="png"
            path="/icons/chicken-spin"
            width="110px"
          />
        )}
      </Div>
    );
  }

  return (
    <Div
      className={classNames("ChestReelCard", { popout, fade })}
      center
      py={8}
      px={12}
    >
      {IconMemo}
      {popout && (
        <Div
          className="item-info"
          fx
          fy
          column
          align="center"
          justify="flex-end"
        >
          <Span
            className="base-name"
            fontSize={13}
            color="white"
            textAlign="center"
            textOverflow="ellipsis"
            mt={8}
          >
            {item.baseName}
          </Span>
          <Span
            className="style-name"
            fontSize={12}
            textAlign="center"
            textOverflow="ellipsis"
            mt={6}
          >
            {item.symbol && `[${item.symbol}] `}
            {item.edition !== "Standard" && item.edition + " "}
            {item.styleName}
          </Span>
          <Tokens
            value={item.lootValue}
            mt={12}
          />
        </Div>
      )}
    </Div>
  );
};
