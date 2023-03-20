import React, { useState } from "react";
import Highlight from "react-highlight";
import { CopyIcon } from "./svg";
import { useSearch } from "./hooks/useSearch";
import ResultMeta from "./ResultMeta";
import LanguageTag from "./LanguageTag";

const decodeHTMLEntities = (text) => {
  const textArea = document.createElement("textarea");
  textArea.innerHTML = text;
  return textArea.value;
};

const SearchResults = ({ query, selectedResult, selectResult }) => {
  const [copyStatus, setCopyStatus] = useState("");
  const { data, error, loading } = useSearch(query);

  const copyToClipboard = async (text) => {
    return navigator.clipboard.writeText(text);
  };

  if (!query) return null;

  if (error) {
    return <p className="mt-8 text-gray-600">Failed to load, dangit.</p>;
  }
  if (loading) return <p className="mt-8 text-gray-600">Loading...</p>;

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
              copyToClipboard(data[selectedResult]?.code)
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

        <div className="mb-4">
          <div className="my-4">
            <ResultMeta {...data[selectedResult]} />
          </div>
          <Highlight
            className={
              data[selectedResult]?.code_language +
              " rounded-xl p-4 shadow font-mono text-sm"
            }
            key={selectedResult}
          >
            {decodeHTMLEntities(data[selectedResult]?.code)}
          </Highlight>
        </div>
      </div>
    );
  }

  return (
    <div className="results-wrap mt-8 container">
      {query && query.length < 3 ? (
        <p className="text-gray-600">Keep typing...</p>
      ) : data.length === 0 ? (
        <h2 className="font-bold">No search results for: {query}</h2>
      ) : (
        <h2 className="font-bold">Search results for: {query}</h2>
      )}
      {data && data?.length > 0 && (
        <div className="grid gap-8 mt-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {data.map((result, index) => {
            return (
              <div>
                <button
                  type="button"
                  className="relative w-full rounded-xl text-left overflow-hidden transition-all duration-200 ease-in-out hover:shadow-lg hover:scale-105 hover:shadow-black/40 cursor-pointer focus:shadow-lg focus:scale-105 focus:shadow-black/40 border-0 bg-[#282c34] focus:outline-none focus:ring-2 focus:ring-offset-1 ring-offset-white ring-blue-600 group"
                  onClick={() => selectResult(index)}
                  key={index.code}
                >
                  <Highlight
                    className={`${result?.code_language} p-4 shadow font-mono h-60 text-sm overflow-hidden whitespace-pre-wrap`}
                  >
                    {decodeHTMLEntities(result?.code)}
                  </Highlight>
                  <div className="absolute h-28 bottom-0 left-0 w-full bg-gradient-to-t from-[#282c34] to-transparent pointer-events-none group-hover:opacity-0 group-focus:opacity-0 transition-all duration-200 ease-in-out">
                    <LanguageTag language={result?.code_language} />
                  </div>
                </button>
                <div className="mt-2 px-1 text-sm">
                  <ResultMeta {...result} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
