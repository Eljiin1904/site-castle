import { Div } from "@client/comps/div/Div";
import { Link } from "@client/comps/link/Link";
import { Paragraph } from "@client/comps/paragraph/Paragraph";
import { UnorderedList } from "@client/comps/list/UnorderedList";

export const CaseBattlesInfoCard = () => {
  return (
    <Div
      column
      gap={16}
    >
      <Paragraph>
        {
          "We calculate the result for each battle by hashing the combination of the following inputs:"
        }
      </Paragraph>
      <UnorderedList
        items={[
          "Server Seed: a SHA-256 hash of 16 random characters. We generate and hash this when the battle is created.",
          "EOS Block ID: the unique ID of an EOS block. We commit to a future block at the start of the battle then wait for the block to be mined. This ensures we cannot manipulate the result.",
          "Nonce: an integer incremented every round.",
          "Seat Index: an integer representing the seat index of the player.",
        ]}
      />
      <Paragraph>
        {
          "Every round, we roll item drops for each player. Every item in each case has a range of numbers based on its drop rate. If the roll is within that range, the item is dropped."
        }
      </Paragraph>
      <Paragraph>
        {
          "After every round has been played, we determine the winner(s) by adding up the results from each round. In the case of multiple winners, the pot is split evenly amongst them."
        }
      </Paragraph>
      <Div
        borderTop
        my={8}
      />
      <Div
        display="block"
        fontSize={14}
      >
        {
          "For independent verification, you may replicate the results of any battle by using "
        }
        <Link
          type="a"
          href="https://onecompiler.com/nodejs/42hymryub"
        >
          {"this code"}
        </Link>
        {" and copying the input below."}
      </Div>
    </Div>
  );
};
