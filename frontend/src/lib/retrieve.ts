import { ApiUrlRoot } from "./constants";
import { SpellCardApi, SpellCardDetailsApi } from "@/types/api";

const getData = async (queryKey: string) => {
  try {
    const response = await fetch(`${ApiUrlRoot}/${queryKey}`, {
      cache: "force-cache",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return null;
  }
};

const getLimitedData = async (
  queryKey: string,
  limit: number,
  offset: number = 0
) => {
  const data = await getData(queryKey);

  if (!data) {
    throw new Error("No data received.");
  }

  const dataSlice = data.slice(offset, offset + limit);
  return dataSlice;
};

const getSpellData = async (
  queryKey: string,
  limit: number,
  offset: number = 0
) => {
  const spellIndices: SpellCardApi[] = await getLimitedData(
    queryKey,
    limit,
    offset
  );

  const data: SpellCardDetailsApi[] = await Promise.all(
    spellIndices.map((idx) =>
      fetch(`${ApiUrlRoot}/${queryKey}/${idx.index}`).then((res) => res.json())
    )
  );
  return data;
};

export { getData, getLimitedData, getSpellData };
