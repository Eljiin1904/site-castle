import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { PromotionCodeDocument } from "@core/types/economy/PromotionCodeDocument";
import { ModalBody } from "@client/comps/modal/ModalBody";
import { Pagination } from "@client/comps/pagination/Pagination";
import { CardSection } from "@client/comps/cards/CardSection";
import { Economy } from "#app/services/economy";
import { TicketTable } from "./TicketTable";

export const TicketBody = ({
  promotion,
}: {
  promotion: PromotionCodeDocument;
}) => {
  const promotionId = promotion._id;
  const limit = 10;
  const [page, setPage] = useState(1);

  const query = useQuery({
    queryKey: [promotionId, limit, page],
    queryFn: () => Economy.getPromotionTickets({ promotionId, limit, page }),
    placeholderData: (prev) => prev,
  });

  const tickets = query.data?.tickets || [];

  return (
    <ModalBody gap={0}>
      <TicketTable
        tickets={tickets}
        isLoading={query.isLoading}
      />
      <CardSection position="bottom">
        <Pagination
          fontSize={13}
          page={page}
          hasNext={tickets.length !== 0 && tickets.length % limit === 0}
          setPage={setPage}
        />
      </CardSection>
    </ModalBody>
  );
};
