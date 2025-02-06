import { Button } from "@client/comps/button/Button";
import { Div } from "@client/comps/div/Div";
import { Heading } from "@client/comps/heading/Heading";
import { Img } from "@client/comps/img/Img";
import { Dialogs } from "@client/services/dialogs";
import { ModalBody } from "@client/comps/modal/ModalBody";
import { SocialAuthStartModal } from "#app/modals/security/SocialAuthStartModal";

export const SteamLinkContent = () => {
  return (
    <ModalBody>
      <Img
        type="png"
        path="/graphics/notice-chicken-error"
        width="256px"
        mt={16}
      />
      <Div
        column
        mt={32}
      >
        <Heading
          as="h1"
          className="title"
          size={20}
          textAlign="center"
        >
          {"Steam Link Required"}
        </Heading>
        <Div
          display="block"
          fontSize={14}
          color="gray"
          textAlign="center"
          px={16}
          mt={16}
        >
          {"Please link your Steam account to use the marketplace."}
        </Div>
      </Div>
      <Button
        fx
        kind="primary"
        label="Link Steam Account"
        style={{ minWidth: "200px" }}
        onClick={() =>
          Dialogs.open("primary", <SocialAuthStartModal provider="steam" />)
        }
      />
    </ModalBody>
  );
};
