import React from "react";
import {Helmet} from "react-helmet";

const App = () => {
  return (
    <div className="App">
      <Helmet>
		<title>docs_dangit</title>
		<meta name="description" content="A search engine for WordPress developers"></meta>
	</Helmet>
    </div>
  );
}

export default App;
