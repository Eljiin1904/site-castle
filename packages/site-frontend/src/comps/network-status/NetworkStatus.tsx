import React from "react";
import { Fragment } from "react/jsx-runtime";
import { Circle } from "@client/comps/circle/Circle";
import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import "./NetworkStatus.scss";
import { Site } from "#app/services/site";

export const NetworkStatus = () => {
  
  const latency = useAppSelector((state) => state.site.latency) ?? 0;
  const status = Site.network.getStatus(latency);
  
  return (
    <Div
      className={"NetworkStatus"}
      align="center"
      justify="center"
      px={12}
      left={16}
      top={16}
      height={40}
    >
      <MemoizeNetworkStatus status={status} />
    </Div>
  );
};

const Status = ({status}: {status: Site.NetworkStatus}) => {

  const { t } = useTranslation(["common"]);
  const latencyColor = Site.network.getColor(status);
  
  return (<Fragment>
      <Circle
        as="div"
        width={8}
        height={8}
        color="white"
        alignItems="center"
        justifyContent="center"
        bg={latencyColor}
        mr={5}
      />
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
  return prevProps.status === nextProps.status;
});
