import { Div } from "@client/comps/div/Div";
import { Tokens } from "@client/comps/tokens/Tokens";

import { useAppSelector } from "#app/hooks/store/useAppSelector";

export const AutoStatusView = () => {
  const autoPlaying = useAppSelector((x) => x.limbo.autoPlaying);
  const autoPnl = useAppSelector((x) => x.limbo.autoPnl);
  const layout = useAppSelector((x) => x.style.mainLayout);
  const sm = layout === "mobile";

  if (!autoPlaying) {
    return null;
  }

  return (
    <Div
      position="absolute"
      fx
      center
      pointerEvents="none"
      style={{
        bottom: sm ? "108px" : "128px",
        zIndex: "1",
      }}
    >
      <Div
        py={8}
        center
        bg="brown-6"
        border
        style={{ width: "160px" }}
      >
        <Tokens
          value={autoPnl}
          accent={autoPnl ? (autoPnl > 0 ? "positive" : "negative") : undefined}
        />
      </Div>
    </Div>
  );
};
