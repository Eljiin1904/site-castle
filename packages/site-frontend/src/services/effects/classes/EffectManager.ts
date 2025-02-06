import { TypedEventEmitter } from "@client/services/utility";

export type Position = { x: number; y: number };

export class EffectManager extends TypedEventEmitter<{
  play: (positions: Position[]) => void;
  stop: () => void;
}> {
  play(targetName: string, filter?: string) {
    const elements = document.getElementsByClassName(targetName);
    const positions = [];

    for (const element of elements) {
      if (filter && !element.className.includes(filter)) {
        continue;
      }

      const rect = element.getBoundingClientRect();

      positions.push({
        x: (rect.left + rect.width / 2) * (100 / window.innerWidth),
        y: (rect.top + rect.height / 2) * (100 / window.innerHeight) - 2,
      });
    }

    this.emit("play", positions);
  }

  stop() {
    this.emit("stop");
  }
}
