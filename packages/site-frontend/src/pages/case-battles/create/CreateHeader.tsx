import { Div } from "@client/comps/div/Div";
import { Heading } from "@client/comps/heading/Heading";
import { Link } from "@client/comps/link/Link";
import { SvgCaretLeft } from "@client/svgs/common/SvgCaretLeft";
import { Button } from "@client/comps/button/Button";

export const CreateHeader = () => {
  return (
    <Div
      align="center"
      gap={16}
    >
      <Link
        type="router"
        to="/case-battles"
        hover="none"
      >
        <Button
          kind="secondary"
          icon={SvgCaretLeft}
          label="Back"
        />
      </Link>
      <Heading
        as="h2"
        size={18}
      >
        {"Create Case Battle"}
      </Heading>
    </Div>
  );
};
