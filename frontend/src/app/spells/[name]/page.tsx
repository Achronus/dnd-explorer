"use client";

import useFetchData from "@/hooks/useFetchData";
import { CoreDetails, SpellCardDetails } from "@/types/api";
import {
  BookOpenText,
  Brain,
  Crosshair,
  Dices,
  FlaskRound,
  LoaderPinwheel,
  Puzzle,
  Pyramid,
  Shapes,
  ShieldCheck,
  Skull,
  Sparkles,
  Timer,
  WandSparkles,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import CardImage from "./CardImage";

const SpellDetails = ({ data }: { data: SpellCardDetails }) => {
  const dmgArray = (dmgValues: [string, string][]) => {
    let strArray: string[] = [];
    Object.entries(dmgValues).map(([level, dice]) => {
      strArray.push(`- Lvl ${level} = ${dice}`);
    });
    return strArray;
  };

  const nameArray = (data: CoreDetails[]) => {
    let strArray: string[] = [];
    data.map(({ name }) => {
      strArray.push(`- ${name}`);
    });
    return strArray;
  };

  const formattedDesc = (text: string) => {
    // Regular expression to find text wrapped in *** and convert to 'bold'
    const re = new RegExp(/\*\*\*(.*?)\*\*\*/g);
    const parts = [];
    let lastIndex = 0;

    text.replace(re, (match, p1, offset) => {
      parts.push(text.slice(lastIndex, offset));
      parts.push(<b key={offset}>{p1}</b>);
      lastIndex = offset + match.length;
      return "";
    });

    parts.push(text.slice(lastIndex));

    return <>{parts}</>;
  };

  const details = [
    // Row 1
    {
      label: "Level",
      value: data.level === 0 ? "Cantrip" : data.level,
      Icon: FlaskRound,
    },
    { label: "Duration", value: data.duration, Icon: Timer },
    { label: "Range", value: data.range, Icon: Crosshair },
    {
      label: "Concentration",
      value: data.concentration ? "Yes" : "No",
      Icon: Brain,
    },
    // Row 2
    { label: "Casting Time", value: data.casting_time, Icon: WandSparkles },
    {
      label: "Components",
      value: data.components ? data.components.join(", ") : "-",
      Icon: Puzzle,
    },
    { label: "School", value: data.school.name, Icon: BookOpenText },
    {
      label: "Damage Type",
      value: data.damage ? data.damage.damage_type.name : "-",
      Icon: Skull,
    },
    // Row 3
    {
      label: "Ritual",
      value: data.ritual ? "Yes" : "No",
      Icon: LoaderPinwheel,
    },
    {
      label: "Difficulty Class (DC)",
      value: data.dc ? data.dc.dc_type.name : "-",
      Icon: Shapes,
    },
    {
      label: "DC Success",
      value: data.dc ? data.dc.dc_success : "-",
      Icon: ShieldCheck,
    },
    {
      label: "Damage Per Level",
      value:
        data.damage && data.damage.damage_at_character_level
          ? dmgArray(data.damage.damage_at_character_level)
          : "-",
      Icon: Dices,
    },
  ];

  const classDetails = [
    {
      label: "Classes",
      value: nameArray(data.classes),
      Icon: Sparkles,
    },
    {
      label: "Subclasses",
      value: nameArray(data.subclasses),
      Icon: Pyramid,
    },
  ];

  return (
    <section className="flex flex-col gap-12">
      <div className="grid grid-cols-4 gap-8">
        {details.map(({ label, value, Icon }, idx) => (
          <div key={idx} className="flex flex-col gap-8">
            <div>
              <h2 className="flex gap-2 items-center font-medium">
                {label} <Icon width={15} height={15} />
              </h2>
              <div className="grid grid-cols-2">
                {Array.isArray(value) ? (
                  value.map((para, idx) => <p key={idx}>{para}</p>)
                ) : (
                  <p>{value}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Classes */}
      <div className="grid grid-cols-12 gap-8">
        {classDetails.map(({ label, value, Icon }) => (
          <div key={label} className="col-span-6">
            <h2 className="flex gap-2 items-center font-medium">
              {label} <Icon width={15} height={15} />
            </h2>
            <div className="flex gap-12">
              {value.length === 0 ? (
                <p>-</p>
              ) : (
                value.map((para, idx) => <p key={idx}>{para}</p>)
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Description */}
      <div className="desc flex flex-col gap-4">
        <>
          {data.desc.map((para, idx) => (
            <p key={idx}>{formattedDesc(para)}</p>
          ))}
        </>
        <>
          {data.higher_level.map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </>
      </div>
    </section>
  );
};

const Page = () => {
  const pathname = usePathname();
  const [spellName, setSpellName] = useState("");

  const { data, isLoading, error } = useFetchData<SpellCardDetails>(
    `/api/${pathname}`
  );

  useEffect(() => {
    if (!pathname) {
      return;
    }

    const name = pathname;
    setSpellName(name.split("/").pop() ?? "");
  }, [pathname]);

  return (
    <main className="m-10">
      <div className="grid grid-cols-12 gap-12 mb-10">
        {isLoading ? (
          <>
            <div className="col-span-3 skeleton w-[400px] h-[650px]"></div>
            <div className="col-span-9 skeleton w-full h-full"></div>
          </>
        ) : (
          data && (
            <>
              <CardImage spellName={spellName} />
              <div className="col-span-9 flex flex-col flex-grow gap-10">
                <h1 className="font-medium text-4xl">{data.name}</h1>
                <SpellDetails data={data} />
              </div>
            </>
          )
        )}
      </div>
    </main>
  );
};

export default Page;
