import { Div } from "@client/comps/div/Div";
import { Heading } from "@client/comps/heading/Heading";

export const NavSection = ({
  heading,
  children,
}: {
  heading: string;
  children: any;
}) => {
  return (
    <Div
      className="nav-section"
      column
      fx
    >
      <Heading
        as="h2"
        p={16}
      >
        {heading}
      </Heading>
      {children}
    </Div>
  );
};
