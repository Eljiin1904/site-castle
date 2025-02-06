import { Img } from "@client/comps/img/Img";
import { Link } from "@client/comps/link/Link";
import { Span } from "@client/comps/span/Span";
import { Div } from "@client/comps/div/Div";
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
      type="nav"
      to={to}
      fx
      flexFlow="column"
      flexCenter
      pt={12}
      bg="brown-6"
      border
      hover="up"
    >
      <Div
        className="bg"
        position="absolute"
        fx
        fy
      />
      <Img
        className="icon"
        type="png"
        path={image}
        width={small ? "50px" : "110px"}
      />
      <Span
        className="heading"
        family="title"
        weight={small ? "semi-bold" : "bold"}
        size={small ? 11 : 15}
        textAlign="center"
        color="white"
        mt={small ? 4 : 8}
        pl={12}
        pr={12}
      >
        {heading}
      </Span>
      {!small && (
        <Span
          size={12}
          mt={4}
          pl={12}
          pr={12}
          textAlign="center"
        >
          {description}
        </Span>
      )}
    </Link>
  );
};
