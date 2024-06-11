"use client";

import useFetchData from "@/hooks/useFetchData";
import { Category } from "@/types/api";
import { SpellLayout } from "@/layouts";

const Page = () => {
  const { data, dataIsLoading, dataError } = useFetchData<Category>(
    "/api/spells/category/class"
  );

  return (
    <SpellLayout
      heroTitle="Class"
      heroDesc="Deciding on what class to play? Scroll through their spells below!"
      dataError={dataError}
      dataIsLoading={dataIsLoading}
      data={data}
    />
  );
};

export default Page;
