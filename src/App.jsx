import React from "react";
import {Helmet} from "react-helmet";
import "./main.css";
import SearchBar from "./SearchBar";

const App = () => {
  return (
    <div className="App">
      	<Helmet>
			<meta name="description" content="A search engine for WordPress developers"></meta>
			<title>docs_dangit</title>
		</Helmet>

					<>
						<h1 className="">docs_dangit: A search engine for WordPress developers</h1>
					</>

				<>
					<SearchBar />
				</>

    </div>
  );
}

export default App;
