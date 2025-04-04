import { createSlice } from "@reduxjs/toolkit";
import { ChatChannel } from "@core/types/chat/ChatChannel";
import { ChatMessageDocument } from "@core/types/chat/ChatMessageDocument";
import { ChatRainDocument } from "@core/types/chat/ChatRainDocument";
import { Utility } from "@client/services/utility";

interface ChatState {
  panelCollapsed: boolean;
  panelCollapsedChanged?: boolean;
  overlayOpen?: boolean;
  channel: ChatChannel;
  input: string;
  messages: ChatMessageDocument[];
  rain?: ChatRainDocument;
  replyMessage?: ChatMessageDocument;
  search?: string;
  activeTab: "emoji" | "gifs"; 
}

const initialState: ChatState = {
  panelCollapsed: Utility.getLocalBool("chat-collapsed", false),
  channel: Utility.getLocalString<ChatChannel>("chat-channel", "general-english"),
  input: "",
  messages: [],
  search: "",
  activeTab: "emoji"
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: ({ reducer }) => ({
    collapsePanel: reducer<boolean>((state, { payload }) => {
      state.panelCollapsed = payload;
      state.panelCollapsedChanged = true;
      Utility.updateLocalBool("chat-collapsed", payload);
    }),
    toggleOverlay: reducer<boolean>((state, { payload }) => {
      state.overlayOpen = payload;
    }),
    setChannel: reducer<ChatChannel>((state, { payload }) => {
      state.channel = payload;
      Utility.updateLocalString("chat-channel", payload);
    }),
    setInput: reducer<string>((state, { payload }) => {
      state.input = payload;
    }),
    setMessages: reducer<ChatMessageDocument[]>((state, { payload }) => {
      state.messages = payload;
    }),
    setRain: reducer<ChatRainDocument>((state, { payload }) => {
      state.rain = payload;
    }),
    setSearch: reducer<string>((state, { payload }) => {
      state.search = payload;
    }),
    setActiveTab: reducer<"emoji"|"gifs">((state, { payload }) => {
      state.activeTab = payload;
    }),
    setReplyMessage: reducer<ChatMessageDocument | undefined>((state, { payload }) => {
      state.replyMessage = payload;
    }),
  }),
});

export const {
  collapsePanel,
  toggleOverlay,
  setChannel,
  setMessages,
  setInput,
  setRain,
  setReplyMessage,
  setSearch,
  setActiveTab
} = chatSlice.actions;
