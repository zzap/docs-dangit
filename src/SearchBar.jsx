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
          className="form-control"
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
