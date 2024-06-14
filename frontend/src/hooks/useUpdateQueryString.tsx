import { useSearchParams } from "next/navigation";
import { useCallback } from "react";

/**
 * Create a new `searchParams` string by merging the current `searchParams` with a set of new key-value pairs
 * @param searchParams the existing search parameters obtained from `useSearchParams()`
 * @param queries an array of name, value pairs for the queries to update
 * @returns an updated `searchParams` query string starting with a `?`
 */
const useUpdateQueryString = () => {
  const searchParams = useSearchParams();

  const updateQueryString = useCallback(
    (queries: { name: string; value: string }[]) => {
      const params = new URLSearchParams(searchParams?.toString());

      queries.forEach(({ name, value }) => {
        params.set(name, value);
      });

      return `?${params.toString()}`;
    },
    [searchParams]
  );

  return updateQueryString;
};

export default useUpdateQueryString;
