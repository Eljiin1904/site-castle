import { Chat } from "@core/services/chat";
import { ChatChannel } from "@core/types/chat/ChatChannel";
import { ChatMessageDocument } from "@core/types/chat/ChatMessageDocument";
import { StreamUpdate } from "@core/types/database/DatabaseStreamEvent";
import { TypedEventEmitter } from "@core/services/utility";
import { Database } from "@server/services/database";
import { System } from "@server/services/system";
import { messageStream } from "./messageStream";

export class ChannelManager extends TypedEventEmitter<{
  initialized: () => void;
  insert: (document: ChatMessageDocument) => void;
  update: (update: StreamUpdate, document: ChatMessageDocument) => void;
}> {
  private readonly _channel: ChatChannel;
  private _log: ChatMessageDocument[] = [];
  private readonly _queue: ChatMessageDocument[] = [];
  private _initialized = false;

  constructor(channel: ChatChannel) {
    super();
    this._channel = channel;

    System.tryCatch(this.init.bind(this))();

    messageStream.on("insert", System.tryCatch(this.onInsert.bind(this)));
    messageStream.on("update", System.tryCatch(this.onUpdate.bind(this)));
  }

  get log() {
    return this._log;
  }

  get channel() {
    return this._channel;
  }

  waitForInit() {
    if (this._initialized) {
      return;
    }
    return new Promise((resolve) => this.once("initialized", resolve));
  }

  private async init() {
    await Database.manager.waitForInit();

    this._log = await Database.collection("chat-messages")
      .find(
        {
          channel: { $in: [null, this.channel] },
          hidden: { $exists: false },
        },
        {
          limit: Chat.logSize,
          sort: { timestamp: -1 },
        },
      )
      .toArray();

    this._initialized = true;
    this.emit("initialized");
  }

  private async onInsert(document: ChatMessageDocument) {
    if (document.channel && document.channel !== this.channel) {
      return;
    }

    const length = this._log.unshift(document);

    if (length > Chat.logSize) {
      this._log.length = Chat.logSize;
    }

    this.emit("insert", document);
  }

  private async onUpdate(update: StreamUpdate) {
    const { documentId, updatedFields, removedFields } = update;
    const documentIndex = this._log.findIndex((x) => x._id === documentId);

    if (documentIndex !== -1) {
      if ("hidden" in updatedFields) {
        this._log.splice(documentIndex, 1);
      } else {
        Database.updateDocument({
          document: this._log[documentIndex],
          updatedFields,
          removedFields,
        });
      }
    }

    this.emit("update", update, this._log[documentIndex]);
  }
}
