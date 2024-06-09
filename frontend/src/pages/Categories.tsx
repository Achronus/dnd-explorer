import { HomepageCategories } from "@/lib/constants";
import CategoryCard from "./Card";

const CategoryCards = () => {
  return (
    <section className="grid grid-cols-3 gap-8 m-10">
      {HomepageCategories.map((category) => (
        <CategoryCard key={category.title} {...category} />
      ))}
    </section>
  );
};

export default CategoryCards;
