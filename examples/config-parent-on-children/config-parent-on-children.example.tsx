import React, { createContext, useContext, useEffect, useReducer } from "react";
import ReactDOM from "react-dom/client";

const shared = createContext({});

const Filter = ({ name, value }) => {
  const { setFilter } = useContext(shared);

  useEffect(() => {
    setFilter({ name, value: value ?? [] });
  }, []);

  return <></>;
};

function App() {
  const [filters, setFilter] = useReducer(
    (state, { name, value }) => ({ ...(state ?? {}), [name]: value }),
    undefined
  );

  useEffect(() => {
    if (filters === undefined) {
      // config not set, don't compute
      return;
    }

    if (Object.keys(filters).length <= 0) {
      // no filters, don't compute
      return;
    }

    console.log(filters);
  }, [filters]);

  return (
    <shared.Provider value={{ filters, setFilter }}>
      <Filter name="test" value={[1, 2, 3]} />
      <Filter name="first" value={[1, 2, 4, 5]} />
      <Filter name="second" value={[1, 2, 3]} />

      <div className="App">
        {filters !== undefined
          ? Object.entries(filters).map(([name, value], index) => (
              <div key={index}>
                {name}: {value.length}
              </div>
            ))
          : null}
      </div>
    </shared.Provider>
  );
}

ReactDOM.createRoot(document.querySelector("#root")).render(<App />);
