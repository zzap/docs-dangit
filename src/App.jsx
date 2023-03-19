import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import "./main.css";
import SearchBar from "./SearchBar";
import { DocsDangitIconBold } from "./svg";
import confetti from "canvas-confetti";

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
    <div className="App flex flex-col min-h-screen">
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
            <h1 className="font-bold">docs_dangit</h1>
            <span className="font-mono lg:ml-2 mb-1 text-sm self-end">
              A search engine for WordPress developers
            </span>
          </div>

          <div className="flex flex-wrap lg:flex-nowrap gap-3 font-mono text-sm">
            <span className="font-medium">Sources:</span>
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

      <main className="p-8 flex gap-4 flex-col flex-grow items-between">
        <div className="w-full max-w-7xl mx-auto flex-grow">
          <SearchBar />
        </div>
        <footer className="mx-auto max-w-7xl w-full">
          <p>
            <a
              className="underline"
              href="https://www.cloudfest.com/a-search-engine-for-wordpress-developers"
            >
              CloudFest hackathon 2023 project
            </a>{" "}
            |{" "}
            <a className="underline" href="https://github.com/zzap/docs-dangit">
              GitHub repository
            </a>
          </p>
          <p className="flex gap-1">
            &copy; 2023 Cloudfest Hackathon{" "}<button
              id="cool-kids-button"
              aria-hidden={true}
              className="cursor-default"
              onClick={() => {
                confetti({
                  particleCount: 2,
                  decay: 0.7,
                  gravity: 0.1,
                  startVelocity: 35,
                  origin: { x: 0.25, y: 0.9 },
                });
              }}
            >Cool Kids</button>
          </p>
        </footer>
      </main>
    </div>
  );
};

export default App;
