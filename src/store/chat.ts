import { create } from 'zustand';

interface Message {
  id: number;
  userId: string;
  username: string;
  text: string;
  timestamp: string;
}

interface User {
  id: string;
  username: string;
}

interface ChatStore {
  messages: Message[];
  users: User[];
  username: string | null;
  setUsername: (username: string) => void;
  addMessage: (message: Message) => void;
  setMessages: (messages: Message[]) => void;
  addUser: (user: User) => void;
  removeUser: (userId: string) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  messages: [],
  users: [],
  username: null,
  setUsername: (username) => set({ username }),
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  setMessages: (messages) => set({ messages }),
  addUser: (user) =>
    set((state) => ({ users: [...state.users, user] })),
  removeUser: (userId) =>
    set((state) => ({
      users: state.users.filter((user) => user.id !== userId),
    })),
}));