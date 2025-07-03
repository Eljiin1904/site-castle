import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { Div } from "@client/comps/div/Div";
import { Heading } from "@client/comps/heading/Heading";
import { Img } from "@client/comps/img/Img";
import { Link } from "@client/comps/link/Link";
import { Span } from "@client/comps/span/Span";

export const GameHubEight = ({
  image,
  heading,
  subheading,
  to,
}: {
  image: string;
  heading?: string ;
  subheading?: string ;
  to: string;
}) => {
  
  const layout = useAppSelector((x) => x.style.mainLayout);
  const small = ["mobile", "tablet"].includes(layout);

  return (
    <Link
      className="BaseBanner ScaleBanner"
      type="router"
      to={to}
      hover="none"
      position="relative"
    >
      <Div fx column>
        {image ? <Img
          type="external"
          path={image}
          skeleton
          width="100%"
          height={small ? "160px":"180px"}
          aspectRatio={ "186 / 260"}
        /> :  <Img
          type="png"
          path={`graphics/not-found`}
          skeleton
          width="100%"
          height={small ? "160px":"180px"}
          aspectRatio={ "186 / 260"}
        />}
        <Div
          className="HeaderContent"
          align="center"
          justify="flex-end"
          column
          px={8}
          py={small ? 16 : 20}
          gap={small ? 0 : 2}
          bg="dark-brown"
          bottom={small ? 0 : 20}
        >
          <Heading
            as="h2"
            size={20}
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