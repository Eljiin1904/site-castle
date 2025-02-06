import { useState } from "react";
import { Button } from "@client/comps/button/Button";
import { Div } from "@client/comps/div/Div";
import { Modal } from "@client/comps/modal/Modal";
import { ModalBody } from "@client/comps/modal/ModalBody";
import { ModalHeader } from "@client/comps/modal/ModalHeader";
import { Span } from "@client/comps/span/Span";
import { Dialogs } from "@client/services/dialogs";
import { Link } from "@client/comps/link/Link";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import config from "#app/config";
import { LoginModal } from "../login/LoginModal";

export const ChatEarnModal = () => {
  const [copied, setCopied] = useState(false);
  const authenticated = useAppSelector((x) => x.user.authenticated);
  const username = useAppSelector((x) => x.user.username);
  const bodyLayout = useAppSelector((x) => x.style.bodyLayout);

  const handleCopy = () => {
    navigator.clipboard.writeText(`${config.siteURL}/r/${username}`);
    setCopied(true);
  };

  if (!authenticated) {
    return <LoginModal />;
  }
  return (
    <Modal onBackdropClick={() => Dialogs.close("primary")}>
      <ModalHeader
        heading="Invite Friends, Earn Tokens"
        onCloseClick={() => Dialogs.close("primary")}
      />
      <ModalBody>
        <Div display="block">
          <Span fontWeight="semi-bold">
            {
              "Share your referral link and earn FREE tokens from every friend that signs up!"
            }
          </Span>
          <Link
            type="router"
            to="/affiliate"
            ml={4}
            onClick={() => Dialogs.close("primary")}
          >
            {"Learn More"}
          </Link>
        </Div>
        <Div fx>
          <Div
            grow
            p={12}
            pl={16}
            bg="brown-8"
            border
          >
            <Span color="white">{`${config.siteURL}/r/${username}`}</Span>
          </Div>
          <Button
            kind="primary"
            label={
              copied
                ? "Copied!"
                : bodyLayout === "mobile"
                  ? "Copy"
                  : "Copy Link"
            }
            onClick={handleCopy}
          />
        </Div>
      </ModalBody>
    </Modal>
  );
};
