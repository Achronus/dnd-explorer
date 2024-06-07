"use client";

import styles from "./Carousel.module.css";
import useEmblaCarousel from "embla-carousel-react";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "./ArrowButtons";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

type CarouselProps = {
  slides: number[];
};

const Carousel = ({ slides }: CarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
  });

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <section className={styles.embla}>
      <div
        className={cn(styles.embla__viewport, "px-8")}
        ref={emblaRef}
      >
        <div
          className={cn(styles.embla__container, "mt-10")}
        >
          {slides.map((slide) => (
            <div
              className={styles.embla__slide}
              key={slide}
            >
              <Link href="/">
                <div
                  className={cn(
                    styles.embla__slide__number,
                    "border border-black"
                  )}
                >
                  <div className="px-6 w-full h-full flex flex-col justify-center">
                    <Image />
                    <div className="opacity-0 hover:opacity-100 duration-300 h-4/6 flex items-center">
                      <p className="text-white text-base mb-6 font-normal">
                        Lorem ipsum dolor sit amet
                        consectetur adipisicing elit.
                        Impedit maiores ut molestiae debitis
                        eos. Itaque esse enim, minima quam
                        sed laboriosam hic eveniet omnis
                        dolore a repudiandae, accusamus
                        voluptates quia?
                      </p>
                    </div>
                    <h1 className="text-2xl text-white font-semibold">
                      Dwayne
                    </h1>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.embla__controls}>
        <div className={cn(styles.embla__buttons, "px-8")}>
          <PrevButton
            onClick={onPrevButtonClick}
            disabled={prevBtnDisabled}
          />
          <NextButton
            onClick={onNextButtonClick}
            disabled={nextBtnDisabled}
          />
        </div>
      </div>
    </section>
  );
};

export default Carousel;
