import { useState } from "react";
import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { Vector } from "@client/comps/vector/Vector";
import { SvgCaretDown } from "@client/svgs/common/SvgCaretDown";
import { SvgCaretUp } from "@client/svgs/common/SvgCaretUp";
import { SvgProfile } from "#app/svgs/common/SvgProfile";
import { SvgCog } from "@client/svgs/common/SvgCog";
import { SvgVerify } from "#app/svgs/common/SvgVerify";
import { SvgSecurity } from "#app/svgs/common/SvgSecurity";
import { SvgUnLock } from "#app/svgs/common/SvgUnLock";
import { getProfileComp } from "./useProfileData";

export const ProfileDropdowns = () => {
  return (
    <Div
      fx
      column
    >
      <MenuDropdown
        icon={SvgProfile}
        heading="Profile Information"
        name="profile_information"
      />
      <MenuDropdown
        icon={SvgUnLock}
        heading="Change Password"
        name="change_password"
      />
      <MenuDropdown
        icon={SvgSecurity}
        heading="Security (2FA)"
        name="security"
      />
      <MenuDropdown
        icon={SvgVerify}
        heading="Verify"
        name="verify"
      />
      <MenuDropdown
        icon={SvgCog}
        heading="Setting"
        name="settings"
      />
    </Div>
  );
};

const MenuDropdown = ({ icon, heading, name }: { icon: Svg; heading: string; name: string }) => {
  const [open, setOpen] = useState(false);

  return (
    <Div
      column
      gap={12}
      p={16}
      borderTop
      borderBottom
    >
      <Div
        fx
        mb={open ? 4 : undefined}
        onClick={() => setOpen((x) => !x)}
        gap={13}
      >
        <Vector
          as={icon}
          size={16}
          color="dark-sand"
        />
        <Span
          family="title"
          weight="bold"
          color="dark-sand"
          textTransform="uppercase"
          size={12}
        >
          {heading}
        </Span>
        <Div
          grow
          justify="flex-end"
        >
          <Vector
            as={open ? SvgCaretUp : SvgCaretDown}
            size={16}
            color="gray"
          />
        </Div>
      </Div>
      {open && getProfileComp(name)}
    </Div>
  );
};
