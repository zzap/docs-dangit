import React from "react";
import {Helmet} from "react-helmet";
import "./main.css";
import SearchBar from "./SearchBar";
import { DocsDangitIcon } from './svg';

const App = () => {
  return (
    <div className="App">
      	<Helmet>
			<meta name="description" content="A search engine for WordPress developers"></meta>
			<title>docs_dangit</title>
		</Helmet>

		<header className="bg-blue-600 flex">
			<DocsDangitIcon className="w-8 h-8" />
			<h1 className="">docs_dangit: A search engine for WordPress developers</h1>
		</header>

				<>
					<SearchBar />
				</>

    </div>
  );
}

export default App;
