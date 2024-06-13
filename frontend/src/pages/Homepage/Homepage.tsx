"use client";

import {
  SpecialisationOptions,
  CharacteristicOptions,
  SpellQueryParams,
  urlSpellPrefix,
} from "@/data/categories";
import {
  CategoryCounts,
  QueryOption,
  QueryParam,
  SelectOption,
} from "@/types/option";
import { SpellsApiOverview } from "@/types/api";

import Hero from "./Hero";
import SearchBox from "@/components/SearchBox";
import Select from "@/components/Select";

import { useState } from "react";
import useFetchData from "@/hooks/useFetchData";

import { Loader } from "lucide-react";

type CategoryProps = {
  heading: string;
  options: SelectOption[];
  valueChanges: (values: QueryParam[]) => void;
  queryParams: string;
};

const CategorySection = ({
  heading,
  options,
  valueChanges,
  queryParams,
}: CategoryProps) => {
  const [values, setValues] = useState(SpellQueryParams);
  const {
    data: countData,
    isLoading,
    error,
  } = useFetchData<CategoryCounts>(`${urlSpellPrefix}counts${queryParams}`);

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
    <>
      {/* Mobile devices */}
      <section className="md:hidden">
        {isLoading ? (
          <div className="flex justify-center items-center">
            Loading categories...
          </div>
        ) : (
          <div className="mobile-devices collapse collapse-arrow border border-base-100 bg-base-200">
            <input type="checkbox" className="peer" />
            <div className="collapse-title text-xl font-medium">{heading}</div>
            <div className="collapse-content">
              <div className="flex flex-col md:flex-row gap-10 mt-5">
                {options.map((item, idx) => {
                  const category = countData?.categories.find(
                    (cat) => item.name === cat.name
                  );
                  return (
                    <Select
                      key={idx}
                      heading={item.heading}
                      category={category}
                      onValueChange={handleValueChanges}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Large devices */}
      <section className="hidden md:block">
        <h1 className="mb-5 font-medium text-2xl">{heading}</h1>
        {isLoading ? (
          <div className="flex justify-center items-center">
            Loading categories...
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-10">
            {options.map((item, idx) => {
              const category = countData?.categories.find(
                (cat) => item.name === cat.name
              );
              return (
                <Select
                  key={idx}
                  heading={item.heading}
                  category={category}
                  onValueChange={handleValueChanges}
                />
              );
            })}
          </div>
        )}
      </section>
    </>
  );
};

const Homepage = () => {
  const [queryParams, setQueryParams] = useState<string>("");
  const [url, setUrl] = useState<string>(`${urlSpellPrefix}`);
  const { data, isLoading, error } = useFetchData<SpellsApiOverview>(url);

  const handleValueChanges = (values: QueryParam[]) => {
    let queryStr = "?";
    values.map((item) => {
      if (item.value !== "") {
        queryStr += `${item.prefix}${item.value}&`;
      }
    });
    const newParams = queryStr.slice(0, -1);
    setQueryParams(newParams);
    setUrl(`${urlSpellPrefix}${newParams}`);
  };

  return (
    <main>
      <Hero>
        <h1 className="text-5xl font-bold py-6 lg:py-0">
          Explore the <span className="text-magic">Magic</span> of DnD
        </h1>
        <p className="pb-8 text-lg my-6 lg:my-0 lg:pt-6">
          Use the search box to find specific spells, or choose a combination of
          options from the categories below!
        </p>
        <div className="flex flex-col justify-center items-center">
          <SearchBox />
        </div>
        <div className="flex flex-col lg:flex-row gap-10 mt-16 mb-6 justify-center items-center text-start">
          {isLoading ? (
            <div>Loading options...</div>
          ) : (
            <>
              <CategorySection
                heading="Specialisation"
                options={SpecialisationOptions}
                valueChanges={handleValueChanges}
                queryParams={queryParams}
              />
              <div className="divider divider-horizontal"></div>
              <CategorySection
                heading="Characteristics"
                options={CharacteristicOptions}
                valueChanges={handleValueChanges}
                queryParams={queryParams}
              />
            </>
          )}
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
        <section className="flex flex-col gap-8 mt-10">
          <h1 className="text-3xl text-center">
            Showing <span className="text-magic">{data?.count}</span> Spells...
          </h1>
          <div className="grid grid-cols-3 gap-8 m-10">
            {data?.items.map((card) => (
              // <CategoryCard key={category.title} {...category} />
              <div key={card.name}>
                <p>{card.name}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
};

export default Homepage;
