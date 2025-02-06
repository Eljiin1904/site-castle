import BezierEasing from "bezier-easing";

type PlayOptions = {
  axis: "x" | "y";
  timing: "ease" | "slide";
  startValue: number;
  endValue: number;
  duration: number;
  initTime?: number;
  onPlay?: () => void;
  onUpdate?: (x: number) => void;
  onStop?: () => void;
};

export class AnimationManager {
  element: HTMLDivElement;
  axis: "x" | "y";
  timing: "ease" | "slide";
  startValue: number;
  endValue: number;
  duration: number;
  startTime: number;
  interval?: NodeJS.Timeout;
  resolve?: () => void;
  onPlay?: () => void;
  onUpdate?: (x: number) => void;
  onStop?: () => void;

  constructor(element: HTMLDivElement) {
    this.element = element;
    this.axis = "x";
    this.timing = "ease";
    this.startValue = 0;
    this.endValue = 0;
    this.duration = 0;
    this.startTime = 0;
  }

  set(axis: "x" | "y", value: number) {
    this.axis = axis;
    this.setTransform(value);
  }

  async play(options: PlayOptions) {
    clearInterval(this.interval);

    const initTime = options.initTime || 0;

    this.axis = options.axis;
    this.timing = options.timing;
    this.startValue = options.startValue;
    this.endValue = options.endValue;
    this.duration = options.duration;
    this.onPlay = options.onPlay;
    this.onUpdate = options.onUpdate;
    this.onStop = options.onStop;

    this.startTime = Date.now() - initTime;

    this.element.style.willChange = "transform";

    this.interval = setInterval(this.update.bind(this), 10);

    this.update();

    if (this.onPlay) {
      this.onPlay();
    }

    return await new Promise<void>((resolve) => {
      this.resolve = resolve;
    });
  }

  update() {
    const { startValue, endValue, duration, startTime } = this;

    const time = Math.min(duration, Date.now() - startTime);
    const progress = this.easeProgress(time / duration);
    const distance = Math.abs(startValue - endValue);
    const offset = distance * progress;

    let value;

    if (startValue > endValue) {
      value = startValue - offset;
    } else {
      value = startValue + offset;
    }

    this.setTransform(value);

    if (this.onUpdate) {
      this.onUpdate(offset);
    }

    if (time === duration) {
      this.stop();
    }
  }

  stop() {
    clearInterval(this.interval);

    if (this.element) {
      this.element.style.willChange = "auto";
    }

    if (this.onStop) {
      this.onStop();
    }

    if (this.resolve) {
      this.resolve();
    }
  }

  easeProgress(progress: number) {
    let easing;

    if (this.timing === "ease") {
      easing = BezierEasing(0.25, 0.1, 0.25, 1);
    } else {
      easing = BezierEasing(0, 0.2, 0, 1);
    }

    return easing(progress);
  }

  setTransform(value: number) {
    if (this.axis === "x") {
      this.element.style.transform = `translateX(${value}px)`;
    } else {
      this.element.style.transform = `translateY(${value}px)`;
    }
  }
}
