import { Div } from "@client/comps/div/Div";
import { Link } from "@client/comps/link/Link";
import { Paragraph } from "@client/comps/paragraph/Paragraph";
import { Span } from "@client/comps/span/Span";
import { UnorderedList } from "@client/comps/list/UnorderedList";
import { Button } from "@client/comps/button/Button";
import { Dialogs } from "@client/services/dialogs";
import { FairnessSeedModal } from "#app/modals/fairness/FairnessSeedModal";

export const CaseGameInfoCard = () => {
  return (
    <Div
      column
      gap={16}
    >
      <Paragraph>
        {
          "We calculate the result for each case opening by hashing the combination of following inputs:"
        }
      </Paragraph>
      <UnorderedList
        items={[
          "Client Seed: a random or player provided string.",
          "Server Seed: a SHA-256 hash of 16 random characters.",
          "Nonce: an integer incremented every time a case is opened.",
        ]}
      />
      <Paragraph>
        {
          "Every item in the case has a range of numbers based on its drop rate. If the roll is within that range, the item is dropped."
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
          href="https://onecompiler.com/nodejs/42hvu7yfx"
        >
          {"this code"}
        </Link>
        {" and copying the input below."}
      </Div>
      <Div
        borderTop
        my={8}
      />
      <Div
        display="block"
        fontSize={14}
      >
        {"You must use the "}
        <Span
          color="light-blue"
          weight="semi-bold"
        >
          {"unhashed"}
        </Span>
        {" server seed to verify your results. If you see a "}
        <Span
          color="orange"
          weight="semi-bold"
        >
          {"hashed"}
        </Span>
        {" server seed, you must rotate it on the info page to unhash it."}
      </Div>
    </Div>
  );
};
