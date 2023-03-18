import React from "react";
import {Helmet} from "react-helmet";
import "./scss/main.scss";

const App = () => {
  return (
    <div className="App">
      	<Helmet>
			<meta name="description" content="A search engine for WordPress developers"></meta>
			<title>docs_dangit</title>
		</Helmet>

		<div className="title-wrap">
			<h1 className="font-sans">docs_dangit: A search engine for WordPress developers</h1>
		</div>

    </div>
  );
}

export default App;
