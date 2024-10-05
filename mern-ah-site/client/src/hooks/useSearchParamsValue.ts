import { useCallback } from "react";
import { URLSearchParamsInit, useSearchParams } from "react-router-dom";

const useSearchParamsValue = (defaultInit?: URLSearchParamsInit) => {
  const [searchParams, setSearchParams] = useSearchParams(defaultInit);

  const handleSearchParams = useCallback(
    (name: string, value: any) => {
      setSearchParams(
        (prev) => {
          prev.set(name, value as unknown as string);
          return prev;
        },
        { replace: true }
      );
    },
    [searchParams]
  );
  return { searchParams, handleSearchParams };
};

export default useSearchParamsValue;
