import { useCallback, useEffect, useState } from "react";
import classNames from "classnames";
import { maxBet } from "#core/services/blackjack/Blackjack";
import { SvgSiteToken } from "#client/svgs/site/SvgSiteToken";
import { Vector } from "#client/comps/vector/Vector";
import "./BlackjackHiddenInput.scss";

export type HiddenInputAlign = "left" | "center" | "right";

// TODO bug: if val exceeds max-bet or tokenBalance,
// total num doesn't trigger change to overwrite input
// ex allows you to keep typing
export const BlackjackHiddenInput = ({
  initValue,
  align,
  onChange,
}: {
  initValue: string;
  align: HiddenInputAlign;
  onChange: (num: number) => void;
}) => {
  const [textValue, setTextValue] = useState(initValue);

  const _onChange = useCallback(
    ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
      const newStr = value.replace(/[^0-9\.]/g, "");
      let num = parseFloat(newStr);
      if (isNaN(num) || newStr[newStr.length - 1] === ".") {
        setTextValue(newStr);
        return;
      }
      if (num > maxBet) num = maxBet;
      const val = Math.floor(num * 10) / 10;
      setTextValue(val.toString());
      onChange(val);
    },
    [setTextValue, onChange],
  );

  const cancelBubble = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    return false;
  }, []);

  useEffect(() => {
    setTextValue(initValue);
  }, [initValue]);

  const className = classNames("BlackjackHiddenInput", align);

  return (
    <div
      className={className}
      onClick={cancelBubble}
    >
      <div className="currency-overlay">
        <Vector
          className="icon"
          as={SvgSiteToken}
          size={14}
        />
        <div className="hidden-text">{textValue}</div>
      </div>
      <input
        type="text"
        value={textValue}
        onChange={_onChange}
      />
    </div>
  );
};
