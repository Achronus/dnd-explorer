import Carousel from "@/components/Carousel";
import Hero from "@/components/Hero";
import CategoryCards from "./Categories";

const SLIDE_COUNT = 8;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

const Homepage = () => {
  return (
    <main className="">
      <Hero>
        <h1 className="text-5xl font-bold">
          Explore the{" "}
          <span className="text-magic">Magic</span> of DnD
        </h1>
        <p className="py-6 text-lg">
          Search for the spell of your choice, or select one
          of the categories below.
        </p>
      </Hero>
      <CategoryCards />
      {/* <Carousel title="Featured" slides={SLIDES} /> */}
    </main>
  );
};

export default Homepage;
