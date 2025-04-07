import { Img } from "@client/comps/img/Img";
import { Link } from "@client/comps/link/Link";
import { Div } from "@client/comps/div/Div";
import { Heading } from "@client/comps/heading/Heading";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { StyledProps } from "@client/comps/styled/Styled";
import { Conditional } from "@client/comps/conditional/Conditional";
import "./FeatureGameBanner.scss";
import "./ScaleBanner.scss";

export const FeatureGameBanner = ({
  image,
  heading,
  to,
  ratio,
  objectPositionHorizontal ="center",
  objectPositionVertical = "center"
}: {
  image: string;
  heading?: string;
  to: string;
  ratio?: string;
  objectPositionHorizontal?: StyledProps["objectFitPosition"];
  objectPositionVertical?: StyledProps["objectFitPosition"];
}) => {
  const layout = useAppSelector((x) => x.style.mainLayout);
  const small = layout === "mobile";

  
  return (
    <Link
      className="FeatureGameBanner ScaleBanner"
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
      >
        <Div
          fx
          column
          position="relative"
          style={{ minHeight: small ? "160px" : "240px" }}
          overflow="hidden"
          >
            <Img
          type="jpg"
          path={image}
          skeleton
          width="100%"
          aspectRatio={ratio ?? "186 / 260"}
          height={small ? "160px" : "240px"}
          objectPositionHorizontal={objectPositionHorizontal}
          objectPositionVertical={objectPositionVertical}
        />     
        </Div>
        <Div
          position={small ? "relative" : "absolute"}
          fx
          px={small ? 0 : 40}
          py={small ? 0 : 40}
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
    as={"h2"}
    color={"white"}
    size={20}
    lineHeight={24}
    fontWeight="regular"
  >
    {heading}
  </Heading>);
};

const NotMobileHeader = ({heading}: {
  heading: string | undefined;
}) => {
  return (<Heading
    as={"h2"}
    color={"black"}
    size={ 48}
    lineHeight={40}
    style={{ maxWidth: "100px" }}
    fontWeight="regular"
    textTransform="uppercase"
  >
    {heading}
  </Heading>);
};
