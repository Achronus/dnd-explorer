import { UTListFileURL } from "@/lib/constants";
import { useEffect, useState } from "react";

const useFetchImgs = (imgNames: string) => {
  const [imgUrls, setImgUrls] = useState<string[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!imgNames) {
      return;
    }

    const fetchUrl = async () => {
      try {
        const response = await fetch(
          `${UTListFileURL}?filenames=${imgNames}`
        );

        if (response.ok) {
          const urlTemplate = `https://utfs.io/a/${process.env.NEXT_PUBLIC_UPLOADTHING_APP_ID}`;
          let imgUrls: string[] = [];

          const data: string[] = await response.json();

          data.map((item) => {
            imgUrls.push(`${urlTemplate}/${item}`);
          });

          setImgUrls(imgUrls);
        } else {
          throw new Error("Failed to fetch images");
        }
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUrl();
  }, [imgNames]);

  return { imgUrls, isLoading, error };
};

export default useFetchImgs;
