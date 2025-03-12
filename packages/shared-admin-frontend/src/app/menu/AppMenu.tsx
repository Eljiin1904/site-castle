import { useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import classNames from "classnames";
import { Div } from "@client/comps/div/Div";
import { Nav } from "@client/comps/nav/Nav";
import { MenuHeader } from "./MenuHeader";
import { MenuItem } from "./MenuItem";
import { useMenuItems } from "./useMenuItems";
import "./AppMenu.scss";

export const AppMenu = () => {
  const [animate, setAnimate] = useState(false);
  const [collapsed, setCollapsed] = useLocalStorage("menu-collapsed", false);
  const items = useMenuItems();

  const handleToggle = (x: boolean) => {
    setAnimate(true);
    setCollapsed(x);
  };

  return (
    <Div
      className={classNames("AppMenu", {
        animate,
        opened: !collapsed,
        closed: collapsed,
      })}
      column
      fy
      bg="brown-6"
      borderRight
    >
      <MenuHeader
        collapsed={collapsed}
        handleToggle={handleToggle}
      />
      <Nav
        className="menu-list"
        column
        justify="flex-start"
      >
        {items.map((x, i) => (
          <MenuItem
            {...x}
            key={i}
            showLabel={!collapsed}
          />
        ))}
      </Nav>
    </Div>
  );
};
