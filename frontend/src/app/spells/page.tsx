import SpellCard from "@/components/SpellCard";
import Hero from "@/components/Hero";
import { getSpellData, getLimitedData } from "@/lib/retrieve";
import { SpellCardInfo } from "@/types/cards";

const Page = async () => {
  // const cards: SpellCardInfo[] = await getLimitedData("spells", 10);
  const cards = await getSpellData("spells", 10);

  return (
    <>
      <Hero />
      <section className="grid grid-cols-3 gap-8 justify-items-center items-center">
        {cards.map((card) => (
          <SpellCard key={card.index} {...card} />
        ))}
      </section>
    </>
  );
};

export default Page;
