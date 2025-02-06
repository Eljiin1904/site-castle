import { Button } from "@client/comps/button/Button";
import { Div } from "@client/comps/div/Div";
import { Modal } from "@client/comps/modal/Modal";
import { ModalHeader } from "@client/comps/modal/ModalHeader";
import { ModalBody } from "@client/comps/modal/ModalBody";
import { NoticeCard } from "@client/comps/cards/NoticeCard";
import { KinguinCard } from "./KinguinCard";

export const DepositKinguinModal = ({
  onRedeemClick,
  onClose,
}: {
  onRedeemClick: () => void;
  onClose: () => void;
}) => {
  return (
    <Modal
      className="DepositKinguinModal"
      onBackdropClick={onClose}
    >
      <ModalHeader
        heading="Deposit on Kinguin"
        onCloseClick={onClose}
      />
      <ModalBody gap={16}>
        <NoticeCard
          kind="info"
          message="You will be redirected to kinguin.net"
        />
        <Div
          flow="row-wrap"
          gap={8}
        >
          <KinguinCard
            href="https://www.kinguin.net/category/239127/chicken-gg-10-tokens?referrer=chicken.gg&ec=1"
            image="/gift-cards/tokens-10"
          />
          <KinguinCard
            href="https://www.kinguin.net/category/239133/chicken-gg-25-tokens?referrer=chicken.gg&ec=1"
            image="/gift-cards/tokens-25"
          />
          <KinguinCard
            href="https://www.kinguin.net/category/239136/chicken-gg-50-tokens?referrer=chicken.gg&ec=1"
            image="/gift-cards/tokens-50"
          />
          <KinguinCard
            href="https://www.kinguin.net/category/239139/chicken-gg-100-tokens?referrer=chicken.gg&ec=1"
            image="/gift-cards/tokens-100"
          />
          <KinguinCard
            href="https://www.kinguin.net/category/239140/chicken-gg-250-tokens?referrer=chicken.gg&ec=1"
            image="/gift-cards/tokens-250"
          />
          <KinguinCard
            href="https://www.kinguin.net/category/239141/chicken-gg-500-tokens?referrer=chicken.gg&ec=1"
            image="/gift-cards/tokens-500"
          />
          <KinguinCard
            href="https://www.kinguin.net/category/239143/chicken-gg-750-tokens?referrer=chicken.gg&ec=1"
            image="/gift-cards/tokens-750"
          />
          <KinguinCard
            href="https://www.kinguin.net/category/239144/chicken-gg-1000-tokens?referrer=chicken.gg&ec=1"
            image="/gift-cards/tokens-1000"
          />
          <KinguinCard
            href="https://www.kinguin.net/category/253408/chicken-gg-1500-tokens?referrer=chicken.gg&ec=1"
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
