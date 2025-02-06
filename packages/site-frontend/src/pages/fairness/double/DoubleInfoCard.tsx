import { Div } from "@client/comps/div/Div";
import { Link } from "@client/comps/link/Link";
import { Paragraph } from "@client/comps/paragraph/Paragraph";
import { UnorderedList } from "@client/comps/list/UnorderedList";

export const DoubleInfoCard = () => {
  return (
    <Div
      column
      gap={16}
    >
      <Paragraph>
        {
          "We calculate the result for each round by hashing the combination of the following inputs:"
        }
      </Paragraph>
      <UnorderedList
        items={[
          "Server Seed: a SHA-256 hash of 16 random characters. We generate and hash this at the start of the round.",
          "EOS Block ID: the unique ID of an EOS block. We commit to a future block at the start of the round then wait for the block to be mined. This ensures we cannot manipulate the result.",
          "Round ID: an integer incremented every round.",
        ]}
      />
      <Paragraph>
        {
          "Every round, we roll a number from 1 to 15. We determine the the result by assigning each number in that range a color based on it's multiplier."
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
          "For independent verification, you may replicate the results of any game by using "
        }
        <Link
          type="a"
          href="https://onecompiler.com/nodejs/42nyrrhf3"
        >
          {"this code"}
        </Link>
        {" and copying the input below."}
      </Div>
    </Div>
  );
};
