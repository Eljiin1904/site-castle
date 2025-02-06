import { BasicChest } from "@core/types/chests/BasicChest";
import { ChestItem } from "@core/types/chests/ChestItem";
import { Intimal } from "@core/services/intimal";
import { Items } from "@core/services/items";
import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { Vector } from "@client/comps/vector/Vector";
import { Link } from "@client/comps/link/Link";
import { SvgSiteToken } from "@client/svgs/site/SvgSiteToken";

export const CaseWinContent = ({
  chest,
  item,
  btn,
}: {
  chest: BasicChest;
  item: ChestItem;
  btn: {
    to: string;
    label: string;
    icon: Svg;
  };
}) => {
  return (
    <Link
      type="router"
      to={btn.to}
      hover="none"
      display="block"
    >
      <Span size={13}>{"looted "}</Span>
      <Span
        size={13}
        color="yellow"
      >
        {Items.getName(item)}
      </Span>
      <Span size={13}>{" worth "}</Span>
      <Div display="inline-block">
        <Vector
          size={13}
          as={SvgSiteToken}
          top={1}
          mr={2}
        />
        <Span
          size={13}
          weight="semi-bold"
          color="light-green"
        >
          {Intimal.toLocaleString(item.lootValue)}
        </Span>
      </Div>
      <Span size={13}>{" from the "}</Span>
      <Span
        size={13}
        color="white"
      >
        {chest.displayName}
      </Span>
      <Span size={13}>{" case!"}</Span>
    </Link>
  );
};
