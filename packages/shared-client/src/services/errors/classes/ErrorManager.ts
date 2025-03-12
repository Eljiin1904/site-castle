import { TypedEventEmitter } from "#client/services/utility";

export class ErrorManager extends TypedEventEmitter<{
  change: (error: unknown | null) => void;
}> {
  private _error: unknown | null = null;

  get error() {
    return this._error;
  }

  set error(value: unknown) {
    this._error = value;
    this.emit("change", value);
  }
}
