import "./BlackjackButton.scss";
import { useCallback, useState } from "react";
import classNames from "classnames";
import { Vector } from "@client/comps/vector/Vector";
import { getBlackjackButtonIcon } from "./utils/getBlackjackButtonIcon";
import { Div } from "@client/comps/div/Div";

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

  function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <Div
      border={true}
      px={20}
      py={8}
      grow
      align="center"
      justify="center"
      borderColor="brown-4"
    >
      <div
        className={className}
        onClick={_onClick}
      >
        <Div gap={10}>
          {iconObj && <Vector {...iconObj} />}
          <Div
            className="text"
            color="light-sand"
          >
            {capitalizeFirstLetter(text)}
          </Div>
        </Div>
      </div>
    </Div>
  );
};
