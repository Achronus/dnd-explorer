import Carousel from "@/components/Carousel";
import { CategoryCard } from "./Card";
import Hero from "@/components/Hero";
import { HomepageCategories } from "@/lib/constants";

const Categories = () => {
  return (
    <section className="grid grid-cols-3 gap-8 m-10">
      {HomepageCategories.map((category) => (
        <CategoryCard key={category.title} {...category} />
      ))}
    </section>
  );
};

const SLIDE_COUNT = 8;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

const Homepage = () => {
  return (
    <main className="">
      <Hero>
        <h1 className="text-4xl font-bold">
          Explore the{" "}
          <span className="text-magic">Magic</span> of DnD
        </h1>
        <p className="py-6">
          Search for the spell of your choice, or select one
          of the categories below.
        </p>
      </Hero>
      <Categories />
      <Carousel title="Trending Now" slides={SLIDES} />
    </main>
  );
};

export default Homepage;
