import { useRef } from "react";
import { useEventListener } from "usehooks-ts";
import { Div } from "@client/comps/div/Div";
import { Nav } from "@client/comps/nav/Nav";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { Site } from "#app/services/site";
import "./AppMenuOverlay.scss";
import { BaseMenu } from "./BaseMenu";
import { SiteSearch } from "#app/comps/site-search/SiteSearch";

export const AppMenuOverlay = () => {
  const layout = useAppSelector((x) => x.style.bodyLayout);
  const open = useAppSelector((x) => x.site.menuOverlayOpen);

  if (["laptop", "desktop"].includes(layout)) {
    return null;
  }

  if (!open) {
    return null;
  }

  return <OverlayContent />;
};

const OverlayContent = () => {
  const dispatch = useAppDispatch();
  const innerRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    dispatch(Site.toggleMenuOverlay(false));
  };

  useEventListener("mousedown", (e) => {
    const target = e.target as Element;

    if (innerRef.current?.contains(target)) {
      return;
    }

    const elements = document.elementsFromPoint(e.clientX, e.clientY);
    const isToggle = elements.some((x) => x.id === "menu-toggle");

    if (!isToggle) {
      handleClose();
    }
  });

  return (
    <Div
      className="AppMenuOverlay"
      position="absolute"
      fx
    >
      <Nav
        className="inner-content"
        forwardRef={innerRef}
        flow="column"
        fx
        fy
        gap={20}
        py={20}
        overflow="auto"
        bg="black-hover"
      >
       <Div fx px={20}>
        <SiteSearch />
       </Div>
        <BaseMenu collapsed={false} />
      </Nav>
    </Div>
  );
};
