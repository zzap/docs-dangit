import React from "react";

const SearchResults = (props) => {
    return(
        <div className="results-wrap">
            <h2>Search results for: {props?.query}</h2>
        </div>
    );
}

export default SearchResults;