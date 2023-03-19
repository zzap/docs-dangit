import React from "react";
import { Helmet } from "react-helmet";
import "./main.css";
import SearchBar from "./SearchBar";
import { DocsDangitIcon } from "./svg";

const App = () => {
  return (
    <div className="App">
      <Helmet>
        <meta
          name="description"
          content="A search engine for WordPress developers"
        ></meta>
        <title>docs_dangit</title>
      </Helmet>

      <header className="bg-blue-700 text-white flex p-8">
		<div className="w-full max-w-7xl mx-auto xl:flex justify-between items-center">
			<div className="md:flex justify-items-start items-center gap-4">
				<DocsDangitIcon className="w-8 h-8 text-white" />
				<h1 className="mr-2">docs_dangit</h1>
				<span className="">A search engine for WordPress developers</span>
			</div>

			<div className="md:flex gap-4">
				<a href="https://developer.wordpress.org/reference">WordPress.org Code Reference</a>
				<a href="https://developer.wordpress.org/cli/commands/">WP-CLI Commands</a>
			</div>
		</div>
      </header>

      <SearchBar />
    </div>
  );
};

export default App;
