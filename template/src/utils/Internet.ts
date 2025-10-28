import { DependencyList, useEffect } from "react";

export function useInternetConnected(
  callback: () => void,
  dependencies: DependencyList = [],
) {
  useEffect(() => {
    if (navigator.onLine) {
      callback();
    }
    const handleOnline = () => {
      callback();
    };

    globalThis.addEventListener("online", handleOnline);

    return () => {
      globalThis.removeEventListener("online", handleOnline);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
}
