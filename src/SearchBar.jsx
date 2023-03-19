import SearchResults from "./SearchResults";
import { useSearchStore } from "./state";

const capitalPDangit = (query) => {
  return query.replace(/Wordpress/i, "WordPress");
};

const SearchBar = () => {
  const { search, setSearch } = useSearchStore()
  const handleSearch = (query) => setSearch(capitalPDangit(query));

  return (
    <div className="search-bar-wrap">
      <form action="/" method="post">
        <input
          className="w-full rounded-full py-4 px-6 border-2 font-mono"
          type="search"
          name="s"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search for a WordPress function, hook, or class."
        />
      </form>

      <SearchResults query={search} />
    </div>
  );
};

export default SearchBar;
