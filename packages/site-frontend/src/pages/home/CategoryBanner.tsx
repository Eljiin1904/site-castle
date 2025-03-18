import { Img } from "@client/comps/img/Img";
import { Link } from "@client/comps/link/Link";
import { Div } from "@client/comps/div/Div";
import { Heading } from "@client/comps/heading/Heading";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import "./CategoryBanner.scss";
import { StyledProps } from "@client/comps/styled/Styled";
import { Conditional } from "@client/comps/conditional/Conditional";

export const CategoryBanner = ({
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
  const small = layout === "mobile";

  
  return (
    <Link
      className="CategoryBanner"
      type="router"
      to={to}
      hover="none"
      overflow="hidden"
      fx
    >
      <Div
        position="relative"
        overflow="hidden"
        fx
        column
        gap={small ? 24 : 0}
        justifyContent={small ? "flex-start" : "center"}
      >
        <Div
          fx
          column
          position="relative"
          style={{ minHeight: small ? "160px" : "88px" }}
          overflow="hidden"
          >
            <Img
          type="jpg"
          path={image}
          skeleton
          width="100%"
          aspectRatio={ratio || "206 / 88"}
          objectPositionHorizontal={objectPositionHorizontal}
          objectPositionVertical={objectPositionVertical}
        />     
        </Div>
        <Div
          position={"absolute"}
          fx
          px={16}
          py={16}
          textAlign={small ? "center" : "left"}
        >
          <Heading
            as={"h3"}
            color={"dark-brown"}
            size={28}
            style={{ maxWidth: small ? "100%" : "100px" }}
            fontWeight="regular"
            textTransform="capitalize"
          >
            {heading}
          </Heading>
        </Div>
      </Div>
    </Link>
  );
};