import Animator from "../helpers/Animator";
import { TransformerArg } from "../helpers/Transformer";
import Dimensions, { Anchor, XAnchor, YAnchor } from "./Dims";
import { Point } from "./Point";

type Arg = {
  x?: number;
  y?: number;
  width: number;
  height: number;
  scale?: number;
  padding?: number;
};

type AnimArg = {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
};

export default class Rect {
  private _point: Point;
  // private display = true
  dim: Dimensions;

  private animator = new Animator<Origin>();

  constructor({ x = 0, y = 0, width, height, scale = 1, padding = 0 }: Arg) {
    this._point = {
      x: x - padding,
      y: y - padding,
    };
    this.dim = new Dimensions(width * scale + padding * 2, height * scale + padding * 2);
  }

  get point() {
    const { x, y } = this.animator.transformOrigin({
      origin: this.getOrigin(),
    });
    return { x, y };
  }
  setPoint(point: Point) {
    this._point = point;
  }

  get width() {
    const { width } = this.animator.transformOrigin({
      origin: this.getOrigin(),
    });
    return width;
  }
  get height() {
    const { height } = this.animator.transformOrigin({
      origin: this.getOrigin(),
    });
    return height;
  }

  addTransformer(args: TransformerArg<Origin>) {
    return this.animator.addTransformer(args);
  }

  // could probably be merged with animate
  // mutate({
  //   key,
  //   values,
  //   duration
  // }: {
  //   key: string,
  //   values: TransformerArg<Origin>['endValues'],
  //   duration: number
  // }) {

  //   const startValues = { ...values }
  //   keys(startValues).forEach( k => startValues[k] = 0 )

  //   this.animator.addTransformer({
  //     key,
  //     forwards: true,
  //     startValues,
  //     endValues: values,
  //     duration,
  //   })
  // }

  // unMutate({key, duration}: { key: string, duration?: number }) {
  //   this.animator.reverseTransformer({ key, duration })
  // }

  getPointFromAnchor(yAnchor: YAnchor, xAnchor: XAnchor, { x = 0, y = 0 } = {}) {
    const dimPointDiff = this.dim.getAnchorPointDiff([yAnchor, xAnchor]);
    const curPoint = this.point;
    return {
      x: curPoint.x + dimPointDiff.x + x,
      y: curPoint.y + dimPointDiff.y + y,
    };
  }

  setPosition(point: Point, anchor?: Anchor) {
    const dimPointDiff = anchor ? this.dim.getAnchorPointDiff(anchor) : { x: 0, y: 0 };

    this.setPoint({
      x: point.x - dimPointDiff.x,
      y: point.y - dimPointDiff.y,
    });
  }

  getCanvasArgs() {
    return [this.point.x, this.point.y, this.width, this.height] as const;
  }

  private getOrigin() {
    return {
      x: this._point.x,
      y: this._point.y,
      width: this.dim.width,
      height: this.dim.height,
    };
  }

  // isPointInside({ x, y }: { x: number, y: number }) {
  // 	const { x: startX, y: startY } = this.point
  // 	const { width, height } = this.dim

  // 	const endX = startX + width
  // 	const endY = startY + height

  // 	return x > startX && x < endX && y > startY && y < endY
  // }

  get path() {
    const path = new Path2D();
    path.rect(...this.getCanvasArgs());
    return path;
  }

  // pass-through
  isAnimating() {
    return this.animator.isAnimating();
  }
}

type Origin = ReturnType<Rect["getOrigin"]>;
