import { useQuery } from "@tanstack/react-query";
import { Dates } from "@core/services/dates";
import { Modal } from "@client/comps/modal/Modal";
import { ModalHeader } from "@client/comps/modal/ModalHeader";
import { Dialogs } from "@client/services/dialogs";
import { Span } from "@client/comps/span/Span";
import { Div } from "@client/comps/div/Div";
import { System } from "#app/services/system";
import { StatCards } from "./StatCards";

export const SiteStatsModal = () => {
  const query = useQuery({
    queryKey: ["site-stats"],
    queryFn: () => System.getSiteStats(),
  });

  return (
    <Modal
      width="sm"
      onBackdropClick={() => Dialogs.close("primary")}
    >
      <ModalHeader
        heading="Site Stats"
        onCloseClick={() => Dialogs.close("primary")}
      />
      <StatCards stats={query.data?.stats} />
      <Div
        display="block"
        px={16}
        py={12}
        borderTop
      >
        <Span color="dark-gray">
          {"Stats for the last 7 days."}
          {query.data &&
            ` Updated ${Dates.toElapsedString(query.data.stats.timestamp, false)}.`}
        </Span>
      </Div>
    </Modal>
  );
};
