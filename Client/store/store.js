import { create } from "zustand"

export const useDashboard = create((set) => ({
    currentPage: "chat",
    setCurrentPage: (page) => set({ currentPage: page }),
}))