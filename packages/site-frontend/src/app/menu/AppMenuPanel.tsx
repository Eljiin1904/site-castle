import classNames from "classnames";
import { Div } from "@client/comps/div/Div";
import { Nav } from "@client/comps/nav/Nav";
import { Site } from "#app/services/site";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { MenuHeader } from "./panel/MenuHeader";
import "./AppMenuPanel.scss";
import { BaseMenu } from "./BaseMenu";

export const AppMenuPanel = () => {
  const layout = useAppSelector((x) => x.style.bodyLayout);

  if (["mobile", "tablet"].includes(layout)) {
    return null;
  }

  return <PanelContent />;
};

const PanelContent = () => {
  const collapsed = useAppSelector((x) => x.site.menuPanelCollapsed);
  const animate = useAppSelector((x) => x.site.menuPanelCollapsedChanged);
  const dispatch = useAppDispatch();

  return (
    // TODO: make background color configurable
    <Div
      className={classNames("AppMenuPanel", {
        animate,
        opened: !collapsed,
        closed: collapsed,
      })}
      column
      fy
      bg="black-hover"
    >
      <MenuHeader
        collapsed={collapsed}
        handleToggle={() => dispatch(Site.collapseMenuPanel(!collapsed))}
      />
      <Div
        borderRight
        borderColor="brown-4"
      >
        <Nav
          className="menu-list"
          column
          justify="flex-start"
          fx
        >
          <BaseMenu collapsed={collapsed} />
        </Nav>
      </Div>
    </Div>
  );
};