import { useCallback } from "react";
import { useLocation, useSearch } from "wouter";

export function useUrlState(
  key: string,
  defaultValue: number,
): [number, (value: number) => void];
export function useUrlState(
  key: string,
  defaultValue: string,
): [string, (value: string) => void];
export function useUrlState(
  key: string,
  defaultValue: string | number,
): [string, (value: string) => void] | [number, (value: number) => void] {
  const [, setLocation] = useLocation();
  const searchParams = useSearch();

  const params = new URLSearchParams(searchParams);
  const urlValue = params.get(key);
  const value = urlValue
    ? typeof defaultValue === "number"
      ? Number(urlValue)
      : urlValue
    : defaultValue;

  const setValue = useCallback(
    (newValue: string | number) => {
      const currentParams = new URLSearchParams(globalThis.location.search);
      currentParams.set(key, newValue.toString());
      setLocation(
        `${globalThis.location.pathname}?${currentParams.toString()}`,
      );
    },
    [key, setLocation],
  );

  // The overloads guarantee value/setValue agree with the default's type.
  return [value, setValue] as [string, (value: string) => void];
}
