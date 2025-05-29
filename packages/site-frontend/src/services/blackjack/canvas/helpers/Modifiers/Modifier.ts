export type ModifierArg = {
  delay: number;
  modifier: () => void;
};

export default class Modifier {
  private modifier: () => void;
  private timeout?: NodeJS.Timeout;

  constructor(
    { delay, modifier }: ModifierArg,
    {
      onComplete,
    }: {
      onComplete: (modifier: Modifier) => void;
    },
  ) {
    this.modifier = modifier;

    this.timeout = setTimeout(() => {
      this.modifier();
      this.timeout = undefined;
      onComplete(this);
    }, delay);
  }

  isAnimating() {
    return !!this.timeout;
  }

  // possible downside to timeout approach
  dismount() {
    throw new Error("Not implemented");
  }
}
