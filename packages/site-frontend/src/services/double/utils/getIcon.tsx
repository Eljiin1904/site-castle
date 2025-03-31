import { SvgDoubleBaitIcon } from "#app/svgs/double/SvgDoubleBaitIcon";
import { SvgDoubleBlackIcon } from "#app/svgs/double/SvgDoubleBlackIcon";
import { SvgDoubleGreenIcon } from "#app/svgs/double/SvgDoubleGreenIcon";
import { SvgDoubleRedIcon } from "#app/svgs/double/SvgDoubleRedIcon";
import { DoubleBetKind } from "@core/types/double/DoubleBetKind";
import { DoubleColor } from "@core/types/double/DoubleColor";

export function getImageFromColor({ color, bait }: { color: DoubleColor; bait: boolean }) {
  let path;

  if (color === "green") {
    path = "/graphics/double-castle";
  } else if (bait) {
    path = "/graphics/double-jewels";
  } else if (color === "red") {
    path = "/graphics/double-camel";
  } else {
    path = "/graphics/double-man";
  }

  return path;
}

export function getImageFromBetKind(kind: DoubleBetKind) {
  let path;

  if (kind === "green") {
    path = "/graphics/double-castle";
  } else if (kind === "bait") {
    path = "/graphics/double-jewels";
  } else if (kind === "red") {
    path = "/graphics/double-camel";
  } else {
    path = "/graphics/double-man";
  }
  return path;
}

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
    icon =  SvgDoubleBaitIcon
  } else if (color === "red") {
    icon =  SvgDoubleRedIcon
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