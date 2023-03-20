import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useSearchStore = create(
  persist(
    (set, get) => ({
      search: "",
      type: "",
      searchHistory: [],
      setSearch: (search) => set({ search }),
      setType: (type) => set({ type }),
      setSearchHistory: (search) =>
        set({ searchHistory: [search, ...get().searchHistory.slice(-9)] }),
    }),
    {
      name: "search-history",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
