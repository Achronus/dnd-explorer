import Image from "next/image";
import Link from "next/link";
import styles from "./Carousel.module.css";
import { cn } from "@/lib/utils";
import { CardDetailsType } from "@/types/cards";

const Slide = ({ url, title, description, img }: CardDetailsType) => {
  return (
    <div className={styles.embla__slide}>
      <Link href={url}>
        <div
          className={cn(
            styles.embla__slide__number,
            "border border-gray-800 bg-base-200 rounded-lg"
          )}
        >
          <div className="px-6 w-full h-full flex flex-col justify-center">
            <Image
              src={img.url}
              alt={`${img.name} card`}
              width={300}
              height={300}
            />
            <div className="opacity-0 hover:opacity-100 duration-300 h-4/6 flex items-center">
              <p className="text-white text-base mb-6 font-normal">
                {description}
              </p>
            </div>
            <h1 className="text-2xl text-white font-semibold">{title}</h1>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Slide;
