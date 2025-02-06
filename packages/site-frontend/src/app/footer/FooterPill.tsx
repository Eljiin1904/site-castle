import { Link, LinkProps } from "@client/comps/link/Link";
import "./FooterPill.scss";

export const FooterPill = (props: LinkProps) => {
  return (
    <Link
      className="FooterPill"
      flexCenter
      gap={8}
      bg="brown-7"
      border
      hover="none"
      {...props}
    />
  );
};
