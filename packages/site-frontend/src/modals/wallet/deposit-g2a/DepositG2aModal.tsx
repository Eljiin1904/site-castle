import { Button } from "@client/comps/button/Button";
import { Div } from "@client/comps/div/Div";
import { Modal } from "@client/comps/modal/Modal";
import { ModalHeader } from "@client/comps/modal/ModalHeader";
import { ModalBody } from "@client/comps/modal/ModalBody";
import { NoticeCard } from "@client/comps/cards/NoticeCard";
import { G2aCard } from "./G2aCard";

export const DepositG2aModal = ({
  onRedeemClick,
  onClose,
}: {
  onRedeemClick: () => void;
  onClose: () => void;
}) => {
  return (
    <Modal
      className="DepositG2aModal"
      onBackdropClick={onClose}
    >
      <ModalHeader
        heading="Deposit on G2A"
        onCloseClick={onClose}
      />
      <ModalBody gap={16}>
        <NoticeCard
          kind="info"
          message="You will be redirected to g2a.com"
        />
        <Div
          flow="row-wrap"
          gap={8}
        >
          <G2aCard
            href="https://www.g2a.com/chickengg-10-tokens-key-global-i10000507171001?gtag=eaacb332d6"
            image="/gift-cards/tokens-10"
          />
          <G2aCard
            href="https://www.g2a.com/chickengg-25-tokens-key-global-i10000507171006?gtag=eaacb332d6"
            image="/gift-cards/tokens-25"
          />
          <G2aCard
            href="https://www.g2a.com/chickengg-50-tokens-key-global-i10000507171002?gtag=eaacb332d6"
            image="/gift-cards/tokens-50"
          />
          <G2aCard
            href="https://www.g2a.com/chickengg-100-tokens-key-global-i10000507171003?gtag=eaacb332d6"
            image="/gift-cards/tokens-100"
          />
          <G2aCard
            href="https://www.g2a.com/chickengg-250-tokens-key-global-i10000507171007?gtag=eaacb332d6"
            image="/gift-cards/tokens-250"
          />
          <G2aCard
            href="https://www.g2a.com/chickengg-500-tokens-key-global-i10000507171004?gtag=eaacb332d6"
            image="/gift-cards/tokens-500"
          />
          <G2aCard
            href="https://www.g2a.com/chickengg-750-tokens-key-global-i10000507171008?gtag=eaacb332d6"
            image="/gift-cards/tokens-750"
          />
          <G2aCard
            href="https://www.g2a.com/chickengg-1000-tokens-key-global-i10000507171005?gtag=eaacb332d6"
            image="/gift-cards/tokens-1000"
          />
          <G2aCard
            href="https://www.g2a.com/chickengg-1500-tokens-key-global-i10000507171009?gtag=eaacb332d6"
            image="/gift-cards/tokens-1500"
          />
        </Div>
        <Div
          fx
          grow
          column
          justify="flex-end"
          gap={12}
        >
          <Button
            kind="primary"
            label="Have a Code? Redeem Now"
            fx
            onClick={onRedeemClick}
          />
          <Button
            kind="secondary"
            label="Back to Options"
            fx
            onClick={onClose}
          />
        </Div>
      </ModalBody>
    </Modal>
  );
};
