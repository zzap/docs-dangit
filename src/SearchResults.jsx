import React, { useState } from "react";
import Highlight from "react-highlight";
import { CopyIcon } from "./svg";
import { useSearch } from "./hooks/useSearch";

const decodeHTMLEntities = (text) => {
  const textArea = document.createElement("textarea");
  textArea.innerHTML = text;
  return textArea.value;
};

const SearchResults = ({ query }) => {
  const [selectedResult, selectResult] = useState(null);
  const [copyStatus, setCopyStatus] = useState("");
  const { data, error, loading } = useSearch(query);

  const codeSnippets = data?.reduce((accumulator, result) => {
    accumulator.push(...result.code_snippet);
    return accumulator;
  }, []);

  const copyToClipboard = async (text) => {
    return navigator.clipboard.writeText(text);
  };

  if (error) {
    return <p className="mt-8 text-gray-600">Failed to load, dangit.</p>;
  }
  if (loading) return <p className="mt-8 text-gray-600">Loading...</p>;

  if (null !== selectedResult && codeSnippets && codeSnippets[selectedResult]) {
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
              copyToClipboard(codeSnippets[selectedResult]?.content?.rendered)
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
          <Highlight
            className={
              codeSnippets[selectedResult]?.language +
              " rounded-xl p-4 shadow font-mono text-sm"
            }
            key={selectedResult}
          >
            {decodeHTMLEntities(codeSnippets[selectedResult]?.code)}
          </Highlight>
        </div>
      </div>
    );
  }

  return (
    <div className="results-wrap mt-8 container">
      {query &&
        (query.length < 3 ? (
          <p className="text-gray-600">Keep typing...</p>
        ) : (
          <h2 className="font-bold">Search results for: {query}</h2>
        ))}
      {codeSnippets && codeSnippets?.length > 0 && (
        <div className="grid gap-8 mt-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {codeSnippets.map((item, index) => {
            return (
              <div onClick={() => selectResult(index)} key={index}>
                <Highlight
                  className={
                    item?.language +
                    " rounded-xl p-4 shadow font-mono h-60 text-sm overflow-hidden whitespace-pre-wrap cursor-pointer hover:shadow-lg hover:shadow-black/40 hover:scale-105 transition-all duration-200 ease-in-out"
                  }
                  key={index}
                >
                  {decodeHTMLEntities(item?.code)}
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
