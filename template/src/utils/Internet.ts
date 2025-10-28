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

        window.addEventListener("online", handleOnline);

        return () => {
            window.removeEventListener("online", handleOnline);
        };
    }, dependencies);
}
