"use client";

import {
  SpecialisationOptions,
  CategoryOptions,
  SpellQueryParams,
  urlSpellPrefix,
} from "@/data/categories";
import { QueryOption, QueryParam, SelectOption } from "@/types/option";

import Hero from "./Hero";
import SearchBox from "@/components/SearchBox";
import Select from "@/components/Select";
import { useState } from "react";
import useFetchData from "@/hooks/useFetchData";
import { Loader } from "lucide-react";
import CategoryCard from "./Card";

type CategoryProps = {
  heading: string;
  options: SelectOption[];
  valueChanges: (values: QueryParam[]) => void;
};

const CategorySection = ({ heading, options, valueChanges }: CategoryProps) => {
  const [values, setValues] = useState(SpellQueryParams);

  const handleValueChanges = (childValue: QueryOption) => {
    values.map((item) => {
      if (childValue.name == item.name) {
        item.value = childValue.value;
      }
      setValues(values);
      valueChanges(values);
    });
  };

  return (
    <section>
      <h1 className="mb-5 font-medium text-2xl">{heading}</h1>
      <div className="flex gap-10">
        {options.map((item, idx) => (
          <Select
            key={idx}
            heading={item.heading}
            url={item.url}
            onValueChange={handleValueChanges}
          />
        ))}
      </div>
    </section>
  );
};

const Homepage = () => {
  const [queryParams, setQueryParams] = useState<string>("");
  const { data, isLoading, error } = useFetchData<any[]>(
    `${urlSpellPrefix}${queryParams}`
  );

  const handleValueChanges = (values: QueryParam[]) => {
    let queryStr = "?";
    values.map((item) => {
      if (item.value !== "") {
        queryStr += `${item.prefix}${item.value}&`;
      }
    });
    setQueryParams(queryStr.slice(0, -1));
  };

  return (
    <main className="">
      <Hero>
        <h1 className="text-5xl font-bold">
          Explore the <span className="text-magic">Magic</span> of DnD
        </h1>
        <p className="pt-6 pb-8 text-lg">
          Use the search box to find specific spells, or choose a combination of
          options from the categories below!
        </p>
        <div className="flex flex-col justify-center items-center">
          <SearchBox />
        </div>
        <div className="flex gap-10 mt-16 mb-6 justify-center items-center text-start">
          <CategorySection
            heading="Specialisation"
            options={SpecialisationOptions}
            valueChanges={handleValueChanges}
          />
          <div className="divider divider-horizontal"></div>
          <CategorySection
            heading="Category"
            options={CategoryOptions}
            valueChanges={handleValueChanges}
          />
        </div>
      </Hero>
      {error ? (
        <section className="grid gap-8 m-20 items-center justify-center">
          {error && <div>Data error: {error}</div>}
        </section>
      ) : isLoading ? (
        <section className="grid gap-8 m-20 items-center justify-center">
          <Loader width={50} height={50} className="animate-spin" />
        </section>
      ) : (
        <section className="grid grid-cols-3 gap-8 m-10">
          {data.items.map((card) => (
            // <CategoryCard key={category.title} {...category} />
            <div key={card.name}>
              <p>{card.name}</p>
            </div>
          ))}
        </section>
      )}
    </main>
  );
};

export default Homepage;
