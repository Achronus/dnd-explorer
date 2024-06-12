import { SpecialisationOptions, CategoryOptions } from "@/data/categories";
import { SelectOption } from "@/types/option";

import Hero from "./Hero";
import SearchBox from "@/components/SearchBox";
import Select from "@/components/Select";

type CategoryProps = {
  heading: string;
  options: SelectOption[];
};

const CategorySection = ({ heading, options }: CategoryProps) => {
  return (
    <section>
      <h1 className="mb-5 font-medium text-2xl">{heading}</h1>
      <div className="flex gap-10">
        {options.map((item, idx) => (
          <Select key={idx} heading={item.heading} url={item.url} />
        ))}
      </div>
    </section>
  );
};

const Homepage = () => {
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
          />
          <div className="divider divider-horizontal"></div>
          <CategorySection heading="Category" options={CategoryOptions} />
        </div>
      </Hero>
    </main>
  );
};

export default Homepage;
