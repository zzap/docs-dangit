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
          className="w-full rounded-full p-4 border-2"
          type="search"
          name="s"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Start typing..."
        />
      </form>

      <SearchResults query={searchQuery} />
    </div>
  );
};

export default SearchBar;
