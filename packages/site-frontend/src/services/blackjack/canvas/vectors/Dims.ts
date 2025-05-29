import { Point } from "./Point";

export type YAnchor = "top" | "center" | "bottom";
export type XAnchor = "left" | "center" | "right";
export type Anchor = [YAnchor, XAnchor];

export default class Dims {
  constructor(
    public width: number,
    public height: number,
  ) {}

  getAnchorPointDiff([yLoc, xLoc]: Anchor): Point {
    const xMult = xLoc === "center" ? 0.5 : xLoc === "right" ? 1 : 0;
    const yMult = yLoc === "center" ? 0.5 : yLoc === "bottom" ? 1 : 0;
    const x = this.width * xMult;
    const y = this.height * yMult;
    return { x, y };
  }
}
