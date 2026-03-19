import { create } from 'zustand';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface Chat {
  id: string;
  title: string;
  messages: Message[];
  createdAt: number;
  updatedAt: number;
}

interface ChatStore {
  chats: Chat[];
  activeChatId: string | null;
  totalMessages: number;
  maxMessages: number;
  sidebarOpen: boolean;
  isStreaming: boolean;

  createChat: () => string;
  setActiveChat: (id: string) => void;
  addMessage: (chatId: string, role: 'user' | 'assistant', content: string) => void;
  updateLastAssistantMessage: (chatId: string, content: string) => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setIsStreaming: (streaming: boolean) => void;
  getActiveChat: () => Chat | undefined;
  canSendMessage: () => boolean;
}

const generateId = () => Math.random().toString(36).substring(2, 12);

export const useChatStore = create<ChatStore>((set, get) => ({
  chats: [],
  activeChatId: null,
  totalMessages: 0,
  maxMessages: 10,
  sidebarOpen: true,
  isStreaming: false,

  createChat: () => {
    const id = generateId();
    const chat: Chat = {
      id,
      title: 'New Chat',
      messages: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    set((state) => ({
      chats: [chat, ...state.chats],
      activeChatId: id,
    }));
    return id;
  },

  setActiveChat: (id) => set({ activeChatId: id }),

  addMessage: (chatId, role, content) => {
    set((state) => {
      const chats = state.chats.map((chat) => {
        if (chat.id !== chatId) return chat;
        const msg: Message = { id: generateId(), role, content, timestamp: Date.now() };
        const messages = [...chat.messages, msg];
        const title = chat.messages.length === 0 && role === 'user'
          ? content.slice(0, 40) + (content.length > 40 ? '...' : '')
          : chat.title;
        return { ...chat, messages, title, updatedAt: Date.now() };
      });
      return {
        chats,
        totalMessages: role === 'user' ? state.totalMessages + 1 : state.totalMessages,
      };
    });
  },

  updateLastAssistantMessage: (chatId, content) => {
    set((state) => ({
      chats: state.chats.map((chat) => {
        if (chat.id !== chatId) return chat;
        const messages = [...chat.messages];
        const last = messages[messages.length - 1];
        if (last && last.role === 'assistant') {
          messages[messages.length - 1] = { ...last, content };
        }
        return { ...chat, messages, updatedAt: Date.now() };
      }),
    }));
  },

  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setIsStreaming: (streaming) => set({ isStreaming: streaming }),
  getActiveChat: () => {
    const s = get();
    return s.chats.find((c) => c.id === s.activeChatId);
  },
  canSendMessage: () => {
    const s = get();
    return s.totalMessages < s.maxMessages;
  },
}));
