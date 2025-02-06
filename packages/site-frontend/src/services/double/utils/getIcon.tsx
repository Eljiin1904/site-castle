import { DoubleBetKind } from "@core/types/double/DoubleBetKind";
import { DoubleColor } from "@core/types/double/DoubleColor";
import { SvgDoubleGreenIcon } from "#app/svgs/double/SvgDoubleGreenIcon";
import { SvgDoubleBaitIcon } from "#app/svgs/double/SvgDoubleBaitIcon";
import { SvgDoubleBlackIcon } from "#app/svgs/double/SvgDoubleBlackIcon";
import { SvgDoubleRedIcon } from "#app/svgs/double/SvgDoubleRedIcon";

export function getIconFromColor({
  color,
  bait,
}: {
  color: DoubleColor;
  bait: boolean;
}) {
  let icon;

  if (color === "green") {
    icon = SvgDoubleGreenIcon;
  } else if (bait) {
    icon = SvgDoubleBaitIcon;
  } else if (color === "red") {
    icon = SvgDoubleRedIcon;
  } else {
    icon = SvgDoubleBlackIcon;
  }

  return icon;
}

export function getIconFromBetKind(kind: DoubleBetKind) {
  let icon;

  if (kind === "green") {
    icon = SvgDoubleGreenIcon;
  } else if (kind === "bait") {
    icon = SvgDoubleBaitIcon;
  } else if (kind === "red") {
    icon = SvgDoubleRedIcon;
  } else {
    icon = SvgDoubleBlackIcon;
  }

  return icon;
}
