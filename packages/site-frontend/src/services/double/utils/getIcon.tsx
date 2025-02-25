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
