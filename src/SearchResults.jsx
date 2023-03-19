import React, { useState } from "react";
import Highlight from "react-highlight";
import useSWR from "swr";
import { CopyIcon } from "./svg";

const SearchResults = (props) => {
  const [selectedResult, selectResult] = useState(null);
  const [copyStatus, setCopyStatus] = useState("");

  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  // fetch data
  const { data, error } = useSWR(
    "https://developer.wordpress.org/wp-json/wp/v2/comments",
    fetcher
  );

  const copyToClipboard = async (text) => {
    return navigator.clipboard.writeText(text);
  };

  if (error)
    return <p className="mt-8 text-gray-600">Failed to load, dangit.</p>;
  if (!data) return <p className="mt-8 text-gray-600">Loading...</p>;

  if (null !== selectedResult && data && data[selectedResult]) {
    return (
      <div className="results-wrap mt-8">
        <div className="flex justify-between mb-4">
          <button
            onClick={() => selectResult(null)}
            className="bg-gray-100 hover:bg-gray-200 rounded-lg py-2 px-3"
          >
            ← Back
          </button>
          <button
            onClick={() => {
              copyToClipboard(data[selectedResult]?.content?.rendered)
                .then(() => {
                  setCopyStatus("Copied!");
                  setTimeout(() => setCopyStatus(""), 2000);
                })
                .catch(() => {
                  setCopyStatus("Failed to copy.");
                  setTimeout(() => setCopyStatus(""), 2000);
                });
            }}
            disabled={copyStatus !== ""}
            className="bg-gray-100 hover:not(:disabled):bg-gray-200 rounded-lg py-2 px-3"
          >
            <CopyIcon className="w-6 inline mr-2" />
            {copyStatus === "" ? "Copy code sample" : copyStatus}
          </button>
        </div>

        <Highlight className="html rounded-xl p-4 shadow font-mono text-sm">
          {data[selectedResult]?.content?.rendered}
        </Highlight>
      </div>
    );
  }

  return (
    <div className="results-wrap mt-8 container">
      {props?.query &&
        (props?.query.length < 3 ? (
          <p className="text-gray-600">Keep typing...</p>
        ) : (
          <h2 className="font-bold">Search results for: {props?.query}</h2>
        ))}
      {data && data?.length > 0 && props?.query && props?.query.length > 2 && (
        <div className="grid gap-4 mt-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
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
