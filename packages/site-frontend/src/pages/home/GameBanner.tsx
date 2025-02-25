import { Img } from "@client/comps/img/Img";
import { Link } from "@client/comps/link/Link";
import { Div } from "@client/comps/div/Div";
import { Heading } from "@client/comps/heading/Heading";
import { Span } from "@client/comps/span/Span";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import "./GameBanner.scss";
import { StyledProps } from "@client/comps/styled/Styled";

export const GameBanner = ({
  image,
  heading,
  subheading,
  to,
  ratio,
  objectPositionHorizontal ="center",
  objectPositionVertical = "center"
}: {
  image: string;
  heading?: string | undefined;
  subheading?: string | undefined;
  to: string;
  ratio?: string | undefined;
  objectPositionHorizontal?: StyledProps["objectFitPosition"];
  objectPositionVertical?: StyledProps["objectFitPosition"];
}) => {
  const layout = useAppSelector((x) => x.style.mainLayout);
  const small = ["mobile", "tablet"].includes(layout);

  return (
    <Link
      className="GameBanner"
      type="router"
      to={to}
      hover="none"
      overflow="hidden"
    >
      <Img
        type="jpg"
        path={image}
        skeleton
        width="100%"
        aspectRatio={ratio || "186 / 260"}
        objectPositionHorizontal={objectPositionHorizontal}
        objectPositionVertical={objectPositionVertical}
      />
      <Div
        position="absolute"
        fx
        fy
        align="center"
        justify="flex-end"
        column
        pb={small ? 8 : 12}
        gap={small ? 0 : 2}
      >
        <Heading
          as="h2"
          size={small ? 20 : 24}
        >
          {heading}
        </Heading>
        <Span
          size={small ? 12 : 13}
          color="sand"
        >
          {subheading}
        </Span>
      </Div>
    </Link>
  );
};
