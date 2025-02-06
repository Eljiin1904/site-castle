import { FC } from "react";
import { Vector } from "@client/comps/vector/Vector";
import { SvgSiteLogo } from "@client/svgs/site/SvgSiteLogo";
import { Link } from "@client/comps/link/Link";
import { SvgSiteIcon } from "@client/svgs/site/SvgSiteIcon";

export type SiteLogoProps = {
  scale?: number;
};

export const SiteLogo: FC<SiteLogoProps> = ({ scale = 1.0 }) => {
  return (
    <Link
      type="router"
      to="/"
      hover="none"
    >
      <Vector
        as={SvgSiteLogo}
        className="site-logo"
        width={210 * scale}
        height={36 * scale}
      />
    </Link>
  );
};

export const SiteLogoIcon: FC<SiteLogoProps> = ({ scale = 1.0 }) => {
  return (
    <Link
      type="router"
      to="/"
    >
      <Vector
        as={SvgSiteIcon}
        size={32}
      />
    </Link>
  );
};
