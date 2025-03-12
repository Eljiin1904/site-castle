import { Dropdown } from "@client/comps/dropdown/Dropdown";
import { SvgSignOut } from "@client/svgs/common/SvgSignOut";
import { Dialogs } from "@client/services/dialogs";
import { Button } from "@client/comps/button/Button";
import { SvgCog } from "@client/svgs/common/SvgCog";
import { SvgCode } from "@client/svgs/common/SvgCode";
import { MenuDropdownProps } from "@client/comps/dropdown/MenuDropdown";
import { AdminLogoutModal } from "#app/modals/admin/AdminLogoutModal";
import { useAppSelector } from "#app/hooks/store/useAppSelector";

export const AdminMenu = () => {
  const role = useAppSelector((x) => x.admin.role);

  const options: MenuDropdownProps["options"] = [];

  if (role === "developer") {
    options.push({
      type: "router",
      to: "/dev",
      label: "Scripts",
      iconLeft: SvgCode,
    });
  }

  options.push({
    type: "action",
    label: "Sign Out",
    iconLeft: SvgSignOut,
    onClick: () => Dialogs.open("secondary", <AdminLogoutModal />),
  });

  return (
    <Dropdown
      type="menu"
      button={
        <Button
          kind="secondary"
          size="sm"
          icon={SvgCog}
        />
      }
      options={options}
    />
  );
};
