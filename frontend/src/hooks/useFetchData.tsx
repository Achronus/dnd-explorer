import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

type AxiosErrorType = AxiosError<any> | null;

const useFetchData = (url: string) => {
  const [data, setData] = useState<DataType>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<AxiosErrorType>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await axios.get(url);
        setData(response.data);
      } catch (error) {
        setError(error as AxiosErrorType);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, isLoading, error };
};

export default useFetchData;
