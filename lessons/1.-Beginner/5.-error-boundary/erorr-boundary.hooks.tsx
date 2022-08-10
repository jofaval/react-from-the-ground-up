import React from "react";

type ErrorBoundaryPropsType = {
  fallbackComponent?: JSX.Element;
};

const ErrorBoundary: React.FC<ErrorBoundaryPropsType> = ({
  children,
  fallbackComponent = null,
}) => {
  // As stated in the official docs, not the best
  try {
    return children;
  } catch (error) {
    console.error("Error catched", error);
    if (fallbackComponent) return fallbackComponent;
  }
};

export default ErrorBoundary;
