import React, { useState } from "react";
import { CopyIcon } from "./svg";
import Highlight from "react-highlight";

const SingleResults = (props) => {

    const [copyStatus, setCopyStatus] = useState("");
    const [selectedResult, selectResult] = useState(null);

    const copyToClipboard = async (text) => {
        return navigator.clipboard.writeText(text);
    };

    return (
        <div className="single-results">
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
                    copyToClipboard(props?.result?.content?.rendered)
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
                    {props?.result?.content?.rendered}
                </Highlight>
            </div>
        </div>
    )

}

export default SingleResults;