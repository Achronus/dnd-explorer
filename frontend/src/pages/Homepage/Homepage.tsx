import Hero from "./Hero";
import CategoryCards from "./Categories";

const Homepage = () => {
  return (
    <main className="">
      <Hero>
        <h1 className="text-5xl font-bold">
          Explore the <span className="text-magic">Magic</span> of DnD
        </h1>
        <p className="py-6 text-lg">
          Search for the spell of your choice, or select one of the categories
          below.
        </p>
      </Hero>
      <CategoryCards />
    </main>
  );
};

export default Homepage;
