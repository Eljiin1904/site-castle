import { TypedEventEmitter } from "#client/services/utility";

export class DialogManager extends TypedEventEmitter<{
  "primary-change": (element: JSX.Element | null) => void;
  "secondary-change": (element: JSX.Element | null) => void;
}> {
  private _primary: JSX.Element | null = null;
  private _secondary: JSX.Element | null = null;

  get primary() {
    return this._primary;
  }

  set primary(value: JSX.Element | null) {
    this._primary = value;
    this.emit("primary-change", value);
  }

  get secondary() {
    return this._secondary;
  }

  set secondary(value: JSX.Element | null) {
    this._secondary = value;
    this.emit("secondary-change", value);
  }
}
