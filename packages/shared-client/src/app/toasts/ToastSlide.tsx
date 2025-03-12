import classNames from "classnames";
import { Strings } from "@core/services/strings";
import { Div } from "#client/comps/div/Div";
import { Span } from "#client/comps/span/Span";
import { Vector } from "#client/comps/vector/Vector";
import { SvgTimes } from "#client/svgs/common/SvgTimes";
import { ToastInfo } from "#client/types/toasts/ToastInfo";
import { Heading } from "#client/comps/heading/Heading";
import { SvgCheckCircle } from "#client/svgs/common/SvgCheckCircle";
import { SvgAlert } from "#client/svgs/common/SvgAlert";
import { SvgTimesCirlce } from "#client/svgs/common/SvgTimesCircle";
import { SvgInfoCircle } from "#client/svgs/common/SvgInfoCircle";
import "./ToastSlide.scss";

const icons = {
  info: SvgInfoCircle,
  success: SvgCheckCircle,
  warning: SvgAlert,
  error: SvgTimesCirlce,
};

export const ToastSlide = ({
  info,
  onClear,
}: {
  info: ToastInfo;
  onClear: () => void;
}) => {
  const icon = icons[info.kind];

  return (
    <Div
      className={classNames("ToastSlide", info.kind)}
      fx
      boxShadow={2}
      hover="highlight"
      onClick={onClear}
    >
      <Vector
        className="icon"
        as={icon}
        size={24}
      />
      <Div
        grow
        column
        gap={4}
      >
        <Heading size={14}>{Strings.capitalize(info.kind)}</Heading>
        <Span
          size={13}
          color="gray"
        >
          {info.text}
        </Span>
      </Div>
      <Vector
        as={SvgTimes}
        position="absolute"
        right={12}
        top={12}
        color="gray"
        size={12}
      />
    </Div>
  );
};
