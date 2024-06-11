import Carousel from "@/components/Carousel";
import { SpellHero } from "@/components/Spell";
import { title } from "@/lib/utils";
import { Category } from "@/types/api";
import { Loader } from "lucide-react";
import React from "react";

type LayoutProps = {
  heroTitle: string;
  heroDesc: string;
  dataError: any;
  dataIsLoading: boolean;
  data: Category;
};

const SpellLayout = ({
  heroTitle,
  heroDesc,
  dataError,
  dataIsLoading,
  data,
}: LayoutProps) => {
  return (
    <>
      <SpellHero category={heroTitle}>{heroDesc}</SpellHero>
      {dataError ? (
        <section className="grid gap-8 m-20 items-center justify-center">
          {dataError && <div>Count error: {dataError}</div>}
        </section>
      ) : dataIsLoading ? (
        <section className="grid gap-8 m-20 items-center justify-center">
          <Loader width={50} height={50} className="animate-spin" />
        </section>
      ) : (
        <section className="flex flex-col">
          {data?.items.map((cat) => (
            <Carousel
              key={cat}
              title={title(cat)}
              slides={[
                {
                  url: "",
                  title: "test",
                  description: "test",
                  img: { name: "", url: "" },
                },
              ]}
            />
          ))}
        </section>
      )}
    </>
  );
};

export default SpellLayout;
