import React, { createContext, FC, PropsWithChildren, useContext } from "react";
import ReactDOM from "react-dom/client";

const context = createContext<{ code: string } | undefined>(undefined);
const { Provider } = context;

const parentContext = createContext<{ subCode: string } | undefined>(undefined);

const NestedChild: FC = () => {
  const contextData = useContext(context);
  const parentContextData = useContext(parentContext);
  if (!contextData || !parentContextData) {
    return <h1>Error</h1>;
  }

  return <span>{parentContextData.subCode + "-" + contextData.code}</span>;
};

type ParentProps = PropsWithChildren<{
  subCode: string;
}>;

type ParentType = FC<ParentProps> & {
  NestedChild: FC;
};

const Parent: ParentType = ({ children, subCode }) => {
  const contextData = useContext(context);
  if (!contextData) {
    return <h1>Error</h1>;
  }

  return (
    <parentContext.Provider value={{ subCode }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginBottom: "10px",
        }}>
        {children}
      </div>
    </parentContext.Provider>
  );
};
Parent.NestedChild = NestedChild;

type CompoundParentProps = PropsWithChildren<{
  code: string;
}>;

const CompoundParent: FC<CompoundParentProps> & {
  Parent: ParentType;
} = ({ code, children }) => {
  return <Provider value={{ code }}>{children}</Provider>;
};
CompoundParent.Parent = Parent;

function App() {
  return (
    <div className="app">
      <CompoundParent code="first">
        <CompoundParent.Parent subCode="top">
          <CompoundParent.Parent.NestedChild />
          <CompoundParent.Parent.NestedChild />
        </CompoundParent.Parent>
        <CompoundParent.Parent subCode="bottom">
          <CompoundParent.Parent.NestedChild />
          <CompoundParent.Parent.NestedChild />
        </CompoundParent.Parent>
      </CompoundParent>

      <CompoundParent code="second">
        <CompoundParent.Parent subCode="top">
          <CompoundParent.Parent.NestedChild />
          <CompoundParent.Parent.NestedChild />
        </CompoundParent.Parent>
        <CompoundParent.Parent subCode="bottom">
          <CompoundParent.Parent.NestedChild />
          <CompoundParent.Parent.NestedChild />
        </CompoundParent.Parent>
      </CompoundParent>

      {/* ERROR, no parent nor compound parent */}
      <CompoundParent.Parent.NestedChild />

      {/* ERROR, no compound parent */}
      <CompoundParent.Parent subCode="willThrowError">
        <CompoundParent.Parent.NestedChild />
      </CompoundParent.Parent>

      {/* ERROR, no parent */}
      <CompoundParent code="willAlsoFail">
        <CompoundParent.Parent.NestedChild />
      </CompoundParent>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
