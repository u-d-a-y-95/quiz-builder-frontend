import { Suspense } from "react";
import ErrorBoundary from "./errorBoundary";
import Spinner from "./spinner";

const RouteWrapper = ({ children }) => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Spinner/>}>{children}</Suspense>
    </ErrorBoundary>
  );
};

export default RouteWrapper;
