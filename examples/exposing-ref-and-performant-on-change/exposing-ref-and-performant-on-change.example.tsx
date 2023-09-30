// https://playcode.io/react

import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import ReactDOM from "react-dom/client";

const InternalState = forwardRef(({}, ref) => {
  const [state, modifier] = useState("");

  useImperativeHandle(ref, () => ({
    modify: modifier,
  }));

  useEffect(() => {
    console.log(state);
  }, [state]);

  return null;
});

const useModifier = (internalStateRef) => {
  useEffect(() => {
    internalStateRef.current?.modify("test");
  }, [internalStateRef]);

  return {
    onChange(evt) {
      internalStateRef.current?.modify(evt.target.value);
    },
  };
};

function App() {
  const internalStateRef = useRef();

  const { onChange } = useModifier(internalStateRef);

  console.log("render");

  return (
    <div className="App">
      <InternalState ref={internalStateRef} />

      <input
        type="text"
        value={internalStateRef.current?.value}
        onChange={onChange}
      />
    </div>
  );
}

ReactDOM.createRoot(document.querySelector("#root")).render(<App />);
