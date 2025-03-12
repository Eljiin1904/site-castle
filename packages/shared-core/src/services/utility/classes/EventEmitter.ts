import BaseEmitter from "events";

/* eslint-disable */

export class EventEmitter extends BaseEmitter {}

type CommonEvents = "newListener" | "removeListener";

type GenericListener = (...args: any[]) => void;

type EventsDescription = Record<string, GenericListener>;

export declare interface TypedEventEmitter<Events extends EventsDescription>
  extends BaseEmitter {
  addListener<EventKey extends keyof Events>(
    event: EventKey,
    listener: Events[EventKey],
  ): this;
  addListener(
    event: CommonEvents,
    listener: (eventName: string | symbol, listener: GenericListener) => void,
  ): this;
  addListener(event: string | symbol, listener: GenericListener): this;
  on<EventKey extends keyof Events>(
    event: EventKey,
    listener: Events[EventKey],
  ): this;
  on(
    event: CommonEvents,
    listener: (eventName: string | symbol, listener: GenericListener) => void,
  ): this;
  on(event: string | symbol, listener: GenericListener): this;
  once<EventKey extends keyof Events>(
    event: EventKey,
    listener: Events[EventKey],
  ): this;
  once(
    event: CommonEvents,
    listener: (eventName: string | symbol, listener: GenericListener) => void,
  ): this;
  once(event: string | symbol, listener: GenericListener): this;
  removeListener<EventKey extends keyof Events>(
    event: EventKey,
    listener: Events[EventKey],
  ): this;
  removeListener(
    event: CommonEvents,
    listener: (eventName: string | symbol, listener: GenericListener) => void,
  ): this;
  removeListener(event: string | symbol, listener: GenericListener): this;
  off<EventKey extends keyof Events>(
    event: EventKey,
    listener: Events[EventKey],
  ): this;
  off(
    event: CommonEvents,
    listener: (eventName: string | symbol, listener: GenericListener) => void,
  ): this;
  off(event: string | symbol, listener: GenericListener): this;
  removeAllListeners<EventKey extends keyof Events>(
    event?: EventKey | CommonEvents | symbol | string,
  ): this;
  listeners<EventKey extends keyof Events>(
    event: EventKey | CommonEvents | symbol | string,
  ): Events[EventKey][];
  rawListeners<EventKey extends keyof Events>(
    event: EventKey | CommonEvents | symbol | string,
  ): Events[EventKey][];
  emit<EventKey extends keyof Events>(
    event: EventKey | symbol,
    ...args: Parameters<Events[EventKey]>
  ): boolean;
  listenerCount<EventKey extends keyof Events>(
    type: EventKey | CommonEvents | symbol | string,
  ): number;
  prependListener<EventKey extends keyof Events>(
    event: EventKey,
    listener: Events[EventKey],
  ): this;
  prependListener(
    event: CommonEvents,
    listener: (eventName: string | symbol, listener: GenericListener) => void,
  ): this;
  prependListener(event: string | symbol, listener: GenericListener): this;
  prependOnceListener<EventKey extends keyof Events>(
    event: EventKey,
    listener: Events[EventKey],
  ): this;
  prependOnceListener(
    event: CommonEvents,
    listener: (eventName: string | symbol, listener: GenericListener) => void,
  ): this;
  prependOnceListener(event: string | symbol, listener: GenericListener): this;
  eventNames(): string[];
  getMaxListeners(): number;
  setMaxListeners(n: number): this;
}

export class TypedEventEmitter<
  Events extends EventsDescription,
> extends BaseEmitter {}

/* eslint-enable */
