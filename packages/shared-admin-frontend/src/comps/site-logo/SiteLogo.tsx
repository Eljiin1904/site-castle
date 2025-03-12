import { FC } from "react";
import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { Vector } from "@client/comps/vector/Vector";
import { SvgSiteLogo } from "@client/svgs/site/SvgSiteLogo";
import "./SiteLogo.scss";

export type SiteLogoProps = {
  scale?: number;
};

export const SiteLogo: FC<SiteLogoProps> = ({ scale = 1.0 }) => {
  return (
    <Div className="SiteLogo">
      <Vector
        as={SvgSiteLogo}
        width={210 * scale}
        height={36 * scale}
      />
      <Span
        className="accent"
        position="absolute"
        size={10}
        weight="bold"
        color="gold"
      >
        {"ADMIN"}
      </Span>
    </Div>
  );
};
