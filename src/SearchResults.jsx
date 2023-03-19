import React from "react";
import Highlight from "react-highlight";
import useSWR from "swr";

const SearchResults = (props) => {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  // fetch data
  const { data, error } = useSWR(
    "https://developer.wordpress.org/wp-json/wp/v2/comments",
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <div className="results-wrap">
      <h2>Search results for: {props?.query}</h2>
      {data && data?.length > 0 && props?.query && props?.query.length > 2 && (
        <div className="grid grid-cols-3 gap-4 mt-4">
          {console.log(data)}
          {data.map((item, i) => {
            return (
              <Highlight
                key={i}
                className="html rounded-xl p-4 shadow font-mono h-60 text-sm overflow-hidden whitespace-pre-wrap"
              >
                {item?.content?.rendered}
              </Highlight>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
