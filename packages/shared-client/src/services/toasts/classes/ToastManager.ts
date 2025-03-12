import { TypedEventEmitter } from "#client/services/utility";
import { ToastInfo } from "#client/types/toasts/ToastInfo";

export class ToastManager extends TypedEventEmitter<{
  change: (log: ToastInfo[]) => void;
}> {
  private readonly _cache: ToastInfo[] = [];

  get log() {
    return this._cache.slice();
  }

  add(info: ToastInfo) {
    this._cache.push(info);

    this.emit("change", this.log);

    setTimeout(() => this.remove(info), info.duration);
  }

  remove(info: ToastInfo) {
    const index = this._cache.indexOf(info);

    if (index !== -1) {
      this._cache.splice(index, 1);
    }

    this.emit("change", this.log);
  }
}
