import { RewardProductDocument } from "@core/types/rewards/RewardProductDocument";
import { Intimal } from "@core/services/intimal";
import { Vector } from "@client/comps/vector/Vector";
import { Link, LinkProps } from "@client/comps/link/Link";
import { Div } from "@client/comps/div/Div";
import { Img } from "@client/comps/img/Img";
import { Span } from "@client/comps/span/Span";
import { Card } from "@client/comps/cards/Card";
import { Placeholder } from "@client/comps/placeholder/Placeholder";
import { SvgSiteGem } from "@client/svgs/site/SvgSiteGem";
import "./ProductCard.scss";

export const ProductCardPlaceholder = () => {
  return <Placeholder className="ProductCard" />;
};

export const ProductCard = ({
  product,
  onBuyClick,
}: {
  product: RewardProductDocument;
  onBuyClick: () => void;
}) => {
  let linkProps: LinkProps;

  if (product.kind === "case") {
    linkProps = {
      type: "router",
      to: `/rewards/gem-cases/${product.chest.slug}`,
    };
  } else if (product.kind === "tokens") {
    linkProps = {
      type: "action",
      onClick: onBuyClick,
    };
  } else {
    return null;
  }

  return (
    <Link
      className="ProductCard"
      hover="none"
      {...linkProps}
    >
      <Card
        column
        align="center"
        p={16}
        hover="up"
      >
        <Div
          className="image-ctn"
          center
        >
          <Img
            type="png"
            path={`/reward-products/${product.imageId}`}
            width="136px"
          />
        </Div>
        <Span
          weight="semi-bold"
          textOverflow="ellipsis"
          mt={12}
        >
          {product.displayName}
        </Span>
        <Div
          gap={4}
          mt={12}
        >
          <Vector
            as={SvgSiteGem}
            size={14}
          />
          <Span
            family="title"
            weight="bold"
            color="white"
          >
            {Intimal.toLocaleString(product.gemCost, 0)}
          </Span>
        </Div>
      </Card>
    </Link>
  );
};
