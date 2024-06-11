"use client";

import { HomepageCategories } from "@/data/HomepageCategories";
import CategoryCard from "./Card";
import useFetchImgs from "@/hooks/useFetchImgs";
import { useEffect, useState } from "react";
import { Loader } from "lucide-react";
import { CategoryCount, UTImage } from "@/types/api";
import useFetchData from "@/hooks/useFetchData";
import { HomeCategories } from "@/types/cards";

const CategoryCards = () => {
  const [names, setNames] = useState<string[]>([]);
  const { imgUrls, isLoading, error } = useFetchImgs(names.join(","));
  const { data, dataIsLoading, dataError } =
    useFetchData<CategoryCount[]>("/api/spells/counts");
  const [categoryData, setCategoryData] = useState<HomeCategories[]>([]);

  useEffect(() => {
    const getNames = () => {
      let names: string[] = [];
      HomepageCategories.forEach((category) => {
        names.push(category.imgName);
      });
      setNames(names);
    };

    getNames();
  }, []);

  const mergeData = (
    coreData: { url: string; title: string; imgName: string }[],
    imageData: UTImage[],
    counts: { name: string; value: number }[]
  ): HomeCategories[] => {
    return coreData.map((item) => {
      const imageItem = imageData.find((img) => img.name === item.imgName);
      const countItem = counts.find((count) => count.name === item.title);

      return {
        ...item,
        img: imageItem
          ? { name: imageItem.name, url: imageItem.url }
          : { name: item.title, url: "" },
        count: countItem ? countItem.value : "N/A",
      };
    });
  };

  useEffect(() => {
    if (!isLoading && !dataIsLoading) {
      setCategoryData(mergeData(HomepageCategories, imgUrls, data));
    }
  }, [isLoading, dataIsLoading]);

  return (
    <>
      {error || dataError ? (
        <section className="grid gap-8 m-20 items-center justify-center">
          {dataError && <div>Count error: {dataError}</div>}
          {error && <div>Image error: {error}</div>}
        </section>
      ) : isLoading || dataIsLoading ? (
        <section className="grid gap-8 m-20 items-center justify-center">
          <Loader width={50} height={50} className="animate-spin" />
        </section>
      ) : (
        <section className="grid grid-cols-3 gap-8 m-10">
          {categoryData.map((category) => (
            <CategoryCard key={category.title} {...category} />
          ))}
        </section>
      )}
    </>
  );
};

export default CategoryCards;
