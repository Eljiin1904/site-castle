import { Fragment, useState } from "react";
import { isPast } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { AffiliateReloadDocument } from "@core/types/affiliates/AffiliateReloadDocument";
import { Dates } from "@core/services/dates";
import { Modal } from "@client/comps/modal/Modal";
import { ModalBody } from "@client/comps/modal/ModalBody";
import { ModalHeader } from "@client/comps/modal/ModalHeader";
import { Dialogs } from "@client/services/dialogs";
import { Button } from "@client/comps/button/Button";
import { ModalLoading } from "@client/comps/modal/ModalLoading";
import { usePost } from "@client/hooks/system/usePost";
import { Toasts } from "@client/services/toasts";
import { ModalSection } from "@client/comps/modal/ModalSection";
import { ModalField } from "@client/comps/modal/ModalField";
import { ModalLabel } from "@client/comps/modal/ModalLabel";
import { Tokens } from "@client/comps/tokens/Tokens";
import { ProgressBar } from "@client/comps/progress-bar/ProgressBar";
import { Affiliates } from "#app/services/affiliates";

export const AffiliateReloadModal = () => {
  const query = useQuery({
    queryKey: ["reload"],
    queryFn: () => Affiliates.getReload(),
    placeholderData: (prev) => prev,
  });

  const reload = query.data?.reload;

  let bodyContent;

  if (!reload) {
    bodyContent = <ModalLoading />;
  } else if (reload) {
    bodyContent = <ReloadsBody reload={reload} />;
  }

  return (
    <Modal
      width="sm"
      onBackdropClick={() => Dialogs.close("primary")}
    >
      <ModalHeader
        heading="Reload"
        onCloseClick={() => Dialogs.close("primary")}
      />
      <ModalBody>{bodyContent}</ModalBody>
    </Modal>
  );
};

const ReloadsBody = ({ reload }: { reload: AffiliateReloadDocument }) => {
  const [isLoading, setIsLoading] = useState(false);
  const isAvailable = isPast(reload.resetDate);

  const handleClaimReload = usePost(async () => {
    await Affiliates.claimReload({ reloadId: reload._id });
    Toasts.success("Reload claimed.");
    Dialogs.close("primary");
  }, setIsLoading);

  let color: Color;
  let feedback: string;

  if (reload.claimsAvailable <= 0) {
    color = "gray";
    feedback = "All Reloads Claimed";
  } else if (isAvailable) {
    color = "green";
    feedback = "Available Now";
  } else {
    color = "light-orange";
    feedback = Dates.toTimestamp(reload.resetDate, {
      hour: "numeric",
      hour12: true,
    });
  }

  return (
    <Fragment>
      <ModalSection>
        <ModalLabel>{`${reload.claimsAvailable} Reloads Remaining`}</ModalLabel>
        <ProgressBar
          progress={reload.claimsAvailable / reload.claimsStart}
          height={8}
          fillColor="gold"
          mt={4}
        />
      </ModalSection>
      <ModalSection>
        <ModalLabel>{"Next Reload Available"}</ModalLabel>
        <ModalField color={color}>{feedback}</ModalField>
      </ModalSection>
      <ModalSection>
        <ModalLabel>{"Amount"}</ModalLabel>
        <ModalField>
          <Tokens value={reload.tokenAmount} />
        </ModalField>
      </ModalSection>
      <Button
        fx
        kind="primary"
        label={"Claim Reload"}
        disabled={reload.claimsAvailable <= 0 || !isAvailable || isLoading}
        onClick={handleClaimReload}
      />
    </Fragment>
  );
};
