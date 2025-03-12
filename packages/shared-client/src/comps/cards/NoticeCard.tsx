import { FC } from "react";
import classNames from "classnames";
import { Div } from "#client/comps/div/Div";
import { Vector } from "#client/comps/vector/Vector";
import { SvgCheckCircle } from "#client/svgs/common/SvgCheckCircle";
import { SvgTimesCirlce } from "#client/svgs/common/SvgTimesCircle";
import { SvgInfoCircle } from "#client/svgs/common/SvgInfoCircle";
import { SvgAlert } from "#client/svgs/common/SvgAlert";
import "./NoticeCard.scss";

export type NoticeKind = "info" | "success" | "warning" | "error";

export type NoticeCardProps = {
  kind: NoticeKind;
  message: string | JSX.Element;
  messageSize?: Unit;
};

const icons = {
  info: SvgInfoCircle,
  success: SvgCheckCircle,
  warning: SvgAlert,
  error: SvgTimesCirlce,
};

export const NoticeCard: FC<NoticeCardProps> = ({
  kind,
  message,
  messageSize = 14,
}) => {
  const icon = icons[kind];
  return (
    <Div
      className={classNames("NoticeCard", kind)}
      fx
    >
      <Vector
        className="icon"
        as={icon}
        size={messageSize + 4}
      />
      <Div
        grow
        align="center"
        color="gray"
        fontSize={messageSize}
      >
        {message}
      </Div>
    </Div>
  );
};
