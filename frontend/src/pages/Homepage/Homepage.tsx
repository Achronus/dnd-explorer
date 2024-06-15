"use client";

import { InitCategoryOptions } from "@/data/categories";
import { SpecialisationDetails, CharacteristicDetails } from "@/data/details";
import { CategoryCounts, CategoryDetails } from "@/types/option";
import { SpellOverviewDetails, SpellsApiOverview } from "@/types/api";

import Hero from "./Hero";
import SearchBox from "@/components/SearchBox";
import Select from "@/components/Select";

import { useEffect, useState } from "react";
import useFetchData from "@/hooks/useFetchData";

import Pagination from "@/components/Pagination";
import { useRouter, useSearchParams } from "next/navigation";
import useUpdateQueryString from "@/hooks/useUpdateQueryString";
import SpellCard from "@/components/SpellCard";
import { spellCountsUrl, spellsUrl } from "@/lib/constants";

type CategoryProps = {
  heading: string;
  options: CategoryDetails[];
};

const CategorySection = ({ heading, options }: CategoryProps) => {
  const searchParams = useSearchParams();

  const [categoryData, setCategoryData] = useState(InitCategoryOptions);
  const {
    data: countData,
    isLoading,
    error,
  } = useFetchData<CategoryCounts>(
    `${spellCountsUrl}?${searchParams?.toString()}`
  );

  useEffect(() => {
    if (countData) {
      setCategoryData(countData);
    }
  }, [countData, searchParams]);

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
                    queryKey={item.queryKey}
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
                queryKey={item.queryKey}
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
  const page = Number(searchParams?.get("page") ?? "1");
  const perPage = Number(searchParams?.get("per_page") ?? "12");
  const updateQueryString = useUpdateQueryString();

  const [queryParams, setQueryParams] = useState<string>(
    `?${searchParams?.toString()}` ?? ""
  );
  const [numPages, setNumPages] = useState<number>(1);
  const [entrires, setEntries] = useState<SpellOverviewDetails[]>([]);

  const [url, setUrl] = useState<string>(`${spellsUrl}${queryParams}`);
  const { data, isLoading, error } = useFetchData<SpellsApiOverview>(url);

  useEffect(() => {
    const query = updateQueryString([], ["page", "per_page"]);
    setUrl(`${spellsUrl}${query}`);
  }, [searchParams, url]);

  useEffect(() => {
    if (data) {
      const numPages = Math.ceil(data.count / perPage);
      setNumPages(numPages);

      const start = (page - 1) * perPage;
      const end = start + perPage;

      const entries = data.items.slice(start, end);
      setEntries(entries);
    }
  }, [data, page, perPage]);

  useEffect(() => {
    const query = updateQueryString([
      { name: "page", value: "1" },
      { name: "per_page", value: perPage.toString() },
    ]);
    router.push(`/${query}`, { scroll: false });
  }, [perPage, data]);

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
        <div className="flex flex-col xl:flex-row gap-10 mt-16 mb-6 justify-center items-center text-start">
          <>
            <CategorySection
              heading="Specialisation"
              options={SpecialisationDetails}
            />
            <div className="divider divider-horizontal"></div>
            <CategorySection
              heading="Characteristics"
              options={CharacteristicDetails}
            />
          </>
        </div>
      </Hero>
      {error ? (
        <section className="grid gap-8 m-20 items-center justify-center">
          {error && <div>Data error: {error}</div>}
        </section>
      ) : isLoading ? (
        <section className="flex flex-col gap-8 m-10 items-center justify-center">
          <div className="skeleton h-12 w-1/2"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8 mx-auto my-10 md:m-10 w-full">
            {Array.from(Array(perPage).keys()).map((_, idx) => (
              <div key={idx} className="relative w-[245px] h-[400px]">
                <div className="skeleton w-full h-full"></div>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <section className="flex flex-col gap-8 mt-10 mx-auto">
          <h1 className="text-3xl text-center">
            Found <span className="text-magic">{data?.count}</span> Spells...
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8 mx-auto my-10 md:m-10 justify-center items-center">
            {entrires.map((card) => (
              <SpellCard
                key={card.name}
                title={card.name}
                desc={card.desc}
                img={{ name: card.name, url: card.index }}
                url={`/spells/${card.index}`}
              />
            ))}
          </div>
          <div className="flex justify-center items-center mb-10">
            {numPages > 1 && (
              <Pagination numPages={numPages} itemsPerPage={perPage} />
            )}
          </div>
        </section>
      )}
    </main>
  );
};

export default Homepage;
