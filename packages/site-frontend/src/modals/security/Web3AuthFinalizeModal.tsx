import { Http } from "@client/services/http";
import { UserLinkProvider } from "@core/types/users/UserLinkProvider";
import { Modal } from "@client/comps/modal/Modal";
import { ModalBody } from "@client/comps/modal/ModalBody";
import { ModalHeader } from "@client/comps/modal/ModalHeader";
import { Spinner } from "@client/comps/spinner/Spinner";
import { useMount } from "@client/hooks/system/useMount";
import { Dialogs } from "@client/services/dialogs";
import { Toasts } from "@client/services/toasts";
import { useAuthStatus, useAuthRedirect, useAuthSearch } from "#app/hooks/security/useAuthState";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { ethers } from "ethers";
import { Security } from "#app/services/security";
import { Users } from "#app/services/users";
import { SocialAuthRegisterModal } from "./SocialAuthRegisterModal";

type SignatureCapture = {
  nonce: string;
  signature: string;
};

export const Web3AuthFinalizeModal = ({
  address,
  signer,
  provider,
  walletProvider,
}: {
  address: string;
  signer: ethers.JsonRpcSigner | null;
  provider: UserLinkProvider;
  walletProvider: string;
}) => {
  const [, , removeStatus] = useAuthStatus();
  const [, , removeReturnTo] = useAuthRedirect();
  const [, , removeSearch] = useAuthSearch();
  const dispatch = useAppDispatch();

  useMount(
    async () => {
      console.log("Web3Auth modal mounted with account " + address);
      const signCapture = await signMessage();
      if (signCapture == null) {
        console.log("no signature captured");
        return;
      }
      const nonce = signCapture.nonce;
      const signature = signCapture.signature;

      removeStatus();
      removeSearch();
      removeReturnTo();

      const search = "?address=" + address + "&nonce=" + nonce + "&signature=" + signature;
      const res = await Security.authSocial({ provider, search });

      if (res.action === "register") {
        Dialogs.open(
          "primary",
          <SocialAuthRegisterModal
            provider={provider}
            emailRequired={true}
            linkToken={res.linkToken}
          />,
        );
      } else if (res.action === "login") {
        dispatch(Users.initUser({ authenticated: true, user: res.user }));
        Toasts.success("signin.success", 5000, { username: res.user.username });
        Dialogs.close("primary");
      }
    },
    (err) => {
      Toasts.error(err);
      Dialogs.close("primary");
    },
  );

  const signMessage = async (): Promise<SignatureCapture | undefined> => {
    if (!signer || !address) {
      console.log("signer or account missing");
      return;
    }

    // Fetch nonce from the backend
    const data = { address: address };
    const resp = await Http.post("/auth/nonce", data);

    const { nonce } = await resp;
    console.log("got a nonce back:" + nonce);

    // Sign the nonce
    const signature = await signer.signMessage(nonce);
    return { nonce, signature };
  };

  return (
    <Modal
      className="AuthFinalizeModal"
      width="sm"
      disableBackdrop
    >
      <ModalHeader
        heading={`Logging in with ${walletProvider}`}
        hideClose
      />
      <ModalBody>
        <Spinner size={64} />
      </ModalBody>
    </Modal>
  );
};
