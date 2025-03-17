import { Img } from "@client/comps/img/Img";
import { Link } from "@client/comps/link/Link";
import { Div } from "@client/comps/div/Div";
import { Heading } from "@client/comps/heading/Heading";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import "./GameBanner.scss";
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
        justifyContent="center"
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
          position={small ? "relative" : "absolute"}
          fx
          px={small ? 0 : 16}
          py={small ? 0 : 16}
        >
          <Conditional
            value={layout}
            mobile={<MobileHeader heading={heading} />}
            tablet={<NotMobileHeader heading={heading} />}
            laptop={<NotMobileHeader heading={heading} />}
            desktop={<NotMobileHeader heading={heading} />}
          />
        </Div>
      </Div>
    </Link>
  );
};

const MobileHeader = ({heading}: {
  heading: string | undefined;
}) => {
  return (<Heading
    as={"h3"}
    color={"white"}
    size={ 20}
    fontWeight="regular"
    textTransform="capitalize"
  >
    {heading}
  </Heading>);
};

const NotMobileHeader = ({heading}: {
  heading: string | undefined;
}) => {
  return (<Heading
    as={"h3"}
    color={"black"}
    size={28}
    style={{ maxWidth: "100px" }}
    fontWeight="regular"
    textTransform="capitalize"
  >
    {heading}
  </Heading>);
};
