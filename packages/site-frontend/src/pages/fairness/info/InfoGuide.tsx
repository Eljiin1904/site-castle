import { FairnessSeedModal } from "#app/modals/fairness/FairnessSeedModal";
import { Button } from "@client/comps/button/Button";
import { Div } from "@client/comps/div/Div";
import { Heading } from "@client/comps/heading/Heading";
import { Paragraph } from "@client/comps/paragraph/Paragraph";
import { Dialogs } from "@client/services/dialogs";

export const InfoGuide = () => {
  return (
    <Div
      fx
      column
      gap={24}
    >
      <Div
        column
        gap={16}
      >
        <Heading
          as="h1"
          size={24}
        >
          {"What is Provably Fair?"}
        </Heading>
        <Paragraph>
          {
            '"Provably fair" means we can prove that the game\'s results were generated before anyone placed a bet.'
          }
        </Paragraph>
        <Paragraph>
          {
            "Additionally, we also provide open-source access to the game's code responsible for generating results. This allows users to check the code themselves to ensure fairness."
          }
        </Paragraph>
      </Div>
      <Div
        column
        gap={16}
      >
        <Heading
          as="h1"
          size={24}
        >
          {"How does that make it fair?"}
        </Heading>
        <Paragraph>
          {"We generate the game's result before you place your bet."}
        </Paragraph>
        <Paragraph>
          {
            "Once you've made your bet, you can verify that the outcome matches the pre-generated result."
          }
        </Paragraph>
        <Paragraph>
          {
            "If the outcome of your bet doesn't match the pre-generated result, it indicates manipulation."
          }
        </Paragraph>
      </Div>
      <Div borderTop />
      <Paragraph>
        {
          "For singleplayer games, a client seed, a server seed and a nonce are used as input to determine the outcome of the game."
        }
      </Paragraph>
      <Div borderTop />
      <Button
        kind="primary"
        label="Manage Seeds"
        onClick={() => Dialogs.open("primary", <FairnessSeedModal />)}
      />
    </Div>
  );
};
