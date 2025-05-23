import "./BlackjackButton.scss";
import { useCallback, useState } from "react";
import classNames from "classnames";
import { Vector } from "@client/comps/vector/Vector";
import { getBlackjackButtonIcon } from "./utils/getBlackjackButtonIcon";

export const BlackjackButton = ({
  text,
  icon,
  enabled = true,
  onClick,
  long = false,
  secondary = false,
  className: _className = "",
}: {
  text: string;
  icon?: Parameters<typeof getBlackjackButtonIcon>[0];
  enabled?: boolean;
  onClick: () => void;
  long?: boolean;
  secondary?: boolean;
  className?: string;
}) => {
  const [clicked, setClicked] = useState(false);

  let iconObj = icon ? getBlackjackButtonIcon(icon) : null;

  const _onClick = useCallback(() => {
    if (!enabled) return;
    setClicked(true);
    onClick();
    setTimeout(() => {
      setClicked(false);
    });
  }, [onClick, setClicked, enabled]);

  const className = classNames("BlackjackButton", _className, {
    clicked,
    enabled,
    disabled: !enabled,
    long,
    secondary,
  });

  return (
    <div
      className={className}
      onClick={_onClick}
    >
      <div className="button-inner">
        {iconObj && <Vector {...iconObj} />}
        <div className="text">{text}</div>
      </div>
    </div>
  );
};
