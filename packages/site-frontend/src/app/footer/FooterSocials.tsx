import { Fragment } from "react";
import { Link } from "@client/comps/link/Link";
import { Div } from "@client/comps/div/Div";
import { SiteLogo } from "#app/comps/site-logo/SiteLogo";
import { useMenuData } from "./useMenuData";
import { Vector } from "@client/comps/vector/Vector";
import { Span } from "@client/comps/span/Span";
import { Conditional } from "@client/comps/conditional/Conditional";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { Divider } from "@client/comps/divider/Divider";
import { SvgExternal } from "@client/svgs/common/SvgExternal";

export const FooterSocials = () => {
  const mainLayout = useAppSelector((x) => x.style.mainLayout);
  return (
    <Fragment>
      <Conditional
        value={mainLayout}
        mobile={<FooterSocialMobile />}
        tablet={<FooterSocialNonMobile />}
        laptop={<FooterSocialNonMobile />}
        desktop={<FooterSocialNonMobile />}
      />
    </Fragment>
  );
};

const FooterSocialMobile = () => {
  const { games, support, community } = useMenuData();
  return (
    <Fragment>
      <Div
        flexFlow="column"
        py={36}
        px={24}
        mt={16}
        bg="brown-6"
      >
        <Div
          align="center"
          justify="center"
          mb={12}
        >
          <SiteLogo />
        </Div>

        <Divider
          as={"div"}
          pb={12}
          borderColor={"brown-4"}
        />

        <Div
          gap={32}
          alignItems="center"
          justifyContent="center"
        >
          {community.items.map((item, index) => (
            <SocialButton
              href={item.href || ""}
              icon={item.icon || SvgExternal}
              label={item.label}
            />
          ))}
        </Div>
      </Div>
    </Fragment>
  );
};

const FooterSocialNonMobile = () => {
  const { games, support, community } = useMenuData();
  return (
    <Fragment>
      <Div
        justify="space-between"
        py={36}
        px={24}
        mt={16}
        bg="brown-6"
      >
        <Div>
          <SiteLogo />
        </Div>

        <Div gap={32}>
          {community.items.map((item) => (
            <SocialButton
              key={item.label}
              href={item.href || ""}
              icon={item.icon || SvgExternal}
              label={item.label}
            />
          ))}
        </Div>
      </Div>
    </Fragment>
  );
};

const SocialButton = ({ label, icon, href }: { label: string; icon: Svg; href: string }) => {
  return (
    <Link
      type="a"
      href={href}
      hover="none"
    >
      <Vector as={icon} />
      <Span
        color="white"
        ml={12}
      >
        {label}
      </Span>
    </Link>
  );
};
