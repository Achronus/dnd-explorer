import { useEffect, useState } from "react";

const useFetchData = <T,>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [dataIsLoading, setDataLoading] = useState(true);
  const [dataError, setDataError] = useState(null);

  useEffect(() => {
    if (!url) {
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
      } catch (error: any) {
        console.error("Error fetching data:", error);
        setDataError(error);
      } finally {
        setDataLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, dataIsLoading, dataError };
};

export default useFetchData;
