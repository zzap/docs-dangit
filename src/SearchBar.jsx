import React, { useState } from "react";
import SearchResults from "./SearchResults";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="search-bar-wrap">
      <form action="/" method="post">
        <input
          className="w-full rounded-full p-4"
          type="search"
          name="s"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Start typing..."
        />
      </form>

      <div>
        <SearchResults query={searchQuery} />
      </div>
    </div>
  );
};

export default SearchBar;
