import clsx from "clsx";
import { useEffect, useState } from "react";
import SearchResults from "./SearchResults";
import { useSearchStore } from "./state/search";

const capitalPDangit = (query) => {
  return query.replace(/Wordpress/i, "WordPress");
};

const types = {
  "": "All",
  wordpress_reference: "WordPress Reference",
  wordpress_dev_reference: "WordPress Dev Notes",
  wpcli: "WP CLI",
  php_reference: "PHP.net",
};

const SearchBar = () => {
  const { search, setSearch, setSearchHistory, type, setType } =
    useSearchStore();
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
      <form
        className="flex flex-col gap-3"
        method="get"
        onSubmit={(e) => e.preventDefault()}
      >
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <input
          className="w-full rounded-full py-4 px-6 border-2 font-mono"
          type="search"
          name="search"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search for a WordPress function, hook, or class."
          autoFocus
        />
        <div className="flex gap-2 items-center">
          <p className="text-sm">Filter by type:</p>
          {Object.entries(types).map(([key, value]) => (
            <button
              type="button"
              onClick={() => setType(key)}
              className={clsx("p-1 px-3 rounded-xl text-sm", {
                "bg-blue-700 text-white": type === key,
                "bg-gray-200": type !== key,
              })}
            >
              {value}
            </button>
          ))}
        </div>
      </form>

      <SearchResults
        search={search}
        type={type}
        selectedResult={selectedResult}
        selectResult={selectResult}
      />
    </div>
  );
};

export default SearchBar;
