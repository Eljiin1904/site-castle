import { FC } from "react";
import { Img } from "@client/comps/img/Img";
import { Div } from "@client/comps/div/Div";
import { Heading } from "@client/comps/heading/Heading";
import { Span } from "@client/comps/span/Span";
import { Link, LinkProps } from "@client/comps/link/Link";
import { Button } from "@client/comps/button/Button";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";

export type HeroBannerSlideProps = LinkProps & {
  image: string;
  heading?: string;
  headingLevel?: "h1" | "h2" | "h3" | "h4" | "h5";
  description?: string;
  button?: string;
  accent?: string;
  width?: string;
};

export const HeroBannerSlide: FC<HeroBannerSlideProps> = ({
  image,
  heading,
  headingLevel,
  description,
  button,
  accent,
  ...forwardProps
}) => {
  const small =  useIsMobileLayout();
  const fontSize = headingLevel === "h3" ? (small ? 20 : 48): (small ? 32 : 64);
  const lineHeight = headingLevel === "h3" ? (small ? 24 : 40) : (small ? 32 : 56);
  const maxWidth = headingLevel === "h3" ? (small ? "80px" : "100px") : (small ? "160px" : "480px");
  return (
    <Link
      fx
      overflow="hidden"
      hover="none"
      {...forwardProps}
    >
      <Img
        className="slide-img"
        type="jpg"
        path={`${image}`}
        width="100%"
        style={{ minHeight: small ? "208px" : "280px"}}
        skeleton
      />
      <Div
        position="absolute"
        fx
        fy
        column
        px={small ? 20 : 40}
        py={small ? 20 : 28}
      >
        <Div
          column
          grow
          gap={8}
        >
          <Heading
            as={headingLevel || "h1"}
            color={"dark-brown"}
            size={fontSize}
            style={{ maxWidth: maxWidth}}
            fontWeight="regular"
            textTransform="uppercase"
            lineHeight={lineHeight}
          >
            {heading}
          </Heading>
          <Span
            color={"dark-brown"}
            style={{ maxWidth: small ? "200px" : "550px" }}
            fontSize={small ? 12 : 16}
            fontWeight="medium"
          >
            {description}
          </Span>
        </Div>
        <Div
          gap={16}
          align="center"
        >
          {button && (
            <Button
              kind="primary-black"
              label={button}
              size={small ? "md" : "lg"}
            />
          )}
          {accent && (
            <Img
              type="png"
              path={accent}
              width="auto"
              height={small ? "28px" : "32px"}
            />
          )}
        </Div>
      </Div>
    </Link>
  );
};
