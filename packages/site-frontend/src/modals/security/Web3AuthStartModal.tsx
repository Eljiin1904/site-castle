import config from "#app/config";
import React, { useState } from "react";
import { Button } from "@client/comps/button/Button";
import { Dialogs } from "@client/services/dialogs";
import { Div } from "@client/comps/div/Div";
import { Modal } from "@client/comps/modal/Modal";
import { ModalBody } from "@client/comps/modal/ModalBody";
import { ModalHeader } from "@client/comps/modal/ModalHeader";
import { ModalLabel } from "@client/comps/modal/ModalLabel";
import { Span } from "@client/comps/span/Span";
import { Spinner } from "@client/comps/spinner/Spinner";
import { SvgExternal } from "@client/svgs/common/SvgExternal";
import { Utility } from "@client/services/utility";
import { useLocation } from "react-router-dom";
import { useAuthStatus, useAuthRedirect, useAuthSearch } from "#app/hooks/security/useAuthState";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { useMetaMaskAuth } from "#app/hooks/security/useMetaMaskAuth";
import { useMount } from "@client/hooks/system/useMount";

export const Web3AuthStartModal = () => {
  // const [status, setStatus] = useAuthStatus();
  // const [, setReturnTo, removeReturnTo] = useAuthRedirect();
  // const [, , removeSearch] = useAuthSearch();
  // const { pathname } = useLocation();
  const bodyLayout = useAppSelector((x) => x.style.bodyLayout);
  const label = "Metamask";

  const { account, signer, connectMetaMask } = useMetaMaskAuth();
  const [authToken, setAuthToken] = useState<string | null>(null);

  const signMessage = async () => {
    if (!signer || !account) return;

    // Fetch nonce from the backend
    const response = await fetch(`${config.apiURL}/auth/nonce`, {
      method: "POST",
      body: JSON.stringify({ address: account }),
      headers: { "Content-Type": "application/json" },
    });

    const { nonce } = await response.json();

    // Sign the nonce
    const signature = await signer.signMessage(nonce);

    // Send the signature to the backend for verification
    const authResponse = await fetch(`${config.apiURL}/auth/nonceVerify`, {
      method: "POST",
      body: JSON.stringify({ address: account, signature }),
      headers: { "Content-Type": "application/json" },
    });

    const { token } = await authResponse.json();
    setAuthToken(token);
  };

  return (
    <Modal
      className="AuthStartModal"
      width="sm"
      disableBackdrop
    >
      <ModalHeader
        heading={`Logging in with ${label}`}
        onCloseClick={() => Dialogs.close("primary")}
      />
      <ModalBody textAlign="center">
        <Spinner
          size={80}
          mt={32}
          mb={24}
        />
        <ModalLabel>{`A popup window should have opened with the ${label} login page.`}</ModalLabel>
        <Div
          fx
          column
          center
          gap={16}
        >
          Hello there
          {account ? (
            <div>
              <p>Connected as: {account}</p>
              <button onClick={signMessage}>Sign In</button>
            </div>
          ) : (
            <button onClick={connectMetaMask}>Connect MetaMask</button>
          )}
          {authToken && <p>Authenticated! Token: {authToken}</p>}
        </Div>
      </ModalBody>
    </Modal>
  );
};
