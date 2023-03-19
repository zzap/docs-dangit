import React from "react";
import {Helmet} from "react-helmet";
import "./scss/main.scss";
import SearchBar from "./SearchBar";

const App = () => {
  return (
    <div className="App">
      	<Helmet>
			<meta name="description" content="A search engine for WordPress developers"></meta>
			<title>docs_dangit</title>
		</Helmet>

		<div>
			<div>
				<div>
					<div>
						<h1>docs_dangit: A search engine for WordPress developers</h1>
					</div>
				</div>

				<div>
					<SearchBar />
				</div>
			</div>
		</div>

    </div>
  );
}

export default App;
