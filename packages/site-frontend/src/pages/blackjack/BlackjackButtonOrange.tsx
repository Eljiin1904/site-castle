import { useCallback } from "react";
import "./BlackjackButtonOrange.scss";
import classNames from "classnames";

export const BlackjackButtonOrange = ({
  text,
  onClick: _onClick,
  disabled,
  secondary,
}: {
  text: string;
  onClick: () => void;
  disabled?: boolean;
  secondary?: boolean;
}) => {
  const onClick = useCallback(() => {
    if (disabled) return;
    _onClick();
  }, [_onClick]);

  const className = classNames("BlackjackButtonOrange", {
    disabled,
    secondary,
  });

  return (
    <div
      className={className}
      onClick={onClick}
    >
      {text}
    </div>
  );
};
