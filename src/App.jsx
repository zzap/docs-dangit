import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import "./main.css";
import SearchBar from "./SearchBar";
import { DocsDangitIconBold } from "./svg";

const getFaviconPath = (isDarkMode = false) => {
  return `./favicon-${isDarkMode ? "light" : "dark"}.png`;
};

const App = () => {
  const [faviconHref, setFaviconHref] = useState("./favicon-light.png");

  useEffect(() => {
    const matcher = window.matchMedia("(prefers-color-scheme: dark)");

    setFaviconHref(getFaviconPath(matcher.matches));

    matcher.onchange = () => setFaviconHref(getFaviconPath(matcher.matches));
  }, [faviconHref]);

  return (
    <div className="App">
      <Helmet>
        <link rel="icon" href={faviconHref} />
        <meta
          name="description"
          content="A search engine for WordPress developers"
        ></meta>
        <title>docs_dangit</title>
      </Helmet>

      <header className="bg-blue-700 text-white flex p-8">
        <div className="w-full max-w-7xl mx-auto flex flex-wrap lg:flex-nowrap justify-between items-center gap-4 xl:gap-0">
          <div className="flex flex-wrap md:flex-nowrap justify-items-start items-center gap-4">
            <DocsDangitIconBold className="w-8 h-8 text-white" />
            <h1 className="mr-2 font-bold">docs_dangit</h1>
            <span className="font-mono ml-4 mb-1 text-sm self-end">
              A search engine for WordPress developers
            </span>
          </div>

          <div className="flex flex-wrap lg:flex-nowrap gap-3">
            <a
              href="https://developer.wordpress.org/reference"
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              WordPress.org Code Reference
            </a>
            <a
              href="https://developer.wordpress.org/cli/commands/"
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              WP-CLI Commands
            </a>
          </div>
        </div>
      </header>

      <main className="p-8">
        <div className="w-full max-w-7xl mx-auto">
          <SearchBar />
        </div>
      </main>
    </div>
  );
};

export default App;
