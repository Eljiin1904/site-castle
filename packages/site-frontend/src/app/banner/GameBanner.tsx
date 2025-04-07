import { Img } from "@client/comps/img/Img";
import { Link } from "@client/comps/link/Link";
import { Div } from "@client/comps/div/Div";
import { Heading } from "@client/comps/heading/Heading";
import { Span } from "@client/comps/span/Span";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { StyledProps } from "@client/comps/styled/Styled";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { Site } from "#app/services/site";
import "./BaseBanner.scss";
import "./ScaleBanner.scss";

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
  heading?: string ;
  subheading?: string ;
  to: string;
  ratio?: string;
  objectPositionHorizontal?: StyledProps["objectFitPosition"];
  objectPositionVertical?: StyledProps["objectFitPosition"];
}) => {
  const layout = useAppSelector((x) => x.style.mainLayout);
  const small = ["mobile", "tablet"].includes(layout);
  const menuOpen = useAppSelector((x) => x.site.menuOverlayOpen);
  const dispatch = useAppDispatch();

  const handleClose = () => {
    if (small && menuOpen) {
      dispatch(Site.toggleMenuOverlay(false));
      dispatch(Site.setSearch(''));
    }
  };
  return (
    <Link
      className="BaseBanner ScaleBanner"
      type="router"
      to={to}
      hover="none"
      position="relative"
    >
      <Div fx column onClick={handleClose}>
        <Img
          type="jpg"
          path={image}
          skeleton
          width="100%"
          height={small ? "160px":"180px"}
          aspectRatio={ratio ?? "186 / 260"}
          objectPositionHorizontal={objectPositionHorizontal}
          objectPositionVertical={objectPositionVertical}
        />
        <Div
          className="HeaderContent"
          align="center"
          justify="flex-end"
          column
          px={small ? 16 : 20}
          py={small ? 16 : 20}
          gap={small ? 0 : 2}
          bg="dark-brown"
          bottom={small ? 0 : 20}
        >
          <Heading
            as="h2"
            size={small ? 20 : 28}
            fontWeight="regular"
            textAlign="center"
          >
            {heading}
          </Heading>
          <Span
            size={10}
            color="light-sand"
            fontWeight="medium"
          >
            {subheading}
          </Span>
        </Div>
      </Div>
    </Link>
  );
};