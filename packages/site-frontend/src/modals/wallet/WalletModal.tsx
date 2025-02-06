import { useState } from "react";
import { Conditional } from "@client/comps/conditional/Conditional";
import { Div } from "@client/comps/div/Div";
import { Modal } from "@client/comps/modal/Modal";
import { Dialogs } from "@client/services/dialogs";
import { ModalBody } from "@client/comps/modal/ModalBody";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { LoginModal } from "../login/LoginModal";
import { UserEmailConfirmModal } from "../user/UserEmailConfirmModal";
import { DepositBody } from "./deposit/DepositBody";
import { DepositGiftCardBody } from "./deposit-gift-card/DepositGiftCardBody";
import { DepositCryptoBody } from "./deposit-crypto/DepositCryptoBody";
import { DepositPromotionBody } from "./deposit-promotion/DepositPromotionBody";
import { WithdrawBody } from "./withdraw/WithdrawBody";
import { WithdrawCryptoBody } from "./withdraw-crypto/WithdrawCryptoBody";
import { VerificationModal } from "../verification/VerificationModal";
import { RegionBlockModal } from "../system/RegionBlockModal";
import { WalletAction } from "./WalletAction";
import { WalletBanner } from "./WalletBanner";
import { WalletHeader } from "./WalletHeader";
import { WalletReferral } from "./WalletReferral";
import "./WalletModal.scss";

export const WalletModal = ({
  initialAction,
}: {
  initialAction?: WalletAction;
}) => {
  const [action, setAction] = useState<WalletAction>(
    initialAction || "deposit",
  );
  const bodyLayout = useAppSelector((x) => x.style.bodyLayout);
  const authenticated = useAppSelector((x) => x.user.authenticated);
  const emailConfirmed = useAppSelector((x) => x.user.emailConfirmed);
  const restricted = useAppSelector((x) => x.user.restricted);
  const kycTier = useAppSelector((x) => x.user.kyc.tier);

  if (restricted) {
    return <RegionBlockModal />;
  }
  if (!authenticated) {
    return <LoginModal />;
  }
  if (!emailConfirmed) {
    return <UserEmailConfirmModal />;
  }
  return (
    <Modal
      className="WalletModal"
      onBackdropClick={() => Dialogs.close("primary")}
    >
      <Div fy>
        <Conditional
          value={bodyLayout}
          laptop={<WalletBanner />}
          desktop={<WalletBanner />}
        />
        <Div
          className="wallet-content"
          column
        >
          <WalletHeader
            action={action}
            setAction={(x) => {
              if (kycTier < 1 && x === "withdraw") {
                Dialogs.open("primary", <VerificationModal />);
              } else {
                setAction(x);
              }
            }}
          />
          <ModalBody gap={0}>
            <WalletReferral />
            <Conditional
              value={action}
              deposit={
                <DepositBody
                  setAction={setAction}
                  setOpen={(x) =>
                    Dialogs.open("primary", <WalletModal initialAction={x} />)
                  }
                />
              }
              depositCrypto={<DepositCryptoBody setAction={setAction} />}
              depositGiftCard={<DepositGiftCardBody setAction={setAction} />}
              depositPromotion={<DepositPromotionBody setAction={setAction} />}
              withdraw={<WithdrawBody setAction={setAction} />}
              withdrawCrypto={<WithdrawCryptoBody setAction={setAction} />}
            />
          </ModalBody>
        </Div>
      </Div>
    </Modal>
  );
};
