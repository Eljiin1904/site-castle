import Modifier, { ModifierArg } from "./Modifier";

export default class Modifiers {
  private modifiers: Modifier[] = [];

  constructor() {}

  addModifier(arg: ModifierArg) {
    this.modifiers.push(
      new Modifier(arg, {
        onComplete: this.removeModifier.bind(this),
      }),
    );
  }

  removeModifier(modifier: Modifier) {
    const index = this.modifiers.indexOf(modifier);
    this.modifiers.splice(index, 1);
  }

  isAnimating() {
    return this.modifiers.some((modifier) => modifier.isAnimating());
  }
}
