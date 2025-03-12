import { CardSection } from "@client/comps/cards/CardSection";
import { Pagination } from "@client/comps/pagination/Pagination";

export const GiftCardsFooter = ({
  page,
  hasNext,
  setPage,
}: {
  page: number;
  hasNext: boolean;
  setPage: (x: number) => void;
}) => {
  return (
    <CardSection position="bottom">
      <Pagination
        page={page}
        hasNext={hasNext}
        setPage={setPage}
      />
    </CardSection>
  );
};
