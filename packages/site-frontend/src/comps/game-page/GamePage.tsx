import { FC } from "react";
import { PageProps } from "@client/comps/page/Page";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { SitePage } from "../site-page/SitePage";
import { Style } from "@client/services/style";

/**
 * Component to wrap the game pages
 * 
 * @param param0 
 * @returns 
 */
export const GamePage: FC<PageProps> = ({
  children,
  ...forwardProps
}) => {
  
  const layout = useAppSelector((x) => x.style.mainLayout);

  return <SitePage 
    px={Style.responsive(layout, [0, 24, 40, 40])}
    py={Style.responsive(layout, [0, 24, 40, 40])}
    {...forwardProps}>
    {children}
  </SitePage>;
};
