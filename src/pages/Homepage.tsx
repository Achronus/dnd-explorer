import Card from "@/components/Card";
import Hero from "@/components/Hero";
import { HomepageCategories } from "@/lib/constants";

const Categories = () => {
  return (
    <section className="grid grid-cols-3 gap-8 justify-items-center items-center mt-10">
      {HomepageCategories.map((category) => (
        <Card {...category} />
      ))}
    </section>
  );
};

const Homepage = () => {
  return (
    <main className="">
      <Hero />
      <Categories />
    </main>
  );
};

export default Homepage;
