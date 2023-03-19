import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useSearchStore = create(
  persist(
    (set, get) => ({
      search: "",
      searchHistory: [],
      setSearch: (search) => set({ search }),
      updateSearchHistory: (search) =>
        set({ searchHistory: [...get().searchHistory, search] }),
    }),
    {
      name: "search-history",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
