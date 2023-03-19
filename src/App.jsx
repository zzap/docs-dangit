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
        <div className="max-w-7xl flex justify-items-start">
          <DocsDangitIcon className="w-8 h-8 text-white mr-4" />
          <h1 className="mr-4">docs_dangit</h1>
          <span className="">A search engine for WordPress developers</span>
        </div>
      </header>

      <SearchBar />
    </div>
  );
};

export default App;
