import { FC } from "react";
import { Img } from "@client/comps/img/Img";
import { Div } from "@client/comps/div/Div";
import { Heading } from "@client/comps/heading/Heading";
import { Span } from "@client/comps/span/Span";
import { Link, LinkProps } from "@client/comps/link/Link";
import { Button } from "@client/comps/button/Button";
import { useAppSelector } from "#app/hooks/store/useAppSelector";

export type HeroBannerSlideProps = LinkProps & {
  image: string;
  heading?: string;
  description?: string;
  button?: string;
  accent?: string;
};

export const HeroBannerSlide: FC<HeroBannerSlideProps> = ({
  image,
  heading,
  description,
  button,
  accent,
  ...forwardProps
}) => {
  const layout = useAppSelector((x) => x.style.mainLayout);
  const small = layout === "mobile";

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
        path={`${image}_${layout}`}
        width="100%"
        height={small ? "200px" : "280px"}
        skeleton
      />
      <Div
        position="absolute"
        fx
        fy
        column
        p={small ? 24 : 32}
      >
        <Div
          column
          grow
          gap={16}
        >
          <Heading
            as="h1"
            color={small ? "black" : "black"}
            size={small ? 20 : 64}
            style={{ maxWidth: small ? "280px" : "400px" }}
          >
            {heading}
          </Heading>
          <Span
            color={small ? "black" : "black"}
            style={{ maxWidth: small ? "280px" : "500px" }}
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
              kind="primary"
              label={button}
              size={small ? "sm" : "md"}
              labelSize={small ? 13 : 14}
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
