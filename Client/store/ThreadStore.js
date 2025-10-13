import { create } from "zustand"

export const useThreadStore = create(set => ({
    threadId: null,
    activeThread: null,
    setThreadId: id => set({ threadId: id }),
    setActiveThread: id => set({ activeThread: id }),
}));