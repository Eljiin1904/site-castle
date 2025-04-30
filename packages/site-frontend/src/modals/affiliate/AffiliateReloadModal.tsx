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
import { useTranslation } from "@core/services/internationalization/internationalization";

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
  const {t} = useTranslation(['referrals']);
  
  const handleClaimReload = usePost(async () => {
    await Affiliates.claimReload({ reloadId: reload._id });
    Toasts.success("claimModal.claimed");
    Dialogs.close("primary");
  }, setIsLoading);

  let color: Color;
  let feedback: string;

  if (reload.claimsAvailable <= 0) {
    color = "gray";
    feedback = t('reloadModal.allClaimed');
  } else if (isAvailable) {
    color = "green";
    feedback = t('reloadModal.available');
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
        <ModalLabel>{t('claimModal.title',{value:reload.claimsAvailable})}</ModalLabel>
        <ProgressBar height={8}  progress={reload.claimsAvailable / reload.claimsStart} />
      </ModalSection>
      <ModalSection>
        <ModalLabel>{t('claimModal.nextAvailable')}</ModalLabel>
        <ModalField color={color}>{feedback}</ModalField>
      </ModalSection>
      <ModalSection>
        <ModalLabel>{t('claimModal.amount')}</ModalLabel>
        <ModalField>
          <Tokens value={reload.tokenAmount} />
        </ModalField>
      </ModalSection>
      <Button
        fx
        kind="primary-yellow"
        label={t('claimModal.claimButton')}
        disabled={reload.claimsAvailable <= 0 || !isAvailable || isLoading}
        onClick={handleClaimReload}
      />
    </Fragment>
  );
};
