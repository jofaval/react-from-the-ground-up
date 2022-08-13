import React, { ErrorInfo, ReactNode } from "react";

type ErrorBoundaryPropsType = {
  fallbackComponent?: JSX.Element;
  children?: ReactNode;
  logError?: boolean;
};

type ErrorBoundaryStateType = {
  hasError: boolean;
  error: Error | null;
};

class ErrorBoundary extends React.Component<
  ErrorBoundaryPropsType,
  ErrorBoundaryStateType
> {
  constructor(props: ErrorBoundaryPropsType) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (this.props?.logError) {
      console.error("Error catched", error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallbackComponent ?? <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
