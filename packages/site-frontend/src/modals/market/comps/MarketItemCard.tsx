import { Items } from "@core/services/items";
import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { Vector } from "@client/comps/vector/Vector";
import { Img } from "@client/comps/img/Img";
import { ItemBox } from "@client/comps/item/ItemBox";
import { SvgChicken } from "@client/svgs/common/SvgChicken";

export const MarketItemCard = ({
  marketHashName,
  slug,
  tokenValue,
}: {
  marketHashName: string;
  slug: string;
  tokenValue: number;
}) => {
  const rarity = Items.getRarity(tokenValue);

  return (
    <Div
      fx
      column
      center
      gap={12}
    >
      <ItemBox
        fx
        center
        bg="gray-8"
        rarity={rarity}
      >
        <Vector
          position="absolute"
          as={SvgChicken}
          size={160}
          color="gray-8"
          style={{ opacity: 0.4 }}
        />
        <Img
          type="png"
          path={`/items/${slug}`}
          width="auto"
          height="200px"
        />
      </ItemBox>
      <Span
        size={12}
        textAlign="center"
      >
        {marketHashName}
      </Span>
    </Div>
  );
};
