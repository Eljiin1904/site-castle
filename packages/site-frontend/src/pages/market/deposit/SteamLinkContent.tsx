import { Button } from "@client/comps/button/Button";
import { Div } from "@client/comps/div/Div";
import { Heading } from "@client/comps/heading/Heading";
import { Img } from "@client/comps/img/Img";
import { Dialogs } from "@client/services/dialogs";
import { SocialAuthStartModal } from "#app/modals/security/SocialAuthStartModal";

export const SteamLinkContent = () => {
  return (
    <Div
      column
      center
      py={16}
    >
      <Img
        type="png"
        path="/graphics/notice-chicken-error"
        width="256px"
      />
      <Heading
        as="h1"
        className="title"
        size={20}
        textAlign="center"
        mt={32}
        mb={16}
      >
        {"Steam Link Required"}
      </Heading>
      <Div
        display="block"
        fontSize={14}
        color="gray"
        textAlign="center"
        px={16}
        mb={24}
      >
        {"Please link your Steam account to use the marketplace."}
      </Div>
      <Div
        fx
        center
      >
        <Button
          kind="primary"
          label="Link Steam Account"
          style={{ minWidth: "200px" }}
          onClick={() =>
            Dialogs.open("primary", <SocialAuthStartModal provider="steam" />)
          }
        />
      </Div>
    </Div>
  );
};
