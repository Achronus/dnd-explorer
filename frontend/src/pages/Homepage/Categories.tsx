"use client";

import { HomepageCategories } from "@/data/HomepageCategories";
import CategoryCard from "./Card";
import useFetchImgs from "@/hooks/useFetchImgs";
import { useEffect, useState } from "react";
import { Loader } from "lucide-react";

const CategoryCards = () => {
  const [names, setNames] = useState<string[]>([]);

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

  const { imgUrls, isLoading, error } = useFetchImgs(names.join(","));
  return (
    <>
      {isLoading ? (
        <section className="grid gap-8 m-20 items-center justify-center">
          <Loader width={50} height={50} className="animate-spin" />
        </section>
      ) : (
        <section className="grid grid-cols-3 gap-8 m-10">
          {HomepageCategories.map((category, idx) => (
            <CategoryCard
              key={category.title}
              {...category}
              img={{
                name: names[idx],
                url: imgUrls[idx],
              }}
            />
          ))}
        </section>
      )}
    </>
  );
};

export default CategoryCards;
