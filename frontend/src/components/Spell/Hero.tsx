type SpellHeroProps = {
  category: string;
  children: React.ReactNode;
};

const SpellHero = ({ category, children }: SpellHeroProps) => {
  return (
    <section>
      <div className="hero min-h-[350px] bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold">
              Spells by <span className="text-magic">{category}</span>
            </h1>
            <p className="py-6 text-lg">{children}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpellHero;
