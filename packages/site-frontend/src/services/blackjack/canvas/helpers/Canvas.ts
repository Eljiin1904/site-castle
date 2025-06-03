import { createCanvas } from "../dom/createCanvas";
import EventEmitter from "./EventEmitter";
import Rect from "../vectors/Rect";
import { getSubMousePos } from "../utils/getSubMousePos";

export type RenderArg = {
  ctx: CanvasRenderingContext2D;
  setAnimating: (animating: boolean) => void;
};

type RenderFn = (arg: RenderArg) => void;

type Arg = {
  events: EventEmitter;
  addEvents?: boolean;
};

export type CanvasMouseEvent = {
  x: number;
  y: number;
  ctx: CanvasRenderingContext2D;
};

export default class Canvas {
  canvas: ReturnType<typeof createCanvas>;
  ctx: CanvasRenderingContext2D;
  private rect = new Rect({ width: 1000, height: 1000 });
  private events: EventEmitter;

  constructor({ events, addEvents = true }: Arg) {
    this.events = events;
    const { width, height } = this.rect.dim;
    this.canvas = createCanvas({ width, height });
    const ctx = this.canvas.getContext("2d");
    if (!ctx) throw new Error("Failed to get canvas context");

    this.ctx = ctx;

    // should switch events to use key instead
    // if (addEvents) this.addEvents();
  }

  private renderFn?: RenderFn;
  animating = false;

  setRenderer(renderFn: RenderFn) {
    this.renderFn = renderFn;
    this.queueRender();
  }

  private render() {
    this.animating = false;
    this.clear();
    if (!this.renderFn) throw new Error("No render function set");
    this.renderFn({
      ctx: this.ctx,
      setAnimating: this.setAnimating.bind(this),
    });
    if (this.animating) this.queueRender();
  }
  private setAnimating(animating: boolean) {
    if (animating) this.animating = true;
  }

  // private ref = {};
  private queueRender() {
    // const ref = {};
    // this.ref = ref;
    requestAnimationFrame(() => {
      // if (ref !== this.ref) return;
      this.render();
    });
  }

  clear() {
    this.ctx.clearRect(0, 0, this.rect.dim.width, this.rect.dim.height);
  }

  // hooks
  positionOpts() {
    return {
      getCanvasAnchorPoint: this.getPointFromAnchor.bind(this),
    };
  }

  // pass through
  getPointFromAnchor(...args: Parameters<Rect["getPointFromAnchor"]>) {
    return this.rect.getPointFromAnchor(...args);
  }

  // this took a really long time to figure out and I might need it again
  // ========================
  // addEvents() {
  //   let ref = {};
  //   this.canvas.addEventListener("mousemove", (e) => {
  //     e.preventDefault();
  //     e.stopPropagation();

  //     let _ref = {};
  //     ref = _ref;
  //     requestAnimationFrame(() => {
  //       if (ref !== _ref) return;
  //       const { x, y } = getSubMousePos(this.canvas, e);
  //       this.events.emit("mousemove", {
  //         x,
  //         y,
  //         ctx: this.ctx,
  //       } as CanvasMouseEvent);
  //     });

  //     return false;
  //   });

  //   this.canvas.addEventListener("mouseup", (e) => {
  //     e.preventDefault();
  //     e.stopPropagation();

  //     const { x, y } = getSubMousePos(this.canvas, e);
  //     this.events.emit("mouseup", { x, y, ctx: this.ctx } as CanvasMouseEvent);

  //     return false;
  //   });

  //   this.events.on("cursor", (cursor: string) => {
  //     this.canvas.style.cursor = cursor;
  //   });
  //   this.events.on("render", () => {
  //     this.queueRender();
  //   });
  // }
}

export type CanvasPositionOpts = ReturnType<Canvas["positionOpts"]>;
