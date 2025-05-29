import Transformer, { TransformerArg, TransformValues } from "./Transformer";

export default class Animator<T extends TransformValues> {
  private transformers: Transformer<T>[] = [];

  constructor() {}

  addTransformers(transformers: TransformerArg<T>[]) {
    transformers.forEach(this.addTransformer.bind(this));
  }
  addTransformer(transformer: TransformerArg<T>) {
    // for unreversing
    // const existing = transformer.key && this.transformers.find( t => t.key === transformer.key )
    // if (existing && transformer.key) {
    // 	this.transformers.splice( this.transformers.indexOf(existing), 1 )

    // 	// giving up on T
    // 	// const modified = existing.getModifiedTransformer(transformer) as Transformer<T>

    // 	const reversed = existing.getReversedTransformer({ key: transformer.key, forwards: true })
    // 	this.transformers.push(reversed)
    // 	console.log(this.transformers.length)
    // }

    // else {

    this.transformers.push(new Transformer(transformer));

    // }
  }

  isAnimating() {
    if (!this.transformers.length) return false;
    return this.transformers.some((transformer) => transformer.isAnimating());
  }

  transformOrigin({ origin }: { origin: T }) {
    this.cleanTransformers();

    const returnObj = { ...origin };

    this.transformers.forEach((transformer) => {
      if (!transformer.hasStarted()) return;

      const vals = transformer.getTransformVals();

      for (let k in vals) {
        // @ts-ignore
        returnObj[k] += vals[k];
      }
      // entries(vals).forEach(([key, val]) => {
      // 	returnObj[key] += val
      // })
    });
    return returnObj;
  }

  private cleanTransformers() {
    this.transformers = this.transformers.filter((transformer) => transformer.shouldPersist());
  }

  // keeping it in case I need it again
  // ========================
  // reverseTransformer({
  // 	key,
  // 	duration
  // }: {
  // 	key: string,
  // 	duration?: number
  // }) {
  // 	// skipping delay logic
  // 	// skipping duration logic
  // 	// skipping ease logic

  // 	const existing = this.transformers.find( t => t.key === key )
  // 	if (!existing) throw new Error("No transformer to reverse, key: " + key)
  // 	this.transformers.splice( this.transformers.indexOf(existing), 1 )

  // 	const reversed = existing.getReversedTransformer({ key, forwards: false })
  // 	this.transformers.push(reversed)
  // }
}
