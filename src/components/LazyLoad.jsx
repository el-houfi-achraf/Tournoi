import React, { Suspense } from "react";
import LoadingSpinner from "./LoadingSpinner";

// HOC pour charger des composants de façon différée
const LazyLoad = (Component, fallback = <LoadingSpinner />) => {
  return (props) => (
    <Suspense fallback={fallback}>
      <Component {...props} />
    </Suspense>
  );
};

export default LazyLoad;
