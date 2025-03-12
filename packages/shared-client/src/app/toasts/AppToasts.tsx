import { useState, useEffect } from "react";
import { Div } from "#client/comps/div/Div";
import { Toasts } from "#client/services/toasts";
import { ToastInfo } from "#client/types/toasts/ToastInfo";
import { ToastSlide } from "./ToastSlide";
import "./AppToasts.scss";

export const AppToasts = () => {
  const [log, setLog] = useState(Toasts.manager.log);

  useEffect(() => {
    const handler = (inc: ToastInfo[]) => setLog(inc);
    Toasts.manager.on("change", handler);
    return () => {
      Toasts.manager.off("change", handler);
    };
  }, []);

  return (
    <Div
      className="AppToasts"
      fx
    >
      <Div
        className="inner-content"
        position="absolute"
        right={0}
        top={0}
        column
        p={12}
        gap={12}
      >
        {log.map((x, i) => (
          <ToastSlide
            key={i}
            info={x}
            onClear={() => Toasts.manager.remove(x)}
          />
        ))}
      </Div>
    </Div>
  );
};
