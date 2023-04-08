import React, {
  ChangeEventHandler,
  DependencyList,
  FormEventHandler,
  ReactNode,
  useEffect,
  useId,
  useState,
} from "react";
import ReactDOM from "react-dom/client";
import "./main.css";

export type DelayHookProps = {
  dependencies?: DependencyList;
  /** in milliseconds */
  timeout: number;
  onDelay: () => void;
};

export const useDelay = ({
  timeout,
  onDelay,
  dependencies = [],
}: DelayHookProps) => {
  useEffect(() => {
    const timeoutId = setTimeout(onDelay, timeout);

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, dependencies);
};

type DebounceHookProps<TValue> = {
  value: TValue;
  setValue: (text: TValue) => void;
} & Partial<Pick<DelayHookProps, "timeout">>;

export const useDebounce = <TValue,>({
  setValue,
  timeout = 250,
  value,
}: DebounceHookProps<TValue>) => {
  useDelay({
    timeout,
    onDelay: () => setValue(value),
    dependencies: [value],
  });
};

export type CommonInputProps<TValue extends string | number> = {
  id?: string;
  name?: string;
  label?: ReactNode;
  onChange: (text: TValue) => void;
  setValue: (text: TValue) => void;
  value?: TValue;
  children?: JSX.Element;
  className?: string;
};

export type InputProps<TValue extends string | number> =
  | (CommonInputProps<TValue> & {
      type: "email" | "password" | "search" | "tel" | "url" | "text";
      onChange: (text: string) => void;
      setValue: (text: string) => void;
      value?: string;
    })
  | (CommonInputProps<TValue> & {
      type: "number";
      onChange: (text: number) => void;
      setValue: (text: number) => void;
      value?: number;
    });

export function Input<TValue extends string | number>({
  id,
  name,
  label,
  onChange: externalOnChange,
  value = "" as TValue,
  type = "text",
  children,
  className = "",
}: InputProps<TValue>) {
  const [innerValue, setInnerValue] = useState<TValue>(value);
  const [eventValue, setEventValue] = useState<TValue>(value);

  useDebounce<TValue>({
    setValue: (text: TValue) => {
      if (innerValue === eventValue) {
        return;
      }

      if (externalOnChange) {
        externalOnChange(text);
      }
    },
    value: eventValue,
    timeout: 250,
  });

  useEffect(() => {
    setInnerValue(value);
    setEventValue(value);
  }, [value]);

  useEffect(() => {
    setInnerValue(eventValue);
  }, [eventValue]);

  const innerId = useId();
  const actualId = id ?? innerId;

  const actualName = name ?? actualId;

  const onInput: FormEventHandler<HTMLInputElement> = (evt) => {
    setEventValue(evt.currentTarget.value as TValue);
  };

  const onChange: ChangeEventHandler<HTMLInputElement> = (evt) => {
    setEventValue(evt.target.value as TValue);
  };

  return (
    <div className="input-container">
      <label className="input-label" htmlFor={actualId}>
        {label ? <span className="input-label-text">{label}</span> : null}

        <input
          name={actualName}
          id={actualId}
          className={["input", className].filter(Boolean).join(" ")}
          {...{ onInput, onChange, value: innerValue, type }}
        />
      </label>

      {children ? <div className="input-children">{children}</div> : null}
    </div>
  );
}

function App() {
  const [value, setValue] = useState("");
  const onChange = (text: string) => {
    setValue(text);
    console.log("on change trigger");
  };

  useEffect(() => {
    console.log({ value });
  }, [value]);

  const onProgramaticValueChangeClick = () => {
    setValue("Hello World!");
  };

  return (
    <div className="app">
      <Input
        label={<h2>Label</h2>}
        {...{ type: "text", value, setValue, onChange }}
      >
        <div className="search-results"></div>
      </Input>

      <div>&nbsp;</div>

      <button onClick={onProgramaticValueChangeClick}>
        Programaticically change the value
      </button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
