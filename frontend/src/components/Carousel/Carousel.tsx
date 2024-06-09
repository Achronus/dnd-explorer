"use client";

import styles from "./Carousel.module.css";
import useEmblaCarousel from "embla-carousel-react";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "./ArrowButtons";
import { cn } from "@/lib/utils";
import { CardDetailsType } from "@/types/cards";
import Slide from "./Slide";

type CarouselProps = {
  title: string;
  slides: CardDetailsType[];
};

const Carousel = ({ title, slides }: CarouselProps) => {
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
    <section
      className={cn(styles.embla, "bg-base-100 pt-10")}
    >
      <h1 className="text-white text-3xl font-semibold mx-8">
        {title}
      </h1>
      <div
        className={cn(styles.embla__viewport, "px-8")}
        ref={emblaRef}
      >
        <div
          className={cn(styles.embla__container, "mt-10")}
        >
          {slides.map((slide, idx) => (
            <Slide key={idx} {...slide} />
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
