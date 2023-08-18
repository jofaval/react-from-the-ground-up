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
  // NestedChild: FC;
  NestedChild: typeof NestedChild; // safer option
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

type CompoundParentProps<TCode extends string> = PropsWithChildren<{
  code: TCode;
}>;

const CompoundParent = <TCode extends string>({
  code,
  children,
}: CompoundParentProps<TCode>) => {
  return <Provider value={{ code }}>{children}</Provider>;
};

const Group = Object.assign(CompoundParent, {
  Parent,
});

function App() {
  return (
    <div className="app">
      <Group code="first">
        <Group.Parent subCode="top">
          <Group.Parent.NestedChild />
          <Group.Parent.NestedChild />
        </Group.Parent>
        <Group.Parent subCode="bottom">
          <Group.Parent.NestedChild />
          <Group.Parent.NestedChild />
        </Group.Parent>
      </Group>

      <Group code="second">
        <Group.Parent subCode="top">
          <Group.Parent.NestedChild />
          <Group.Parent.NestedChild />
        </Group.Parent>
        <Group.Parent subCode="bottom">
          <Group.Parent.NestedChild />
          <Group.Parent.NestedChild />
        </Group.Parent>
      </Group>

      {/* ERROR, no parent nor compound parent */}
      <Group.Parent.NestedChild />

      {/* ERROR, no compound parent */}
      <Group.Parent subCode="willThrowError">
        <Group.Parent.NestedChild />
      </Group.Parent>

      {/* ERROR, no parent */}
      <Group code="willAlsoFail">
        <Group.Parent.NestedChild />
      </Group>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
