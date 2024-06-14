"use client";

import {
  InitCategoryOptions,
  SpellQueryParams,
  urlSpellPrefix,
} from "@/data/categories";
import { SpecialisationDetails, CharacteristicDetails } from "@/data/details";
import {
  CategoryCounts,
  QueryOption,
  QueryParam,
  CategoryDetails,
} from "@/types/option";
import { SpellOverviewDetails, SpellsApiOverview } from "@/types/api";

import Hero from "./Hero";
import SearchBox from "@/components/SearchBox";
import Select from "@/components/Select";

import { useEffect, useState } from "react";
import useFetchData from "@/hooks/useFetchData";

import { Loader } from "lucide-react";
import Pagination from "@/components/Pagination";
import { useRouter, useSearchParams } from "next/navigation";

type CategoryProps = {
  heading: string;
  options: CategoryDetails[];
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
  const [categoryData, setCategoryData] = useState(InitCategoryOptions);
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

  useEffect(() => {
    if (countData) {
      setCategoryData(countData);
    }
  }, [countData]);

  return (
    <>
      {/* Mobile devices */}
      <section className="md:hidden">
        <div className="mobile-devices collapse collapse-arrow border border-base-100 bg-base-200">
          <input type="checkbox" className="peer" />
          <div className="collapse-title text-xl font-medium">{heading}</div>
          <div className="collapse-content">
            <div className="flex flex-col md:flex-row gap-10 mt-5">
              {options.map((item, idx) => {
                const category = categoryData.categories.find(
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
      </section>

      {/* Large devices */}
      <section className="hidden md:block">
        <h1 className="mb-5 font-medium text-2xl">{heading}</h1>
        <div className="flex flex-col md:flex-row gap-10">
          {options.map((item, idx) => {
            const category = categoryData.categories.find(
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
      </section>
    </>
  );
};

const Homepage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams?.get("page") ?? "1";
  const perPage = searchParams?.get("per_page") ?? "20";

  const [queryParams, setQueryParams] = useState<string>("");
  const [numPages, setNumPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState(Number(page));
  const [entrires, setEntries] = useState<SpellOverviewDetails[]>([]);

  const [url, setUrl] = useState<string>(`${urlSpellPrefix}`);
  const { data, isLoading, error } = useFetchData<SpellsApiOverview>(url);

  useEffect(() => {
    if (data) {
      const numPages = Math.ceil(data.count / Number(perPage));
      setNumPages(numPages);

      const start = (Number(page) - 1) * Number(perPage);
      const end = start + Number(perPage);

      const entries = data.items.slice(start, end);
      setEntries(entries);
    }
  }, [data, page]);

  useEffect(() => {
    setCurrentPage(1);
    router.push(`/?page=1&per_page=${perPage}`, { scroll: false });
  }, [perPage]);

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

  const HandlePaginationChange = (pageIdx: number) => {
    setCurrentPage(pageIdx);
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
          <>
            <CategorySection
              heading="Specialisation"
              options={SpecialisationDetails}
              valueChanges={handleValueChanges}
              queryParams={queryParams}
            />
            <div className="divider divider-horizontal"></div>
            <CategorySection
              heading="Characteristics"
              options={CharacteristicDetails}
              valueChanges={handleValueChanges}
              queryParams={queryParams}
            />
          </>
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
        <section id="spells" className="flex flex-col gap-8 mt-10">
          <h1 className="text-3xl text-center">
            Found <span className="text-magic">{data?.count}</span> Spells...
          </h1>
          <div className="grid grid-cols-3 gap-8 m-10">
            {entrires.map((card) => (
              // <CategoryCard key={category.title} {...category} />
              <div key={card.name}>
                <p>{card.name}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-center items-center mb-10">
            {numPages > 1 && (
              <Pagination
                currentPage={Number(currentPage)}
                numPages={numPages}
                pageCount={Number(perPage)}
                handleChange={HandlePaginationChange}
              />
            )}
          </div>
        </section>
      )}
    </main>
  );
};

export default Homepage;
