import { useEffect, useState } from "react";
import SearchResults from "./SearchResults";
import { useSearchStore } from "./state/search";

const capitalPDangit = (query) => {
  return query.replace(/Wordpress/i, "WordPress");
};

const SearchBar = () => {
  const { search, setSearch, setSearchHistory } = useSearchStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedResult, selectResult] = useState(null);

  const handleSearch = (query) => setSearchTerm(capitalPDangit(query));

  useEffect(() => {
    selectResult(null);
    const id = setTimeout(() => {
      setSearch(searchTerm);
    }, 300);
    return () => clearTimeout(id);
  }, [searchTerm, setSearch]);

  useEffect(() => {
    // Sets the search into the history after a 2s debounce
    const id = setTimeout(() => {
      search && setSearchHistory(search);
    }, 2000);
    return () => clearTimeout(id);
  }, [search, setSearchHistory]);

  return (
    <div className="search-bar-wrap">
      <form action="/" method="get" onSubmit={(e) => e.preventDefault()}>
        <input
          className="w-full rounded-full py-4 px-6 border-2 font-mono"
          type="search"
          name="search"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search for a WordPress function, hook, or class."
          autofocus="autofocus"
        />
      </form>

      <SearchResults
        query={search}
        selectedResult={selectedResult}
        selectResult={selectResult}
      />
    </div>
  );
};

export default SearchBar;
