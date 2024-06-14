"use client";

import useUpdateQueryString from "@/hooks/useUpdateQueryString";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

type Props = {
  numPages: number;
  maxPagesToShow?: number;
  itemsPerPage?: number;
};

const Pagination = ({
  numPages,
  maxPagesToShow = 4,
  itemsPerPage = 20,
}: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams?.get("page") ?? "1");
  const perPage = searchParams?.get("per_page") ?? itemsPerPage.toString();

  const updateQueryString = useUpdateQueryString();

  const handlePageChange = (pageIdx: number) => {
    if (pageIdx < 1 || pageIdx > numPages) return;

    const query = updateQueryString([
      {
        name: "page",
        value: pageIdx.toString(),
      },
      {
        name: "per_page",
        value: perPage,
      },
    ]);
    router.push(`/${query}`, { scroll: false });
  };

  const getPageNumbers = () => {
    const pages = [];
    const halfWindow = Math.floor((maxPagesToShow - 1) / 2);

    const startPage = Math.max(currentPage - halfWindow, 2);
    const endPage = Math.min(currentPage + halfWindow, numPages - 1);

    if (currentPage >= 1) {
      pages.push(1);
    }

    if (currentPage > halfWindow + 2) {
      pages.push("...");
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (currentPage < numPages - halfWindow - 1) {
      pages.push("...");
    }

    if (currentPage <= numPages) {
      pages.push(numPages);
    }

    return pages;
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
      {getPageNumbers().map((item, idx) => (
        <input
          key={idx}
          className="join-item btn btn-square"
          type="radio"
          name="options"
          aria-label={item.toString()}
          checked={currentPage == item}
          disabled={item === "..."}
          onClick={() => handlePageChange(Number(item))}
          readOnly
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
