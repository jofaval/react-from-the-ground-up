import React from "react";

type ErrorBoundaryPropsType = {
  fallbackComponent?: JSX.Element;
};

type ErrorBoundaryStateType = {
  hasError: boolean;
  error: Error;
};

class ErrorBoundary extends React.Component<
  ErrorBoundaryPropsType,
  ErrorBoundaryStateType
> {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error catched", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallbackComponent ?? <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
