import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { GiftBatchDocument } from "@core/types/economy/GiftBatchDocument";
import { ModalBody } from "@client/comps/modal/ModalBody";
import { Pagination } from "@client/comps/pagination/Pagination";
import { Economy } from "#app/services/economy";
import { CardTable } from "./CardTable";
import { CardSection } from "@client/comps/cards/CardSection";

export const CardBody = ({ batch }: { batch: GiftBatchDocument }) => {
  const batchId = batch._id;
  const limit = 10;
  const [page, setPage] = useState(1);

  const query = useQuery({
    queryKey: [batchId, limit, page],
    queryFn: () => Economy.getGiftCards({ batchId, limit, page }),
    placeholderData: (prev) => prev,
  });

  const cards = query.data?.cards || [];

  return (
    <ModalBody gap={0}>
      <CardTable
        cards={cards}
        isLoading={query.isLoading}
      />
      <CardSection position="bottom">
        <Pagination
          fontSize={13}
          page={page}
          hasNext={cards.length !== 0 && cards.length % limit === 0}
          setPage={setPage}
        />
      </CardSection>
    </ModalBody>
  );
};
