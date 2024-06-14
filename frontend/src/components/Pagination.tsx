"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  currentPage: number;
  numPages: number;
  pageCount: number;
  handleChange: (pageIdx: number) => void;
};

const Pagination = ({
  currentPage,
  numPages,
  pageCount,
  handleChange,
}: Props) => {
  const router = useRouter();

  const handlePageChange = (pageIdx: number) => {
    if (pageIdx < 1 || pageIdx > numPages) return;
    handleChange(pageIdx);
    router.push(`/?page=${pageIdx}&per_page=${pageCount}`, { scroll: false });
  };

  return (
    <div className="join">
      <button
        className="join-item btn"
        disabled={currentPage == 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        <ChevronLeft />
      </button>
      {Array.from({ length: numPages }, (_, i) => i + 1).map((item) => (
        <input
          key={item}
          className="join-item btn btn-square"
          type="radio"
          name="options"
          aria-label={item.toString()}
          checked={currentPage == item}
          onClick={() => handlePageChange(item)}
        />
      ))}

      <button
        className="join-item btn"
        disabled={currentPage == numPages}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        <ChevronRight />
      </button>
    </div>
  );
};

export default Pagination;
