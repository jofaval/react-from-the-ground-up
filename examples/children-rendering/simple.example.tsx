import React, { PropsWithChildren } from "react";
import ReactDOM from "react-dom/client";

function ThisWillNeverRender() {
  console.error("rendering...");
  return <h1>Hello World!</h1>;
}

function FirstWrapper() {
  if (true) return null;
  return (
    <div>
      <ThisWillNeverRender />
    </div>
  );
}

function DynamicWrapper({ children }: PropsWithChildren) {
  if (true) return null;
  return <div>{children}</div>;
}

let prev = 0;
let curr = 0;
function timeStart() {
  prev = Date.now();
  console.log({ prev });
}

function timeEnd() {
  curr = Date.now();
  console.log({ curr });
  console.log(curr - prev);
}

function App(props) {
  return (
    <div className="App">
      <h1>Hello React.</h1>
      <h2>Start editing to see some magic happen!</h2>

      {/* remove first cold start */}
      <FirstWrapper />

      {timeStart()}
      <FirstWrapper />
      {timeEnd()}

      {timeStart()}
      <DynamicWrapper>
        <ThisWillNeverRender />
      </DynamicWrapper>
      {timeEnd()}

      {timeStart()}
      {false ? <FirstWrapper /> : null}
      {timeEnd()}
    </div>
  );
}

ReactDOM.createRoot(document.querySelector("#root")).render(<App />);
