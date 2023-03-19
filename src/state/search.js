import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useSearchStore = create(
  persist(
    (set, get) => ({
      search: "",
      searchHistory: [],
      setSearch: (search) => set({ search }),
      setSearchHistory: (search) =>
        set({ searchHistory: [search, ...get().searchHistory.slice(-9)] }),
    }),
    {
      name: "search-history",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
