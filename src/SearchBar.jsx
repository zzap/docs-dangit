import { useEffect, useState } from "react";
import SearchResults from "./SearchResults";
import { useSearchStore } from "./state/search";

const capitalPDangit = (query) => {
  return query.replace(/Wordpress/i, "WordPress");
};

const SearchBar = () => {
  const { search, setSearch, setSearchHistory } = useSearchStore();
  const [s, setS] = useState("");
  const handleSearch = (query) => setS(capitalPDangit(query));

  useEffect(() => {
    const id = setTimeout(() => {
      setSearch(s);
    }, 300);
    return () => clearTimeout(id);
  }, [s, setSearch]);

  useEffect(() => {
    // Sets the search into the history after a 2s debounce
    const id = setTimeout(() => {
      search && setSearchHistory(search);
    }, 2000);
    return () => clearTimeout(id);
  }, [search, setSearchHistory]);

  return (
    <div className="search-bar-wrap">
      <form action="/" method="post">
        <input
          className="w-full rounded-full py-4 px-6 border-2 font-mono"
          type="search"
          name="s"
          value={s}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search for a WordPress function, hook, or class."
        />
      </form>

      <SearchResults query={search} />
    </div>
  );
};

export default SearchBar;
