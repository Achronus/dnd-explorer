import useFetchImgs from "@/hooks/useFetchImgs";
import { UTImage } from "@/types/api";

import styles from "./styles.module.css";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

type Props = {
  title: string;
  desc: string;
  img: UTImage;
  url: string;
};

const SpellCard = ({ title, desc, url, img }: Props) => {
  const { imgUrls, isLoading, error } = useFetchImgs(img.url);

  const handleDescription = (text: string, maxChars: number = 200) => {
    let sentences = text
      .slice(0, maxChars)
      .split(".")
      .map((sen) => sen && `${sen}.`);

    if (sentences.at(-1) === "") {
      return [sentences.at(0)];
    }

    sentences[sentences.length - 1] = `${sentences[
      sentences.length - 1
    ].trim()}..`;
    return sentences;
  };

  return (
    <div className={cn(styles["spell-card"], "relative w-[245px] h-[400px]")}>
      {isLoading ? (
        <div className="skeleton w-full h-full"></div>
      ) : (
        <div className={cn(styles.cover, "absolute w-full h-full")}>
          <Image
            src={imgUrls[0].url}
            alt={imgUrls[0].name}
            className="rounded-lg"
            fill
            style={{
              objectFit: "contain",
            }}
            loading="eager"
          />
          <div
            className={cn(
              styles["card-back"],
              "flex items-center justify-center absolute h-full w-full rounded-lg"
            )}
          >
            <div
              className={cn(
                styles.content,
                "flex flex-col gap-4 px-4 py-8 h-full"
              )}
            >
              <h1 className="card-title text-2xl align-top">{title}</h1>
              <div className="flex flex-col flex-grow gap-2">
                {handleDescription(desc, 165).map((sentence, idx) => (
                  <p key={idx} className="text-gray-400 text-md">
                    {sentence}
                  </p>
                ))}
              </div>
              <div className="align-bottom">
                <Link
                  href={url}
                  className="flex gap-2 justify-center items-center hover:bg-base-100 cursor-pointer py-2 px-4 rounded-lg transition-all border border-base-100"
                >
                  View details <ChevronRight width={18} height={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpellCard;
