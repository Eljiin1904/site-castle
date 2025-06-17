import { Fragment, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Numbers } from "@core/services/numbers";
import { Modal } from "@client/comps/modal/Modal";
import { ModalBody } from "@client/comps/modal/ModalBody";
import { ModalHeader } from "@client/comps/modal/ModalHeader";
import { Dialogs } from "@client/services/dialogs";
import { Div } from "@client/comps/div/Div";
import { Button } from "@client/comps/button/Button";
import { Input } from "@client/comps/input/Input";
import { usePost } from "@client/hooks/system/usePost";
import { Toasts } from "@client/services/toasts";
import { ModalSection } from "@client/comps/modal/ModalSection";
import { ModalLabel } from "@client/comps/modal/ModalLabel";
import { ModalCopyField } from "@client/comps/modal/ModalCopyField";
import { Link } from "@client/comps/link/Link";
import { SvgExternal } from "@client/svgs/common/SvgExternal";
import { Fairness } from "#app/services/fairness";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { LoginModal } from "../login/LoginModal";
import { useTranslation } from "@core/services/internationalization/internationalization";

export const FairnessSeedModal = ({ historyTo }: { historyTo?: string }) => {
  const authenticated = useAppSelector((x) => x.user.authenticated);
  const { t } = useTranslation(["fairness"]);
  if (!authenticated) {
    return <LoginModal />;
  }
  return (
    <Modal
      width="md"
      onBackdropClick={() => Dialogs.close("primary")}
    >
      <ModalHeader
        heading={t('seedModal.title')}
        onCloseClick={() => Dialogs.close("primary")}
      />
      <UserContent historyTo={historyTo} />
    </Modal>
  );
};

const UserContent = ({ historyTo }: { historyTo?: string }) => {
  const [newClientSeed, setNewClientSeed] = useState<string>();
  const [processing, setProcessing] = useState(false);
  const authenticated = useAppSelector((x) => x.user.authenticated);
  const queryClient = useQueryClient();
  const { t } = useTranslation(["fairness"]);

  const query = useQuery({
    enabled: authenticated,
    queryKey: ["fairness-seeds"],
    queryFn: () => Fairness.getSeeds(),
  });

  const handleRotate = usePost(async () => {
    if (!newClientSeed) {
      Toasts.error(new Error('validations:errors.fairness.invalidClientSeed'));
      return;
    }

    await Fairness.rotateSeeds({
      newClientSeed: newClientSeed,
    });

    queryClient.invalidateQueries({ queryKey: ["fairness-seeds"] });

    setNewClientSeed(undefined);

    Toasts.success("fairness:seedModal.seedPairRotated");
  }, setProcessing);

  return (
    <ModalBody pt={0}>
      <Div fx borderTop borderColor="brown-4" pt={24} gap={12}>
        <ModalSection>
          <ModalLabel>{t('seedModal.activeClientSeed')}</ModalLabel>
          <ModalCopyField text={query.data?.clientSeed} fontSize={12} color="light-sand" textOverflow="ellipsis" />
        </ModalSection>
      </Div>
      <ModalSection justify="space-between">
        <ModalLabel>{t('seedModal.activeServerSeed')}</ModalLabel>
        <ModalCopyField text={query.data?.serverSeedHashed} fontSize={12} color="light-sand" textOverflow="ellipsis"/>
      </ModalSection>
      <ModalSection>
        <ModalLabel>{t('seedModal.betsMadeWithPair')}</ModalLabel>
        <ModalCopyField text={Numbers.toLocaleString(query.data?.nonce || 0, 0)} fontSize={12} color="light-sand" textOverflow="ellipsis" />
      </ModalSection>
      <Div
        fx
        borderBottom
        borderColor="brown-4"
      />
      <Div fx>
        <ModalLabel>{t('seedModal.rotateSeedPair')}</ModalLabel>
      </Div>
      <ModalSection>
        <ModalLabel>{t('seedModal.newClientSeed')}</ModalLabel>
        <Div fx>
          <Input
            type="text"
            placeholder=""
            value={newClientSeed}
            onChange={setNewClientSeed}
          />
          <Button
            kind="tertiary-grey"
            label={t('seedModal.rotate')}
            width={100}
            disabled={processing || query.isFetching}
            onClick={handleRotate}
            size="xssso"
          />
        </Div>
      </ModalSection>
      <ModalSection>
        <ModalLabel>{t('seedModal.nextServerSeed')}</ModalLabel>
        <ModalCopyField text={query.data?.nextServerSeedHashed} fontSize={12} color="light-sand" textOverflow="ellipsis" />
      </ModalSection>
      {historyTo && (
        <Fragment>
          <Div
            fx
            borderBottom
          />
          <Link
            type="router"
            to={historyTo}
            hover="none"
            fx
          >
            <Button
              fx
              kind="tertiary-grey"
              label={t('seedModal.viewHistory')}
              iconRight={SvgExternal}
              onClick={() => Dialogs.close("primary")}
            />
          </Link>
        </Fragment>
      )}
    </ModalBody>
  );
};
