// created via co-pilot
// should make it type safe
export default class EventEmitter {
  private listeners: Record<string, Function[]> = {};

  on(event: string, listener: Function) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(listener);
  }

  emit(event: string, ...args: any[]) {
    if (this.listeners[event]) {
      this.listeners[event].forEach((listener) => listener(...args));
    }
  }

  off(event: string, listener: Function) {
    if (this.listeners[event]) {
      const index = this.listeners[event].indexOf(listener);
      if (index !== -1) {
        this.listeners[event].splice(index, 1);
      }
    }
  }
}
