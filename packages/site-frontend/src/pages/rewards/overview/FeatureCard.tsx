import { Card } from "@client/comps/cards/Card";
import { Img } from "@client/comps/img/Img";
import { Link } from "@client/comps/link/Link";
import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { Vector } from "@client/comps/vector/Vector";
import { SvgCaretRight } from "@client/svgs/common/SvgCaretRight";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import "./FeatureCard.scss";

export const FeatureCard = ({
  image,
  heading,
  description,
  to,
}: {
  image: string;
  heading: string;
  description: string;
  to: string;
}) => {
  const layout = useAppSelector((x) => x.style.mainLayout);
  const small = layout === "mobile";

  return (
    <Link
      className="FeatureCard"
      type="router"
      to={to}
      hover="none"
    >
      <Card
        fx
        column={!small}
        center
        p={16}
        gap={16}
        hover="up"
      >
        <Img
          type="png"
          path={image}
          width={small ? "80px" : "150px"}
        />
        <Div
          fx
          column
        >
          <Div
            fx
            align="center"
            justify="space-between"
          >
            <Span
              family="title"
              weight="bold"
              size={small ? 16 : 18}
              color="white"
            >
              {heading}
            </Span>
            <Vector
              as={SvgCaretRight}
              size={small ? 16 : 18}
            />
          </Div>
          <Div
            fx
            mt={small ? 8 : 12}
          >
            <Span size={small ? 13 : 14}>{description}</Span>
          </Div>
        </Div>
      </Card>
    </Link>
  );
};
