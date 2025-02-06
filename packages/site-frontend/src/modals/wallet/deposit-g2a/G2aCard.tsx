import { Img } from "@client/comps/img/Img";
import { Link } from "@client/comps/link/Link";
import "./G2aCard.scss";

export const G2aCard = ({ href, image }: { href: string; image: string }) => {
  return (
    <Link
      className="G2aCard"
      type="a"
      href={href}
      border
      hover="up"
    >
      <Img
        type="jpg"
        width="100%"
        height="auto"
        path={image}
      />
    </Link>
  );
};
