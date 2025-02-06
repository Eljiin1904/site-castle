import { Img } from "@client/comps/img/Img";
import { Link } from "@client/comps/link/Link";
import "./KinguinCard.scss";

export const KinguinCard = ({
  href,
  image,
}: {
  href: string;
  image: string;
}) => {
  return (
    <Link
      className="KinguinCard"
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
