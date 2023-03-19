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

  const copyToClipboard = async (text) => {
    return navigator.clipboard.writeText(text);
  };

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

        {data[selectedResult]?.code_snippet &&
          data[selectedResult]?.code_snippet.length > 0 && (
            <>
              {data[selectedResult]?.code_snippet.map((snipet, i) => {
                return (
                  <div className="mb-4">
                    <Highlight
                      className={
                        snipet?.language +
                        " rounded-xl p-4 shadow font-mono text-sm"
                      }
                      key={i}
                    >
                      {decodeHTMLEntities(snipet?.code)}
                    </Highlight>
                  </div>
                );
              })}
            </>
          )}
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
      {data && data?.length > 0 && (
        <div className="grid gap-4 mt-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {console.log(data)}
          {data.map((item, i) => {
            return (
              <>
                {item?.code_snippet && item?.code_snippet.length > 0 && (
                  <>
                    {item?.code_snippet.map((snipet, i) => {
                      return (
                        <div onClick={() => selectResult(i)} key={i}>
                          <Highlight
                            className={
                              snipet?.language +
                              " rounded-xl p-4 shadow font-mono h-60 text-sm overflow-hidden whitespace-pre-wrap cursor-pointer hover:shadow-lg hover:shadow-black/40 hover:scale-105 transition-all duration-200 ease-in-out"
                            }
                            key={i}
                          >
                            {decodeHTMLEntities(snipet?.code)}
                          </Highlight>
                        </div>
                      );
                    })}
                  </>
                )}
              </>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
