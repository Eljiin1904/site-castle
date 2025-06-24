import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ChatRainPayout } from "@core/types/chat/ChatRainPayout";
import { Modal } from "@client/comps/modal/Modal";
import { Dialogs } from "@client/services/dialogs";
import { Table } from "@client/comps/table/Table";
import { Span } from "@client/comps/span/Span";
import { Tokens } from "@client/comps/tokens/Tokens";
import { Div } from "@client/comps/div/Div";
import { UserBadge } from "@client/comps/user/UserBadge";
import { CardSection } from "@client/comps/cards/CardSection";
import { Pagination } from "@client/comps/pagination/Pagination";
import { ModalHeader } from "@client/comps/modal/ModalHeader";
import { UserIcon } from "#app/comps/user-icon/UserIcon";
import { Chat } from "#app/services/chat";
import { useTranslation } from "@core/services/internationalization/internationalization";

export const ChatRainPayoutModal = ({ rainId }: { rainId: string }) => {
  const { t } = useTranslation(["chat"]);
  const limit = 10;
  const [page, setPage] = useState(1);
  
  const query = useQuery({
    queryKey: [rainId, limit, page],
    queryFn: () => Chat.getRainPayouts({ rainId, limit, page }),
    placeholderData: (prev) => prev,
  });

  const payouts = query.data?.payouts || [];
  const totalCount = query.data?.totalCount || 0;
  return (
    <Modal
      width="sm"
      onBackdropClick={() => Dialogs.close("primary")}
    >
      <ModalHeader
        heading={t('rainPayoutModal.heading')}
        onCloseClick={() => Dialogs.close("primary")}
        noBorder
      />
      <PayoutTable
        payouts={payouts}
        isLoading={query.isLoading}
      />
      <CardSection position="bottom">
        <Pagination
          page={page}
          hasNext={payouts.length !== 0 && payouts.length % limit === 0}
          setPage={setPage}
          lastPage={Math.ceil(totalCount / limit) || 1}
        />
      </CardSection>
    </Modal>
  );
};

const PayoutTable = ({
  payouts,
  isLoading,
}: {
  payouts: ChatRainPayout[];
  isLoading: boolean;
}) => {
  return (
    <Table
      data={payouts}
      loading={isLoading}
      emptyMessage="No payouts found."
      columns={[
        {
          heading: "User",
          grow: 3,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Div
              align="center"
              gap={6}
            >
              <UserIcon
                width="32px"
                avatarId={x.user.avatarId}
                avatarIndex={x.user.avatarIndex}
              />
              <UserBadge xp={x.user.xp} />
              <Span color="white">{x.user.name}</Span>
            </Div>
          ),
        },
        {
          heading: "Tokens",
          grow: 2,
          justify: "flex-end",
          rowRenderer: (x) => <Tokens value={x.splitAmount} />,
        },
      ]}
    />
  );
};
