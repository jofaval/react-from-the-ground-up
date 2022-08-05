import React from "react";
import ReactDOM from "react-dom";

const HelloWorld = ({ name }) => {
  return <span className="hello-world">Hello {name}!</span>;
};

const App = () => {
  <div id="app" className="app__container">
    <div className="app">
      {/* <HelloWorld name={'Your Name ;)'} /> */}
      <HelloWorld name={'World'} />
    </div>
  </div>
};

ReactDOM.render(<App />, rootElement);