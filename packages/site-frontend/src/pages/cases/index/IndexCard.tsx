import { Link } from "@client/comps/link/Link";
import { ChestDocument } from "@core/types/chests/ChestDocument";
import { Placeholder } from "@client/comps/placeholder/Placeholder";
import { ChestCard } from "@client/comps/chests/ChestCard";
import "./IndexCard.scss";

export const IndexCardPlaceholder = () => {
  return <Placeholder className="IndexCard" />;
};

export const CaseCard = ({ chest }: { chest: ChestDocument }) => {
  return (
    <Link
      className="IndexCard"
      type="router"
      to={`/cases/${chest.slug}`}
      hover="none"
    >
      <ChestCard
        hover="up"
        chest={chest}
        fx
        fy
      />
    </Link>
  );
};
