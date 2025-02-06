import { Div } from "@client/comps/div/Div";
import { Link } from "@client/comps/link/Link";
import { Paragraph } from "@client/comps/paragraph/Paragraph";
import { UnorderedList } from "@client/comps/list/UnorderedList";
import { Button } from "@client/comps/button/Button";
import { Dialogs } from "@client/services/dialogs";
import { FairnessSeedModal } from "#app/modals/fairness/FairnessSeedModal";

export const LimboInfoCard = () => {
  return (
    <Div
      column
      gap={16}
    >
      <Paragraph>
        {
          "We calculate the result for each game by hashing the combination of the following inputs:"
        }
      </Paragraph>
      <UnorderedList
        items={[
          "Client Seed: a random or player provided string.",
          "Server Seed: a SHA-256 hash of 16 random characters.",
          "Nonce: an integer incremented every time a game is played.",
        ]}
      />
      <Paragraph>
        {
          "Every game, we roll a number from 1 to 100,000,000 then convert it to a multiplier. If the target is less than or equal to the multiplier, then the user wins."
        }
      </Paragraph>
      <Div
        borderTop
        my={8}
      />
      <Button
        kind="primary"
        label="Manage Seeds"
        onClick={() => Dialogs.open("primary", <FairnessSeedModal />)}
        style={{ maxWidth: "300px" }}
      />
      <Div
        borderTop
        my={8}
      />
      <Div
        display="block"
        fontSize={14}
      >
        {
          "For independent verification, you may replicate the results of any game by using "
        }
        <Link
          type="a"
          href="https://onecompiler.com/nodejs/42xmm7gm3"
        >
          {"this code"}
        </Link>
        {" and copying the input below."}
      </Div>
    </Div>
  );
};
