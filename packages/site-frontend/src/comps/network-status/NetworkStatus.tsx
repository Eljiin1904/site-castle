import React from "react";
import classNames from "classnames";
import { Fragment } from "react/jsx-runtime";
import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { Site } from "#app/services/site";
import { Vector } from "@client/comps/vector/Vector";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import "./NetworkStatus.scss";

export const NetworkStatus = ({
  original = true,
}: {
  original?: boolean;
}) => {
  
  const latency = useAppSelector((state) => state.site.latency) ?? 0;
  const status = Site.getNetworkStatus(latency);
  const icon = Site.getNetworkIcon(latency);
  const color = Site.getNetworkColor(status);

  return (
    <Div
      className={classNames("NetworkStatus", {original})}
      align="center"
      justify="center"
      px={original ? 12: 0}
      left={original ?  16: 0}
      top={original ? 16: 0}
      height={40}
    >
      <MemoizeNetworkStatus status={status} icon={icon} color={color} />      
    </Div>
  );
};

const Status = ({status, icon, color}: {status: Site.NetworkStatus, icon: Svg, color: Color}) => {

  const { t } = useTranslation(["common"]);
  
  return (<Fragment>
      <Vector as={icon} size={16} color={color} />      
      <Span 
        color="white"
        fontSize={12}
      >
        {t(`common:network${status}`)}
      </Span>
  </Fragment>
  );
};

const MemoizeNetworkStatus = React.memo(Status, (prevProps, nextProps) => {
  return prevProps.status === nextProps.status && 
  prevProps.icon === nextProps.icon && 
  prevProps.color === nextProps.color;
});