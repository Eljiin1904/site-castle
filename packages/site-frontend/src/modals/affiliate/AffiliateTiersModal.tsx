import { Affiliates } from "#app/services/affiliates";
import { Div } from "@client/comps/div/Div";
import { Img } from "@client/comps/img/Img";
import { Modal } from "@client/comps/modal/Modal";
import { ModalHeader } from "@client/comps/modal/ModalHeader";
import { Span } from "@client/comps/span/Span";
import { Table } from "@client/comps/table/Table";
import { Dialogs } from "@client/services/dialogs";
import { Intimal } from "@core/services/intimal";
import { Numbers } from "@core/services/numbers";

export const AffiliateTiersModal = () => {
  return (
    <Modal
      width="sm"
      onBackdropClick={() => Dialogs.close("primary")}
    >
      <ModalHeader
        heading="Affiliate Tiers"
        onCloseClick={() => Dialogs.close("primary")}
      />
      <Table
        data={Affiliates.tiers.slice(1)}
        columns={[
          {
            heading: "Tier",
            grow: 3,
            justify: "flex-start",
            rowRenderer: (x, i) => (
              <Div
                align="center"
                gap={8}
              >
                <Img
                  type="png"
                  path={`/affiliate-tiers/tier-${i + 1}`}
                  width="24px"
                />
                <Span>{`Tier ${i + 1}`}</Span>
              </Div>
            ),
          },
          {
            heading: "Rate",
            grow: 3,
            justify: "flex-end",
            rowRenderer: (x) => <Span>{Numbers.toPercentString(x.rate)}</Span>,
          },
          {
            heading: "XP",
            grow: 4,
            justify: "flex-end",
            rowRenderer: (x) => <Span>{Intimal.toLocaleString(x.xp, 0)}</Span>,
          },
        ]}
      />
    </Modal>
  );
};
