import { useCallback } from "react";
import { useLocation, useSearch } from "wouter";

export function useUrlState(
  key: string,
  defaultValue: number,
): [number, (value: number) => void] {
  const [, setLocation] = useLocation();
  const searchParams = useSearch();

  const params = new URLSearchParams(searchParams);
  const urlValue = params.get(key);
  const value = urlValue ? Number.parseInt(urlValue, 10) : defaultValue;

  const setValue = useCallback(
    (newValue: number) => {
      const currentParams = new URLSearchParams(globalThis.location.search);
      currentParams.set(key, newValue.toString());
      setLocation(`${globalThis.location.pathname}?${currentParams.toString()}`);
    },
    [key, setLocation],
  );

  return [value, setValue];
}
