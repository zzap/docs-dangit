import React, { useState } from "react";
import Highlight from "react-highlight";
import useSWR from "swr";

const SearchResults = (props) => {
  const [selectedResult, selectResult] = useState(null);
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  // fetch data
  const { data, error } = useSWR(
    "https://developer.wordpress.org/wp-json/wp/v2/comments",
    fetcher
  );

  if (error)
    return <p className="mt-8 text-gray-600">Failed to load, dangit.</p>;
  if (!data) return <p className="mt-8 text-gray-600">Loading...</p>;

  if (null !== selectedResult && data && data[selectedResult]) {
    return (
      <div className="results-wrap mt-8">
        <button
          onClick={() => selectResult(null)}
          className="mb-4 text-blue-700"
        >
          ← Back
        </button>
        <Highlight className="html rounded-xl p-4 shadow font-mono text-sm">
          {data[selectedResult]?.content?.rendered}
        </Highlight>
      </div>
    );
  }

  return (
    <div className="results-wrap mt-8">
      {props?.query &&
        (props?.query.length < 3 ? (
          <p className="text-gray-600">Keep typing...</p>
        ) : (
          <h2 className="font-bold">Search results for: {props?.query}</h2>
        ))}
      {data && data?.length > 0 && props?.query && props?.query.length > 2 && (
        <div className="grid grid-cols-3 gap-4 mt-4">
          {console.log(data)}
          {data.map((item, i) => {
            return (
              <div onClick={() => selectResult(i)}>
                <Highlight className="html rounded-xl p-4 shadow font-mono h-60 text-sm overflow-hidden whitespace-pre-wrap cursor-pointer hover:shadow-lg hover:shadow-black/40 hover:scale-105 transition-all duration-200 ease-in-out">
                  {item?.content?.rendered}
                </Highlight>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
