import { RewardProductDocument } from "@core/types/rewards/RewardProductDocument";
import { Div } from "@client/comps/div/Div";
import { PageTitle } from "@client/comps/page/PageTitle";
import { SvgStar } from "@client/svgs/common/SvgStar";
import { SvgBag } from "@client/svgs/common/SvgBag";
import { ProductCard, ProductCardPlaceholder } from "./ProductCard";

export const ProductGrid = ({
  products,
  onBuyClick,
}: {
  products: RewardProductDocument[] | undefined;
  onBuyClick: (x: RewardProductDocument) => void;
}) => {
  if (products?.some((x) => x.featured)) {
    return (
      <Div
        column
        gap={24}
      >
        <Div
          column
          gap={16}
        >
          <PageTitle
            icon={SvgStar}
            heading="Featured"
          />
          <Div
            fx
            flexFlow="row-wrap"
            gap={12}
          >
            {products
              .filter((x) => x.featured)
              .map((x) => (
                <ProductCard
                  key={x._id}
                  product={x}
                  onBuyClick={() => onBuyClick(x)}
                />
              ))}
          </Div>
        </Div>
        <Div
          column
          gap={16}
        >
          <PageTitle
            icon={SvgBag}
            heading="General"
          />
          <Div
            fx
            flexFlow="row-wrap"
            gap={12}
          >
            {products
              .filter((x) => !x.featured)
              .map((x) => (
                <ProductCard
                  key={x._id}
                  product={x}
                  onBuyClick={() => onBuyClick(x)}
                />
              ))}
          </Div>
        </Div>
      </Div>
    );
  }

  return (
    <Div
      fx
      flexFlow="row-wrap"
      gap={12}
    >
      {!products &&
        [...Array(18)].map((x, i) => <ProductCardPlaceholder key={i} />)}
      {products &&
        products.map((x) => (
          <ProductCard
            key={x._id}
            product={x}
            onBuyClick={() => onBuyClick(x)}
          />
        ))}
    </Div>
  );
};
