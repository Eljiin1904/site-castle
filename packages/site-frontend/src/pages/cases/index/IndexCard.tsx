import { Link } from "@client/comps/link/Link";
import { ChestDocument } from "@core/types/chests/ChestDocument";
import { Placeholder } from "@client/comps/placeholder/Placeholder";
import { ChestCard } from "@client/comps/chests/ChestCard";
import "./IndexCard.scss";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";

export const IndexCardPlaceholder = () => {
  return <Placeholder className="IndexCard" />;
};

export const CaseCard = ({ chest }: { chest: ChestDocument }) => {
  
  const small = useIsMobileLayout();
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
        p={small ? 20: 24}
      />
    </Link>
  );
};
