import { getTimeProgress } from "../utils/getTimeProgress";
import { tweenValObj } from "../utils/tweenValObj";

export type TransformValues = {
  [key: string]: number;
};

export type TransformerArg<
  T extends TransformValues,
  // can't seem to achieve this without a Partial, which sets vals to undefined
  // instead of narrowing
  U = Partial<T>, // {[K in keyof T]-?: K extends keyof T ? T[K] : never}
> = {
  startValues: U;
  endValues: U;
  duration: number;
  delay?: number;
  key?: string;
  forwards?: boolean;
  applyDuringDelay?: boolean;

  // might remove if I switch to modifiedTransformers
  startTime?: number; // hack for reversing transformers
};

export default class Transformer<T extends TransformValues> {
  private startTime: number;
  private endTime: number;
  private startValues: TransformerArg<T>["startValues"];
  private endValues: TransformerArg<T>["endValues"];
  key?: string;
  private forwards: boolean;
  private applyDuringDelay: boolean;

  constructor({
    startValues,
    endValues,
    duration,
    delay = 0,
    forwards = false,
    applyDuringDelay = false,
    key,
    startTime,
  }: TransformerArg<T>) {
    this.key = key;
    this.forwards = forwards;
    this.startValues = startValues;
    this.endValues = endValues;
    this.startTime = Date.now() + delay;
    this.endTime = this.startTime + duration;
    this.applyDuringDelay = applyDuringDelay;

    // hack for reverse transformers
    // if (startTime) {
    // 	this.startTime = startTime
    // 	this.endTime = startTime + duration
    // }
  }

  getTransformVals() {
    const progress = getTimeProgress(this.startTime, this.endTime);
    const curVals = tweenValObj(this.startValues, this.endValues, progress);
    return curVals;
  }

  isAnimating() {
    return Date.now() < this.endTime;
  }
  shouldPersist() {
    return this.forwards || this.isAnimating();
  }
  hasStarted() {
    return this.applyDuringDelay || Date.now() > this.startTime;
  }

  // this is an alternative to reversing the transformer
  // probably safer than hacking the startTime
  // might use this later, not sure yet
  // doesn't include support for delay or ease
  // getModifiedTransformer(transformer: TransformerArg<T>) {
  // 	// not sure what to do with delay, skipping it

  // 	const curVals = this.getTransformVals()
  // 	const progress = getProgressFromVals(transformer.startValues, transformer.endValues, curVals)
  // 	const duration = transformer.duration * (1 - progress)
  // 	return new Transformer({
  // 		...transformer,
  // 		startValues: curVals,
  // 		endValues: transformer.endValues,
  // 		duration,
  // 	})
  // }

  // getReversedTransformer({ key, forwards }: { key: string, forwards: boolean }) {
  // 	// if duration arg is added, it'll need to scale this duration
  // 	const duration = this.endTime - this.startTime
  // 	const progress = getTimeProgress(this.startTime, this.endTime)
  // 	const newDuration = duration * progress

  // 	return new Transformer<T>({
  // 		startValues: this.endValues,
  // 		endValues: this.startValues,
  // 		startTime: Date.now() - (duration - newDuration),
  // 		duration: duration,
  // 		key: key,
  // 		forwards,
  // 	})

  // }
}
