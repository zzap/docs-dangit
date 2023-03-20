import { useEffect, useState } from "react";
import SearchResults from "./SearchResults";
import { useSearchStore } from "./state/search";

const capitalPDangit = (query) => {
  return query.replace(/Wordpress/i, "WordPress");
};

const SearchBar = (props) => {
  const { search, setSearch, setSearchHistory } = useSearchStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedResult, selectResult] = useState(null);

  const handleSearch = (query) => {

    setSearchTerm( capitalPDangit(query) );

    const url = new URL(window.location);
    url.searchParams.set("search", query);
    window.history.pushState({}, "", url);
  }

  useEffect(() => {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    if ( urlParams.get( "search" ) && urlParams.get( "search" ).length > 0 ) {
        const termWitjoutHash = urlParams.get( "search" ).replace( /#/i, '' );

        if ( termWitjoutHash.length > 0 ) {
            setSearchTerm( termWitjoutHash );
        }
    } 

  }, []);

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
      <form method="get" onSubmit={(e) => e.preventDefault()}>
        <input
          className="w-full rounded-full py-4 px-6 border-2 font-mono"
          type="search"
          name="search"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search for a WordPress function, hook, or class."
          autoFocus
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
