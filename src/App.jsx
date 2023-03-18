import React from "react";
import {Helmet} from "react-helmet";

const App = () => {
  return (
    <div className="App">
      	<Helmet>
			<meta name="description" content="A search engine for WordPress developers"></meta>
			<title>docs_dangit</title>
		</Helmet>

		<div className="title-wrap">
			<h1>docs_dangit: A search engine for WordPress developers</h1>
		</div>

    </div>
  );
}

export default App;
