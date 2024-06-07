import Carousel from "@/components/Carousel";
import Card from "./Card";
import Hero from "@/components/Hero";
import { HomepageCategories } from "@/lib/constants";

const Categories = () => {
  return (
    <section className="grid grid-cols-3 gap-8 justify-items-center items-center mt-10">
      {HomepageCategories.map((category) => (
        <Card key={category.title} {...category} />
      ))}
    </section>
  );
};

const SLIDE_COUNT = 5;
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
          Search for the spell of your choice, or scroll
          through the list of categories below.
        </p>
      </Hero>
      <Carousel slides={SLIDES} />
    </main>
  );
};

export default Homepage;
