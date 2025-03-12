import { Div } from "@client/comps/div/Div";
import { Header } from "@client/comps/header/Header";
import { Span } from "@client/comps/span/Span";
import { SvgUser } from "@client/svgs/common/SvgUser";
import { Vector } from "@client/comps/vector/Vector";
import { SiteLogo } from "#app/comps/site-logo/SiteLogo";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { Users } from "#app/services/users";
import { AdminMenu } from "./AdminMenu";
import "./AppHeader.scss";

export const AppHeader = () => {
  const layout = useAppSelector((x) => x.style.mainLayout);
  const username = useAppSelector((x) => x.admin.username);
  const role = useAppSelector((x) => x.admin.role);
  const roleInfo = Users.getRoleInfo(role);

  return (
    <Header
      className="AppHeader"
      position="sticky"
      top={0}
      fx
      bg="brown-6"
      borderBottom
    >
      <Div
        fx
        center
      >
        <Div
          className="inner-content"
          fx
          px={layout === "laptop" ? 24 : undefined}
        >
          <SiteLogo />
          <Div
            grow
            align="center"
            justify="flex-end"
            gap={12}
          >
            <Div
              height={36}
              px={12}
              center
              gap={6}
              bg="brown-7"
              border
              borderColor="brown-4"
            >
              <Vector
                as={roleInfo?.icon || SvgUser}
                size={18}
                color={roleInfo?.color || "gray"}
                hover="highlight"
              />
              <Span
                family="title"
                weight="bold"
                color="white"
              >
                {username}
              </Span>
            </Div>
            <AdminMenu />
          </Div>
        </Div>
      </Div>
    </Header>
  );
};
