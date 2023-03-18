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

		<div className="container">
			<div className="row">
				<div className="col-12">
					<div className="title-wrap">
						<h1 className="mt-3">docs_dangit: A search engine for WordPress developers</h1>
					</div>
				</div>

				<div className="col-12 mt-5">
					<SearchBar />
				</div>
			</div>
		</div>

    </div>
  );
}

export default App;
