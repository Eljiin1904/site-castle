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
import { Heading } from "@client/comps/heading/Heading";
import { Fairness } from "#app/services/fairness";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { LoginModal } from "../login/LoginModal";

export const FairnessSeedModal = ({ historyTo }: { historyTo?: string }) => {
  const authenticated = useAppSelector((x) => x.user.authenticated);

  if (!authenticated) {
    return <LoginModal />;
  }
  return (
    <Modal
      width="sm"
      onBackdropClick={() => Dialogs.close("primary")}
    >
      <ModalHeader
        heading="Fairness"
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

  const query = useQuery({
    enabled: authenticated,
    queryKey: ["fairness-seeds"],
    queryFn: () => Fairness.getSeeds(),
  });

  const handleRotate = usePost(async () => {
    if (!newClientSeed) {
      Toasts.error(new Error("Invalid client seed."));
      return;
    }

    await Fairness.rotateSeeds({
      newClientSeed,
    });

    queryClient.invalidateQueries({ queryKey: ["fairness-seeds"] });

    setNewClientSeed(undefined);

    Toasts.success("Seed pair rotated.");
  }, setProcessing);

  return (
    <ModalBody>
      <ModalSection>
        <ModalLabel>{"Active Client Seed"}</ModalLabel>
        <ModalCopyField text={query.data?.clientSeed} />
      </ModalSection>
      <ModalSection justify="space-between">
        <ModalLabel>{"Active Server Seed (Hashed)"}</ModalLabel>
        <ModalCopyField text={query.data?.serverSeedHashed} />
      </ModalSection>
      <ModalSection>
        <ModalLabel>{"Bets made with pair"}</ModalLabel>
        <ModalCopyField
          text={Numbers.toLocaleString(query.data?.nonce || 0, 0)}
        />
      </ModalSection>
      <Div
        fx
        borderBottom
      />
      <Div fx>
        <Heading>{"Rotate Seed Pair"}</Heading>
      </Div>
      <ModalSection>
        <ModalLabel>{"New Client Seed"}</ModalLabel>
        <Div fx>
          <Input
            type="text"
            placeholder="Enter new client seed..."
            value={newClientSeed}
            onChange={setNewClientSeed}
          />
          <Button
            kind="primary"
            label="Rotate"
            width={100}
            disabled={processing || query.isFetching}
            onClick={handleRotate}
          />
        </Div>
      </ModalSection>
      <ModalSection>
        <ModalLabel>{"Next Server Seed (Hashed)"}</ModalLabel>
        <ModalCopyField text={query.data?.nextServerSeedHashed} />
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
              kind="secondary"
              label="View History"
              iconRight={SvgExternal}
              onClick={() => Dialogs.close("primary")}
            />
          </Link>
        </Fragment>
      )}
    </ModalBody>
  );
};
